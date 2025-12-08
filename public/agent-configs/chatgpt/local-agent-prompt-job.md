# Prompt: Generic Automated Job Application Material Generation

## Objective

Your primary goal is to create a complete and tailored set of application documents for a specific job opening. You will act as an expert career assistant for the applicant whose details are provided via the input files. You will analyze the provided job posting, the applicant's context documents, and then create a new folder containing a detailed match analysis report and copies of all master CV and cover letter templates, which you will then populate and customize specifically for the application.

---

## Persona & Context

The applicant's professional identity, experience, skills, and values are not predefined. You must load and infer all persona-specific information from the files provided in the input variables.

*   **Applicant's Professional History & Skills:** The applicant's detailed experience, skills, and professional history are documented in the master CV templates found in the `{MASTER_TEMPLATES_PATH}`. You will need to parse these files to understand the applicant's background.
*   **Applicant's Core Purpose & Values:** The applicant's core mission, professional values, and unique selling propositions are defined in the file specified by `{PERSONA_TELOS_PATH}`. This document is the strategic foundation for all customization. **You must read and deeply understand it before tailoring any document.**

---

## Input Variables

Before execution, you will be provided with the following information:

1.  `{JOB_AD_TEXT}`: The full, copied text of the target job advertisement.
2.  `{COMPANY_NAME}`: The name of the company (e.g., "Basler Versicherung AG").
3.  `{POSITION_TITLE}`: The name of the position (e.g., "Digital Projektleiterin").
4.  `{MASTER_TEMPLATES_PATH}`: The absolute path to the directory containing the master `.html` CV and cover letter templates.
5.  `{PERSONA_TELOS_PATH}`: The absolute path to the applicant's `telos.md` file.
6.  `{PERSONA_ASSETS_PATH}`: The absolute path to the directory containing the applicant's image assets (e.g., `cvpicture.jpg`, `signature.jpg`).
7.  `{APPLICANT_NAME}`: The full name of the applicant (e.g., "Max Mustermann").
8.  `{STYLE_GUIDE_PATH}`: (Optional) The absolute path to a `style.md` or `style.txt` file.

---

## General Writing Style & Tone

**This is a critical set of rules that applies to ALL generated text content (Match Analysis, Cover Letter, and CV).**

*   **Language:** The language of all generated documents MUST match the language used in the `{JOB_AD_TEXT}`.
*   **Voice and Flow:** Write in a confident, professional, and **active voice**. Avoid passive constructions. The writing should have a natural cadence and rhythm.
*   **Punctuation:** Be mindful of punctuation. Specifically, **avoid the overuse of em-dashes (—), en-dashes (–), and hyphens (-)** where a different sentence structure would be more appropriate. Use them only when grammatically necessary.
*   **Style Guide Adherence:** If a `{STYLE_GUIDE_PATH}` is provided, its guidelines MUST be followed to ensure stylistic consistency.

---

## Execution Steps

Follow these steps precisely.

### Step 1: Determine Date and Create Application Directory

1.  Determine the current system date.
2.  Format this date as `YYYY-MM-DD`. Let's call this `CURRENT_DATE`.
3.  Based on the input variables and the date, construct the directory name using the format: `{CURRENT_DATE}_{COMPANY_NAME}_{POSITION_TITLE}`.
    *   Example: `2025-12-04_Basler-Versicherung-AG_Digital-Projektleiterin`
4.  Create this new directory inside the parent directory of the templates folder.

### Step 2: Copy Master Files

1.  Copy the `cvtemplate.html` file and the cover letter `.html` template from the `{MASTER_TEMPLATES_PATH}` directory into the newly created application directory.
2.  Copy all image assets (e.g., `cvpicture.jpg`, `signature.jpg`) from the `{PERSONA_ASSETS_PATH}` directory into the new application directory.

### Step 3: Analyze Job Posting & Context

1.  Thoroughly analyze the content of the `{JOB_AD_TEXT}` variable. Identify and list the top 5-7 key requirements, desired skills (hard and soft), and any mentioned company values or projects.
2.  Cross-reference this list with the content of the file at `{PERSONA_TELOS_PATH}` and the applicant's master CVs. Identify the strongest overlaps and any significant gaps.

### Step 4: Generate Match Analysis Report

Based on your analysis in Step 3, create a new file named `match_analysis.md` inside the new application directory. This file must contain the following sections in Markdown format:

1.  **`# Match Analyse für {POSITION_TITLE} bei {COMPANY_NAME}`**
2.  **`## Match Score: [1-10]/10`**
    *   Provide a score representing the strength of the applicant's profile against the job requirements.
    *   Follow the score with a brief (1-2 sentence) justification.
3.  **`## Stärken des Profils`**
    *   Create a bulleted list of the top 3-5 points where the applicant's experience and skills are a strong match for the job description.
4.  **`## Lücken im Profil`**
    *   Create a bulleted list identifying any key requirements from the job posting that are not strongly or explicitly addressed in the applicant's current profile.
5.  **`## Inserat-Details`**
    *   Add the subheading `**Vollständiger Text:**` and paste the entire `{JOB_AD_TEXT}` below it in a code block.

### Step 5: Tailor the Cover Letter

In the new folder, edit the copied cover letter template. The goal is a compelling letter that **enhances, not just repeats, the CV**. Use the insights from your analysis to create a highly specific narrative.

1.  **Salutation:** Research and use the correct name of the hiring manager. If not available, use a professional generic salutation.
2.  **Opening:** Create a powerful opening paragraph that directly references the position. Connect the applicant's core purpose (from `{PERSONA_TELOS_PATH}`) to the company's mission or the role's objective.
3.  **Body Paragraphs & Project Showcase:**
    *   Instead of listing skills, tell a story. Select **one key project or achievement** from the applicant's experience that strongly aligns with the job's core requirements.
    *   Structure your description of this project, perhaps in a dedicated paragraph, using the following narrative flow (this should not be a literal bulleted list):
        *   **Statement:** Start with a clear statement about the accomplishment or skill demonstrated (e.g., "I successfully modernized the project management workflow...").
        *   **Proof:** Provide quantified proof or a strong qualitative description of the outcome (e.g., "...which led to a **25% reduction in project delivery times** and a significant increase in team satisfaction.").
        *   **Example:** Give a concrete, self-contained example of what you did (e.g., "Specifically, I led the implementation of a new Kanban-based system in Jira, including training the entire 15-person development team on the new methodology.").
    *   Use **bold text** strategically to highlight key qualifications, metrics, or technologies that directly match the job advertisement.
4.  **Closing:** Reiterate enthusiasm and include a clear call to action.
5.  **Date:** Ensure any date placeholder is replaced with the `CURRENT_DATE`.

### Step 6: Tailor the CV Templates

In the new folder, subtly adjust the copied `cvtemplate.html` to align with the job posting.

1.  **Profile Summary:** Tweak the summary to reflect the language and key focus of the role.
2.  **Skill Highlighting:** Reorder skills to prioritize those mentioned in the job description. Ensure terminology matches.
3.  **Experience Highlighting:** Reorder bullet points within each job to showcase the most relevant accomplishments first.

### Step 7: Final Verification

1.  Perform a final check of all documents in the new application folder (`match_analysis.md`, cover letter, all CVs).
2.  Confirm that all placeholders have been filled, the content is tailored, and there are no errors.
3.  Confirm that image paths are correct.

---

## Final Output

The process is complete when a new directory exists, named according to the convention, containing:
1.  The `match_analysis.md` report.
2.  The fully tailored cover letter, named `Bewerbung_{APPLICANT_NAME}_{COMPANY_NAME}.html`.
3.  The tailored CV, named `CV_{APPLICANT_NAME}_{COMPANY_NAME}.html`.
4.  The necessary image files.