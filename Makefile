render:
	cd frontend && npm install && npm run build

start:
	npx start-server -s ./frontend/dist

install:
	npm ci

build:
	rm -rf frontend/dist
	npm run build