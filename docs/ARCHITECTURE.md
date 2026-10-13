# FoxTales Architecture

## Overview

```
Angular (GitHub Pages)  -->  ASP.NET Core API (Render Free)  -->  PostgreSQL (Neon Free)
```

Free-tier hosting means cold starts and usage limits. The design tolerates them.

## Repository Layout

```
foxtales-games/
  AGENTS.md  README.md  LICENSE
  docs/
  .github/workflows/
  frontend/
    src/app/
      core/
      shared/
      games/bingo/
        domain/
        state/
        ui/
  backend/
    FoxTales.slnx
    FoxTales.Api/
      Controllers/
      Domain/
      Infrastructure/
    FoxTales.Api.Tests/
```

## Frontend

- Angular, TypeScript, SCSS, standalone components, Signals.
- `domain/` holds pure TypeScript functions with no Angular imports for display calculations, card rendering and UI previews.
- The frontend is never trusted to award wins or modify authoritative game state.
- `state/` holds signal-based stores that call the API.
- `ui/` holds components that only render and delegate.
- Each game lives under `games/<name>` so Solitaire and Hearts can be added later.

## Backend

- One ASP.NET Core Web API project, `FoxTales.Api`, and one xUnit project, `FoxTales.Api.Tests`.
- `Domain/`: Bingo rules, card generation, draws, win detection, economy. No Entity Framework dependency.
- `Infrastructure/`: EF Core `DbContext`, entities, migrations, Npgsql.
- `Controllers/`: HTTP endpoints. Thin; they delegate to Domain.
- Folders map to namespaces. Extract class libraries only after a demonstrated need, to keep builds fast.
- Random number generation is injectable so domain tests are deterministic.

## Authority and Security

- The backend is authoritative for Bingo outcomes, ball draws, coins, inventory, rewards and progression. The client only sends actions.
- Guest identity is a backend-issued session, securely validated on every request (signed or opaque token, expiry and rotation). A client-generated GUID is never authentication. Details are TBD.
- Hidden book answers and unrevealed clues exist only in the backend and database. They never appear in frontend assets or API responses. Guesses are checked server-side.

## Database

- PostgreSQL on Neon Free, accessed through Entity Framework Core with Npgsql.
- Stores players, guest sessions, progress, inventory, books, levels and clues.
- Schema changes via EF Core migrations.

## Testing

- Backend: fast xUnit unit tests of Domain rules; integration tests only where valuable.
- Frontend: unit tests of pure display functions and stores.
- See AGENTS.md for conventions.

## CI/CD

- GitHub Actions: frontend build and tests, backend build and tests, on every PR.
- Frontend deploys to GitHub Pages from main.
- Backend deploys to Render from main; production builds exclude the test project.
- Secrets are kept in GitHub and Render settings, never in the repository.

## Dependencies and Versions

- .NET 10 LTS, current supported stable Angular, compatible stable EF Core and Npgsql.
- Exact versions are pinned when each application is scaffolded.
- All dependencies must be free for production use.
