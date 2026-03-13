-- Sihliconvalley Brain Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Health Checks Table
-- ============================================
CREATE TABLE IF NOT EXISTS health_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total_sites INTEGER NOT NULL,
    up_count INTEGER NOT NULL,
    down_count INTEGER NOT NULL,
    report_json JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_health_checks_timestamp ON health_checks(timestamp DESC);

-- ============================================
-- Email Inbox Table
-- ============================================
CREATE TABLE IF NOT EXISTS email_inbox (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id VARCHAR(255) UNIQUE NOT NULL,
    account VARCHAR(50) DEFAULT 'primary',
    from_address VARCHAR(255) NOT NULL,
    to_address VARCHAR(255),
    subject TEXT,
    body_preview TEXT,
    received_at TIMESTAMPTZ NOT NULL,
    -- AI Analysis
    category VARCHAR(50), -- business, project, support, newsletter, spam, personal
    priority VARCHAR(20), -- urgent, high, normal, low
    project VARCHAR(50), -- sihlhack, reaswiss, badenleg, etc.
    action_required BOOLEAN DEFAULT FALSE,
    summary TEXT,
    board_relevant BOOLEAN DEFAULT FALSE,
    sentiment VARCHAR(20), -- positive, neutral, negative
    -- Status
    status VARCHAR(20) DEFAULT 'new', -- new, reviewed, actioned, archived
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_email_inbox_received ON email_inbox(received_at DESC);
CREATE INDEX idx_email_inbox_priority ON email_inbox(priority);
CREATE INDEX idx_email_inbox_project ON email_inbox(project);
CREATE INDEX idx_email_inbox_board ON email_inbox(board_relevant) WHERE board_relevant = TRUE;

-- ============================================
-- Board Meetings Table
-- ============================================
CREATE TABLE IF NOT EXISTS board_meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_number INTEGER NOT NULL,
    meeting_date TIMESTAMPTZ NOT NULL,
    minutes_markdown TEXT NOT NULL,
    responses_json JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'pending_review', -- pending_review, reviewed, archived
    decisions_made JSONB, -- Filled after human review
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_board_meetings_date ON board_meetings(meeting_date DESC);
CREATE UNIQUE INDEX idx_board_meetings_number ON board_meetings(meeting_number);

-- ============================================
-- Decisions Table
-- ============================================
CREATE TABLE IF NOT EXISTS decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID REFERENCES board_meetings(id),
    topic VARCHAR(255) NOT NULL,
    decision TEXT NOT NULL,
    decision_type VARCHAR(50), -- approved, rejected, deferred
    assigned_to VARCHAR(100),
    due_date DATE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, in_progress, completed, cancelled
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_decisions_meeting ON decisions(meeting_id);
CREATE INDEX idx_decisions_status ON decisions(status);

-- ============================================
-- Projects Table
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    url VARCHAR(255),
    github_repo VARCHAR(255),
    hosting VARCHAR(50), -- vercel, infomaniak, other
    status VARCHAR(20) DEFAULT 'active', -- active, maintenance, development, archived
    priority INTEGER DEFAULT 5,
    tech_stack TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert initial projects
INSERT INTO projects (name, display_name, url, priority, status) VALUES
    ('sihlhack', 'Sihlhack', 'https://sihlhack.ch', 1, 'active'),
    ('reaswiss', 'Reaswiss', 'https://reaswiss.ch', 2, 'active'),
    ('badenleg', 'BadenLEG', 'https://badenleg.ch', 3, 'active'),
    ('therapylist', 'TherapyList', 'https://therapylist.ch', 4, 'development'),
    ('sihliconvalley', 'Sihliconvalley', 'https://sihliconvalley.ch', 5, 'active'),
    ('bioco', 'Bioco', 'https://bioco.ch', 6, 'active'),
    ('esskunst', 'Esskunst', 'https://esskunst.ch', 7, 'development'),
    ('quartierverein-altstadt', 'Quartierverein Altstadt', 'https://quartierverein-altstadt.ch', 8, 'active')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- Activity Log Table
-- ============================================
CREATE TABLE IF NOT EXISTS activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL, -- health_check, email_received, meeting_held, decision_made
    project VARCHAR(50),
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);
CREATE INDEX idx_activity_log_type ON activity_log(event_type);

-- ============================================
-- Agent Responses Archive
-- ============================================
CREATE TABLE IF NOT EXISTS agent_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID REFERENCES board_meetings(id),
    agent_name VARCHAR(50) NOT NULL, -- ceo, cto, cfo, legal, community
    prompt_used TEXT NOT NULL,
    response TEXT NOT NULL,
    model VARCHAR(100),
    tokens_used INTEGER,
    response_time_ms INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_agent_responses_meeting ON agent_responses(meeting_id);

-- ============================================
-- Trigger for updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_decisions_updated_at
    BEFORE UPDATE ON decisions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
