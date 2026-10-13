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

Project foundation only. Applications are not scaffolded yet; see the roadmap.

## Repository Layout

```
frontend/   Angular application
backend/    FoxTales.Api and FoxTales.Api.Tests
docs/       Specification, architecture, roadmap
```
