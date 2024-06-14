ifneq ("$(wildcard .env)","")
    include .env
endif


up:
	@docker compose up -d --remove-orphans --build --force-recreate

down:
	@docker compose down --remove-orphans

exec:
	@docker compose exec -u root app sh

restart:
	make down && make up