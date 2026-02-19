import type { Project } from '../types';

const bioco: Project = {
  id: 'bioco',
  title: {
    en: 'bioco: Organic Food Cooperative Platform',
    de: 'bioco: Bio-Lebensmittel-Genossenschaftsplattform',
  },
  description: {
    en: 'Organic food cooperative platform with ProcessWire CMS backend and Next.js frontend. Mixed approach: Cursor IDE and .claude directory for AI support, manual architecture planning.',
    de: 'Bio-Lebensmittel-Genossenschaftsplattform mit ProcessWire-CMS-Backend und Next.js-Frontend. Gemischter Ansatz: Cursor IDE und .claude-Verzeichnis fuer KI-Unterstuetzung, manuelle Architekturplanung.',
  },
  tags: ['ProcessWire 3.x', 'Next.js 14', 'Matomo', 'TailwindCSS', 'PHP', 'Docker'],
  column: 'bridged',
  finalizedAt: '2025-03-20',
  status: 'live',
  liveUrl: 'https://bioco.ch',
  designContent: {
    en: `## Human-Made

### Architecture & Planning

All architectural decisions were made manually with careful consideration of the cooperative's needs:

**CMS Selection**

ProcessWire 3.x was chosen for its flexibility with custom fields and templates. The cooperative needed complex product categorization (seasonal, regional, organic certifications) that ProcessWire handles natively.

**Analytics**

Matomo was selected over Google Analytics for GDPR compliance and data sovereignty. Self-hosted on the same infrastructure, no data leaves Switzerland.

**Content Structure**

- Product catalog with seasonal availability
- Producer profiles with farm locations
- Order management workflow
- Member area with cooperative documents
- Event calendar for markets and workshops

### Design & UX

- Clean, earthy color palette reflecting organic values
- Mobile-first design for market-day ordering
- Accessible navigation for older cooperative members
- Print-friendly recipe and product pages`,
    de: `## Handgemacht

### Architektur & Planung

Alle Architekturentscheidungen wurden manuell und mit sorgfaeltiger Beruecksichtigung der Genossenschaftsbeduerfnisse getroffen:

**CMS-Auswahl**

ProcessWire 3.x wurde wegen seiner Flexibilitaet mit benutzerdefinierten Feldern und Templates gewaehlt. Die Genossenschaft brauchte komplexe Produktkategorisierung (saisonal, regional, Bio-Zertifizierungen), die ProcessWire nativ abdeckt.

**Analytics**

Matomo wurde statt Google Analytics fuer DSGVO-Konformitaet und Datensouveraenitaet gewaehlt. Self-hosted auf der gleichen Infrastruktur, keine Daten verlassen die Schweiz.

**Content-Struktur**

- Produktkatalog mit saisonaler Verfuegbarkeit
- Produzenten-Profile mit Hofstandorten
- Bestellmanagement-Workflow
- Mitgliederbereich mit Genossenschaftsdokumenten
- Veranstaltungskalender fuer Maerkte und Workshops

### Design & UX

- Saubere, erdige Farbpalette, die Bio-Werte widerspiegelt
- Mobile-first-Design fuer Markttag-Bestellungen
- Barrierefreie Navigation fuer aeltere Genossenschaftsmitglieder
- Druckfreundliche Rezept- und Produktseiten`,
  },
  aiContent: {
    en: `## AI-Assisted

### Cursor IDE & .claude Integration

The project uses Cursor IDE with a .claude directory containing project context. AI assistance was focused on implementation speed, not architecture.

**AI-supported tasks:**

- ProcessWire template PHP code generation
- TailwindCSS component styling
- Next.js API route boilerplate
- Docker configuration for local dev and production
- Matomo tracking code integration

### Content Migration

AI helped automate migration scripts for moving existing product data from spreadsheets into ProcessWire:

- CSV parsing and validation
- Image optimization and upload automation
- Taxonomy mapping from flat lists to hierarchical categories

### Testing & Quality

- Accessibility testing suggestions
- Lighthouse performance optimization
- Cross-browser compatibility fixes`,
    de: `## KI-gestuetzt

### Cursor IDE & .claude-Integration

Das Projekt nutzt Cursor IDE mit einem .claude-Verzeichnis fuer Projektkontext. KI-Unterstuetzung fokussierte auf Implementierungsgeschwindigkeit, nicht Architektur.

**KI-unterstuetzte Aufgaben:**

- ProcessWire-Template-PHP-Code-Generierung
- TailwindCSS-Komponenten-Styling
- Next.js-API-Route-Boilerplate
- Docker-Konfiguration fuer lokale Entwicklung und Produktion
- Matomo-Tracking-Code-Integration

### Content-Migration

KI half bei der Automatisierung von Migrationsskripten fuer den Transfer bestehender Produktdaten aus Tabellen nach ProcessWire:

- CSV-Parsing und Validierung
- Bildoptimierung und Upload-Automatisierung
- Taxonomie-Mapping von flachen Listen zu hierarchischen Kategorien

### Testing & Qualitaet

- Vorschlaege fuer Barrierefreiheitstests
- Lighthouse-Performance-Optimierung
- Cross-Browser-Kompatibilitaets-Fixes`,
  },
};

export default bioco;
