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

`GET http://localhost:5080/health` returns `Healthy`. The OpenAPI document is served at `http://localhost:5080/openapi/v1.json` in Development only.

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
