PROJECT_ROOT := $(shell pwd)

.PHONY: bootstrap colima-start up down logs n8n-logs

bootstrap:
	@scripts/bootstrap.sh

colima-start:
	@colima start --cpu 2 --memory 4 --disk 30 --arch aarch64 --vm-type vz --runtime docker || \
	(colima start --cpu 2 --memory 4 --disk 30 --arch aarch64 --vm-type qemu --runtime docker)

up:
	@docker compose up -d

down:
	@docker compose down

logs:
	@docker compose logs -f

n8n-logs:
	@docker compose logs -f n8n
