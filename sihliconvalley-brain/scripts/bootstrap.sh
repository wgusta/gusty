#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${PROJECT_ROOT}/.env"
COMPOSE_BIN="docker compose"

log() { printf "==> %s\n" "$*"; }
warn() { printf "WARN: %s\n" "$*" >&2; }

ensure_colima() {
  if command -v colima >/dev/null 2>&1; then
    log "Starting Colima (vz, 2 CPU, 4GB, 30GB, docker runtime)..."
    colima start --cpu 2 --memory 4 --disk 30 --arch aarch64 --vm-type vz --runtime docker || {
      warn "Colima vz failed, retrying with qemu..."
      colima start --cpu 2 --memory 4 --disk 30 --arch aarch64 --vm-type qemu --runtime docker
    }
  else
    warn "Colima not installed; assuming Docker Desktop or another daemon is running."
  }
}

ensure_compose_plugin() {
  if ! ${COMPOSE_BIN} version >/dev/null 2>&1; then
    warn "Docker Compose plugin not found. If docker-compose is installed via brew, linking it..."
    if command -v docker-compose >/dev/null 2>&1; then
      mkdir -p "${HOME}/.docker/cli-plugins"
      ln -sf "$(command -v docker-compose)" "${HOME}/.docker/cli-plugins/docker-compose"
      ${COMPOSE_BIN} version
    else
      warn "docker-compose not installed. Install via: brew install docker-compose"
      exit 1
    }
  fi
}

ensure_env() {
  if [ ! -f "${ENV_FILE}" ]; then
    log "Creating .env from template..."
    cat > "${ENV_FILE}" <<'EOF'
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# n8n security
N8N_ENCRYPTION_KEY=CHANGE_ME_32_HEX
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=CHANGE_ME_STRONG

# database
POSTGRES_USER=brain
POSTGRES_PASSWORD=CHANGE_ME_DB_PASSWORD
POSTGRES_DB=sihliconvalley_brain

# notifications
NTFY_TOPIC=CHANGE_ME_NTFY_TOPIC

# optional extras (uncomment when used)
# GITHUB_TOKEN=
# RESEND_API_KEY=
EOF
    warn "Fill in the CHANGE_ME/blank values in .env before running compose."
  else
    log ".env already present, leaving untouched."
  }
}

main() {
  ensure_colima
  ensure_compose_plugin
  ensure_env
  log "Done. Use 'make up' to start the stack."
}

main "$@"
