# OMS INTEGRATION

Simple backend application based on a modular monolith approach. Includes a worker for fetching new/updating data from the OMS, an authorized backend API for accessing stored data and providing it as CSV files, and a shared database layer for consistent data access.

Designed for easy extensibility, database replacement, and seamless integration with Order Management Systems (OMS).

Built with Express.js, MongoDB, and Cron.

## Dataflow schema

![Dataflow schema](./resources/Schema.excalidraw.png)

## Instalation

1. Clone the repository

```bash
git clone  https://github.com/Piootrekk/oms-integration.git
```

2. Make sure to create .env file in root (monorepo directory) based on .env.example

3. Run docker-compose

```bash
docker-compose up --build
```

4. Without docker:

   4.1 Make sure you are inside the monorepo directory.

   4.2 Run the command: `npm install`.

   4.3 Ensure that the `.env` file is correctly set up and database is running.

   4.4 Build the infra package with: `npm run build:infra`.

   4.5 Run the worker and API with: `npm run dev:api` and `npm run dev:worker`.
