import type { Project } from '../types';

const sihlhack: Project = {
  id: 'sihlhack',
  title: {
    en: 'sihlhack: Energy Hackathon Turning Solar Power into Heat and Compute',
    de: 'sihlhack: Energie-Hackathon, der Solarstrom in Wärme und Rechenleistung verwandelt',
  },
  description: {
    en: 'Platform for a 3-day hackathon in Zurich where 150 participants build prototypes combining renewable energy, immersion-cooled servers, and district heating. Open-source, deployed in real energy communities.',
    de: 'Plattform für einen 3-tägigen Hackathon in Zürich, bei dem 150 Teilnehmende Prototypen bauen, die erneuerbare Energie, Immersion-Cooling-Server und Fernwärme kombinieren. Open Source, im Einsatz in echten Energiegemeinschaften.',
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

### CLAUDE.md als Projekt-Rückgrat

Das gesamte Projekt wurde über eine detaillierte CLAUDE.md-Datei orchestriert, die als einzige Wahrheitsquelle für die Multi-Agent-Koordination diente. Jede Architekturentscheidung, jeder Coding-Standard und jedes Deployment-Verfahren wurde dort dokumentiert.

**Agent-Koordinationsmuster:**

- Claude Code für Feature-Implementierung und Refactoring
- Codex CLI für Massen-Code-Generierungsaufgaben
- Strukturierte Übergabe zwischen Agents via CLAUDE.md-Kontext

### 3D-Landingpage

Three.js-Szene mit interaktiven 3D-Elementen, komplett durch KI-Prompting gebaut:

- Animierte Geometrie, die auf Scroll-Position reagiert
- Custom Shaders für visuelle Effekte
- Performance-optimiert mit Lazy Loading und LOD
- Mobile Fallback auf 2D für Akku/Performance

### Full-Stack-Implementierung

- Vercel Postgres mit Drizzle ORM für typsicheren Datenbankzugriff
- Authentifizierungsfluss mit E-Mail-Verifizierung
- Event-CRUD mit Admin-Dashboard
- Teilnehmerregistrierung und Teambildung
- Echtzeit-Updates via Polling

### Deployment

- Vercel-Deployment mit Preview-Umgebungen
- Datenbankmigrationen via Drizzle Kit
- Umgebungsvariablen-Management
- Edge Functions für API-Routen`,
  },
};

export default sihlhack;
