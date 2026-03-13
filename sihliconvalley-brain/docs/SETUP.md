# Sihliconvalley Brain: Lean Setup

Minimal stack: Docker (n8n + Postgres) with one LLM key and ntfy alerts. Everything else is optional.

---

## Prereqs
- Docker Engine + Compose plugin
- OpenAI API key (for `gpt-4o-mini` / `gpt-4.1`)
- ntfy topic (e.g., `sihliconvalley-brain-xyz`)

---

## 1) Bootstrap locally or on the VPS
```bash
git clone <repo> sihliconvalley-brain && cd sihliconvalley-brain
make bootstrap   # scaffolds .env if missing
```

Fill `.env` (created by bootstrap):
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `N8N_ENCRYPTION_KEY` (32-hex; `openssl rand -hex 16`)
- `N8N_BASIC_AUTH_USER` / `N8N_BASIC_AUTH_PASSWORD`
- `POSTGRES_PASSWORD`
- `NTFY_TOPIC` (ntfy.sh topic name)

Optional (uncomment in `.env`): `GITHUB_TOKEN`, `RESEND_API_KEY`.

---

## 2) Start the stack
```bash
make up
docker compose ps
```
Port: n8n on `http://localhost:5679` (mapped to container 5678). If running remote, create an SSH tunnel or add a reverse proxy; the old Caddyfile lives in `archive/` if needed.

Initialize DB schema once:
```bash
docker compose exec -T postgres psql -U brain -d sihliconvalley_brain < db/schema.sql
```

---

## 3) n8n login
- Open `http://localhost:5679` (or tunneled URL)
- Basic auth uses `N8N_BASIC_AUTH_*` from `.env`
- Create the first n8n user if prompted

---

## 4) Credentials to create in n8n
- PostgreSQL (name it `Brain PostgreSQL` to match the workflows):
  - Host `postgres`
  - DB `sihliconvalley_brain`
  - User `brain`
  - Password from `.env`
- No OpenAI credential needed; HTTP nodes read `OPENAI_API_KEY` from env.

---

## 5) Import and map workflows
1) Import `workflows/01-daily-health-check.json`  
2) Import `workflows/03-wednesday-board-meeting.json` (simplified single-call version)  
3) When prompted, select the `Brain PostgreSQL` credential on the Postgres nodes.
4) Toggle “Active” once tested (health check daily, board meeting Wednesday 14:00; you can also run manually).

Archived/optional:
- `archive/02-executive-assistant.json` (email assistant)
- `archive/03-wednesday-board-meeting-original.json` (multi-agent version)
- `archive/Caddyfile` (if you need HTTPS/public exposure)

---

## 6) Smoke tests
- Manual run “Daily Health Check” → should write to `health_checks` and send ntfy on issues.
- Manual run “Wednesday Board Meeting” → should call OpenAI once, store minutes in `board_meetings`, and send ntfy.
```bash
docker compose logs -f n8n
docker compose logs -f postgres
```

---

## 7) Backups & ops
- DB dump: `docker compose exec postgres pg_dump -U brain sihliconvalley_brain > backup_$(date +%Y%m%d).sql`
- n8n export (manual): `docker compose exec n8n n8n export:workflow --all --output=/home/node/.n8n/backups/`
- Update: `docker compose pull && docker compose up -d`
- Restart: `docker compose restart`

---

## 8) Optional hardening
- If exposing publicly: put a reverse proxy with TLS + IP allowlist (sample in `archive/Caddyfile`).
- Enable 2FA on OpenAI; rotate `N8N_ENCRYPTION_KEY` only with a fresh n8n install (changing it invalidates credentials).
