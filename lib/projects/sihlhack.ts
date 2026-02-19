import type { Project } from '../types';

const sihlhack: Project = {
  id: 'sihlhack',
  title: {
    en: 'sihlhack: Hackathon Community with 3D Landing Page',
    de: 'sihlhack: Hackathon-Community mit 3D-Landingpage',
  },
  description: {
    en: 'AI-first hackathon community platform with 3D landing page, event management and participant coordination. Built with CLAUDE.md driven multi-agent workflow.',
    de: 'KI-first Hackathon-Community-Plattform mit 3D-Landingpage, Event-Management und Teilnehmerkoordination. Gebaut mit CLAUDE.md-gesteuertem Multi-Agent-Workflow.',
  },
  tags: ['Next.js 16', 'Three.js', 'Vercel Postgres', 'Drizzle ORM', 'TailwindCSS', 'TypeScript'],
  column: 'ai',
  finalizedAt: '2025-04-15',
  status: 'live',
  liveUrl: 'https://sihlhack.ch',
  aiContent: {
    en: `## AI-First Development

### CLAUDE.md as Project Backbone

The entire project was orchestrated through a detailed CLAUDE.md file that served as the single source of truth for multi-agent coordination. Every architectural decision, coding standard, and deployment procedure was documented there.

**Agent coordination patterns:**

- Claude Code for feature implementation and refactoring
- Codex CLI for bulk code generation tasks
- Structured handoff between agents via CLAUDE.md context

### 3D Landing Page

Three.js scene with interactive 3D elements, built entirely through AI prompting:

- Animated geometry responding to scroll position
- Custom shaders for visual effects
- Performance-optimized with lazy loading and LOD
- Mobile fallback to 2D for battery/performance

### Full-Stack Implementation

- Vercel Postgres with Drizzle ORM for type-safe database access
- Authentication flow with email verification
- Event CRUD with admin dashboard
- Participant registration and team formation
- Real-time updates via polling

### Deployment

- Vercel deployment with preview environments
- Database migrations via Drizzle Kit
- Environment variable management
- Edge functions for API routes`,
    de: `## KI-First-Entwicklung

### CLAUDE.md als Projekt-Rueckgrat

Das gesamte Projekt wurde ueber eine detaillierte CLAUDE.md-Datei orchestriert, die als einzige Wahrheitsquelle fuer die Multi-Agent-Koordination diente. Jede Architekturentscheidung, jeder Coding-Standard und jedes Deployment-Verfahren wurde dort dokumentiert.

**Agent-Koordinationsmuster:**

- Claude Code fuer Feature-Implementierung und Refactoring
- Codex CLI fuer Massen-Code-Generierungsaufgaben
- Strukturierte Uebergabe zwischen Agents via CLAUDE.md-Kontext

### 3D-Landingpage

Three.js-Szene mit interaktiven 3D-Elementen, komplett durch KI-Prompting gebaut:

- Animierte Geometrie, die auf Scroll-Position reagiert
- Custom Shaders fuer visuelle Effekte
- Performance-optimiert mit Lazy Loading und LOD
- Mobile Fallback auf 2D fuer Akku/Performance

### Full-Stack-Implementierung

- Vercel Postgres mit Drizzle ORM fuer typsicheren Datenbankzugriff
- Authentifizierungsfluss mit E-Mail-Verifizierung
- Event-CRUD mit Admin-Dashboard
- Teilnehmerregistrierung und Teambildung
- Echtzeit-Updates via Polling

### Deployment

- Vercel-Deployment mit Preview-Umgebungen
- Datenbankmigrationen via Drizzle Kit
- Umgebungsvariablen-Management
- Edge Functions fuer API-Routen`,
  },
};

export default sihlhack;
