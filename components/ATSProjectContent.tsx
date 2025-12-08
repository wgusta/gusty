'use client';

import SecurityWarning from './SecurityWarning';
import AgentConfigAccordion from './AgentConfigAccordion';
import MarkdownContent from './MarkdownContent';
import { chatgptConfigs, claudeConfigs } from '@/lib/agentConfigs';

const originalContent = `## Why HTML Templates?

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

**The strategy:** First outsmart the machine, then impress the humans. These templates do both - clean structure for ATS, professional design for recruiters.`;

export default function ATSProjectContent() {
  return (
    <>
      <MarkdownContent content={originalContent} fontFamily="terminal" />
      
      <div className="mt-8 md:mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black font-terminal mb-6 md:mb-8">
          Agent Configurations & Prompts
        </h2>
        <p className="text-sm md:text-base text-brand-black/80 font-terminal mb-6 md:mb-8 leading-relaxed">
          Below are the complete agent configuration files and prompts used in the AI-assisted workflow. These can be copied and used with ChatGPT, Claude, or other LLM platforms. Each configuration includes detailed instructions, input requirements, and output formats.
        </p>
        
        <SecurityWarning />
        
        <AgentConfigAccordion 
          title="ChatGPT Agent Configurations" 
          configs={chatgptConfigs}
        />
        
        <AgentConfigAccordion 
          title="Claude Agent Configurations" 
          configs={claudeConfigs}
        />
      </div>
    </>
  );
}

