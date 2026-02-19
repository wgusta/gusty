# Gusty Portfolio

Personal portfolio of Güney Usta — design, writing, AI engineering.

**Live:** [gusty.ch](https://gusty.ch)

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v3
- Fonts: Playfair Display, IBM Plex Mono, Permanent Marker
- Deployed on Vercel

## Features

- Split-screen layout: human-made (pink) / AI-assisted (teal) / teamed-up (gradient)
- DE/EN language toggle with localStorage persistence
- 10 portfolio projects with bilingual content
- Interactive project modals with tabs for bridged projects
- Custom cursor (desktop), mobile filter tabs
- Danger zone (env-gated) with confirmation modal
- Dynamic favicon via Next.js ImageResponse

## Project Structure

```
app/
  layout.tsx          # Root layout, LanguageProvider wrapper
  page.tsx            # Homepage, project grid, danger zone
  icon.tsx            # Favicon generation (32x32 PNG)
lib/
  types.ts            # Project, BilingualText, t() helper
  i18n/
    context.tsx       # LanguageProvider + useLanguage()
    translations.ts   # UI strings EN/DE
  projects/
    index.ts          # Re-exports all projects as array
    badenleg.ts       # Each project = separate file
    ...               # 10 project files total
components/
  Header.tsx          # Logo, definitions, language toggle, social menu
  ProjectCard.tsx     # design/ai/bridged cards
  DangerCard.tsx      # Danger zone cards
  ProjectModal.tsx    # Full-screen modal with bilingual content
  ATSProjectContent.tsx # ATS templates (self-contained i18n)
  LanguageToggle.tsx  # DE/EN toggle button
```

## Adding a Project

1. Create `lib/projects/myproject.ts` with a `Project` export
2. Add import + entry in `lib/projects/index.ts`
3. Set `column` to `design`, `ai`, `bridged`, or `danger`
4. Use `{ en: '...', de: '...' }` for bilingual fields

## Getting Started

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build
```

## Activity Log

Last 10 commits (auto-generated):

- **Update CLAUDE.md and README.md for new architecture** (1cc1c68) - 10 seconds ago by wgusta
- **Update Activity Log [skip ci]** (329fa9b) - 4 minutes ago by github-actions[bot]
- **More descriptive title and description for therapylist** (bb27f76) - 4 minutes ago by wgusta
- **Update Activity Log [skip ci]** (bfc9ee2) - 5 minutes ago by github-actions[bot]
- **Remove version-gmbh from portfolio projects** (52aca72) - 5 minutes ago by wgusta
- **Update Activity Log [skip ci]** (96babe5) - 5 minutes ago by github-actions[bot]
- **Fix project titles/descriptions from actual website content** (acb3dcd) - 6 minutes ago by wgusta
- **Update Activity Log [skip ci]** (72a6d99) - 9 minutes ago by github-actions[bot]
- **More descriptive project titles for new projects** (a01e4c7) - 9 minutes ago by wgusta
- **Update Activity Log [skip ci]** (83a37df) - 9 minutes ago by github-actions[bot]

View full commit history: [GitHub Commits](https://github.com/wgusta/gusty/commits)
## License

Private project - All rights reserved
