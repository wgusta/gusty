# Sihl Icon Valley Portfolio

A modern portfolio website built with Next.js, showcasing design, writing, and AI engineering work.

**Live Site:** [sihiliconvalley.ch](https://sihiliconvalley.ch)

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
sihliconvalley/
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
4. Add your custom domain `sihiliconvalley.ch` in Vercel settings

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

- **Remove multiple agent configs from display** (da1426a) - 18 seconds ago by wgusta
- **Update Activity Log [skip ci]** (bd11df1) - 8 minutes ago by github-actions[bot]
- **Clean up ATS project content and agent configs** (7c6eada) - 8 minutes ago by wgusta
- **Update Activity Log [skip ci]** (e08925a) - 16 minutes ago by github-actions[bot]
- **Security update: Upgrade Next.js to 16.0.7 and React to 19.2.1** (fbc9a51) - 17 minutes ago by wgusta
- **Security update: Upgrade Next.js to 16.0.7 and React to 19.2.1 (CVE-2025-66478)** (a2e4dd1) - 19 minutes ago by wgusta
- **Update Activity Log [skip ci]** (cc2f7fc) - 27 minutes ago by github-actions[bot]
- **Fix agent config component rendering - remove prose wrapper conflict** (f57ee84) - 27 minutes ago by wgusta
- **Add agent config display feature with accordion and copy functionality** (99f36ef) - 39 minutes ago by wgusta
- **Add ATS CV/Cover Letter templates project with TELOS framework and AI prompts** (e524114) - 4 days ago by wgusta

View full commit history: [GitHub Commits](https://github.com/wgusta/sihliconvalley/commits)
## License

Private project - All rights reserved
