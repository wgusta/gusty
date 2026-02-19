import type { Project } from '../types';

const luckhack: Project = {
  id: 'luckhack',
  title: {
    en: 'luckhack: Statistics Scholarship Challenge via SSH Terminal',
    de: 'luckhack: Statistik-Stipendium-Challenge via SSH-Terminal',
  },
  description: {
    en: 'Scholarship competition awarding CHF 1500/semester to Swiss university students. Participants decrypt a transmission, connect via SSH, and solve auto-graded statistics tasks. Go terminal backend, Next.js frontend.',
    de: 'Stipendiums-Wettbewerb mit CHF 1500/Semester fuer Schweizer Studierende. Teilnehmende entschluesseln eine Uebertragung, verbinden via SSH und loesen automatisch bewertete Statistik-Aufgaben. Go-Terminal-Backend, Next.js-Frontend.',
  },
  tags: ['Go', 'Charm TUI', 'Next.js 14', 'PostgreSQL', 'TailwindCSS', 'Docker'],
  column: 'design',
  finalizedAt: '2025-02-10',
  status: 'live',
  liveUrl: 'https://luckhack.ch',
  designContent: {
    en: `## Handmade

### Go Terminal Application

The core of luckhack is a terminal-based admin tool built with Go and Charm's Bubble Tea framework. No AI was involved in the design or implementation.

**Terminal UI Features:**

- Interactive TUI for managing hackathon participants
- Real-time participant list with sorting and filtering
- Team assignment and bracket generation
- Event scheduling with time zone support
- PostgreSQL integration for persistent data

### Architecture Decisions

- Go chosen for its simplicity, fast compilation and excellent concurrency
- Charm TUI (Bubble Tea + Lip Gloss) for a polished terminal experience
- PostgreSQL for relational data: participants, teams, events, scores
- Docker Compose for local development and production deployment

### Web Frontend

- Next.js 14 with App Router for the public-facing site
- Server-side rendering for SEO
- TailwindCSS for responsive design
- Public event pages, registration forms, live leaderboard

### Why No AI

This project was intentionally built without AI assistance to sharpen manual coding skills. Every function, every query, every CSS class was written by hand. The Go TUI in particular required deep understanding of the Bubble Tea architecture (Model, Update, View pattern) that benefits from hands-on learning.`,
    de: `## Handgemacht

### Go-Terminal-Anwendung

Das Herzstueck von luckhack ist ein terminalbasiertes Admin-Tool, gebaut mit Go und Charms Bubble-Tea-Framework. Keine KI war am Design oder der Implementierung beteiligt.

**Terminal-UI-Features:**

- Interaktives TUI fuer die Verwaltung von Hackathon-Teilnehmern
- Echtzeit-Teilnehmerliste mit Sortierung und Filterung
- Teamzuweisung und Bracket-Generierung
- Event-Planung mit Zeitzonen-Unterstuetzung
- PostgreSQL-Integration fuer persistente Daten

### Architekturentscheidungen

- Go gewaehlt fuer Einfachheit, schnelle Kompilierung und exzellente Concurrency
- Charm TUI (Bubble Tea + Lip Gloss) fuer ein poliertes Terminal-Erlebnis
- PostgreSQL fuer relationale Daten: Teilnehmer, Teams, Events, Punkte
- Docker Compose fuer lokale Entwicklung und Produktions-Deployment

### Web-Frontend

- Next.js 14 mit App Router fuer die oeffentliche Website
- Server-Side Rendering fuer SEO
- TailwindCSS fuer responsives Design
- Oeffentliche Event-Seiten, Registrierungsformulare, Live-Leaderboard

### Warum keine KI

Dieses Projekt wurde bewusst ohne KI-Unterstuetzung gebaut, um manuelle Coding-Faehigkeiten zu schaerfen. Jede Funktion, jede Query, jede CSS-Klasse wurde von Hand geschrieben. Das Go-TUI erforderte tiefes Verstaendnis der Bubble-Tea-Architektur (Model, Update, View Pattern), das vom praktischen Lernen profitiert.`,
  },
};

export default luckhack;
