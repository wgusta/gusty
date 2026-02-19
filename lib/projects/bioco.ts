import type { Project } from '../types';

const bioco: Project = {
  id: 'bioco',
  title: {
    en: 'bioco: Demeter Vegetable Cooperative in Baden-Brugg',
    de: 'bioco: Demeter-Gemüse-Kooperative in Baden-Brugg',
  },
  description: {
    en: 'Website for a community-supported agriculture cooperative growing biodynamic Demeter vegetables at Geisshof farm. Members share fieldwork and receive weekly vegetable boxes via depots in Baden, Brugg and Gebenstorf.',
    de: 'Website für eine solidarische Landwirtschaftskooperative, die biodynamisches Demeter-Gemüse auf dem Geisshof anbaut. Mitglieder teilen Feldarbeit und erhalten wöchentliche Gemüse-Taschen über Depots in Baden, Brugg und Gebenstorf.',
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

Alle Architekturentscheidungen wurden manuell und mit sorgfältiger Berücksichtigung der Genossenschaftsbedürfnisse getroffen:

**CMS-Auswahl**

ProcessWire 3.x wurde wegen seiner Flexibilität mit benutzerdefinierten Feldern und Templates gewählt. Die Genossenschaft brauchte komplexe Produktkategorisierung (saisonal, regional, Bio-Zertifizierungen), die ProcessWire nativ abdeckt.

**Analytics**

Matomo wurde statt Google Analytics für DSGVO-Konformität und Datensouveränität gewählt. Self-hosted auf der gleichen Infrastruktur, keine Daten verlassen die Schweiz.

**Content-Struktur**

- Produktkatalog mit saisonaler Verfügbarkeit
- Produzenten-Profile mit Hofstandorten
- Bestellmanagement-Workflow
- Mitgliederbereich mit Genossenschaftsdokumenten
- Veranstaltungskalender für Märkte und Workshops

### Design & UX

- Saubere, erdige Farbpalette, die Bio-Werte widerspiegelt
- Mobile-first-Design für Markttag-Bestellungen
- Barrierefreie Navigation für ältere Genossenschaftsmitglieder
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
    de: `## KI-gestützt

### Cursor IDE & .claude-Integration

Das Projekt nutzt Cursor IDE mit einem .claude-Verzeichnis für Projektkontext. KI-Unterstützung fokussierte auf Implementierungsgeschwindigkeit, nicht Architektur.

**KI-unterstützte Aufgaben:**

- ProcessWire-Template-PHP-Code-Generierung
- TailwindCSS-Komponenten-Styling
- Next.js-API-Route-Boilerplate
- Docker-Konfiguration für lokale Entwicklung und Produktion
- Matomo-Tracking-Code-Integration

### Content-Migration

KI half bei der Automatisierung von Migrationsskripten für den Transfer bestehender Produktdaten aus Tabellen nach ProcessWire:

- CSV-Parsing und Validierung
- Bildoptimierung und Upload-Automatisierung
- Taxonomie-Mapping von flachen Listen zu hierarchischen Kategorien

### Testing & Qualität

- Vorschläge für Barrierefreiheitstests
- Lighthouse-Performance-Optimierung
- Cross-Browser-Kompatibilitäts-Fixes`,
  },
};

export default bioco;
