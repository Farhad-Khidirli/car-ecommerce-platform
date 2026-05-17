# Marketplace Monolith

A modular marketplace platform inspired by vehicle, real estate, and goods classifieds.

## Stack

- Backend: Java 21, Spring Boot, PostgreSQL
- Frontend: Next.js, TypeScript
- Database migrations: Flyway
- Local infrastructure: Docker Compose

## Repository Layout

```text
apps/
  api/       Spring Boot modular monolith backend
  web/       Next.js frontend
docs/        Product and architecture notes
infra/       Local infrastructure and deployment helpers
```

## First Local Steps

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

3. Start the backend from `apps/api`.
4. Start the frontend from `apps/web`.

The backend is intentionally organized by business domains so vehicles, real estate, and general goods can grow without becoming one large tangled package.
