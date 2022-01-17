# AntHR
# Development Environments

## Prerequirement

Please refer to the [setup guide](https://github.com/hamongkhang/AntHR/edit/master/README.md)

## Setup

- Backend:

  - Create .env
      cp .env.example .env
  - Create a database
  - npm install
  - npm run dev
  - composer i
  - php artisan jwt:secret
  - php artisan serve

- Frontend:

  - npm install
  - npm start

- Fullstack:

  - yarn package:all
  - cd backend/services/<SERVICE_NAME>
  - yarn start:dev

## DEPLOYMENT

- docker build -f ./deploy/backend.Dockerfile --build-arg SERVICE=<SERVICE_NAME> --build-arg VERSION=<SERVICE_VERSION> .
- docker build -f ./deploy/frontend.Dockerfile --build-arg SERVICE=<WEBAPP_NAME> --build-arg VERSION=<WEBAPP_VERSION> .

## COMMIT STEP

## COMMIT MESSAGE CONVENTION

- type:
  - feat: A new feature
  - fix: A bug fix
  - chore: Build process or auxiliary tool changes
  - perf: A code change that improves performance
  - test: Adding missing tests
  - docs: Documentation only changes
  - ci: CI related changes
  - style: Markup, white-space, formatting, missing semi-colons...
  - refactor: A code change that neither fixes a bug or adds a feature
