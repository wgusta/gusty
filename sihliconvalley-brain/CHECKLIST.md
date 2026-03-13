# Quick Start Checklist

1) Bootstrap (starts Colima if present, checks compose plugin, scaffolds .env if missing):
```bash
make bootstrap
```

2) Fill `.env` (replace CHANGE_ME/blank values):
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- N8N_ENCRYPTION_KEY (32-hex)
- N8N_BASIC_AUTH_USER / N8N_BASIC_AUTH_PASSWORD
- POSTGRES_PASSWORD
- NTFY_TOPIC
- Optional: GITHUB_TOKEN, RESEND_API_KEY

3) Start stack:
```bash
make up
```

4) n8n credentials to create and map:
- PostgreSQL: host `postgres`, db `sihliconvalley_brain`, user `brain`, password from `.env` (name it `Brain PostgreSQL`)
- No OpenAI credential needed (HTTP node reads env key)

5) Test workflows (manual run in n8n):
- Daily Health Check → writes `health_checks`, ntfy on issues
- Board Meeting (lean, single LLM call) → stores minutes to `board_meetings`

6) Inspect logs:
```bash
make logs      # all services
make n8n-logs  # n8n only
```

Archived/optional:
- Email assistant: `archive/02-executive-assistant.json`
- Original multi-agent board: `archive/03-wednesday-board-meeting-original.json`
- Reverse proxy sample: `archive/Caddyfile`
