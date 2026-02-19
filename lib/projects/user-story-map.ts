import type { Project } from '../types';

const userStoryMap: Project = {
  id: 'user-story-map',
  title: 'User Story Map Tool',
  description: {
    en: 'A standalone HTML tool for creating and managing User Story Maps in workshops. Built with vanilla JavaScript, no external dependencies.',
    de: 'Ein eigenständiges HTML-Tool zum Erstellen und Verwalten von User Story Maps in Workshops. Gebaut mit Vanilla JavaScript, ohne externe Abhängigkeiten.',
  },
  tags: ['HTML', 'CSS', 'Vanilla JavaScript', 'localStorage', 'CSV Export'],
  column: 'ai',
  finalizedAt: '2024-12-01',
  downloadUrl: '/workshop-map11.html',
  aiContent: {
    en: `## Overview

The process began with the idea of building one HTML tool that combined a Customer Journey Map and a User Story Map. It seemed efficient, but it introduced complexity very early. Two different conceptual models inside one file created maintenance issues, made debugging harder and slowed down iteration.

## How the Work Happened

### Initial build

The first version placed both maps in a single HTML document with shared data structures and shared export and import functions. At this stage the separation between the two tools was loose and grew tangled as more features were added.

### Shift in scope

During the iterations it became clear that the Customer Journey part did not add real value for the intended workshop workflow. The scope shifted toward focusing entirely on the User Story Map. This decision simplified the purpose but required removing many interconnected parts. Because both maps had shared logic, deleting the Customer Journey elements revealed hidden dependencies that affected data handling.

### Refactoring on a moving target

The Customer Journey components were removed, the UI was simplified and the export and import logic was reconnected to work exclusively with the User Story Map. Several remnants from the previous structure remained, including naming conventions and selectors that still pointed to the old model, which caused imported data to land in incorrect positions.

### Usability refinements

After the structural cleanup, the tool received refinements such as direct editing after double clicking, automatic text selection, safe deletion prompts for rows and columns and a fresh title field for project naming. These refinements required additional internal adjustments.

## Where the Process Got Messy

### No fixed data model at the beginning

A clear definition of rows, columns, cards and the corresponding CSV or JSON schema was never locked down at the start. Without a stable contract, the import and export system remained fragile and prone to unexpected behavior.

### Scope changes caused structural stress

Switching from a combined tool to a pure User Story Map meant removing code that was deeply interlinked with the original logic. This triggered cascading adjustments.

### Export and import validated too late

Most early attention went to the interface rather than the data pipeline. When export and import were finally tested in a realistic scenario, the issues surfaced late and required larger rewrites.

## What Still Worked Well

### Testing with real data

Using real CSV files exposed flaws early enough to avoid major issues at the end of the development cycle.

### Precise feedback loops

The process benefited from clear and unambiguous observations about what worked and what did not, which accelerated iteration.

### Scope reduction improved clarity

Removing the Customer Journey Map sharpened the focus and allowed a cleaner, more maintainable structure.

## How to Handle This Better Next Time

### Define the data model before coding

A JSON example and CSV schema should be created first. Each row, column and card needs explicit fields. This serves as a stable contract that guides all logic.

### Start with a tiny MVP

Only the User Story Map. Rows, columns, cards and export and import. Nothing more.

### Introduce usability later

After the data model is stable, editing behavior, styling and safety confirmations can be layered on top.

### Separate logic from interface

Data handling functions and UI rendering should be clearly separated. This prevents structural changes from affecting the entire codebase.

---

**Download the tool:** [workshop-map11.html](/workshop-map11.html) - A standalone HTML file that works offline, saves to localStorage, and exports to CSV. You can download it and use it directly in your browser without any setup.

The tool is available for download above and can be used immediately in any modern browser. Download the HTML file to get started with your User Story Map workshops.

**Get the tool:** The complete User Story Map tool is ready for download. Simply click the download button above or use this link: [workshop-map11.html](/workshop-map11.html). The file works completely offline and requires no installation or external dependencies.

**Ready to use:** Download the HTML file and open it in any modern browser to start creating User Story Maps in your workshops. All data is saved locally in your browser's localStorage, and you can export your maps to CSV format at any time.`,
    de: `## Überblick

Der Prozess begann mit der Idee, ein HTML-Tool zu bauen, das Customer Journey Map und User Story Map kombiniert. Es schien effizient, führte aber früh zu Komplexität. Zwei verschiedene konzeptuelle Modelle in einer Datei verursachten Wartungsprobleme, erschwerten Debugging und verlangsamten die Iteration.

## Wie die Arbeit ablief

### Erster Build

Die erste Version platzierte beide Maps in einem HTML-Dokument mit gemeinsamen Datenstrukturen und geteilten Export/Import-Funktionen. Die Trennung der beiden Tools war lose und wurde mit jeder neuen Funktion unübersichtlicher.

### Scope-Änderung

Während der Iterationen wurde klar, dass der Customer-Journey-Teil keinen echten Mehrwert für den geplanten Workshop-Workflow brachte. Der Fokus verschob sich komplett auf die User Story Map. Diese Entscheidung vereinfachte den Zweck, erforderte aber das Entfernen vieler verflochtener Teile.

### Refactoring eines beweglichen Ziels

Die Customer-Journey-Komponenten wurden entfernt, die UI vereinfacht und die Export/Import-Logik auf die User Story Map umgestellt. Überreste der alten Struktur blieben zurück, darunter Namenskonventionen und Selektoren, die noch auf das alte Modell zeigten.

### Usability-Verfeinerungen

Nach dem strukturellen Aufräumen erhielt das Tool Verfeinerungen: direktes Bearbeiten nach Doppelklick, automatische Textauswahl, sichere Löschabfragen für Zeilen und Spalten sowie ein Titelfeld für Projektnamen.

## Wo es unordentlich wurde

### Kein festes Datenmodell zu Beginn

Eine klare Definition von Zeilen, Spalten, Karten und dem zugehörigen CSV/JSON-Schema wurde nie zu Beginn festgelegt. Ohne stabilen Vertrag blieb das Import/Export-System fragil.

### Scope-Änderungen verursachten strukturellen Stress

Der Wechsel vom kombinierten Tool zur reinen User Story Map bedeutete, Code zu entfernen, der tief mit der ursprünglichen Logik verflochten war.

### Export und Import zu spät validiert

Der Großteil der frühen Aufmerksamkeit ging an die Oberfläche statt an die Datenpipeline. Als Export und Import in einem realistischen Szenario getestet wurden, tauchten Probleme spät auf.

## Was gut funktioniert hat

### Testen mit echten Daten

Echte CSV-Dateien deckten Fehler früh genug auf, um größere Probleme am Ende des Entwicklungszyklus zu vermeiden.

### Präzise Feedback-Schleifen

Klare und eindeutige Beobachtungen darüber, was funktionierte und was nicht, beschleunigten die Iteration.

### Scope-Reduktion verbesserte Klarheit

Das Entfernen der Customer Journey Map schärfte den Fokus und ermöglichte eine sauberere Struktur.

## Nächstes Mal besser

### Datenmodell vor dem Coding definieren

Zuerst ein JSON-Beispiel und CSV-Schema erstellen. Jede Zeile, Spalte und Karte braucht explizite Felder.

### Mit einem winzigen MVP starten

Nur die User Story Map. Zeilen, Spalten, Karten und Export/Import. Nichts weiter.

### Usability später einführen

Nach stabilem Datenmodell können Bearbeitungsverhalten, Styling und Sicherheitsabfragen aufgesetzt werden.

### Logik von Interface trennen

Datenverarbeitungsfunktionen und UI-Rendering klar trennen. So verhindern strukturelle Änderungen kaskadierende Effekte.

---

**Tool herunterladen:** [workshop-map11.html](/workshop-map11.html) \u2013 Eine eigenständige HTML-Datei, die offline funktioniert, im localStorage speichert und nach CSV exportiert.

**Einsatzbereit:** HTML-Datei herunterladen und in jedem modernen Browser öffnen, um User Story Maps in Workshops zu erstellen.`,
  },
};

export default userStoryMap;
