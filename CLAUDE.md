# CLAUDE.md — gusty.ch

## Project Identity

- **Name:** Gusty
- **Domain:** gusty.ch
- **Repo:** github.com/wgusta/gusty
- **Purpose:** Personal portfolio of Güney Usta (design, writing, AI engineering)
- **NOT:** sihliconvalley.ch, not a community project site

## Tech

Next.js 16, React 19, Tailwind 3, TypeScript. react-markdown for rich content. Deployed on Vercel.

## Architecture

### i18n

React Context + localStorage, no route-based i18n. Toggle in Header (top-left).

- `lib/types.ts` — `Project`, `BilingualText`, `Language`, `t()` helper
- `lib/i18n/context.tsx` — `LanguageProvider` wrapping app in layout.tsx, `useLanguage()` hook
- `lib/i18n/translations.ts` — all UI strings keyed EN/DE

`BilingualText = string | { en: string; de: string }`. Plain strings for fields that don't need translation (tags, URLs). `t(text, lang)` resolves either form.

### Project Data

Each project is a separate file in `lib/projects/*.ts` exporting a `Project` object. `lib/projects/index.ts` re-exports them as a single array.

**Current projects (10):**

| File | Column | Live |
|------|--------|------|
| badenleg.ts | bridged | badenleg.ch |
| user-story-map.ts | ai | download |
| ats-templates.ts | ai | download |
| penpot-design-system.ts | design | — |
| linux-cachy-install.ts | danger | — |
| reaswiss.ts | bridged | reaswiss.ch |
| sihlhack.ts | ai | sihlhack.ch |
| luckhack.ts | design | luckhack.ch |
| bioco.ts | bridged | bioco.ch |
| therapylist.ts | bridged | therapylist.ch |

**Adding a project:** create `lib/projects/newproject.ts`, import and add to array in `lib/projects/index.ts`. Use `BilingualText` for title, description, designContent, aiContent.

**ATS special case:** `ats-templates.ts` uses sentinel string `'__ATS_COMPONENT__'` for aiContent. ProjectModal detects it and renders `<ATSProjectContent />` which handles its own i18n internally.

### Components

| Component | Role |
|-----------|------|
| Header.tsx | Logo, definitions, LanguageToggle, social menu (orbiting red circle) |
| ProjectCard.tsx | Card for design/ai/bridged projects, color-coded mobile backgrounds |
| DangerCard.tsx | Card for danger zone projects (erratic font, skewed) |
| ProjectModal.tsx | Full-screen modal with tabs for bridged, resolves bilingual content |
| ATSProjectContent.tsx | ATS templates content with agent configs, self-contained i18n |
| LanguageToggle.tsx | DE/EN button, shows language you'd switch TO |

### Columns

- `design` (deep-pink, left) — handmade projects
- `ai` (teal, right) — AI-assisted projects
- `bridged` (gradient, full-width) — mixed human+AI projects
- `danger` (sun-red section, behind confirmation modal) — experimental, env-gated via `NEXT_PUBLIC_SHOW_DANGER_ZONE=true`

## Favicon

`app/icon.tsx` — Next.js ImageResponse generating 32x32 PNG. Bold serif "g" on sun-red rounded square.

## Git

Remote: `origin → github.com/wgusta/gusty.git`

GitHub Actions bot commits to README.md on every push. Resolve conflicts:
```
git pull --rebase
git checkout --ours README.md && git add README.md && git rebase --continue
git push
```
