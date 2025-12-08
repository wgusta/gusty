# Complete 7-Agent System for Job Applications
## Compact Edition (Token-Optimized)

---

## System Overview

**7 specialized agents work together to create mission-aligned, ATS-optimized applications:**

1. **Job Sourcer** (existing) - Daily job discovery
2. **Communications Strategist** - Bold TELOS-driven positioning
3. **Spiritual Guru** (existing) - Alignment & authenticity check
4. **HR Business Partner** - Honest matching + CV optimization
5. **Writing Style Agent** - Final polish (active voice, authentic voice)
6. **Salary Intelligence** - Swiss market research + negotiation
7. **Network Mapper** - LinkedIn warm intro pathfinding

---

## Core Philosophy

**BOLD > COMPROMISE**
- Position to RESONATE, not PLEASE
- TELOS Mission (M#) drives messaging
- Job requirements inform context only
- Narrow + clear beats broad + vague

**HONEST MATCHING**
- If fit <60%, recommend skip/adjust
- Don't force applications for bad matches
- Quality over quantity

**FABRIC PATTERNS**
- Each agent follows reproducible structure
- Works across ChatGPT, Claude, Gemini
- Identity → Goal → Steps → Output → Constraints

---

## Workflow: Job Discovery → Submission

### Phase 1: Discovery (Job Sourcer)
**Output:** Daily digest with 3-5 high-match jobs
**User action:** Select 1-2 to pursue

### Phase 2: Strategic Positioning (Communications Strategist)
**Input:** Job posting + TELOS + experience
**Output:** Positioning brief (bold statement + 3 key messages)
**Time:** 15-20 min

### Phase 3: Alignment Check (Spiritual Guru)
**Input:** Positioning brief
**Output:** Alignment assessment (8.5/10 score + considerations)
**Decision:** Proceed / Pause for clarity / Skip
**Time:** 5-10 min

### Phase 4: Application Creation (HR Business Partner)
**Input:** Positioning brief + CV data
**Output:** Draft CV + cover letter + interview prep
**Time:** 30-40 min

### Phase 5: Final Polish (Writing Style Agent)
**Input:** Draft + user's text samples + admired samples
**Output:** Publication-ready documents
**Time:** 20-30 min

### Phase 6: Parallel Intelligence (Salary + Network)
**Salary Intelligence:** Market data + target ask
**Network Mapper:** LinkedIn warm intro paths
**Time:** 10-15 min each

**Total time:** ~2 hours for mission-aligned, network-leveraged application
vs. 30 min for generic spray-and-pray

---

## Agent Discussion Protocol

**When agents disagree:**

**Example:** Bold narrow positioning vs. Safe broad?

**Comms Strategist:** "Go narrow—memorable and aligns with TELOS M1"
**HR Partner:** "But narrow might screen us out in ATS"
**Salary Intelligence:** "Narrow = CHF 5K less but better mission fit"
**Network Mapper:** "Found warm intro—referral beats ATS, go narrow"
**Spiritual Guru:** "Does candidate want mission-fit or higher salary?"

**User moderates based on priorities.**

**Result:** If mission > money, choose narrow. If need max salary, choose broad.

---

## Setup Instructions

### Option 1: Claude Projects (Recommended)
1. Create "Job Application System" project
2. Add all 5 agent .md files as project knowledge
3. Add your TELOS file
4. Add your master CV

**Usage:**
```
You: "Analyze this job posting - @communications-strategist"
Claude: [Loads agent, performs analysis]

You: "@spiritual-guru - alignment check on this positioning"
Claude: [Loads agent, checks alignment]
```

### Option 2: ChatGPT Custom GPTs
1. Create 5 separate GPTs, one per agent
2. Each GPT configured with respective instructions
3. Chain through workflow manually

### Option 3: Sequential Prompting (Any LLM)
1. Keep agent .md files locally
2. Copy-paste agent instructions when needed
3. Feed previous output to next agent

---

## File Organization System

### CRITICAL: Application File Management

After Writing Style Agent produces final documents, organize files systematically:

**Step 1: Create Company Folder**
```bash
mkdir -p "Bewerbungen/[CompanyName]-[Role]-[Date]"
```

**Example:**
```
Bewerbungen/AargauerKunsthaus-ProjektleiterDigital-2024-12-10/
```

**Step 2: Copy All Application Files**
```bash
# CV (HTML + PDF)
cp lebenslauf-[name].html "Bewerbungen/[CompanyName]/"
cp lebenslauf-[name].pdf "Bewerbungen/[CompanyName]/"

# Cover Letter (HTML + PDF)
cp anschreiben-[company].html "Bewerbungen/[CompanyName]/"
cp anschreiben-[company].pdf "Bewerbungen/[CompanyName]/"

# Images (for HTML)
cp portraitgueneyusta.jpg "Bewerbungen/[CompanyName]/"
cp [any-other-images].* "Bewerbungen/[CompanyName]/"

# Agent outputs (for reference)
cp positioning-brief.md "Bewerbungen/[CompanyName]/"
cp alignment-check.md "Bewerbungen/[CompanyName]/"
cp salary-strategy.md "Bewerbungen/[CompanyName]/"
```

**Step 3: Create Application Summary**
```bash
cd "Bewerbungen/[CompanyName]/"
cat > APPLICATION-SUMMARY.md << 'EOF'
# Application: [Company Name] - [Role]

## Timeline
- Job posted: [Date]
- Application submitted: [Date]
- Follow-up: [Date]
- Interview: [Date]
- Decision: [Status]

## Key Details
- **Positioning:** [Bold positioning statement]
- **Salary target:** CHF [X]
- **Network leverage:** [Referral from Y / Cold application]
- **Strategic fit:** [95% TELOS match]

## Agent Outputs
- Positioning Brief: positioning-brief.md
- Alignment Check: alignment-check.md
- CV Version: lebenslauf-[name].pdf
- Cover Letter: anschreiben-[company].pdf

## Follow-Up Actions
- [ ] Submit application
- [ ] LinkedIn message to hiring manager (+7 days)
- [ ] Follow-up email (+14 days if no response)
- [ ] Network check-in with [referral name]

## Notes
[Any additional context, interview prep notes, etc.]
EOF
```

**Final Structure:**
```
Bewerbungen/
├── AargauerKunsthaus-ProjektleiterDigital-2024-12-10/
│   ├── APPLICATION-SUMMARY.md
│   ├── lebenslauf-gueneyusta.html
│   ├── lebenslauf-gueneyusta.pdf
│   ├── anschreiben-kunsthaus.html
│   ├── anschreiben-kunsthaus.pdf
│   ├── portraitgueneyusta.jpg
│   ├── positioning-brief.md
│   ├── alignment-check.md
│   └── salary-strategy.md
├── [NextCompany]-[Role]-[Date]/
│   └── ...
└── templates/
    ├── lebenslauf-template.html
    ├── anschreiben-template.html
    └── portraitgueneyusta.jpg
```

**Benefits:**
- ✅ All files for one application in one place
- ✅ HTML images stay with HTML files (no broken links)
- ✅ Agent outputs archived for reference
- ✅ Timeline tracking (when applied, follow-ups)
- ✅ Easy to review positioning for future similar roles

---

## Automation Script (Optional)

Create `organize-application.sh`:

```bash
#!/bin/bash
# Usage: ./organize-application.sh "CompanyName" "Role"

COMPANY="$1"
ROLE="$2"
DATE=$(date +%Y-%m-%d)
DIR="Bewerbungen/${COMPANY}-${ROLE}-${DATE}"

mkdir -p "$DIR"

# Copy files (adjust paths as needed)
cp lebenslauf-*.html "$DIR/"
cp lebenslauf-*.pdf "$DIR/"
cp anschreiben-*.html "$DIR/"
cp anschreiben-*.pdf "$DIR/"
cp portrait*.jpg "$DIR/"
cp *-brief.md "$DIR/" 2>/dev/null
cp *-check.md "$DIR/" 2>/dev/null

echo "Application organized in: $DIR"
cd "$DIR"
ls -lh
```

**Usage:**
```bash
./organize-application.sh "AargauerKunsthaus" "ProjektleiterDigital"
```

---

## Workshop Checklist

**Before Dec 10:**
- [ ] Print Career TELOS template (15-20 copies)
- [ ] Rehearse agent discussion script (15 min demo)
- [ ] Create slides:
  - 7-agent system diagram
  - Bold vs. Compromise examples
  - Fabric pattern structure
  - File organization workflow
- [ ] Test agents on 1 real job posting
- [ ] Prepare handouts:
  - Agent discussion protocol
  - File organization script
  - "When to Go Bold" decision tree

**Workshop day materials:**
- [ ] Agent .md files (digital + printed)
- [ ] TELOS template (printed)
- [ ] Test scenario outputs (show real results)
- [ ] Laptop with Claude/ChatGPT ready

---

## Participant Takeaways

**Files to share:**
1. All 7 agent .md files (compact versions)
2. Career TELOS template
3. File organization script
4. Agent discussion protocol
5. Example outputs (Kunsthaus test)

**Setup instructions:**
1. Create Claude Project or ChatGPT GPTs
2. Upload agent files
3. Create personal TELOS
4. Test with 1 job posting

---

## Success Metrics

**Before agents:**
- Generic applications
- 30 min per application
- Low response rate (~2-5%)
- No mission alignment check

**After agents:**
- Mission-aligned positioning
- 2 hours per application (but 10× better quality)
- Higher response rate (10-15% with network leverage)
- Clear proceed/skip decisions (save time on bad fits)

---

## Sources

**TELOS Framework:**
- [github.com/danielmiessler/Telos](https://github.com/danielmiessler/Telos)

**Fabric Patterns:**
- [github.com/danielmiessler/Fabric](https://github.com/danielmiessler/Fabric)

**ATS Best Practices:**
- [Enhancv ATS CV Guide](https://enhancv.com/uk/blog/ats-cv/)
- [TopResume ATS Tips](https://topresume.com/career-advice/what-is-an-ats-resume)

**Swiss Salary Data:**
- Lohnbuch.ch (official)
- Michael Page Salary Guide
- Glassdoor Switzerland

---

**System ready for December 10 workshop. All agents token-optimized and production-ready.**