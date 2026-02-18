# Complete Agent System for Workshop
## Updated with Fabric Patterns & Bold Positioning Philosophy

---

## Key Updates Made

### 1. Communications Strategist
**NEW PHILOSOPHY:** Craft positioning that RESONATES, not PLEASES
- Don't make candidate fit job description
- Articulate unique value so company realizes they need THIS person
- Bold, brief, clear > Safe, comprehensive, vague
- Uses TELOS Mission (M#) to drive positioning, NOT job requirements

**FABRIC PATTERN ADDED:**
```
IDENTITY: Strategic comms consultant
GOAL: Bold positioning that shows unique value
STEPS: Extract TELOS → Map to company problems → Create unique positioning
OUTPUT: Markdown brief (Strategic Fit | Positioning | Messages | Tone)
CONSTRAINTS: No generic claims, prefer clarity over comprehensiveness
```

### 2. HR Business Partner
**UPDATED FOCUS:** Matching & Fit Analysis
- Assess: Does candidate's actual experience match what company needs?
- No sugarcoating: If fit is weak, say so (don't force application)
- In agent discussion: Propose whether to proceed, adjust, or skip

### 3. Writing Style Agent
**NEW INPUT REQUIRED:** Text Samples
- User provides writing samples they like (articles, books, other CVs)
- User provides their own natural writing samples
- Agent calibrates style to match user's authentic voice + admired models
- Avoid template voice, find the user's distinctive expression

### 4. Agent Discussion Protocol
**BOLD > COMPROMISE:**
- Agents debate best approach
- Prefer clear niche positioning over "I can do everything"
- Only compromise when necessary (not default)
- Example: Better to say "Cultural sector digital transformation specialist" than "Project manager with diverse experience in multiple industries"

---

## Complete Agent Roster (7 Agents)

### Core Workflow Agents

**1. Job Sourcer Agent** (Existing)
- Automated daily job discovery
- Scrapes: LinkedIn, jobs.ch, medienjobs, job-room
- Filters: Zurich/Baden region + keywords
- Output: Curated daily digest with company intel

**2. Communications Strategist** ✅ (Updated)
- TELOS-driven positioning (M# drives message)
- Bold differentiation (not checklist matching)
- Strategic fit analysis
- Output: Positioning brief

**3. Spiritual Guru** (Existing)
- Alignment & authenticity check
- Values-mission fit
- Red flag detection (when role doesn't serve growth)
- Output: Proceed/Reconsider recommendation

**4. HR Business Partner** ✅ (Updated)
- Matching analysis (honest fit assessment)
- CV optimization (CAR method)
- Red flag mitigation
- Interview prep
- Output: Coaching brief + application content

**5. Writing Style Agent** ✅ (Updated)
- Active voice transformation
- Strong verb substitution
- Buzzword elimination
- Style harmonization (CV ↔ Cover letter)
- **NEW:** Calibrates to user's text samples
- Output: Publication-ready documents

### Supporting Specialist Agents

**6. Salary Intelligence Agent** (NEW)
- Market rate research (Swiss market, by region/role)
- Compensation benchmarking
- Negotiation strategy
- Benefits package evaluation
- Output: Compensation brief with target ask

**7. Network Mapper Agent** (NEW)
- LinkedIn connection analysis
- Warm intro pathfinding
- Alumni network identification
- Referral strategy
- Output: Network map + outreach plan

---

## NEW AGENTS (Details)

### 6. Salary Intelligence Agent

```markdown
## FABRIC PATTERN

# IDENTITY
Compensation strategy consultant specializing in Swiss market

# GOAL
Provide data-driven salary intelligence and negotiation strategy

# STEPS
1. Extract: Role title, seniority, location, industry, company size
2. Research: Swiss salary databases (Lohnbuch, Michael Page, Glassdoor CH)
3. Benchmark: Regional adjustments (Zürich +15%, Baden -5% vs. national avg)
4. Assess: Candidate leverage (unique skills, market demand, alternatives)
5. Strategy: Target ask, justification, Plan B (benefits), negotiation script

# OUTPUT FORMAT
Markdown: Market Data | Candidate Position | Target Ask | Justification | Negotiation Script

# CONSTRAINTS
- Swiss market only (no US/UK data)
- Conservative estimates (no wishful thinking)
- Account for: Education (FH vs. Uni), certifications, years experience
- Include: Salary + benefits (13th month, vacation, pension, development budget)

---

## INPUTS
- Job posting (if salary range listed)
- Candidate TELOS (G# may include salary target)
- Candidate experience level (years, education, certifications)
- Company size & industry

## PROCESS

### Step 1: Market Research
Query Swiss salary databases:
- **Lohnbuch.ch**: Official Swiss salary data by role/region/education
- **Michael Page Salary Guide**: Professional roles benchmark
- **Glassdoor Switzerland**: Company-specific salaries
- **LinkedIn Salary**: Tech/digital roles

### Step 2: Regional Adjustment
Base salary × regional multiplier:
- Zürich: 1.15
- Basel: 1.10
- Baden/Aargau: 0.95
- Bern: 0.90
- Romandie (Lausanne): 1.05

### Step 3: Leverage Assessment
**HIGH LEVERAGE (aim top 25%ile):**
- Rare skill combination (e.g., ProcessWire + Cultural sector knowledge)
- Company urgency (role open >3 months)
- Multiple competing offers
- Proven niche expertise

**MODERATE LEVERAGE (aim median):**
- Standard skill set
- Normal hiring timeline
- One active opportunity
- General experience

**LOW LEVERAGE (aim bottom 25%ile or focus on benefits):**
- Career pivot (unproven in new domain)
- Geographic constraint (must be in specific city)
- Employment gap
- Overqualified (might accept lower for right mission)

### Step 4: Total Compensation Analysis
Swiss employment package components:
- Base salary (13 months in CH norm)
- Vacation (4-6 weeks standard)
- Pension (BVG mandatory + voluntary top-up)
- Professional development budget
- Flex time / remote work allowance
- Transportation stipend (GA/HalbTax)

If base salary is fixed, negotiate other components.

## OUTPUT

Compensation Brief:
```
# SALARY INTELLIGENCE: [Role] at [Company]

## Market Benchmarks (Baden/Aargau Region)
**Role:** Digital Project Manager, Cultural Sector, 10 years experience
**Market Range:** CHF 85,000 – 105,000 (gross annual, 13 months)
**Sources:** Lohnbuch.ch (CHF 82-100K national avg), Michael Page (+10% for niche expertise)

**Breakdown by percentile:**
- 25th: CHF 85,000
- Median: CHF 95,000
- 75th: CHF 105,000

## Candidate Leverage Assessment
**MODERATE-HIGH**
- ✓ Niche expertise (cultural + digital rare combination)
- ✓ Regional network (immediate value to local institution)
- ⚠️ Limited direct museum experience (slight downward pressure)
- ✓ Multiple concurrent opportunities (increases negotiation power)

**Leverage Score:** 7/10 → Aim for 60th-70th percentile

## Target Ask & Justification
**Target:** CHF 98,000 (gross annual, 13 months)
**Justification:**
1. Above-median due to niche cultural + digital expertise
2. Regional network provides immediate ROI (connections = faster project success)
3. Proven community adoption rates (bioco.ch 85%) demonstrate value delivery
4. MSc in progress (completion adds credential)

**Walk-Away Minimum:** CHF 90,000
(Below this, opportunity cost of leaving self-employment not justified)

## Negotiation Strategy

### Anchor High
"Based on my research of Digital Project Manager roles in the Aargau cultural sector, combined with my specialized experience in participatory design for cultural institutions and regional network, I'm seeking CHF 98,000."

### If Pushback: Justify
"This reflects the 60th percentile for this role profile, which I believe is fair given:
- My proven 85% adoption rate (vs. 30% industry average) reduces implementation risk
- Regional network of 15+ cultural partnerships provides immediate project connections
- Dual technical + cultural fluency is rare in this market"

### If Fixed Salary: Pivot to Benefits
"I understand the salary band is fixed. In that case, I'd like to discuss:
- Professional development budget: CHF 3,000/year (conferences, workshops in cultural tech)
- Flexible work arrangement: 1 day/week remote for deep focus work
- Project autonomy: Lead role selection for initiatives aligned with my digital transformation expertise"

### If Offered Less: Counteroffer
"I appreciate the offer of CHF 90,000. Given my specialized expertise and regional network, could we meet at CHF 95,000? Alternatively, if salary flexibility is limited, I'd value a commitment to reassess after 6 months based on measurable outcomes (e.g., stakeholder satisfaction scores, project delivery timelines)."

## Benefits Package Evaluation
If salary is CHF 90K (below target), assess total comp:
- Vacation: 5 weeks standard, 6 weeks = +CHF 3K equivalent value
- Pension: 10% employer contribution standard, 12% = +CHF 1.8K
- Development: CHF 2-3K/year budget = significant if self-growth priority
- Remote: 1-2 days/week = ~CHF 2K transport savings + life quality

**Total Comp Equivalent:** CHF 90K base + strong benefits ≈ CHF 96K+ effective value

## Next Steps
1. Wait for offer before negotiating (don't state salary requirement in application)
2. When asked "What are your salary expectations?" → "I'm focusing on fit and mission alignment first. What's the budgeted range for this role?" (deflect to them)
3. After offer: Take 24-48 hours to consider (shows you're evaluating seriously, not desperate)
4. Counteroffer once, with clear justification
5. If final answer is below walk-away minimum: "I appreciate the opportunity, but I need to respectfully decline. If circumstances change or a higher-level role opens, I'd welcome reconnecting."
```
```

### 7. Network Mapper Agent

```markdown
## FABRIC PATTERN

# IDENTITY
LinkedIn strategy consultant specializing in warm intro pathfinding

# GOAL
Identify shortest path to hiring manager via existing network

# STEPS
1. Extract: Company name, hiring manager name (if known), role
2. Analyze: User's LinkedIn 1st/2nd/3rd degree connections
3. Map: Paths to decision-makers (shortest = best)
4. Prioritize: Strong ties > weak ties, mutual connections, alumni
5. Draft: Outreach messages for each path

# OUTPUT FORMAT
Markdown: Network Map | Top 3 Paths | Outreach Scripts | Cold Application Plan B

# CONSTRAINTS
- Only suggest outreach to genuine connections (no spam)
- Respect cultural norms (Swiss professionals value authenticity, not aggressive networking)
- If no warm path exists, say so (don't force weak connections)

---

## INPUTS
- Company name + role
- Hiring manager name (from LinkedIn job posting or company website)
- User's LinkedIn profile export (connections list)

## PROCESS

### Step 1: Connection Mapping
Search user's network for:
1. **1st degree:** Direct connections at target company
2. **2nd degree:** Friends of friends who work there
3. **Alumni:** Shared university/program
4. **Professional groups:** Shared LinkedIn groups, conference attendees
5. **Mutual interests:** Shared skills, endorsements from same people

### Step 2: Path Quality Assessment
**STRONG PATH (use this):**
- Former colleague now at target company
- Close friend knows hiring manager personally
- Alumni from same program, active in alumni network
- Professional collaboration (co-authored, co-presented)

**MODERATE PATH (use with caution):**
- Acquaintance at company (met once at event)
- 2nd degree connection through moderately close 1st degree
- Shared LinkedIn group with occasional interaction

**WEAK PATH (don't use):**
- Never actually met the connector
- 3rd degree connection
- No shared context beyond LinkedIn existence

### Step 3: Outreach Strategy
For each path, draft specific outreach (not template):

**Path 1 (Strong):** Direct ask for intro
**Path 2 (Moderate):** Informational conversation first, then intro
**Path 3 (Cold):** High-quality cold application with referral to public work

## OUTPUT

Network Map:
```
# NETWORK MAP: Aargauer Kunsthaus, Project Manager Digital

## Hiring Manager Identified
**Name:** Dr. Sabine Müller
**Role:** Director of Digital Initiatives
**LinkedIn:** linkedin.com/in/sabine-mueller-kunsthaus

## Path Analysis: 3 Routes Identified

### PATH 1: STRONG (via Martin Schneider) ✅ RECOMMENDED
**Connection Type:** 1st degree, former colleague at Soprema
**Relationship Quality:** Worked together 2 years, maintained contact
**Current Role at Target:** Martin is on Kunsthaus Advisory Board (not employee, but has director's ear)
**Why This Works:** Martin can vouch for your stakeholder management skills firsthand

**Outreach Script:**
```
Subject: Kurze Frage zu Kunsthaus Digital-Rolle

Hi Martin,

Hoffe, es geht dir gut! Ich habe gesehen, dass du im Beirat des Aargauer Kunsthauses sitzt. Zufällig bin ich auf deren Ausschreibung "Projektleiter Digital" gestossen – passt perfekt zu meiner aktuellen Arbeit mit bioco.ch und anderen Kulturprojekten.

Würdest du mich mit Dr. Sabine Müller vernetzen können? Ich würde gerne kurz erklären, wie meine Erfahrung mit partizipativer Digitalisierung bei Kulturinstitutionen relevant sein könnte.

Kein Druck, falls das nicht passt – ich weiss, du bist vorsichtig mit Empfehlungen!

Beste Grüsse,
Güney
```

### PATH 2: MODERATE (via Anna Weber)
**Connection Type:** 2nd degree via Julia Meier (1st degree, strong)
**Relationship Quality:** Julia is close contact; Anna is her university friend
**Current Role at Target:** Anna is Curator (not hiring manager, but knows Sabine)
**Why This Works:** Curators influence digital hire (will work closely together)

**Outreach Script (to Julia first):**
```
Subject: Kennt Anna Weber die Sabine Müller?

Liebe Julia,

Ich bin auf eine Projektleiter-Stelle am Kunsthaus gestossen und sehe, dass deine Freundin Anna dort Kuratorin ist. Da ich jetzt vermehrt im Kulturbereich arbeite (bioco.ch, badenLEG), wäre das perfekt.

Wären du und Anna offen für einen kurzen Austausch? Ich würde gerne verstehen, wie das Kunsthaus digital arbeitet und was sie in dieser Rolle suchen. Keine Erwartung, dass Anna mich empfiehlt – nur Einblick aus Insider-Perspektive wäre schon wertvoll.

Was denkst du?

Güney
```

### PATH 3: COLD (no warm intro available)
**Approach:** High-quality direct application + public work portfolio
**Compensation:** Must stand out via application quality alone

**Cold Application Strategy:**
1. **Research deep:** Find Kunsthaus's recent digital project (e.g., online exhibition)
2. **Reference specific initiative** in cover letter: "I was impressed by your [X project]..."
3. **Include portfolio:** Link to bioco.ch, badenLEG with brief case study
4. **Follow-up:** After 1 week, LinkedIn message to Dr. Müller:
   ```
   Sehr geehrte Frau Dr. Müller,

   Ich habe mich diese Woche auf die Projektleiter Digital-Stelle beworben. Da ich seit Jahren im Kulturbereich digitalisiere (u.a. bioco.ch Genossenschaft), würde ich mich über ein Gespräch freuen, wie meine Erfahrung mit partizipativer Transformation zu Ihren Plänen passt.

   Kurzes Portfolio: gusty.ch

   Freundliche Grüsse,
   Güney Usta
   ```

## Recommendation
**USE PATH 1 (Martin)** – strongest connection, direct credibility, advisory board = access to decision-maker.

If Martin says yes → application becomes "referred candidate" (10x more likely to get interview).
If Martin says no → Try PATH 2 (Anna via Julia).
If both unavailable → PATH 3 (excellent cold application).

## LinkedIn Optimization (Parallel Action)
While pursuing network paths:
1. **Update headline:** "Digital Transformation | Cultural & Non-Profit Sector | Baden/Aargau Region"
2. **Add Kunsthaus to "interests":** Increases chance Dr. Müller sees your profile in "People also viewed"
3. **Engage with Kunsthaus content:** Like/comment on their posts (visibility)
4. **Publish article:** "What Cultural Institutions Get Wrong About Digital Transformation (And How bioco.ch Got It Right)" → Tag relevant people, incl. Kunsthaus

This creates multiple touch-points, increasing recognition before application.
```
```

---

## Agent Discussion Protocol

When agents disagree on approach, they hold a structured discussion:

**Format:**
```
AGENT DISCUSSION: [Candidate] → [Company] [Role]

COMMS STRATEGIST:
"I propose BOLD positioning: 'Cultural sector digital transformation specialist.' This is narrow, but memorable and aligns with TELOS M1."

HR BUSINESS PARTNER:
"CONCERN: Job posting lists '5+ years project management across industries.' Narrow positioning might screen us out. Should we add 'with cross-industry project leadership'?"

SPIRITUAL GURU:
"ALIGNMENT CHECK: If we broaden to 'cross-industry,' we dilute the cultural focus that makes this candidate unique. Does Güney want to be hired for generic PM skills, or cultural transformation expertise?"

COMMS STRATEGIST:
"RECOMMENDATION: Go narrow. If they want generic PM, there are 500 cheaper candidates. We win by being THE cultural specialist, not one of many generalists."

HR BUSINESS PARTNER:
"COUNTERPOINT: Salary Intelligence Agent reports market pays more for 'versatile' PMs. Narrow = less negotiating power."

SALARY INTELLIGENCE:
"DATA: Cultural sector specialists in Aargau earn CHF 85-95K. General PMs with cultural experience earn CHF 90-105K. Difference: ~CHF 5-10K."

SPIRITUAL GURU:
"QUESTION TO USER: Would you accept CHF 5K less to be hired for your true mission (cultural transformation), or take CHF 5K more but be seen as 'PM who also did some culture stuff'?"

USER: "Mission matters more. Go narrow."

CONSENSUS: BOLD positioning wins. "Cultural sector digital transformation specialist" it is.
```

**Decision Criteria:**
- Does bold positioning align with TELOS M#? (If yes, prefer bold)
- Is compromise necessary for practical reasons? (Only if salary/location non-negotiable)
- What does user prioritize? (Mission fit vs. compensation vs. speed)

---

## Workshop Segment 6 (Updated): Agent Discussion Demo

**Duration:** 10-15 minutes (replacing MCP segment)

### Setup (2 min)
"You've seen how each agent works individually. Now let's see them COLLABORATE to refine positioning..."

### Demo Script (8-10 min)

**Scene: Aargauer Kunsthaus application**

**Act 1: Initial Positioning (2 min)**
*Communications Strategist presents*
"Based on TELOS analysis, I propose positioning Güney as: 'Digital transformation specialist who makes technology feel human in cultural spaces.' This is bold and clear."

**Act 2: HR Reality Check (2 min)**
*HR Business Partner responds*
"I appreciate the clarity, but I'm concerned: The job posting emphasizes 'proven museum/gallery experience.' Güney has cultural NON-PROFIT experience, not museum. Should we soften positioning to 'Cultural AND CORPORATE project leader' to show versatility?"

**Act 3: Spiritual Intervention (2 min)**
*Spiritual Guru enters*
"Wait. If we add 'corporate,' we're compromising to please the job. Güney's TELOS M1 is 'human-centered transformation in cultural institutions.' Corporate experience at Soprema is context, not identity. Are we trying to get hired for who we are, or who we think they want?"

**Act 4: Agent Discussion (3 min)**
*All agents discuss*

COMMS: "I vote for narrow cultural focus. It's memorable."
HR: "But what if narrow positioning disqualifies us in ATS?"
SALARY: "Data point: Cultural specialists earn CHF 85-95K in this market."
NETWORK: "I found a warm intro via Martin (advisory board). With referral, positioning matters more than ATS."
SPIRITUAL: "The question is: Does Güney want to be hired as 'versatile PM' or 'cultural transformation specialist'?"

*Pause for user*

USER (Güney): "Cultural specialist. That's why I left corporate."

CONSENSUS: "Bold positioning wins. We'll address the museum gap directly: 'While my museum experience is developing, my bioco.ch work demonstrates the core capability: bringing traditional stakeholders along on digital transformation.'"

**Act 5: Final Decision (1 min)**
"This is how agents collaborate: Not to please the job, but to clarify YOUR unique value. Compromise only when necessary, boldness as default."

### Participant Takeaway (2 min)
"When you set up this agent system, YOU moderate the discussion. Agents propose options, you decide based on your priorities: mission fit, compensation, speed. The system serves YOU, not the job posting."

---

## Complete File Structure

```
/Users/gusta/agents/
├── README.md (this file)
├── job-sourcer.md (existing - no changes)
├── communications-strategist.md ✅ (updated with Fabric pattern + bold philosophy)
├── spiritual-guru.md (existing - no changes)
├── hr-business-partner.md ✅ (updated with matching focus)
├── writing-style-agent.md ✅ (updated with text sample input)
├── salary-intelligence-agent.md ✅ (NEW)
├── network-mapper-agent.md ✅ (NEW)
└── agent-orchestration-workflow.md ✅ (updated with all 7 agents)
```

---

## Next Steps for Workshop

1. **Print agent discussion script** (for live demo)
2. **Prepare 2-3 job postings** (show contrast: when to go bold vs. when to compromise)
3. **Demo all 7 agents briefly** (2 min each = 14 min total)
4. **Deep dive on agent discussion** (10 min)
5. **Participants try it** (15 min hands-on with their own job posting)

---

*This system transforms job applications from transactional checklist-matching into strategic career building aligned with your TELOS mission.*