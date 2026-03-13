# Sihlicon Valley: Company OS Architecture

This document defines the Multi-Agent System designed to run the portfolio of projects (Sihlhack, Reaswiss, Bioco, etc.).

## 1. The Federation (Agents)

We strictly separate concerns into "Departments."

### 🟢 Operations Agent (`/agents/ops`)
*   **Mandate:** Reliability, Uptime, Infrastructure Scaling.
*   **Tools:**
    *   `http_monitor` (n8n): Check site status code & latency.
    *   `ssh_monitor` (future): Check server CPU/RAM/Disk.
    *   `db_health` (future): Postgres connection pool status.
*   **Output:** Daily Health Report, Incident Alerts.

### 🔵 Product/Build Agent (`/agents/product`)
*   **Mandate:** Delivery, Code Quality, Feature Velocity.
*   **Tools:**
    *   `git_summary.sh` (Script): Scans local `Projects/` for recent commits.
    *   `github_issues` (future): Fetches open issues/PRs.
*   **Output:** Weekly Changelog, Stale Issue Alerts.

### 🟠 Sales/Growth Agent (`/agents/sales`)
*   **Mandate:** Revenue, Pipeline, User Acquisition.
*   **Tools:**
    *   `email_parser` (n8n): Extracts intent from `contact@` emails.
    *   `crm_sync` (future): Updates Airtable/HubSpot.
*   **Output:** Lead Qualification Score, Draft Replies.

### 🟣 The Executive (Board) (`/agents/executive`)
*   **Mandate:** Strategy, Resource Allocation, High-level Direction.
*   **Inputs:**
    *   Ops Report (Stability)
    *   Product Report (Velocity)
    *   Sales Report (Pipeline)
*   **Process:** The "Debate Loop" (Analyst vs. Critic vs. Chair).
*   **Output:** Board Minutes, Strategic Directives.

## 2. Data Flow

1.  **Bottom-Up:** Agents run on their schedules (Daily/Weekly) and store structured logs in the `sihliconvalley_brain` DB.
2.  **Synthesis:** On Wednesday (Board Meeting), the Executive Agent queries these logs (not raw data) to form the big picture.

## 3. Implementation Roadmap

- [x] **Core:** n8n + Postgres setup.
- [x] **Ops:** Basic HTTP Health Check (`workflows/01-daily-health-check.json`).
- [x] **Executive:** Board Meeting V1 & V2 (Collaborative).
- [ ] **Product:** Implement `workflows/agents/product/01-dev-summary.json` using `git-summary.sh`.
- [ ] **Sales:** Connect Email/Form inputs.
- [ ] **Scaling:** Add "Auto-Fix" capabilities to Ops Agent (e.g., restart docker container on failure).
