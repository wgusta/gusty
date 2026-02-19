import type { Project } from '../types';

const therapylist: Project = {
  id: 'therapylist',
  title: {
    en: 'TherapyList: Swiss Encrypted Waitlist Platform for Mental Health Therapists',
    de: 'TherapyList: Verschlüsselte Schweizer Wartelisten-Plattform für Psychotherapeuten',
  },
  description: {
    en: 'SaaS platform that replaces spreadsheet waitlists for therapists. Clients submit structured intake forms, therapists send tone-matched availability updates in one click. All patient data AES-256-GCM encrypted, Swiss-hosted, DSG compliant. Optional HIN and Vault integration for clinics. 4 languages (DE/FR/IT/EN), CHF 29/month.',
    de: 'SaaS-Plattform, die Tabellen-Wartelisten für Therapeuten ersetzt. Klienten reichen strukturierte Aufnahmeformulare ein, Therapeuten senden tongerechte Verfügbarkeits-Updates mit einem Klick. Alle Patientendaten AES-256-GCM-verschlüsselt, in der Schweiz gehostet, DSG-konform. Optionale HIN- und Vault-Integration für Praxen. 4 Sprachen (DE/FR/IT/EN), CHF 29/Monat.',
  },
  tags: ['Next.js 15', 'PostgreSQL', 'Drizzle ORM', 'AES-256-GCM', 'Docker', 'Caddy'],
  column: 'bridged',
  finalizedAt: '2025-05-01',
  status: 'live',
  liveUrl: 'https://therapylist.ch',
  designContent: {
    en: `## Human-Made

### Security-First Architecture

Every security decision was made manually. This is a health-adjacent platform handling sensitive patient data under Swiss DSG (Data Protection Act).

**Encryption**

- AES-256-GCM for all patient data at rest
- Per-therapist encryption keys
- Key derivation with proper salt and iterations
- Zero plaintext patient names in the database

**Authentication**

- Magic link auth (no passwords to leak)
- Secure token generation and expiry
- Rate limiting on auth endpoints
- Session management with HTTP-only cookies

**Infrastructure**

- Self-hosted on Swiss VPS (Infomaniak)
- No data leaves Switzerland
- Caddy for automatic HTTPS
- Docker isolation between services

### Business Logic

- Therapist onboarding flow
- Patient waitlist management with priority queue
- Swiss QR-invoice generation for billing
- Automated reminder emails
- Multi-therapist practice support

### Data Model

Designed the entire Drizzle ORM schema by hand:

- Therapists, practices, patients, waitlist entries
- Audit logging for compliance
- Soft deletes for data retention requirements
- Encrypted fields with transparent decryption layer`,
    de: `## Handgemacht

### Security-First-Architektur

Jede Sicherheitsentscheidung wurde manuell getroffen. Dies ist eine gesundheitsnahe Plattform, die sensible Patientendaten unter dem Schweizer DSG (Datenschutzgesetz) verarbeitet.

**Verschlüsselung**

- AES-256-GCM für alle Patientendaten im Ruhezustand
- Pro-Therapeut-Verschlüsselungsschlüssel
- Schlüsselableitung mit korrektem Salt und Iterationen
- Kein Klartext-Patientenname in der Datenbank

**Authentifizierung**

- Magic-Link-Auth (keine Passwörter, die leaken könnten)
- Sichere Token-Generierung und Ablauf
- Rate Limiting auf Auth-Endpunkten
- Session-Management mit HTTP-only Cookies

**Infrastruktur**

- Self-hosted auf Schweizer VPS (Infomaniak)
- Keine Daten verlassen die Schweiz
- Caddy für automatisches HTTPS
- Docker-Isolation zwischen Services

### Geschäftslogik

- Therapeuten-Onboarding-Flow
- Patienten-Wartelistenverwaltung mit Prioritätswarteschlange
- Schweizer QR-Rechnungsgenerierung
- Automatische Erinnerungs-E-Mails
- Unterstützung für Mehrfach-Therapeuten-Praxen

### Datenmodell

Gesamtes Drizzle-ORM-Schema von Hand entworfen:

- Therapeuten, Praxen, Patienten, Wartelisteneinträge
- Audit-Logging für Compliance
- Soft Deletes für Datenaufbewahrungsanforderungen
- Verschlüsselte Felder mit transparenter Entschlüsselungsschicht`,
  },
  aiContent: {
    en: `## AI-Assisted

### Claude as Development Assistant

Claude was used as a pair programming partner, not as the architect. The human made all security and architecture decisions; Claude helped implement them faster.

**Implementation support:**

- Drizzle ORM migration scripts
- Email template HTML/CSS
- QR-invoice generation code (Swiss QR-bill standard)
- Docker Compose configuration
- Caddy reverse proxy setup

### Code Review

Claude reviewed code for:

- SQL injection vulnerabilities
- XSS attack vectors
- Authentication bypass risks
- Encryption implementation correctness

### Documentation

- API endpoint documentation
- Deployment runbook
- Security audit checklist
- DSG compliance documentation`,
    de: `## KI-gestützt

### Claude als Entwicklungsassistent

Claude wurde als Pair-Programming-Partner eingesetzt, nicht als Architekt. Der Mensch traf alle Sicherheits- und Architekturentscheidungen; Claude half bei der schnelleren Umsetzung.

**Implementierungsunterstützung:**

- Drizzle-ORM-Migrationsskripte
- E-Mail-Template HTML/CSS
- QR-Rechnungs-Generierungscode (Schweizer QR-Rechnung Standard)
- Docker-Compose-Konfiguration
- Caddy-Reverse-Proxy-Setup

### Code Review

Claude prüfte Code auf:

- SQL-Injection-Schwachstellen
- XSS-Angriffsvektoren
- Authentifizierungs-Bypass-Risiken
- Korrektheit der Verschlüsselungsimplementierung

### Dokumentation

- API-Endpunkt-Dokumentation
- Deployment-Runbook
- Sicherheits-Audit-Checkliste
- DSG-Compliance-Dokumentation`,
  },
};

export default therapylist;
