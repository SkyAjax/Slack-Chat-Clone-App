lint-frontend:
	make -C slack-chat lint

install:
	npm ci

start-frontend:
	make -C slack-chat start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

start-prod:
	npm run start

build: 
	npm run build