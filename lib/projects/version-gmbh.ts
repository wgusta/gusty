import type { Project } from '../types';

const versionGmbh: Project = {
  id: 'version-gmbh',
  title: 'Version GmbH',
  description: {
    en: 'AI-first consulting company platform with OpenClaw API gateway, MCP server, n8n AI workflows, and Authelia SSO. Full-stack multi-service architecture orchestrated by Claude.',
    de: 'KI-first Beratungsunternehmen-Plattform mit OpenClaw-API-Gateway, MCP-Server, n8n-KI-Workflows und Authelia SSO. Full-Stack-Multi-Service-Architektur, orchestriert durch Claude.',
  },
  tags: ['Next.js 15', 'Express', 'n8n', 'Anthropic SDK', 'Authelia', 'Docker', 'Caddy'],
  column: 'ai',
  finalizedAt: '2025-05-20',
  status: 'live',
  liveUrl: 'https://version.gmbh',
  aiContent: {
    en: `## AI-First Architecture

### OpenClaw API Gateway

Custom API gateway built with Express.js that routes requests between the frontend, n8n workflows, and external AI providers. Acts as the central nervous system of the platform.

**Features:**

- Request routing and load balancing
- API key management and rotation
- Rate limiting per client
- Request/response logging for audit
- Anthropic SDK integration for Claude API calls

### MCP Server

Model Context Protocol server providing Claude with structured access to company data:

- Customer database queries
- Document retrieval and search
- Calendar and scheduling data
- Invoice and billing information

### n8n AI Workflows

Automated business workflows powered by n8n with AI nodes:

- Customer inquiry classification and routing
- Automated translation (German, Turkish, English)
- Insurance document processing
- Tax document preparation assistance
- Email response drafting

### Multi-Service Architecture

**Services orchestrated via Docker Compose:**

- Website (Next.js 15)
- Admin Dashboard (Next.js 15)
- Portal (customer-facing app)
- OpenClaw Gateway (Express)
- n8n (workflow automation)
- Authelia (SSO/authentication)
- Caddy (reverse proxy, auto-HTTPS)
- PostgreSQL (shared database)

### Authelia SSO

Single sign-on across all services:

- OIDC provider for portal and admin
- Two-factor authentication
- Session management
- Access control policies per service

### Deployment

All services deployed on Infomaniak VPS (83.228.216.13):

- Docker Compose for service orchestration
- Caddy for automatic TLS certificates
- rsync-based deployment pipeline
- Zero-downtime rolling updates`,
    de: `## KI-First-Architektur

### OpenClaw API-Gateway

Massgeschneidertes API-Gateway, gebaut mit Express.js, das Anfragen zwischen Frontend, n8n-Workflows und externen KI-Anbietern routet. Fungiert als zentrales Nervensystem der Plattform.

**Features:**

- Request-Routing und Load Balancing
- API-Key-Management und Rotation
- Rate Limiting pro Client
- Request/Response-Logging fuer Audit
- Anthropic-SDK-Integration fuer Claude-API-Aufrufe

### MCP-Server

Model-Context-Protocol-Server, der Claude strukturierten Zugriff auf Unternehmensdaten bietet:

- Kundendatenbank-Abfragen
- Dokumentensuche und -abruf
- Kalender- und Terminplanungsdaten
- Rechnungs- und Abrechnungsinformationen

### n8n-KI-Workflows

Automatisierte Geschaeftsprozesse mit n8n und KI-Nodes:

- Kundenanfragen-Klassifizierung und Routing
- Automatische Uebersetzung (Deutsch, Tuerkisch, Englisch)
- Versicherungsdokumenten-Verarbeitung
- Steuerdokumenten-Vorbereitungshilfe
- E-Mail-Antwort-Entwuerfe

### Multi-Service-Architektur

**Services orchestriert via Docker Compose:**

- Website (Next.js 15)
- Admin-Dashboard (Next.js 15)
- Portal (kundenorientierte App)
- OpenClaw Gateway (Express)
- n8n (Workflow-Automatisierung)
- Authelia (SSO/Authentifizierung)
- Caddy (Reverse Proxy, Auto-HTTPS)
- PostgreSQL (gemeinsame Datenbank)

### Authelia SSO

Single Sign-On ueber alle Services:

- OIDC-Provider fuer Portal und Admin
- Zwei-Faktor-Authentifizierung
- Session-Management
- Zugriffsrichtlinien pro Service

### Deployment

Alle Services deployed auf Infomaniak VPS (83.228.216.13):

- Docker Compose fuer Service-Orchestrierung
- Caddy fuer automatische TLS-Zertifikate
- rsync-basierte Deployment-Pipeline
- Zero-Downtime Rolling Updates`,
  },
};

export default versionGmbh;
