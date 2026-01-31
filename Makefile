start:
	npx start-server -s ./frontend/dist

install:
	npm ci

build:
	rm -rf frontend/dist
	npm run build

dev:
	npm run dev --prefix frontend

lint:
	npm run lint --prefix frontend

