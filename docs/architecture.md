# Architecture

## Approach

This project starts as a modular monolith:

- One Spring Boot backend application.
- Business code grouped by domain modules.
- One PostgreSQL database.
- One Next.js frontend application.

This keeps development simple while preserving boundaries that can later become services if traffic, team size, or operational needs justify it.

## Backend Domains

- `identity`: users, sessions, roles, permissions.
- `catalog`: categories, attributes, locations, listing metadata.
- `listings`: shared listing lifecycle, publishing, moderation, promotions.
- `vehicles`: vehicle-specific fields and filters.
- `realestate`: property-specific fields and filters.
- `goods`: general goods-specific fields and filters.
- `media`: image upload, ordering, processing metadata.
- `messaging`: buyer-seller conversations.
- `billing`: paid listings, boosts, invoices, payment events.

## Frontend Recommendation

Next.js is a strong default here because it supports:

- SEO-friendly listing and category pages.
- Server-rendered public pages.
- API-driven dashboard areas.
- A large ecosystem for forms, validation, maps, image galleries, and search UI.

Use TypeScript from the start. It will make frontend development easier as the listing model becomes more complex.
