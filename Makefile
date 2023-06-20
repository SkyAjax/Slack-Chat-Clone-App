lint-frontend:
	make -C slack-chat lint

install:
	npm ci

start-frontend:
	make -C slack-chat start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend