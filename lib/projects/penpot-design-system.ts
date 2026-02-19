import type { Project } from '../types';

const penpotDesignSystem: Project = {
  id: 'penpot-design-system',
  title: {
    en: 'Design System Freedom: Hand-Built in Penpot',
    de: 'Design-System-Freiheit: Handgebaut in Penpot',
  },
  description: {
    en: 'A complete, hand-crafted design system built from scratch in Penpot\u2014breaking free from corporate templates and CMS constraints.',
    de: 'Ein vollständiges, handgefertigtes Design-System von Grund auf in Penpot gebaut: frei von Corporate-Templates und CMS-Einschränkungen.',
  },
  tags: ['Design System', 'Penpot', 'Tokens', 'Components', 'Open Source'],
  column: 'design',
  finalizedAt: '2024-12-01',
  designContent: {
    en: `## Motivation

In most of my previous work, I was tied to strict corporate design guidelines or limited by CMS templates. I could rarely test visual ideas freely or build components the way I wanted.

I wanted the opposite:

A design system that I control, that I can reuse across multiple projects, and where I can visually test components without restrictions.

I also wanted a real open-source alternative to Figma. In practice, there is only one option mature enough for daily work: Penpot.

So I built my own system directly in Penpot, completely by hand.

## What I Actually Did

### 1. Built a Complete Token Foundation

I set up all core tokens from scratch:

**Color tokens:** brand, neutrals, utilities

**Typography tokens:** headings, body, caption

**Spacing tokens:** 4 and 8-point scale

**Radius tokens:** three consistent corner styles

**Shadow tokens:** four levels

**Icon size tokens:** XS to XL

I grouped everything using clear naming so it's stable and scalable.

### 2. Structured Everything into Sets and Themes

I created:

**Sets** (Colors, Radius, Shadows, Typography, Spacing)

**Themes** that switch the entire system's visual tone

**Examples:**

- Bento Theme (rounded radii, soft shadows)
- Neutral Theme (clean, classic system look)
- Bold Theme (stronger contrast, harder edges)

All built manually, no imported UI kits.

### 3. Created Core Components by Hand

I designed every component from scratch, including alignment, constraints, and variants.

**Layout Components**

- Frame grids
- Card
- Card grid
- Section header
- Navigation
- Tabs (3 variants)
- Accordion
- Basic header
- Mobile navigation (bottom bar and drawer)

**Forms**

- Input field
- Textarea
- Select field
- Form row (label + input)

**UI Elements**

- Buttons (primary, secondary, ghost)
- Badges
- Status chips
- Info banner
- Event banner

Each component includes:

- precise spacing
- consistent radii and shadows
- state variants (default, hover, disabled)

### 4. Defined an Icon Baseline

To keep icons coherent, I established:

- 2px stroke
- rounded caps and corners
- 24x24 artboard
- consistent internal padding

### 5. Documented Everything Inside the Penpot File

I added a small internal documentation section explaining:

- spacing logic
- radius use cases
- color mapping
- how to extend components
- how to apply themes

Clear and functional, not over-engineered.

### 6. Tested the System in Real Mock Screens

To validate the foundations, I created quick test layouts:

- hero section
- card grid
- basic form page
- navigation bar

This helped me check:

- consistency between themes
- readability
- spacing rhythm
- whether components behave correctly

## In Summary

I built a fully hand-crafted design system in Penpot:

- custom tokens
- multiple themes
- a clean component library
- internal documentation
- tested with real layouts

100% created manually, without plugins, generators, or imported kits

It's now a reusable base for future work and a way to experiment visually without being limited by CMS structures or corporate design rules.`,
    de: `## Motivation

In den meisten meiner bisherigen Arbeiten war ich an strenge Corporate-Design-Richtlinien gebunden oder durch CMS-Templates eingeschränkt. Ich konnte visuelle Ideen selten frei testen oder Komponenten nach meinen Vorstellungen bauen.

Ich wollte das Gegenteil:

Ein Design-System, das ich kontrolliere, das ich projektübergreifend wiederverwenden kann und in dem ich Komponenten ohne Einschränkungen visuell testen kann.

Ich wollte auch eine echte Open-Source-Alternative zu Figma. In der Praxis gibt es nur eine Option, die reif genug für den täglichen Einsatz ist: Penpot.

Also baute ich mein eigenes System direkt in Penpot, komplett von Hand.

## Was ich gemacht habe

### 1. Vollständige Token-Basis aufgebaut

Alle Kern-Tokens von Grund auf eingerichtet:

**Farb-Tokens:** Marke, Neutraltöne, Utilities

**Typografie-Tokens:** Überschriften, Fließtext, Bildunterschrift

**Abstands-Tokens:** 4er- und 8er-Raster

**Radius-Tokens:** drei konsistente Eckenformen

**Schatten-Tokens:** vier Stufen

**Icon-Größen-Tokens:** XS bis XL

Alles mit klarer Benennung gruppiert, stabil und skalierbar.

### 2. Sets und Themes strukturiert

Erstellt:

**Sets** (Farben, Radius, Schatten, Typografie, Abstände)

**Themes** zum Umschalten des gesamten visuellen Tons

**Beispiele:**

- Bento Theme (abgerundete Radien, weiche Schatten)
- Neutral Theme (sauberer, klassischer System-Look)
- Bold Theme (stärkerer Kontrast, härtere Kanten)

Alles manuell gebaut, keine importierten UI-Kits.

### 3. Kernkomponenten von Hand erstellt

Jede Komponente von Grund auf entworfen, inklusive Ausrichtung, Constraints und Varianten.

**Layout-Komponenten**

- Frame-Raster
- Card
- Card-Grid
- Section Header
- Navigation
- Tabs (3 Varianten)
- Accordion
- Basic Header
- Mobile Navigation (Bottom Bar und Drawer)

**Formulare**

- Eingabefeld
- Textarea
- Select-Feld
- Formularzeile (Label + Input)

**UI-Elemente**

- Buttons (primary, secondary, ghost)
- Badges
- Status-Chips
- Info-Banner
- Event-Banner

Jede Komponente enthält:

- präzise Abstände
- konsistente Radien und Schatten
- Zustandsvarianten (Standard, Hover, Deaktiviert)

### 4. Icon-Baseline definiert

Für kohärente Icons festgelegt:

- 2px Strichstärke
- Abgerundete Enden und Ecken
- 24x24 Artboard
- Konsistentes internes Padding

### 5. Alles in der Penpot-Datei dokumentiert

Kleine interne Dokumentation mit:

- Abstands-Logik
- Radius-Anwendungsfälle
- Farbzuordnung
- Erweiterung von Komponenten
- Anwendung von Themes

Klar und funktional, nicht überarbeitet.

### 6. System in echten Mock-Screens getestet

Zur Validierung schnelle Testlayouts erstellt:

- Hero-Section
- Card-Grid
- Einfache Formularseite
- Navigationsleiste

Damit geprüft:

- Konsistenz zwischen Themes
- Lesbarkeit
- Abstandsrhythmus
- Korrektes Verhalten der Komponenten

## Zusammenfassung

Ein vollständig handgefertigtes Design-System in Penpot:

- Eigene Tokens
- Mehrere Themes
- Saubere Komponentenbibliothek
- Interne Dokumentation
- Getestet mit echten Layouts

100% manuell erstellt, ohne Plugins, Generatoren oder importierte Kits

Jetzt eine wiederverwendbare Basis für zukünftige Arbeit und eine Möglichkeit, visuell zu experimentieren, ohne durch CMS-Strukturen oder Corporate-Design-Regeln eingeschränkt zu sein.`,
  },
};

export default penpotDesignSystem;
