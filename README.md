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

## Run With Docker

1. Copy `.env.example` to `.env`.
2. Build and start the full stack:

   ```bash
   docker compose up --build
   ```

3. Open the app:

   - Web: http://localhost:3000
   - API health: http://localhost:8080/api/health

4. Stop the stack:

   ```bash
   docker compose down
   ```

5. Stop the stack and remove the PostgreSQL volume:

   ```bash
   docker compose down -v
   ```

The backend is intentionally organized by business domains so vehicles, real estate, and general goods can grow without becoming one large tangled package.
