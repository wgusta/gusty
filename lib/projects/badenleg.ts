import type { Project } from '../types';

const badenleg: Project = {
  id: 'badenleg',
  title: {
    en: 'Matchmaking-Plattform for Local Energy Communities (LEG)',
    de: 'Matchmaking-Plattform fuer Lokale Elektrizitaetsgemeinschaften (LEG)',
  },
  description: {
    en: 'Matchmaking for local energy communities - A web platform that helps homeowners in Baden (Switzerland) find neighbors to form Local Electricity Communities (LEG) starting in 2026.',
    de: 'Matchmaking fuer lokale Energiegemeinschaften: Eine Webplattform, die Hauseigentuemern in Baden (Schweiz) hilft, Nachbarn fuer Lokale Elektrizitaetsgemeinschaften (LEG) ab 2026 zu finden.',
  },
  tags: ['Flask', 'SendGrid', 'TailwindCSS', 'Leaflet.js', 'Vanilla JavaScript', 'Railway', 'GitHub Actions', 'Gunicorn'],
  column: 'bridged',
  finalizedAt: '2024-11-14',
  status: 'live',
  liveUrl: 'https://badenleg.ch',
  designContent: {
    en: `## Human-Made

### Concept & Architecture

**Product Concept and User Flow**

BadenLEG connects homeowners who want to share solar energy together. Users enter their address, the system finds suitable neighbors nearby and enables direct contact, all with a focus on privacy and anonymity.

**System Architecture**

- Flask app with clear API structure
- In-memory database for MVP
- Multi-layer security approach
- GDPR-compliant privacy design

**Security Concept**

- Input Validation & Sanitization (bleach)
- Rate Limiting (Flask-Limiter)
- Security Headers (CSP, HSTS, X-Frame-Options)
- Token-based email verification
- Coordinate anonymization (120m radius)

### Design & UX

**UI/UX Design**

- TailwindCSS for fast, consistent styling
- Mobile-first responsive layout
- Interactive map integration with Leaflet.js
- Typography & branding in Baden city colors

**Core Features**

- Address-based matching with ML clustering
- Interactive map with anonymized locations (120m jitter)
- Automatic email notifications for new interested parties
- Educational content about LEG, EVL/vEVL and ZEV/vZEV
- GDPR-compliant with one-click unsubscribe

### Development

**Code Architecture**

- Clear structure and modularization
- API endpoint design
- Email templates and logic
- Error handling & logging

**Deployment**

- Railway setup & configuration
- GitHub Actions workflow for CI/CD
- DNS configuration (Infomaniak)
- SendGrid domain authentication

---

## Challenges

### Email Delivery Optimization

**Challenge:** Emails from badenleg.ch were blocked.

**Solution:** Configured SendGrid domain authentication with SPF, DKIM, DMARC records for reliable email delivery.

### Mobile User Experience

**Challenge:** Map overlapped with input fields.

**Solution:** Optimized mobile layout by hiding map on mobile devices, implementing full-screen input panel and centered logo for better usability.`,
    de: `## Handgemacht

### Konzept & Architektur

**Produktkonzept und User Flow**

BadenLEG verbindet Hauseigentuemer, die gemeinsam Solarenergie nutzen wollen. Nutzer geben ihre Adresse ein, das System findet passende Nachbarn in der Naehe und ermoeglicht direkten Kontakt, mit Fokus auf Datenschutz und Anonymitaet.

**Systemarchitektur**

- Flask-App mit klarer API-Struktur
- In-Memory-Datenbank fuer MVP
- Mehrschichtiger Sicherheitsansatz
- DSGVO-konformes Datenschutzdesign

**Sicherheitskonzept**

- Input-Validierung & Sanitization (bleach)
- Rate Limiting (Flask-Limiter)
- Security Headers (CSP, HSTS, X-Frame-Options)
- Token-basierte E-Mail-Verifizierung
- Koordinaten-Anonymisierung (120m Radius)

### Design & UX

**UI/UX Design**

- TailwindCSS fuer schnelles, konsistentes Styling
- Mobile-first responsives Layout
- Interaktive Kartenintegration mit Leaflet.js
- Typografie & Branding in Badener Stadtfarben

**Kernfunktionen**

- Adressbasiertes Matching mit ML-Clustering
- Interaktive Karte mit anonymisierten Standorten (120m Jitter)
- Automatische E-Mail-Benachrichtigungen fuer neue Interessenten
- Bildungsinhalte zu LEG, EVL/vEVL und ZEV/vZEV
- DSGVO-konform mit Ein-Klick-Abmeldung

### Entwicklung

**Code-Architektur**

- Klare Struktur und Modularisierung
- API-Endpunkt-Design
- E-Mail-Templates und Logik
- Fehlerbehandlung & Logging

**Deployment**

- Railway Setup & Konfiguration
- GitHub Actions Workflow fuer CI/CD
- DNS-Konfiguration (Infomaniak)
- SendGrid Domain-Authentifizierung

---

## Herausforderungen

### E-Mail-Zustellung optimieren

**Herausforderung:** E-Mails von badenleg.ch wurden blockiert.

**Loesung:** SendGrid Domain-Authentifizierung mit SPF, DKIM, DMARC Records fuer zuverlaessige E-Mail-Zustellung konfiguriert.

### Mobile Nutzererfahrung

**Herausforderung:** Karte ueberlagerte Eingabefelder.

**Loesung:** Mobiles Layout optimiert: Karte auf Mobilgeraeten ausgeblendet, Vollbild-Eingabebereich und zentriertes Logo fuer bessere Bedienbarkeit.`,
  },
  aiContent: {
    en: `## AI-Assisted Development

### Code Generation

**Flask Endpoints and API Logic**

AI assistance in developing Flask endpoints and API logic for fast iteration and consistent patterns.

**Frontend JavaScript**

- Address autocomplete functionality
- Map integration with Leaflet.js
- Vanilla JavaScript without frameworks for direct DOM manipulation

**Security Utilities**

- Input validation implementation (bleach)
- Sanitization functions
- Email functions (SendGrid integration)

### Optimizations

**Performance Optimizations**

- Caching strategies for repeated requests
- Async tasks for background processing (email sending)
- Code refactoring and modularization

**Bug Fixes**

- Token persistence on Railway
- Duplicate detection in registrations
- Timeout issues with external API calls

### Documentation

- README.md and deployment guides
- SEO content (meta tags, structured data)
- Privacy policy & legal notice

### Debugging

- Error analysis (timeout problems, token issues)
- Log analysis and troubleshooting
- Performance profiling

---

## ML Functions

### DBSCAN Clustering

Groups buildings by geographic proximity (150m radius) and uses Haversine distance for earth curvature. Identifies optimal community formation with minimum size of 2-3 buildings per cluster.

### Autarky Simulation

Generates 15-minute time series profiles for consumption and PV production, simulates seasonal variations (summer/winter) and calculates autarky score for optimal match quality.

### Ranking

Clusters are sorted by autarky score - highest autarky = best match quality. Results are visualized in real-time on the map.

---

## Challenges

### Persistent Token Management

**Challenge:** Railway deletes the filesystem on every deployment. Tokens in separate JSON files were lost.

**Solution:** Store tokens directly in main database records for reliable persistence.

\`\`\`python
def issue_verification_token(building_id):
    """Creates a verification token and stores it in the DB record."""
    token = str(uuid.uuid4())

    # Invalidate old tokens for this building_id
    tokens_to_remove = [
        t for t, info in DB_VERIFICATION_TOKENS.items()
        if info.get('building_id') == building_id
    ]
    for t in tokens_to_remove:
        DB_VERIFICATION_TOKENS.pop(t, None)

    # Store token in main database record (persistent!)
    with db_lock:
        record, source = _get_record_for_building_no_lock(building_id)
        if record:
            record['verification_token'] = token  # Directly in record
            if source == 'registered':
                DB_BUILDINGS[building_id] = record
            elif source == 'anonymous':
                DB_INTEREST_POOL[building_id] = record

    DB_VERIFICATION_TOKENS[token] = {
        'building_id': building_id,
        'created_at': time.time()
    }
    return token
\`\`\`

### Fast Response Endpoint

**Challenge:** After address input, timeouts occurred due to slow external API calls and intensive ML calculations.

**Solution:** Implemented fast endpoint with pre-fetched coordinates, background threading and deterministic mock data for instant responses.

\`\`\`python
@app.route("/api/check_potential_fast", methods=['POST'])
def api_check_potential_fast():
    """Ultra-fast endpoint: Uses pre-fetched coordinates, no external APIs."""
    if not request.json:
        return jsonify({"error": "No data."}), 400

    # Directly from autocomplete suggestion (already geocoded!)
    lat = request.json.get('lat')
    lon = request.json.get('lon')

    if not lat or not lon:
        return jsonify({"error": "Coordinates missing."}), 400

    # Generate deterministic profile (no external API calls!)
    profile = generate_quick_profile(lat, lon, address_string)

    # Fast distance search (no autarky calculation)
    provisional_matches = find_provisional_matches_fast(profile)

    # Email sending in background thread (does not block!)
    if provisional_matches:
        threading.Thread(
            target=send_confirmation_email,
            args=(email, unsubscribe_url),
            daemon=True
        ).start()

    return jsonify({"match": provisional_matches})
\`\`\``,
    de: `## KI-gestuetzte Entwicklung

### Code-Generierung

**Flask-Endpunkte und API-Logik**

KI-Unterstuetzung bei der Entwicklung von Flask-Endpunkten und API-Logik fuer schnelle Iteration und konsistente Muster.

**Frontend JavaScript**

- Adress-Autocomplete-Funktionalitaet
- Kartenintegration mit Leaflet.js
- Vanilla JavaScript ohne Frameworks fuer direkte DOM-Manipulation

**Sicherheits-Utilities**

- Input-Validierung (bleach)
- Sanitization-Funktionen
- E-Mail-Funktionen (SendGrid-Integration)

### Optimierungen

**Performance-Optimierungen**

- Caching-Strategien fuer wiederholte Anfragen
- Async Tasks fuer Hintergrundverarbeitung (E-Mail-Versand)
- Code-Refactoring und Modularisierung

**Bugfixes**

- Token-Persistenz auf Railway
- Duplikaterkennung bei Registrierungen
- Timeout-Probleme mit externen API-Aufrufen

### Dokumentation

- README.md und Deployment-Guides
- SEO-Inhalte (Meta-Tags, strukturierte Daten)
- Datenschutzerklaerung & Impressum

### Debugging

- Fehleranalyse (Timeout-Probleme, Token-Probleme)
- Log-Analyse und Troubleshooting
- Performance-Profiling

---

## ML-Funktionen

### DBSCAN-Clustering

Gruppiert Gebaeude nach geografischer Naehe (150m Radius) und nutzt Haversine-Distanz fuer Erdkruemmung. Identifiziert optimale Gemeinschaftsbildung mit Mindestgroesse von 2-3 Gebaeuden pro Cluster.

### Autarkie-Simulation

Erzeugt 15-Minuten-Zeitreihenprofile fuer Verbrauch und PV-Produktion, simuliert saisonale Schwankungen (Sommer/Winter) und berechnet Autarkie-Score fuer optimale Match-Qualitaet.

### Ranking

Cluster werden nach Autarkie-Score sortiert: hoechste Autarkie = beste Match-Qualitaet. Ergebnisse werden in Echtzeit auf der Karte visualisiert.

---

## Herausforderungen

### Persistentes Token-Management

**Herausforderung:** Railway loescht das Dateisystem bei jedem Deployment. Tokens in separaten JSON-Dateien gingen verloren.

**Loesung:** Tokens direkt in den Haupt-Datenbankeintraegen speichern fuer zuverlaessige Persistenz.

\`\`\`python
def issue_verification_token(building_id):
    """Creates a verification token and stores it in the DB record."""
    token = str(uuid.uuid4())

    # Invalidate old tokens for this building_id
    tokens_to_remove = [
        t for t, info in DB_VERIFICATION_TOKENS.items()
        if info.get('building_id') == building_id
    ]
    for t in tokens_to_remove:
        DB_VERIFICATION_TOKENS.pop(t, None)

    # Store token in main database record (persistent!)
    with db_lock:
        record, source = _get_record_for_building_no_lock(building_id)
        if record:
            record['verification_token'] = token  # Directly in record
            if source == 'registered':
                DB_BUILDINGS[building_id] = record
            elif source == 'anonymous':
                DB_INTEREST_POOL[building_id] = record

    DB_VERIFICATION_TOKENS[token] = {
        'building_id': building_id,
        'created_at': time.time()
    }
    return token
\`\`\`

### Schneller Antwort-Endpunkt

**Herausforderung:** Nach Adresseingabe traten Timeouts durch langsame externe API-Aufrufe und intensive ML-Berechnungen auf.

**Loesung:** Schnellen Endpunkt mit vorgeladenen Koordinaten, Hintergrund-Threading und deterministischen Mock-Daten fuer sofortige Antworten implementiert.

\`\`\`python
@app.route("/api/check_potential_fast", methods=['POST'])
def api_check_potential_fast():
    """Ultra-fast endpoint: Uses pre-fetched coordinates, no external APIs."""
    if not request.json:
        return jsonify({"error": "No data."}), 400

    lat = request.json.get('lat')
    lon = request.json.get('lon')

    if not lat or not lon:
        return jsonify({"error": "Coordinates missing."}), 400

    profile = generate_quick_profile(lat, lon, address_string)
    provisional_matches = find_provisional_matches_fast(profile)

    if provisional_matches:
        threading.Thread(
            target=send_confirmation_email,
            args=(email, unsubscribe_url),
            daemon=True
        ).start()

    return jsonify({"match": provisional_matches})
\`\`\``,
  },
};

export default badenleg;
