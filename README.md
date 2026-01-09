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

- **Remove root access post and update Linux installation title** (247159b) - 19 seconds ago by wgusta
- **Update Activity Log [skip ci]** (b061ee5) - 2 hours ago by github-actions[bot]
- **Add Linux Cachy OS installation danger zone post** (320c300) - 2 hours ago by wgusta
- **Update Activity Log [skip ci]** (7e17e63) - 4 weeks ago by github-actions[bot]
- **Remove personal information from agent configs and CV templates** (109f4ee) - 4 weeks ago by wgusta
- **Update Activity Log [skip ci]** (1414e6e) - 5 weeks ago by github-actions[bot]
- **Remove multiple agent configs from display** (da1426a) - 5 weeks ago by wgusta
- **Update Activity Log [skip ci]** (bd11df1) - 5 weeks ago by github-actions[bot]
- **Clean up ATS project content and agent configs** (7c6eada) - 5 weeks ago by wgusta
- **Update Activity Log [skip ci]** (e08925a) - 5 weeks ago by github-actions[bot]

View full commit history: [GitHub Commits](https://github.com/wgusta/sihliconvalley/commits)
## License

Private project - All rights reserved
