# Agent Required Inputs Guide
## Quick Reference: What Each Agent Needs Before Starting

---

## 🎯 Overview

All agents now have **MANDATORY INPUT CHECKS** built in. If a required input is missing, the agent will STOP immediately and tell you exactly what's needed.

---

## 📋 Agent Input Requirements

### 1️⃣ Job Sourcer Agent

**Purpose:** Daily job discovery across multiple platforms

**REQUIRED:**
- ✅ TELOS Framework File (`/Users/gusta/AI-Agent-HR-workshop/telos.md`)
  - Used to filter jobs by relevance (P#, M#, G# alignment)

**OPTIONAL:**
- CV/Experience Summary (better job match quality)
- Salary Expectations (filtering criteria)

**What happens without TELOS:**
```
❌ MISSING REQUIRED INPUT: TELOS Framework

I cannot proceed without your TELOS file to filter relevant jobs.

Please provide:
1. Upload your telos.md file
2. Paste your TELOS content (P#, M#, G#, C#, S#)
3. Provide the correct file path
```

---

### 2️⃣ Communications Strategist

**Purpose:** TELOS-driven bold positioning strategy

**REQUIRED:**
- ✅ Job Posting (URL, PDF, or pasted text)
- ✅ TELOS Framework (`/Users/gusta/AI-Agent-HR-workshop/telos.md`)
- ✅ CV/Experience Summary (`/Users/gusta/Bewerbungen/cv-accelleron-dec25.html` OR summary)

**OPTIONAL:**
- Company Research (culture, values, projects)
- Previous Positioning Briefs (consistency)

**What agent checks:**
```
1. Job posting ✓
2. TELOS file ✓
3. CV/experience ✓
4. If ANY missing → STOP with clear instructions
```

---

### 3️⃣ HR Business Partner

**Purpose:** Honest matching + CV optimization (CAR method)

**REQUIRED:**
- ✅ Positioning Brief (from Communications Strategist)
- ✅ CV Master File (`/Users/gusta/Bewerbungen/cv-accelleron-dec25.html`)
- ✅ Job Posting (full description)

**OPTIONAL:**
- Previous Application Materials (avoid repetition)
- Company-Specific Research (tone matching)
- Red Flags to Address (gaps, pivots)

**What agent checks:**
```
1. Positioning brief exists ✓
2. Master CV readable ✓
3. Job posting available ✓
4. If ANY missing → STOP with next steps
```

---

### 4️⃣ Writing Style Agent

**Purpose:** Final polish (active voice, strong verbs, authenticity)

**REQUIRED:**
- ✅ Draft CV (from HR Business Partner)
- ✅ Draft Cover Letter (from HR Business Partner)
- ✅ TELOS Framework (authenticity check)

**OPTIONAL BUT STRONGLY RECOMMENDED:**
- User's Natural Writing Samples (emails, posts)
  - Calibrates to authentic voice
- Admired Writing Samples (aspirational qualities)

**What agent checks:**
```
1. Draft CV exists ✓
2. Draft cover letter exists ✓
3. TELOS for authenticity ✓
4. Ask about text samples ✓
5. If ANY required missing → STOP
```

---

### 5️⃣ Salary Intelligence Agent

**Purpose:** Swiss market research + negotiation strategy

**REQUIRED:**
- ✅ Job Posting (role title, company, location, salary range if available)
- ✅ Candidate Experience Data (years, education, certifications)
- ✅ Location (specific Swiss city: Zürich, Baden, Basel, etc.)

**OPTIONAL:**
- TELOS G# (salary targets)
- Competing Offers (leverage)
- Unique Skills (affects leverage scoring)

**What agent checks:**
```
1. Job posting with role + location ✓
2. Experience data (years, education) ✓
3. Swiss location for multiplier ✓
4. If ANY missing → STOP with specific request
```

---

### 6️⃣ Network Mapper Agent

**Purpose:** LinkedIn warm intro pathfinding

**REQUIRED:**
- ✅ Company Name (target company)
- ✅ Role Title (position applying for)
- ✅ LinkedIn Connections Data:
  - LinkedIn export CSV, OR
  - List of connections at/near company, OR
  - Permission to search LinkedIn profile

**OPTIONAL BUT RECOMMENDED:**
- Hiring Manager Name (from job posting)
- Alumni Networks (universities attended)

**What agent checks:**
```
1. Company name ✓
2. Role title ✓
3. LinkedIn connections data ✓
4. If ANY missing → STOP with 3 options to provide data
```

---

### 7️⃣ Agent Note Compiler

**Purpose:** Consolidate notes from multiple sources

**REQUIRED:**
- ✅ Source Notes (at least 2 different sources)
  - Text files, PDFs, images, Trello, OneNote, etc.
- ✅ Compilation Purpose
  - Weekly review, project research, meeting notes, etc.

**OPTIONAL:**
- Preferred Organization (chronological, by topic)
- Target Audience (personal, team, public)
- Existing Compilation (adding to previous)

**What agent checks:**
```
1. At least 2 note sources ✓
2. Compilation purpose ✓
3. If ANY missing → STOP with clear instructions
```

---

### 8️⃣ Job File Generator

**Purpose:** Create folders and write final application files

**REQUIRED:**
- ✅ Company Name (for folder naming)
- ✅ Position Title (for folder naming)
- ✅ Cover Letter HTML (from Writing Style Agent)
- ✅ CV HTML (from Writing Style Agent)
- ✅ Match Analysis Data (fit score, matches, gaps)

**What agent checks:**
```
1. Company name ✓
2. Position title ✓
3. Cover letter HTML ✓
4. CV HTML ✓
5. Match analysis data ✓
6. If ANY missing → STOP before creating folders
```

---

## 🔄 Typical Workflow with Required Inputs

### Complete Application Flow:

```
USER PREPARES ONCE:
├── TELOS file (telos.md) ✓
└── Master CV (cv-accelleron-dec25.html) ✓

AGENT 1: Job Sourcer
├── Reads: TELOS ✓
└── Outputs: Job list with relevance scores

USER SELECTS: 1 job to apply for

AGENT 2: Communications Strategist
├── Needs: Job posting + TELOS + CV ✓
└── Outputs: Positioning brief

AGENT 3: HR Business Partner
├── Needs: Positioning brief + CV + Job posting ✓
└── Outputs: Draft CV + Draft cover letter

AGENT 4: Writing Style Agent
├── Needs: Drafts + TELOS ✓
├── Asks: Text samples (optional)
└── Outputs: Final CV HTML + Final cover letter HTML

AGENT 5: Job File Generator
├── Needs: Company + Position + HTML files + Match data ✓
└── Creates: Dated folder with all files

PARALLEL AGENTS (run anytime):
├── Salary Intelligence (needs: job + experience + location)
└── Network Mapper (needs: company + role + LinkedIn data)
```

---

## 🚫 What Happens When Inputs Are Missing

### Example: Communications Strategist without TELOS

```
User: "Create positioning for this job [pastes URL]"

Agent: ❌ MISSING REQUIRED INPUT: TELOS Framework

I cannot proceed without your TELOS to create mission-aligned positioning.

Please provide one of:
1. Upload your telos.md file
2. Paste your TELOS content (P#, M#, G#, C#, S#)
3. Provide the correct file path: /Users/gusta/AI-Agent-HR-workshop/telos.md

Once provided, I'll create the positioning brief.

[Agent STOPS and waits]
```

---

## ✅ Best Practices

### For Local Deployment (Claude Code):
1. Keep TELOS and CV in consistent locations
2. Agents will read files directly from paths
3. Verify file paths before running agents

### For Web Deployment (Claude.ai Projects):
1. Upload TELOS and CV as project knowledge
2. Paste job postings when needed
3. Copy drafts between agent runs

### For Workshop Participants:
1. Create their own TELOS first
2. Prepare master CV (HTML or markdown)
3. Run agents sequentially with proper inputs
4. Agents will refuse to proceed if inputs missing

---

## 📁 File Locations Reference

**Default paths configured:**
- TELOS: `/Users/gusta/AI-Agent-HR-workshop/telos.md`
- Master CV: `/Users/gusta/Bewerbungen/cv-accelleron-dec25.html`
- Output: `/Users/gusta/Bewerbungen/Agent-Setup-GU/[Date]/[Company]_[Position]/`

**For other users:**
Update paths in agent files or provide files via upload/paste.

---

## 🎓 Workshop Usage

**Tell participants:**
1. "Agents will refuse to work without required inputs"
2. "This prevents incomplete or low-quality outputs"
3. "Better to stop and provide missing input than generate garbage"
4. "TELOS is the foundation—create this FIRST"

**Demo scenario:**
1. Try running Communications Strategist without TELOS
2. Show error message: "❌ MISSING REQUIRED INPUT"
3. Provide TELOS
4. Agent proceeds successfully
5. Emphasizes: "Quality inputs → Quality outputs"

---

**Last Updated:** 2025-12-08
**All 8 agents now enforce mandatory input checks.**
