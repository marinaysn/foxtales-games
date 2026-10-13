# foxtales-games
FoxTales - A collection of browser games featuring Bingo, hidden literary adventures, and animated foxes

## Overview

FoxTales is a portfolio project: a woodland-themed collection of browser games. The first game is **FoxTales Bingo**, a 75-ball Bingo adventure where each completed level unlocks a clue to a hidden book. Solitaire and Hearts are planned later. Players can play as guests without registering.

See [docs/GAME_SPEC.md](docs/GAME_SPEC.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/ROADMAP.md](docs/ROADMAP.md) and [AGENTS.md](AGENTS.md).

## Technology Stack

- Frontend: Angular, TypeScript, SCSS, standalone components, Signals (GitHub Pages)
- Backend: ASP.NET Core Web API, C# on .NET 10 LTS (Render Free)
- Database: PostgreSQL (Neon Free) with Entity Framework Core and Npgsql
- Tests: xUnit (backend), Angular unit tests (frontend)
- CI/CD: GitHub Actions
- All dependencies are free for production use

## Status

Project foundation, the Angular frontend scaffold and the ASP.NET Core backend scaffold (`GET /health` only). See the roadmap.

## Backend

Requires the .NET SDK 10.0.400 or a later 10.0.x feature band (see `backend/global.json`). Run from `backend/`:

```
dotnet restore                              restore dependencies
dotnet build FoxTales.Api -c Release        production build, tests are not compiled
dotnet test --project FoxTales.Api.Tests    build and run tests (xUnit v3)
dotnet run --project FoxTales.Api           development server at http://localhost:5080
```

`GET http://localhost:5080/health` returns `Healthy` and does not depend on the database. The OpenAPI document is served at `http://localhost:5080/openapi/v1.json` in Development only.

## Database

PostgreSQL 17 runs in Docker for local development, bound to `127.0.0.1:5433` only, with the named volume `foxtales-pgdata` (Compose project `foxtales`). Only the API connects to it; Angular never does. Credentials are never committed: `.env` is gitignored and the API connection string lives in .NET User Secrets.

Run from the repository root:

```
copy .env.example .env                      then edit .env and set a local password
docker compose up -d --wait                 start PostgreSQL and wait until healthy
docker compose ps                           show status
docker compose logs -f postgres             follow logs
docker compose exec postgres psql -U foxtales -d foxtales    open psql
docker compose stop                         stop, keep data
docker compose down                         remove container, keep data
docker compose down -v                      remove container and DELETE all data
```

Changing `POSTGRES_PASSWORD` in `.env` does not change the password of an already initialized volume. Either change it in PostgreSQL (`ALTER USER`) or run `docker compose down -v` to recreate the data.

Give the API its connection string, using the same password as `.env`. Run from `backend/`:

```
dotnet user-secrets set "ConnectionStrings:FoxTales" "Host=localhost;Port=5433;Database=foxtales;Username=foxtales;Password=<your password>" --project FoxTales.Api
```

Entity Framework Core tooling (run from `backend/`):

```
dotnet tool restore                                         install the pinned dotnet-ef
dotnet ef dbcontext info --project FoxTales.Api             show provider and database
dotnet ef database update --project FoxTales.Api            connect and apply migrations
dotnet ef migrations add <Name> --project FoxTales.Api --output-dir Infrastructure/Migrations
dotnet ef migrations remove --project FoxTales.Api          undo the last unapplied migration
```

There are no entities or migrations yet; the first migration arrives with the first real entity.

pgAdmin 4: register a server with host `127.0.0.1`, port `5433`, maintenance database `foxtales`, username `foxtales` and the password from `.env`.

If pgAdmin crashes with `access violation writing 0x0000000000000000` while connecting, open the server's Parameters tab and set `sslmode` = `disable`, `gssencmode` = `disable` and `channel_binding` = `disable`. This is a workaround for the local Docker PostgreSQL only; do not use these settings for production or Neon.

## Frontend

Requires Node.js 24 LTS. Run from `frontend/`:

```
npm ci              install dependencies
npm start           development server at http://localhost:4200
npm test            run unit tests once (Vitest)
npm run build       production build, base path /
npm run build:pages production build for GitHub Pages, base path /foxtales-games/
```

## Repository Layout

```
frontend/   Angular application
backend/    FoxTales.Api and FoxTales.Api.Tests
docs/       Specification, architecture, roadmap
```
