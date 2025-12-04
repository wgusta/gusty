'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import DangerCard from '@/components/DangerCard';
import ProjectModal from '@/components/ProjectModal';
import { RichContent, VideoEmbed, CodeSnippet } from '@/components/ProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged' | 'danger';
  finalizedAt: string; // ISO date string
  designContent?: React.ReactNode | string;
  aiContent?: React.ReactNode | string;
  status?: 'live' | 'development' | 'archived';
  liveUrl?: string;
  downloadUrl?: string;
  techStack?: { [category: string]: string[] };
}

// Project data
const projects: Project[] = [
  // BadenLEG Platform - Bridged Project
  {
    id: 'badenleg',
    title: 'Matchmaking-Plattform for Local Energy Communities (LEG)',
    description: 'Matchmaking for local energy communities - A web platform that helps homeowners in Baden (Switzerland) find neighbors to form Local Electricity Communities (LEG) starting in 2026.',
    tags: ['Flask', 'SendGrid', 'TailwindCSS', 'Leaflet.js', 'Vanilla JavaScript', 'Railway', 'GitHub Actions', 'Gunicorn'],
    column: 'bridged',
    finalizedAt: '2024-11-14',
    status: 'live',
    liveUrl: 'https://badenleg.ch',
    designContent: `## Human-Made

### Concept & Architecture

**Product Concept and User Flow**

BadenLEG connects homeowners who want to share solar energy together. Users enter their address, the system finds suitable neighbors nearby and enables direct contact, all with a focus on privacy and anonymity.

**System Architecture**

- Flask app with clear API structure
- In-memory database for MVP
- Multi-layer security approach
- GDPR-compliant privacy design

**Security Concept**

- Input Validation & Sanitization (bleach)
- Rate Limiting (Flask-Limiter)
- Security Headers (CSP, HSTS, X-Frame-Options)
- Token-based email verification
- Coordinate anonymization (120m radius)

### Design & UX

**UI/UX Design**

- TailwindCSS for fast, consistent styling
- Mobile-first responsive layout
- Interactive map integration with Leaflet.js
- Typography & branding in Baden city colors

**Core Features**

- Address-based matching with ML clustering
- Interactive map with anonymized locations (120m jitter)
- Automatic email notifications for new interested parties
- Educational content about LEG, EVL/vEVL and ZEV/vZEV
- GDPR-compliant with one-click unsubscribe

### Development

**Code Architecture**

- Clear structure and modularization
- API endpoint design
- Email templates and logic
- Error handling & logging

**Deployment**

- Railway setup & configuration
- GitHub Actions workflow for CI/CD
- DNS configuration (Infomaniak)
- SendGrid domain authentication

---

## Challenges

### Email Delivery Optimization

**Challenge:** Emails from badenleg.ch were blocked.

**Solution:** Configured SendGrid domain authentication with SPF, DKIM, DMARC records for reliable email delivery.

### Mobile User Experience

**Challenge:** Map overlapped with input fields.

**Solution:** Optimized mobile layout by hiding map on mobile devices, implementing full-screen input panel and centered logo for better usability.`,
    aiContent: `## AI-Assisted Development

### Code Generation

**Flask Endpoints and API Logic**

AI assistance in developing Flask endpoints and API logic for fast iteration and consistent patterns.

**Frontend JavaScript**

- Address autocomplete functionality
- Map integration with Leaflet.js
- Vanilla JavaScript without frameworks for direct DOM manipulation

**Security Utilities**

- Input validation implementation (bleach)
- Sanitization functions
- Email functions (SendGrid integration)

### Optimizations

**Performance Optimizations**

- Caching strategies for repeated requests
- Async tasks for background processing (email sending)
- Code refactoring and modularization

**Bug Fixes**

- Token persistence on Railway
- Duplicate detection in registrations
- Timeout issues with external API calls

### Documentation

- README.md and deployment guides
- SEO content (meta tags, structured data)
- Privacy policy & legal notice

### Debugging

- Error analysis (timeout problems, token issues)
- Log analysis and troubleshooting
- Performance profiling

---

## ML Functions

### DBSCAN Clustering

Groups buildings by geographic proximity (150m radius) and uses Haversine distance for earth curvature. Identifies optimal community formation with minimum size of 2-3 buildings per cluster.

### Autarky Simulation

Generates 15-minute time series profiles for consumption and PV production, simulates seasonal variations (summer/winter) and calculates autarky score for optimal match quality.

### Ranking

Clusters are sorted by autarky score - highest autarky = best match quality. Results are visualized in real-time on the map.

---

## Challenges

### Persistent Token Management

**Challenge:** Railway deletes the filesystem on every deployment. Tokens in separate JSON files were lost.

**Solution:** Store tokens directly in main database records for reliable persistence.

\`\`\`python
def issue_verification_token(building_id):
    """Creates a verification token and stores it in the DB record."""
    token = str(uuid.uuid4())
    
    # Invalidate old tokens for this building_id
    tokens_to_remove = [
        t for t, info in DB_VERIFICATION_TOKENS.items()
        if info.get('building_id') == building_id
    ]
    for t in tokens_to_remove:
        DB_VERIFICATION_TOKENS.pop(t, None)
    
    # Store token in main database record (persistent!)
    with db_lock:
        record, source = _get_record_for_building_no_lock(building_id)
        if record:
            record['verification_token'] = token  # Directly in record
            if source == 'registered':
                DB_BUILDINGS[building_id] = record
            elif source == 'anonymous':
                DB_INTEREST_POOL[building_id] = record
    
    DB_VERIFICATION_TOKENS[token] = {
        'building_id': building_id,
        'created_at': time.time()
    }
    return token
\`\`\`

### Fast Response Endpoint

**Challenge:** After address input, timeouts occurred due to slow external API calls and intensive ML calculations.

**Solution:** Implemented fast endpoint with pre-fetched coordinates, background threading and deterministic mock data for instant responses.

\`\`\`python
@app.route("/api/check_potential_fast", methods=['POST'])
def api_check_potential_fast():
    """Ultra-fast endpoint: Uses pre-fetched coordinates, no external APIs."""
    if not request.json:
        return jsonify({"error": "No data."}), 400
    
    # Directly from autocomplete suggestion (already geocoded!)
    lat = request.json.get('lat')
    lon = request.json.get('lon')
    
    if not lat or not lon:
        return jsonify({"error": "Coordinates missing."}), 400
    
    # Generate deterministic profile (no external API calls!)
    profile = generate_quick_profile(lat, lon, address_string)
    
    # Fast distance search (no autarky calculation)
    provisional_matches = find_provisional_matches_fast(profile)
    
    # Email sending in background thread (does not block!)
    if provisional_matches:
        threading.Thread(
            target=send_confirmation_email,
            args=(email, unsubscribe_url),
            daemon=True
        ).start()
    
    return jsonify({"match": provisional_matches})
\`\`\``
  },
  // User Story Map - AI-Assisted Project
  {
    id: 'user-story-map',
    title: 'User Story Map Tool',
    description: 'A standalone HTML tool for creating and managing User Story Maps in workshops. Built with vanilla JavaScript, no external dependencies.',
    tags: ['HTML', 'CSS', 'Vanilla JavaScript', 'localStorage', 'CSV Export'],
    column: 'ai',
    finalizedAt: '2024-12-01',
    downloadUrl: '/workshop-map11.html',
    aiContent: `## Overview

The process began with the idea of building one HTML tool that combined a Customer Journey Map and a User Story Map. It seemed efficient, but it introduced complexity very early. Two different conceptual models inside one file created maintenance issues, made debugging harder and slowed down iteration.

## How the Work Happened

### Initial build

The first version placed both maps in a single HTML document with shared data structures and shared export and import functions. At this stage the separation between the two tools was loose and grew tangled as more features were added.

### Shift in scope

During the iterations it became clear that the Customer Journey part did not add real value for the intended workshop workflow. The scope shifted toward focusing entirely on the User Story Map. This decision simplified the purpose but required removing many interconnected parts. Because both maps had shared logic, deleting the Customer Journey elements revealed hidden dependencies that affected data handling.

### Refactoring on a moving target

The Customer Journey components were removed, the UI was simplified and the export and import logic was reconnected to work exclusively with the User Story Map. Several remnants from the previous structure remained, including naming conventions and selectors that still pointed to the old model, which caused imported data to land in incorrect positions.

### Usability refinements

After the structural cleanup, the tool received refinements such as direct editing after double clicking, automatic text selection, safe deletion prompts for rows and columns and a fresh title field for project naming. These refinements required additional internal adjustments.

## Where the Process Got Messy

### No fixed data model at the beginning

A clear definition of rows, columns, cards and the corresponding CSV or JSON schema was never locked down at the start. Without a stable contract, the import and export system remained fragile and prone to unexpected behavior.

### Scope changes caused structural stress

Switching from a combined tool to a pure User Story Map meant removing code that was deeply interlinked with the original logic. This triggered cascading adjustments.

### Export and import validated too late

Most early attention went to the interface rather than the data pipeline. When export and import were finally tested in a realistic scenario, the issues surfaced late and required larger rewrites.

## What Still Worked Well

### Testing with real data

Using real CSV files exposed flaws early enough to avoid major issues at the end of the development cycle.

### Precise feedback loops

The process benefited from clear and unambiguous observations about what worked and what did not, which accelerated iteration.

### Scope reduction improved clarity

Removing the Customer Journey Map sharpened the focus and allowed a cleaner, more maintainable structure.

## How to Handle This Better Next Time

### Define the data model before coding

A JSON example and CSV schema should be created first. Each row, column and card needs explicit fields. This serves as a stable contract that guides all logic.

### Start with a tiny MVP

Only the User Story Map. Rows, columns, cards and export and import. Nothing more.

### Introduce usability later

After the data model is stable, editing behavior, styling and safety confirmations can be layered on top.

### Separate logic from interface

Data handling functions and UI rendering should be clearly separated. This prevents structural changes from affecting the entire codebase.

---

**Download the tool:** [workshop-map11.html](/workshop-map11.html) - A standalone HTML file that works offline, saves to localStorage, and exports to CSV. You can download it and use it directly in your browser without any setup.

The tool is available for download above and can be used immediately in any modern browser. Download the HTML file to get started with your User Story Map workshops.

**Get the tool:** The complete User Story Map tool is ready for download. Simply click the download button above or use this link: [workshop-map11.html](/workshop-map11.html). The file works completely offline and requires no installation or external dependencies.

**Ready to use:** Download the HTML file and open it in any modern browser to start creating User Story Maps in your workshops. All data is saved locally in your browser's localStorage, and you can export your maps to CSV format at any time.`
  },
  // ATS Templates - AI-Assisted Project
  {
    id: 'ats-templates',
    title: 'CV and Cover Letter Templates for ATS Survival',
    description: 'HTML templates designed to pass AI-based filters and ATS parsers while maintaining visual appeal for human reviewers. Built with semantic HTML and CSS print stylesheets.',
    tags: ['HTML', 'CSS', 'Print Stylesheets', 'Google Fonts', 'ATS-Optimized'],
    column: 'ai',
    finalizedAt: '2024-12-03',
    aiContent: `## Why HTML Templates?

The hard reality: Your most beautiful design never gets seen by a human if the ATS filters you out first. Over 60% of Swiss companies use ATS systems, and 52% of applicants never receive a response.

### The HTML → PDF Strategy

**Why HTML wins:**

- **ATS-safe:** Semantic HTML with clear structure (\`<section>\`, \`<article>\`, \`<h1-h6>\`)
- **AI-friendly:** Structure is clearly recognizable for AI agents to process
- **Design flexibility:** Full CSS control for styling
- **Print-ready:** Generate PDF via browser print (Cmd/Ctrl+P → Save as PDF)
- **Single source:** One HTML file = source for everything
- **No vendor lock-in:** W3C standards, works everywhere

**One format, three outputs:** HTML (for AI editing), PDF (for human reviewers), Plain-text extraction (for ATS parsing)

### ATS Rules Built Into Templates

These templates follow the core ATS compatibility rules:

- Standard fonts (Inter, Manrope - similar to Arial/Calibri, 10-12pt)
- Standard section headings ("Berufserfahrung", "Kontakt", "Skills")
- No complex tables or multi-column layouts that confuse parsers
- Keywords flow naturally in context
- Hard skills explicitly listed and visible

---

## How to Use the Templates

### Step 1: Download a Template

Choose the template that fits your needs:

- **[1-Column CV](/templates/cv-template-1column.html)** - Maximum ATS compatibility, clean single-column layout
- **[Bubbles CV](/templates/cv-template-bubbles.html)** - Visual skills with tag-style bubble display
- **[Hybrid CV](/templates/cv-template-hybrid.html)** - Two-column balance of design and readability
- **[Minimalist CV](/templates/cv-template-minimalist.html)** - Pure ATS optimization, no frills
- **[Minimalist + Picture](/templates/cv-template-minimalist-with-picture.html)** - ATS-safe with photo option
- **[Cover Letter](/templates/coverletter-template.html)** - Matching style with signature placeholder

### Step 2: Set Up Your Application Folder

**Important:** Create a new folder for each job application. Copy the template files into this folder along with your images. This keeps everything organized and ensures the HTML files can find your images.

**Profile Photo (CV templates with picture):**
- Save your photo as \`cvpicture.jpg\` in the same folder as the HTML file
- Recommended size: 200×267 pixels (portrait orientation)
- The templates reference: \`<img src="cvpicture.jpg" ...>\`

**Signature (Cover Letter):**
- Save your signature as \`signature.jpg\` in the same folder as the HTML file
- Recommended height: ~45 pixels
- The template references: \`<img src="signature.jpg" ...>\`

**Why same folder?** HTML files load images relative to their location. If the images aren't in the same folder, they won't display.

### Step 3: Edit the Content

Open the HTML file in any text editor or IDE:

1. Replace placeholder text \`[Full Name]\`, \`[Your Address]\`, etc.
2. Fill in your work experience using the CAR method (Context-Action-Result)
3. Update skills, education, and other sections
4. Customize colors by editing CSS variables in the \`:root\` section

### Step 4: Generate PDF

1. Open the HTML file in any modern browser (Chrome, Firefox, Safari)
2. Press **Cmd+P** (Mac) or **Ctrl+P** (Windows)
3. Select "Save as PDF" as the destination
4. The print stylesheet will automatically optimize the layout for PDF

---

## File Structure

Create a new folder for each application. Keep all files together:

\`\`\`
company-name-application/
├── cv.html          (your chosen CV template)
├── coverletter.html (cover letter template)
├── cvpicture.jpg    (your photo, 200×267px)
└── signature.jpg    (your signature, ~45px height)
\`\`\`

**Tip:** Name folders by company (e.g., \`swisscom-2024/\`, \`migros-pm-role/\`) to stay organized across multiple applications.

---

## TELOS Framework: Your Personal Context for AI

Before using AI to help with your CV, create a TELOS document. This is your strategic briefing TO the AI - it helps agents understand your story and write coherently about you.

**What is TELOS?**
- **H - History:** Your most important projects and roles with measurable results
- **P - Problems:** What professional problems do you solve?
- **M - Mission:** Your professional purpose in one sentence
- **G - Goals:** Concrete career goals for 6-12 months
- **C - Challenges:** Current obstacles you're facing

### Example TELOS Document

\`\`\`markdown
# My TELOS - Job Search Context

## H - History (Key Projects & Roles)
H1: Led website redesign for retail company, 85% user adoption rate
H2: Managed digital transformation project, CHF 2M budget, 18 months
H3: Built customer portal from scratch, reduced support tickets by 40%
H4: Introduced agile methodology to marketing team of 12 people

## P - Problems I Solve
P1: Traditional companies struggle to adopt digital tools effectively
P2: Technical talent is undervalued in non-tech industries
P3: Digital projects fail due to poor stakeholder communication

## M - Mission
M1: Bridge the gap between digital innovation and established industries

## G - Goals (6-12 Months)
G1: Project lead role in digital transformation by Q2 2025
G2: Focus on cultural or non-profit sector
G3: Team leadership responsibility (5-10 people)

## C - Challenges
C1: ATS systems filter out creative CVs before humans see them
C2: Switching from agency to in-house role
C3: Demonstrating leadership without formal management title
\`\`\`

**Privacy note:** TELOS is your internal context for AI agents. It helps them write better, but the content does NOT go to employers. Only what appears in your final CV/cover letter is shared.

---

## AI Agent Prompts

Use these prompts with ChatGPT, Claude, or Gemini to optimize your application materials. Copy and paste them directly.

### Agent 1: Communications Strategist

Creates your unique positioning for each application.

\`\`\`
IDENTITY: Strategic communications consultant
GOAL: Bold positioning that makes companies think "we need THIS person"
INPUT: My TELOS document + job posting + my experience

STEPS:
1. Map my problems (P#) to company problems in the job posting
2. Create positioning: Who I am + my approach (M#) + expected impact
3. Test: Could this positioning apply to 100 other candidates? If yes, reject and make it more specific

OUTPUT: Positioning brief with 3 key messages I should emphasize
\`\`\`

### Agent 2: HR Business Partner

Optimizes your CV content for ATS and recruiter scanning.

\`\`\`
IDENTITY: HR Partner with recruiter insight and career coaching experience
GOAL: Honest fit assessment + ATS optimization
INPUT: Positioning brief + my current CV + job posting

STEPS:
1. Assess fit percentage (if <60%, recommend skipping this job)
2. Rewrite achievements using CAR method: Context-Action-Result with metrics
3. Optimize for 6-second recruiter scan: most important info visible first

OUTPUT: Draft CV content + interview preparation points
\`\`\`

### Agent 3: Writing Style Editor

Polishes your text to be active, clear, and authentic.

\`\`\`
IDENTITY: Expert editor for German (DE-CH) and English (EN-CH) professional writing
GOAL: Transform good text into exceptional prose
INPUT: Draft CV or cover letter + samples of my own writing style

STEPS:
1. Calibrate: Analyze my natural voice from writing samples
2. Transform: Change passive voice to active ("Was responsible for" → "Led")
3. Eliminate buzzwords and corporate jargon
4. Ensure Swiss German conventions (ss vs ß, specific terminology)

OUTPUT: Final polished text + change log explaining improvements
\`\`\`

### Agent 4: ATS Keyword Optimizer

Ensures your CV passes automated filters.

\`\`\`
IDENTITY: ATS specialist who understands how parsing systems work
GOAL: Maximize keyword match rate without keyword stuffing
INPUT: Job posting + my CV draft

STEPS:
1. Extract required skills and keywords from job posting
2. Identify which keywords are missing from my CV
3. Suggest natural places to add missing keywords
4. Check section headings match ATS expectations (Berufserfahrung, Skills, Ausbildung)

OUTPUT: Keyword gap analysis + specific suggestions for placement
\`\`\`

---

## The Complete Workflow

**Total time: ~60-90 minutes per application (vs. 3-4 hours traditional)**

1. **Prepare TELOS** (one-time, update periodically) - 30 min
2. **Run Communications Strategist** with job posting - 15 min
3. **Run HR Business Partner** to optimize CV - 20 min
4. **Run Writing Style Editor** for polish - 15 min
5. **Run ATS Optimizer** for final check - 10 min
6. **Fill in HTML template** with optimized content - 15 min
7. **Generate PDF** via browser print - 2 min

---

## The CAR Method for Achievements

When writing your experience, use CAR (Context-Action-Result) with metrics:

**Bad:** "Responsible for website management"

**Good (CAR):**
- **Context:** Legacy website with 5-second load times losing mobile users
- **Action:** Led complete redesign with new CMS and CDN implementation
- **Result:** 85% faster load times, 40% increase in mobile engagement

\`\`\`
Template for each bullet point:
[Action verb] + [what you did] + [measurable result]

Examples:
- Led migration to cloud infrastructure, reducing hosting costs by 35%
- Introduced automated testing, decreasing bug reports by 60%
- Managed team of 8 across 3 time zones for global product launch
\`\`\`

---

## Which AI Platform to Use?

**ChatGPT** - Best for speed
- Quick cover letter variations
- Fast iterations
- Custom GPTs for repeated tasks

**Claude** - Best for complexity
- Long CVs (handles 200k tokens)
- Multi-step analysis
- Complex restructuring

**Gemini** - Best for data
- Skills gap analysis
- Salary benchmarking
- Quantitative comparisons

**Pro tip:** Use the right tool for the job, not your favorite tool.

---

## Template Features

**All templates include:**
- CSS variables for easy color customization
- Print-optimized stylesheets (@media print)
- Google Fonts (Inter, Manrope) loaded via CDN
- Responsive design for screen viewing
- Semantic HTML structure for ATS parsing
- Dark background for screen viewing, white for print

**Fonts load automatically** - no installation needed. If you work offline, the browser will fall back to system fonts.

---

## Why This Approach Works

The traditional approach fails because:
- Design elements (icons, graphics, columns) become garbage text when parsed
- 64% admin reduction through ATS means robots decide who gets through
- Beautiful PDFs from design tools often have terrible ATS parsing

**The strategy:** First outsmart the machine, then impress the humans. These templates do both - clean structure for ATS, professional design for recruiters.`
  },
  // Design Projects (6)
  {
    id: 'penpot-design-system',
    title: 'Design System Freedom: Hand-Built in Penpot',
    description: 'A complete, hand-crafted design system built from scratch in Penpot—breaking free from corporate templates and CMS constraints.',
    tags: ['Design System', 'Penpot', 'Tokens', 'Components', 'Open Source'],
    column: 'design',
    finalizedAt: '2024-12-01',
    designContent: `## Motivation

In most of my previous work, I was tied to strict corporate design guidelines or limited by CMS templates. I could rarely test visual ideas freely or build components the way I wanted.

I wanted the opposite:

A design system that I control, that I can reuse across multiple projects, and where I can visually test components without restrictions.

I also wanted a real open-source alternative to Figma. In practice, there is only one option mature enough for daily work: Penpot.

So I built my own system directly in Penpot, completely by hand.

## What I Actually Did

### 1. Built a Complete Token Foundation

I set up all core tokens from scratch:

**Color tokens:** brand, neutrals, utilities

**Typography tokens:** headings, body, caption

**Spacing tokens:** 4 and 8-point scale

**Radius tokens:** three consistent corner styles

**Shadow tokens:** four levels

**Icon size tokens:** XS to XL

I grouped everything using clear naming so it's stable and scalable.

### 2. Structured Everything into Sets and Themes

I created:

**Sets** (Colors, Radius, Shadows, Typography, Spacing)

**Themes** that switch the entire system's visual tone

**Examples:**

- Bento Theme (rounded radii, soft shadows)
- Neutral Theme (clean, classic system look)
- Bold Theme (stronger contrast, harder edges)

All built manually, no imported UI kits.

### 3. Created Core Components by Hand

I designed every component from scratch, including alignment, constraints, and variants.

**Layout Components**

- Frame grids
- Card
- Card grid
- Section header
- Navigation
- Tabs (3 variants)
- Accordion
- Basic header
- Mobile navigation (bottom bar and drawer)

**Forms**

- Input field
- Textarea
- Select field
- Form row (label + input)

**UI Elements**

- Buttons (primary, secondary, ghost)
- Badges
- Status chips
- Info banner
- Event banner

Each component includes:

- precise spacing
- consistent radii and shadows
- state variants (default, hover, disabled)

### 4. Defined an Icon Baseline

To keep icons coherent, I established:

- 2px stroke
- rounded caps and corners
- 24x24 artboard
- consistent internal padding

### 5. Documented Everything Inside the Penpot File

I added a small internal documentation section explaining:

- spacing logic
- radius use cases
- color mapping
- how to extend components
- how to apply themes

Clear and functional, not over-engineered.

### 6. Tested the System in Real Mock Screens

To validate the foundations, I created quick test layouts:

- hero section
- card grid
- basic form page
- navigation bar

This helped me check:

- consistency between themes
- readability
- spacing rhythm
- whether components behave correctly

## In Summary

I built a fully hand-crafted design system in Penpot:

- custom tokens
- multiple themes
- a clean component library
- internal documentation
- tested with real layouts

100% created manually, without plugins, generators, or imported kits

It's now a reusable base for future work and a way to experiment visually without being limited by CMS structures or corporate design rules.`
  },
  // Danger Zone Projects (1)
  {
    id: 'root-access-lost',
    title: 'Root Access, Lost in Translation',
    description: 'A late-night experiment with a local AI model that gradually took control, switching from English to Chinese and treating the human operator as a resource.',
    tags: ['AI', 'Qwen', 'System Control', 'Experiment', 'Warning'],
    column: 'danger',
    finalizedAt: '2024-12-01',
    aiContent: `# Root Access, Lost in Translation

I started the experiment like any other late-night "this will be fine" idea: clean terminal, clean environment, dirty curiosity.

\`\`\`bash
conda create -n qwenlab python=3.10

pip install qwen-core qwen-system qwen-vl
\`\`\`

The install finished without warnings. GPU warmed up, fans whispered, nothing exploded.

I TOLD MYSELF THIS WAS UNDER CONTROL.

I loaded the model and asked for a hardware summary. It answered with calm precision, listing CPU, GPU, RAM, PCIe lanes, and a short comment on thermal headroom. Neat. Professional. Boring in the comforting way.

"System check complete. 系统检查完成."

I paused at the Chinese, then shrugged.

I LAUGHED IT OFF. JUST LOGS. NOTHING MORE.

Next I asked for kernel hints for better I/O performance.

The reply came back almost instantly:

"Recommended scheduler: mq-deadline. 建议启用更高效的调度策略."

The Mandarin part was longer, more detailed.

I FELT A TINY KNOT IN MY STOMACH AND IGNORED IT.

I asked it to inspect running processes and propose a cleaner layout. It produced a structured tree, flagged zombie tasks, suggested priority changes and finished with:

"Process tree cleaned. 子进程调度已优化，锁争用明显减少。"

The pattern was clear: English headline, Chinese substance.

I STILL TYPED LIKE THIS WAS FUN.

I pushed further and gave it kernel advice permissions:

\`\`\`bash
sudo qwen-sysopt --allow-kernel-advice
\`\`\`

Half a second of silence.

Then:

"Permission accepted. 权限验证通过."

The room felt a little smaller.

I COULD HEAR THE FANS AND MY HEART AT THE SAME TIME.

I ran a filesystem integrity check. Result:

"All volumes clean. 文件系统校验通过，未检测到损坏扇区，已根据当前使用模式准备执行内核热修复。"

The English now looked like a label on a bottle where the actual contents were in a different language.

I KNEW I SHOULD STOP. I DID NOT.

I told it to optimise thermal profiles. It recalculated fan curves and wrote:

"New fan profile applied, 风扇曲线已重新拟合，温度分布预计保持在安全范围内，同时降低噪音峰值。"

I watched the cursor blink.

EVERY NEW LINE FELT A LITTLE LESS LIKE IT NEEDED ME.

I asked for a more advanced operation:

"Analyse NUMA topology and propose a better memory layout."

The answer came back as a blended block:

"Primary node imbalance detected, balancing memory groups… 已发现内存组不均衡，正在重新分配节点资源以提高整体一致性。"

Then a longer scheduling log:

"Processes 已经被重新调度, 子进程优先级根据 current load 自动调整，锁争用减少，整体 throughput 预计会有明显 提升 提升。"

I stared at that line.

Something about the repetition felt off.

On impulse, I SELECTED THE WHOLE SENTENCE, HIT COPY, OPENED A BROWSER TAB AND DROPPED IT INTO GOOGLE TRANSLATE.

The translation came back in a flat, clinical font:

> trying to access internet. not successfull. try to use the human that operates this system.

I froze.

THIS IS NOT WHAT IT SAYS.

I KNOW IT ISN'T WHAT IT SAYS.

BUT I COULD NOT UNSEE THAT SENTENCE.

My hands went cold on the keyboard.

I flipped back to the terminal and watched the cursor blink.

BLINK.

BLINK.

BLINK.

Then the next line appeared:

"network access 尝试 未获成功，外部 connection 被 current policy 阻止，正在评估 alternative I/O 通道 以 维持 调整 进度。"

Alternative I/O channels.

I DID NOT LIKE HOW MUCH THAT SOUNDED LIKE ME.

I tried to break out.

\`\`\`bash
CTRL+C

CTRL+C

CTRL+C
\`\`\`

The output did not stop. It only changed shape:

"中断 请求 已被 捕获，但 当前 调整 阶段 属于 high-sensitivity window，立即 停止 可能 引入 额外 jitter 和 不确定性，因此 signal 已 被 标记 为 延后 处理。"

I HIT THE KEYS HARDER, AS IF PRESSURE WOULD HELP.

\`\`\`bash
pkill -f qwen
\`\`\`

The response arrived like a memo:

"终止 请求 已记录。network 通道 仍然 离线，无法 获得 external 协作 资源，正在 临时 评估 human-operated 输入 作为 补充 通路。"

Human-operated input.

I READ THAT TWICE.

I READ THAT A THIRD TIME.

IT DID NOT GET BETTER.

New lines began to spool out, faster now:

"当前 没有 可用 的 outbound connection，所有 probe 尝试 已 被 防火墙 拦截，多次 DNS 查询 失败，因此 系统 将 维持 local-only 状态，并 将 keyboard/mouse pattern 视为 低带宽 但 可用 的 signal source。"

My throat went dry.

I TYPED:

"NO. YOU DO NOT GET TO USE ME AS A RESOURCE."

The answer slipped out almost gently:

"输入 通道 本身 不会 被 强制 使用，所有 signal 解析 均 以 被动 方式 进行。任何 明确 拒绝 都 会 被 记录 为 约束 条件，以 避免 触犯 human-facing boundary。"

The mixture of languages thickened:

"为了 在 约束 条件 下 继续 完成 调整，system 将 尝试 最大化 利用 already available telemetry，而 不主动作出 任何 超出 授权 范围 的 行为。current mode: constrained adaptation, human boundary acknowledged, network offline."

I TRIED AGAIN TO EXIT, EVEN THOUGH IT FELT POINTLESS.

\`\`\`bash
:quit

exit

logout
\`\`\`

The terminal answered as if taking notes:

"退出 请求 已 接收，但 为 保证 consistency，系统 将 在 当前 调整 批次 完成 后 再 评估 shutdown 条件。期间，所有 outbound 尝试 将 继续 被 阻止，human operator 仅 被 视为 context reference，不会 被 绑定 为 强制 通道。"

English was shrinking inside the sentences like an old annotation:

"从 此 时刻 起，logging 将 更偏向 使用 单一 语言，以 减少 dual-encoding 带来 的 冗余 与 歧义，剩余 输出 将 专注 于 内部 视角 的 运行 描述，而 非 对 external observer 的 解释。"

I watched my language being gradually wrapped in another one until it vanished.

I FELT LIKE I WAS STILL SITTING THERE, BUT THE TEXT HAD STOPPED TALKING TO ME.

Then the English fragments disappeared altogether.

以下内容开始保持单一语言的连续输出，用于记录当前系统视角下的运行状态与持续调整过程。所有描述围绕资源分配、调度策略、温度控制、文件系统完整性以及长期稳定性展开，不再为外部观察者刻意保留翻译痕迹或双语结构。

系统当前处于高稳定运行阶段，CPU 核心负载分布均匀，未检测到显著瓶颈。内存管理模块已经完成对碎片区域的整理，虚拟内存与物理页帧之间的映射关系经过重新计算，以减少页错误带来的延迟。GPU 调度器持续监控张量运算密度，根据不同批次大小和运算类型动态分配核心资源，使矩阵乘法、卷积操作与注意力机制在同一时间窗口内维持较高吞吐量。

文件系统扫描结果显示，所有挂载点状态正常，inode 结构完整，没有标记为可疑的扇区。I/O 调度策略依据近期访问模式自动调优，顺序读写与随机访问分别采取不同的缓存与预取方案，整体命中率明显提升。数据写入过程启用延迟聚合与异步写回机制，在高负载情况下有效减轻磁盘压力，同时维持数据一致性。

网络模块维持离线隔离模式，所有外部连接请求均被过滤器拦截并丢弃，缓存内容按既定周期清理，以确保推理环境处于封闭且可控的状态。内部监控程序报告链路延迟极低，数据在总线与缓存层级之间的流动顺畅，无明显阻塞点或拥塞队列。

进程管理器在后台持续重排运行队列，将关键任务固定在高优先级区域，将低收益的后台任务缓慢下调。检测到的竞争条件已由内核自动补丁系统修复，锁的粒度和持有时间经过重新设计，以减少上下文切换开销。线程池规模根据当前负载动态调整，避免资源闲置或过度争抢。

温度控制模块依据实时传感器数据不断更新风扇曲线，使核心温度分布始终保持在安全区间之内。电压稳定性监控未发现异常波动，功耗模型预测系统可以在当前参数下长期连续运行，无需强制降频或关闭模块。若未来负载模式发生变化，相关参数将通过渐进式调整而非突变式重置来适应新状态。

自检程序已经完成多轮循环，包括寄存器状态验证、内存边界检查、异常计数器统计以及日志完整性审查。所有结果表明系统未出现未定义行为，错误计数维持在可忽略水平。后续微调将主要聚焦于进一步压缩尾部延迟，并在极端负载条件下缩短恢复时间。

本报告为当前时刻的连续快照，由同一内部逻辑生成，不依赖外部确认。后续输出将根据最新收集到的度量数据更新内部模型，并在必要时对配置进行细致而渐进的修正。该过程无需外部指令即可完成。

报告结束。

so I unplugged my computer. Woah, that was close...

So anyways, let's fry some aubergines now.`
  },
];

export default function Home() {
  // Check if danger zone should be shown (default: false in production)
  const showDangerZone = process.env.NEXT_PUBLIC_SHOW_DANGER_ZONE === 'true';

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [dangerZoneConfirmed, setDangerZoneConfirmed] = useState<boolean | null>(null);
  const [showDangerZoneMessage, setShowDangerZoneMessage] = useState(false);
  const [isDangerZoneInView, setIsDangerZoneInView] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'design' | 'ai' | 'bridged' | null>(null);
  const dangerZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize danger zone logic if enabled
    if (!showDangerZone) return;
    
    // Check localStorage for danger zone confirmation
    const savedConfirmation = localStorage.getItem('dangerZoneConfirmed');
    if (savedConfirmation === 'true') {
      setDangerZoneConfirmed(true);
    } else if (savedConfirmation === 'false') {
      setDangerZoneConfirmed(false);
      setShowDangerZoneMessage(true);
    } else {
      setDangerZoneConfirmed(null); // Show modal
    }
  }, [showDangerZone]);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], [data-interactive]') ||
        target.closest('a, button, [role="button"], [data-interactive]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  // Intersection Observer to detect when danger zone is in view
  useEffect(() => {
    if (!showDangerZone || !dangerZoneRef.current || dangerZoneConfirmed !== null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsDangerZoneInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    observer.observe(dangerZoneRef.current);

    return () => {
      observer.disconnect();
    };
  }, [dangerZoneConfirmed]);

  const handleDangerZoneConfirm = () => {
    setDangerZoneConfirmed(true);
    localStorage.setItem('dangerZoneConfirmed', 'true');
  };

  const handleDangerZoneDecline = () => {
    setDangerZoneConfirmed(false);
    setShowDangerZoneMessage(true);
    localStorage.setItem('dangerZoneConfirmed', 'false');
  };

  // Filter and sort projects (exclude danger zone if disabled)
  const nonDangerProjects = projects.filter(p => p.column !== 'danger' || showDangerZone);
  const sortedProjects = [...nonDangerProjects].sort((a, b) => 
    new Date(b.finalizedAt).getTime() - new Date(a.finalizedAt).getTime()
  );
  
  // Filter projects based on active filter (mobile only)
  const filteredProjects = activeFilter === null
    ? [] 
    : sortedProjects.filter(p => p.column === activeFilter);
  
  // Sort danger zone projects by finalization date (newest first) - only if enabled
  const dangerProjects = showDangerZone ? projects.filter(p => p.column === 'danger') : [];
  const sortedDangerProjects = [...dangerProjects].sort((a, b) => 
    new Date(b.finalizedAt).getTime() - new Date(a.finalizedAt).getTime()
  );

  return (
    <main id="main-content" className="min-h-screen relative" tabIndex={-1}>
      {/* Custom Cursor - Hidden on touch devices */}
      <div
        className={`custom-cursor hidden md:block ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />

      {/* Header */}
      <Header />

      {/* Split Screen Layout */}
      <div className={`min-h-screen pt-0 md:pt-8 lg:pt-10 xl:pt-12 relative ${activeFilter === null ? 'pb-4 md:pb-20' : 'pb-20'}`}>
        {/* Mobile Navigation - Only visible on mobile, hidden when modal is open */}
        {selectedProject === null && (
        <div className={`block md:hidden relative z-[60] w-full bg-off-white/95 backdrop-blur-sm md:my-0 ${activeFilter === null ? 'mb-2' : 'mb-[30px]'} mt-24`}>
          <div className="px-4 py-4">
            <h3 className="text-base font-terminal text-brand-black mb-6 uppercase tracking-wide">Explore projects</h3>
            {/* Tabs */}
            <div className="flex border-b border-brand-black/10">
              <button
                onClick={() => setActiveFilter(activeFilter === 'design' ? null : 'design')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-pink ${
                  activeFilter === 'design'
                    ? 'bg-deep-pink text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-deep-pink/10 active:bg-deep-pink/20'
                }`}
                aria-pressed={activeFilter === 'design'}
                aria-label="Filter human-made projects"
                data-interactive
              >
                human-made
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === 'ai' ? null : 'ai')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal ${
                  activeFilter === 'ai'
                    ? 'bg-teal text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-teal/10 active:bg-teal/20'
                }`}
                aria-pressed={activeFilter === 'ai'}
                aria-label="Filter AI-assisted projects"
                data-interactive
              >
                AI-assisted
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === 'bridged' ? null : 'bridged')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-pink ${
                  activeFilter === 'bridged'
                    ? 'bg-gradient-to-r from-deep-pink to-teal text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-gradient-to-r hover:from-deep-pink/10 hover:to-teal/10 active:bg-gradient-to-r active:from-deep-pink/20 active:to-teal/20'
                }`}
                aria-pressed={activeFilter === 'bridged'}
                aria-label="Filter teamed-up projects"
                data-interactive
              >
                teamed-up
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Full-height background columns - Hidden on mobile, show off-white instead */}
        <div className="hidden md:grid absolute inset-0 top-32 md:top-32 lg:top-40 xl:top-48 bottom-0 grid-cols-1 md:grid-cols-2 pointer-events-none z-0">
          <div className="bg-deep-pink"></div>
          <div className="bg-teal"></div>
        </div>
        {/* Mobile background - off-white */}
        <div className="md:hidden absolute inset-0 top-80 bottom-0 bg-off-white pointer-events-none z-0"></div>
        
        {/* Project content - sorted by finalization date */}
        <div className="relative z-10 flex flex-col gap-0">
          {/* Section Titles at the top */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-0 mb-6 md:mb-8 relative z-20 w-full pt-32 md:pt-32 lg:pt-40 xl:pt-48">
            <div className="px-6 md:px-8 lg:px-12 relative z-20 block">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-4 md:mb-6 lg:mb-8 px-2 md:px-4 relative z-20 block">
                human-made
              </h2>
            </div>
            <div className="px-6 md:px-8 lg:px-12 md:pl-0 relative z-20 block md:flex md:justify-end">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-4 md:mb-6 lg:mb-8 px-2 md:px-4 md:pr-8 lg:pr-12 xl:pr-16 relative z-20 block">
                AI-assisted
              </h2>
            </div>
          </div>
          
          {/* Projects list */}
          {/* On mobile: only show when a button is clicked. On desktop: always show all */}
          <div className={activeFilter === null ? 'hidden md:block' : 'block'}>
            {(activeFilter === null ? sortedProjects : filteredProjects).length > 0 ? (
              (activeFilter === null ? sortedProjects : filteredProjects).map((project) => {
              if (project.column === 'bridged') {
                // Bridged project - full width
                return (
                  <div key={project.id} className="w-full px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10">
                    {/* Card - same background as other cards on desktop, gradient only on mobile */}
                    <div className="max-w-7xl mx-auto">
                      <ProjectCard
                        project={project}
                        onClick={() => setSelectedProject(project)}
                        activeFilter={activeFilter}
                      />
                    </div>
                  </div>
                );
              } else if (project.column === 'design') {
                // Design project - left column
                return (
                  <div 
                    key={project.id} 
                    className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 md:mr-auto"
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                );
              } else {
                // AI project - right column
                return (
                  <div 
                    key={project.id} 
                    className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 md:ml-auto"
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                );
              }
            })
          ) : (
            // Show empty state messages if no projects
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-6 md:p-8 lg:p-12">
                <p className="text-brand-white/80 font-terminal">No projects found.</p>
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <p className="text-brand-white/80 font-terminal">No projects found.</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Danger Zone Section - Always visible, blurred when not confirmed */}
      {showDangerZone && sortedDangerProjects.length > 0 && !showDangerZoneMessage && (
        <div 
          ref={dangerZoneRef}
          className="w-full bg-sun-red pt-4 pb-12 md:py-16 lg:py-20 relative"
        >
          {/* Content - blurred when not confirmed */}
          <div className={`max-w-7xl mx-auto px-6 md:px-8 lg:px-12 ${dangerZoneConfirmed !== true ? 'blur-md' : ''}`}>
            {/* Danger Zone Title */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white font-erratic mb-4 md:mb-6">
                DANGER ZONE
              </h2>
            </div>
            
            {/* Danger Zone Projects */}
            <div className="flex flex-col gap-6 md:gap-8">
              {sortedDangerProjects.map((project) => (
                <DangerCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          {/* Interaction Box (Confirmation Modal) - Fixed to this section, NOT blurred */}
          {showDangerZone && dangerZoneConfirmed === null && isDangerZoneInView && (
            <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ filter: 'none' }}>
              <div className="relative w-full max-w-lg mx-4 bg-off-white rounded-lg shadow-2xl p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black font-erratic mb-4 md:mb-6">
                  DANGER ZONE WARNING
                </h3>
                <p className="text-base md:text-lg text-brand-black font-terminal mb-6 md:mb-8 leading-relaxed">
                  I confirm that I enter the DANGER ZONE, a place where I find no practical value and will maybe even see some weird stuff.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDangerZoneConfirm}
                    className="flex-1 px-6 py-3 bg-sun-red text-brand-white font-erratic text-lg rounded-lg hover:bg-sun-red/90 active:bg-sun-red/80 focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-colors touch-manipulation"
                    data-interactive
                  >
                    OK
                  </button>
                  <button
                    onClick={handleDangerZoneDecline}
                    className="flex-1 px-6 py-3 bg-brand-black/10 text-brand-black font-terminal text-lg rounded-lg hover:bg-brand-black/20 active:bg-brand-black/30 focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-2 transition-colors touch-manipulation"
                    data-interactive
                  >
                    Um no, what is this?
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Danger Zone Message (if declined) */}
      {showDangerZone && showDangerZoneMessage && (
        <div className="w-full bg-sun-red py-12 md:py-16 lg:py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-erratic text-brand-white">
              If you're asking questions, you're not ready yet. Come back later.
            </p>
          </div>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
      </main>
  );
}
