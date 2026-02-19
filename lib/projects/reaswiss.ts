import type { Project } from '../types';

const reaswiss: Project = {
  id: 'reaswiss',
  title: {
    en: 'reaswiss: Real Estate Platform for the Swiss Market',
    de: 'reaswiss: Immobilienplattform fuer den Schweizer Markt',
  },
  description: {
    en: 'Real estate platform for Swiss properties with Stripe payment integration. Handmade foundation with AI used for bug fixes and incremental improvements.',
    de: 'Immobilienplattform fuer Schweizer Objekte mit Stripe-Zahlungsintegration. Handgemachtes Fundament, KI fuer Bugfixes und schrittweise Verbesserungen.',
  },
  tags: ['Next.js 16', 'ProcessWire CMS', 'Stripe', 'TailwindCSS', 'PHP'],
  column: 'bridged',
  finalizedAt: '2025-06-01',
  status: 'live',
  liveUrl: 'https://reaswiss.ch',
  designContent: {
    en: `## Human-Made

### Architecture & Foundation

The entire platform architecture was designed and built by hand. ProcessWire CMS serves as the content backend, providing a flexible data model for property listings, agent profiles, and regional content.

**Core decisions made manually:**

- CMS selection and data modeling (ProcessWire)
- Payment flow design with Stripe
- SEO strategy and URL structure
- Multi-language content architecture
- Server infrastructure on Infomaniak VPS

### Frontend Development

- Next.js 16 with App Router for SSR and static generation
- TailwindCSS for responsive, mobile-first design
- Custom property search with filters
- Image optimization pipeline for property photos
- Structured data (JSON-LD) for real estate listings

### Business Logic

- Stripe integration for listing payments
- Agent dashboard for property management
- Automated listing expiry and renewal
- Contact form with spam protection`,
    de: `## Handgemacht

### Architektur & Fundament

Die gesamte Plattformarchitektur wurde von Hand entworfen und gebaut. ProcessWire CMS dient als Content-Backend mit einem flexiblen Datenmodell fuer Immobilienanzeigen, Maklerprofile und regionale Inhalte.

**Manuell getroffene Kernentscheidungen:**

- CMS-Auswahl und Datenmodellierung (ProcessWire)
- Zahlungsfluss-Design mit Stripe
- SEO-Strategie und URL-Struktur
- Mehrsprachige Content-Architektur
- Server-Infrastruktur auf Infomaniak VPS

### Frontend-Entwicklung

- Next.js 16 mit App Router fuer SSR und statische Generierung
- TailwindCSS fuer responsives, Mobile-first-Design
- Individuelle Immobiliensuche mit Filtern
- Bildoptimierungs-Pipeline fuer Immobilienfotos
- Strukturierte Daten (JSON-LD) fuer Immobilienanzeigen

### Geschaeftslogik

- Stripe-Integration fuer Anzeigenzahlungen
- Makler-Dashboard fuer Immobilienverwaltung
- Automatischer Anzeigenablauf und Verlaengerung
- Kontaktformular mit Spam-Schutz`,
  },
  aiContent: {
    en: `## AI-Assisted

### Bug Fixes & Debugging

AI was used primarily as a debugging assistant after the foundation was built. Common patterns:

- Diagnosing hydration mismatches between SSR and client
- Fixing Stripe webhook edge cases
- Resolving ProcessWire API query issues
- CSS layout fixes for edge cases on Safari/iOS

### Incremental Improvements

- Performance optimization suggestions for image loading
- Accessibility audit fixes (ARIA labels, focus management)
- SEO meta tag generation for property pages
- TypeScript type refinements`,
    de: `## KI-gestuetzt

### Bugfixes & Debugging

KI wurde hauptsaechlich als Debugging-Assistent nach dem Aufbau des Fundaments eingesetzt. Typische Muster:

- Diagnose von Hydration-Mismatches zwischen SSR und Client
- Behebung von Stripe-Webhook-Grenzfaellen
- Loesung von ProcessWire-API-Abfrageproblemen
- CSS-Layout-Fixes fuer Edge Cases auf Safari/iOS

### Schrittweise Verbesserungen

- Performance-Optimierungsvorschlaege fuer Bildladung
- Barrierefreiheits-Audit-Fixes (ARIA-Labels, Fokus-Management)
- SEO-Meta-Tag-Generierung fuer Immobilienseiten
- TypeScript-Typ-Verfeinerungen`,
  },
};

export default reaswiss;
