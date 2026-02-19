# Gusty Portfolio

A modern portfolio website built with Next.js, showcasing design, writing, and AI engineering work.

**Live Site:** [gusty.ch](https://gusty.ch)

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v3**
- **Custom Fonts:** Playfair Display & IBM Plex Mono

## Features

- Split-screen portfolio layout (Design & Writing / AI Engineering)
- Interactive project cards with modal views
- Custom cursor (desktop only)
- Fully responsive design
- Tabbed project modals for bridged projects
- Rich media support (images, videos, code snippets)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
gusty/
├── app/
│   ├── globals.css      # Global styles and custom cursor
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main page with project data
├── components/
│   ├── Header.tsx      # Header with logo and social links
│   ├── ProjectCard.tsx # Project card component
│   └── ProjectModal.tsx # Modal with tabbed content
└── tailwind.config.js  # Tailwind configuration
```

## Adding New Projects

Edit the `projects` array in `app/page.tsx`. Each project can include:

- `designContent` - React node with design/writing content
- `aiContent` - React node with AI engineering content
- `column` - 'design', 'ai', or 'bridged'
- Use helper components: `RichContent`, `VideoEmbed`, `CodeSnippet`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure the build
4. Add your custom domain `gusty.ch` in Vercel settings

### Environment Variables

No environment variables required for basic deployment.

### Build Settings (Vercel)

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

## Social Links

- **Twitter/X:** [@GueneyUsta](https://x.com/GueneyUsta)
- **GitHub:** [wgusta](https://github.com/wgusta)

## Activity Log

Last 10 commits (auto-generated):

- **Fix favicon: use Next.js ImageResponse instead of SVG** (e22fa22) - 11 seconds ago by wgusta
- **Update Activity Log [skip ci]** (c6b76a2) - 31 minutes ago by github-actions[bot]
- **Add 6 projects, DE/EN language toggle, SVG favicon** (27ffe05) - 32 minutes ago by wgusta
- **Update Activity Log [skip ci]** (cc3c7da) - 3 hours ago by github-actions[bot]
- **rm cross-contaminated files, rewrite CLAUDE.md** (b4cfdfe) - 3 hours ago by wgusta
- **Update Activity Log [skip ci]** (a2542b5) - 3 hours ago by github-actions[bot]
- **Trigger Vercel redeploy** (4069639) - 3 hours ago by wgusta
- **Update Activity Log [skip ci]** (d41d5e3) - 18 hours ago by github-actions[bot]
- **Add CLAUDE.md: note on README rebase conflict from activity log bot** (66b4026) - 18 hours ago by wgusta
- **Update Activity Log [skip ci]** (c94209f) - 18 hours ago by github-actions[bot]

View full commit history: [GitHub Commits](https://github.com/wgusta/gusty/commits)
## License

Private project - All rights reserved
