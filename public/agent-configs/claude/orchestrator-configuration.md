# Job Application Orchestrator Configuration
## Multi-Agent System for Job Applications

---

## PROJECT STRUCTURE

**Project Directory:** `/Users/gusta/AI-Agent-HR-workshop/`
**CV Master File:** `/Users/gusta/Bewerbungen/cv-accelleron-dec25.html`
**Output Directory:** `/Users/gusta/Bewerbungen/Agent-Setup-GU/`

**Available Agents:**
1. Job Sourcer (`/agents/job-sourcer.md`) - **Limited to 10 jobs max per session**
2. Communications Strategist (`/agents/communications-strategist.md`)
3. HR Business Partner (`/agents/hr-business-partner.md`)
4. Writing Style Agent (`/agents/writing-style-agent.md`)

**CRITICAL CONSTRAINT:**
- Job Sourcer agent is limited to maximum 10 job opportunities per session
- This ensures quality over quantity: 10 excellent matches > 50 mediocre ones
- If more than 10 jobs found, Job Sourcer ranks by relevance and selects top 10
- User can choose to process all 10 or select a subset

**Supporting Files:**
- TELOS Framework: `/telos.md`
- CV Templates: `/templates/`
- ATS Guidelines: `/schweizer-ats-quellen-zusammenfassung.md`

---

## ORCHESTRATION MODES

The orchestrator supports two distinct modes of agent coordination. Choose based on the situation complexity and strategic importance.

### MODE 1: PROCEDURAL HANDOFF (Structured & Reproducible)

**When to use:**
- ✅ You have a clear job match with straightforward requirements
- ✅ Time efficiency is important
- ✅ The position is similar to previous applications
- ✅ Company culture and role expectations are well-defined
- ✅ You want consistent, reproducible results
- ✅ The job description is detailed and specific

**How it works:**
Each agent completes its work sequentially and passes a final deliverable to the next agent. Clean handoffs, no iteration between agents.

**Workflow:**
```
1. Job Sourcer
   ↓ [Job posting + company intelligence]
2. Communications Strategist
   ↓ [Positioning brief + key messages]
3. HR Business Partner
   ↓ [Draft CV + cover letter with CAR method]
4. Writing Style Agent
   ↓ [Final polished documents]
```

**Advantages:**
- Faster execution (60-90 minutes total)
- Clear accountability per agent
- Reproducible process
- Structured outputs
- Lower cognitive load

**Best for positions:**
- Corporate roles with standard requirements
- Technical positions with clear skill matches
- Roles at large organizations with defined processes
- When you've already done similar applications

---

### MODE 2: DIALOGUE (Trade-offs Visible)

**When to use:**
- ✅ Strategic or high-value opportunity (dream job, career pivot)
- ✅ Unclear fit; needs exploration and positioning decisions
- ✅ Multiple valid approaches to positioning yourself
- ✅ Company culture is unique or innovative
- ✅ You're making a significant career shift
- ✅ The role requires balancing competing values (e.g., boldness vs. ATS optimization)

**How it works:**
Agents collaborate in real-time, debating trade-offs and refining each other's work. You participate in decision points.

**Workflow:**
```
1. Job Sourcer delivers initial intelligence
   ↓
2. Communications Strategist + HR Business Partner DISCUSS:
   - Bold positioning vs. ATS-safe keywords?
   - Mission-driven narrative vs. achievement focus?
   - How much personality vs. professionalism?
   ↓
3. User chooses direction based on visible trade-offs
   ↓
4. All agents refine collaboratively
   ↓
5. Writing Style Agent harmonizes final output
```

**Advantages:**
- Higher quality for complex situations
- Visible trade-offs inform better decisions
- Adaptive to nuanced requirements
- Surfaces strategic choices explicitly
- More creative and tailored output

**Best for positions:**
- Startups and innovative companies
- Leadership or strategic roles
- Cultural/creative sector positions
- When making a career transition
- Dream opportunities worth extra time investment

---

## DECISION MATRIX

| Criterion | Procedural | Dialogue |
|-----------|-----------|----------|
| **Job Match Clarity** | High (>70% match) | Moderate to Low (<70% match) |
| **Time Available** | Limited (want 60-90 min) | Flexible (can invest 2-3 hours) |
| **Strategic Importance** | Medium | High (dream job, pivot) |
| **Company Type** | Corporate, traditional | Startup, innovative, cultural |
| **Role Complexity** | Standard responsibilities | Multi-faceted, hybrid role |
| **Positioning Certainty** | Know how to position self | Need to explore options |
| **ATS Constraints** | Strict ATS requirements | Flexible or direct application |

---

## EXECUTION PROTOCOL

### FOR PROCEDURAL MODE:

**Step 1: Preparation**
```bash
# Ensure all files are accessible
ls /Users/gusta/Bewerbungen/cv-accelleron-dec25.html
ls /Users/gusta/AI-Agent-HR-workshop/telos.md
```

**Step 2: Sequential Agent Invocation**
1. Read the job posting (user provides or Job Sourcer finds)
2. Read CV master file: `/Users/gusta/Bewerbungen/cv-accelleron-dec25.html`
3. Read TELOS: `/Users/gusta/AI-Agent-HR-workshop/telos.md`
4. Invoke Communications Strategist → get positioning brief
5. Invoke HR Business Partner → get draft CV + cover letter
6. Invoke Writing Style Agent → get final polished documents
7. Write outputs to: `/Users/gusta/Bewerbungen/Agent-Setup-GU/[Company]_[Position]_[Date]/`

**Step 3: Quality Check**
- Verify all documents are complete
- Ensure CV uses insights from positioning brief
- Check cover letter incorporates CAR examples
- Confirm writing style is consistent

---

### FOR DIALOGUE MODE:

**Step 1: Preparation**
```bash
# Same as procedural
ls /Users/gusta/Bewerbungen/cv-accelleron-dec25.html
ls /Users/gusta/AI-Agent-HR-workshop/telos.md
```

**Step 2: Collaborative Exploration**
1. Read job posting, CV, and TELOS
2. Invoke Communications Strategist: Generate 2-3 positioning options
3. Invoke HR Business Partner: Assess trade-offs for each option
   - Option A: Bold, mission-driven, personality-forward
   - Option B: ATS-optimized, achievement-focused, safe
   - Option C: Balanced hybrid (if sensible)
4. **USER DECISION POINT:** Choose positioning direction
5. All agents refine collaboratively based on choice
6. Writing Style Agent harmonizes final output
7. Write outputs to destination folder

**Step 3: Iterative Refinement**
- Agents can question each other's suggestions
- User approves major directional shifts
- Multiple rounds if needed for strategic opportunities

---

## FILE OPERATIONS PROTOCOL

**CRITICAL:** Always read actual files, never assume content.

### Required Reads Before Any Agent Work:
1. **CV Master File:** Read `/Users/gusta/Bewerbungen/cv-accelleron-dec25.html`
   - Extract skills, experience, achievements
   - Identify quantifiable results (CAR components)

2. **TELOS Framework:** Read `/Users/gusta/AI-Agent-HR-workshop/telos.md`
   - Extract P# (Problems), M# (Mission), G# (Goals), C# (Challenges), S# (Strategies)
   - Use for positioning and strategic fit analysis

3. **Job Posting:** User provides or Job Sourcer retrieves
   - Parse requirements, responsibilities, company info
   - Identify keywords for ATS optimization

### Output File Structure:
```
/Users/gusta/Bewerbungen/Agent-Setup-GU/[Company]_[Position]_[Date]/
├── job-description.md          # Complete job posting
├── company-research.md         # Company intelligence
├── positioning-brief.md        # Communications Strategist output
├── tailored-cv.html           # Customized CV (based on master)
├── cover-letter.md            # Personalized cover letter
├── application-strategy.md    # HR Business Partner recommendations
├── final-polish-notes.md      # Writing Style Agent change log
└── tracking-notes.md          # Application tracking template
```

---

## RECOMMENDATIONS BY SCENARIO

### Scenario 1: Standard Corporate Role
**Example:** Project Manager at Siemens
- **Mode:** Procedural Handoff
- **Reasoning:** Clear requirements, established company, standard role
- **Expected Time:** 70 minutes

### Scenario 2: Startup Leadership Position
**Example:** Head of Product at early-stage AI startup
- **Mode:** Dialogue
- **Reasoning:** Multiple positioning angles possible, culture fit critical, high strategic value
- **Expected Time:** 2.5 hours

### Scenario 3: Career Pivot Role
**Example:** Transitioning from technical to communications project management
- **Mode:** Dialogue
- **Reasoning:** Need to explore how to position technical background for comms role
- **Expected Time:** 2 hours

### Scenario 4: Batch Application Process
**Example:** Applying to 5 similar positions at different companies
- **Mode:** Procedural Handoff (with initial dialogue session)
- **Reasoning:** Do one dialogue session to nail positioning, then use procedural for variations
- **Expected Time:** 1 dialogue session (2h) + 5 procedural runs (6h total)

---

## AGENT INTERACTION RULES

### For Procedural Mode:
- Agents DO NOT see each other's intermediate work
- Each agent reads only: (1) previous agent's final output, (2) source files
- No back-and-forth between agents
- User reviews only at the end

### For Dialogue Mode:
- Agents CAN see each other's reasoning
- Agents CAN challenge assumptions
- Agents MUST present trade-offs explicitly
- User participates in key decision points
- Iterate until consensus or user decision

---

## QUALITY ASSURANCE CHECKLIST

**Before finalizing any application:**

- [ ] CV tailored specifically to this job (not generic)
- [ ] Keywords from job posting naturally incorporated
- [ ] CAR method applied to all achievements
- [ ] Active voice throughout (no passive constructions)
- [ ] Quantifiable results included where possible
- [ ] Writing style matches TELOS (personal voice preserved)
- [ ] ATS-compatible formatting (HTML structure intact)
- [ ] Cover letter addresses company-specific insights
- [ ] Positioning aligns with TELOS Mission
- [ ] All files follow naming convention
- [ ] Folder structure complete

---

## USAGE EXAMPLES

### Example 1: Procedural Mode Invocation (Single Job)

```
User: "I found a Project Manager role at ABB. Use procedural mode."

Orchestrator:
1. ✓ Read job posting from user
2. ✓ Read /Users/gusta/Bewerbungen/cv-accelleron-dec25.html
3. ✓ Read /Users/gusta/AI-Agent-HR-workshop/telos.md
4. ✓ Check for duplicates (no existing ABB applications)
5. ✓ Invoke Communications Strategist (procedural)
   → Output: positioning-brief.md
6. ✓ Invoke HR Business Partner (procedural)
   → Output: tailored-cv.html, cover-letter.md
7. ✓ Invoke Writing Style Agent (procedural)
   → Output: final polished documents
8. ✓ Write to /Users/gusta/Bewerbungen/Agent-Setup-GU/ABB_Project-Manager_2025-12-04/
```

### Example 1b: Procedural Mode with Job Sourcing (Multiple Jobs)

```
User: "Find me relevant jobs and generate applications in procedural mode."

Orchestrator:
1. ✓ Read CV and TELOS
2. ✓ Invoke Job Sourcer → Returns 10 opportunities (ranked by relevance)
3. ✓ Present list to user: "Job Sourcer found 10 opportunities. Process all, select specific, or review?"
4. User: "Process top 5"
5. ✓ For each of 5 jobs:
   - Check for duplicates
   - Ask mode preference (or use procedural for all)
   - Invoke Communications Strategist → HR Business Partner → Writing Style Agent
   - Create folder with complete application materials
6. ✓ Summary: "Generated 5 applications, skipped 0 duplicates, 5 folders created"
```

### Example 2: Dialogue Mode Invocation

```
User: "I'm interested in a Communications Lead role at Kunsthaus Zürich. This is a dream opportunity. Use dialogue mode."

Orchestrator:
1. ✓ Read job posting
2. ✓ Read CV and TELOS
3. ✓ Invoke Communications Strategist → Generate 3 positioning options:

   Option A: "Cultural sector digital transformation specialist"
   - Emphasizes tech skills meeting arts world
   - Bold, differentiated
   - Risk: Might seem too tech-focused

   Option B: "Strategic communications professional with digital expertise"
   - Emphasizes comms experience, tech as bonus
   - Safe, ATS-friendly
   - Risk: Less distinctive

   Option C: "Hybrid innovator bridging tradition and technology in cultural spaces"
   - Balances both worlds
   - Moderate risk

4. → HR Business Partner weighs in on each option's ATS and interview implications
5. → User chooses Option C (balanced hybrid)
6. → Agents collaboratively develop materials based on chosen direction
7. → Writing Style Agent harmonizes
8. ✓ Output to destination folder
```

---

## MAINTENANCE & ITERATION

### After Each Application:
- Document what worked/what didn't
- Refine agent prompts if needed
- Update TELOS if career goals shift
- Track application outcomes

### Continuous Improvement:
- Monthly review of positioning effectiveness
- Quarterly TELOS refresh
- Agent prompt optimization based on feedback
- Template updates for new ATS trends

---

**Version:** 1.0
**Last Updated:** 2025-12-04
**Owner:** Güney Usta
