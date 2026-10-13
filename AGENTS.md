# AGENTS.md

Development rules for FoxTales. FoxTales follows Elegant Code principles.

## Workflow

- Use feature branches. Never commit directly to main.
- Every change goes through a reviewed GitHub Pull Request.
- Do not commit, push, open or merge a PR without the owner's approval.
- Keep each PR small and independently reviewable.

## Code Style

- No change-tracking markers or comments. Git history and PR diffs track changes.
- No blank lines inside method bodies. Blank lines between methods, classes and sections are fine.
- No comments inside method bodies. Use clear names and small methods. Documentation comments outside methods only when they add necessary information.
- Prefer single-word noun variable names: `card`, `ball`, `player`, `session`, `reward`. No cryptic abbreviations; names must stay meaningful.
- Keep methods small with one clear responsibility.
- Do not leave commented-out obsolete code. Preserve existing functional code unless a change requires modifying or removing it.
- Avoid unnecessary abstractions. No patterns, interfaces, services or layers without a clear purpose.
- Keep formatting consistent. No unrelated whitespace changes or reformatting.
- Use only dependencies that are free for production use.
- Keep game rules separate from frameworks and UI so they are independently testable.

## Architecture Rules

- Backend is one ASP.NET Core project (`FoxTales.Api`) with `Controllers`, `Domain` and `Infrastructure` folders and matching namespaces. Extract class libraries only after a demonstrated need.
- Frontend display calculations, card rendering and UI previews are pure TypeScript functions with no Angular imports. Components only render and delegate.
- The backend is authoritative for Bingo outcomes, ball draws, coins, inventory, rewards and progression.
- The frontend must not be trusted to award wins or modify authoritative game state.
- Guest identity is a backend-issued, securely validated session. A client-generated GUID is never authentication.
- Hidden book answers and unrevealed clues must never appear in frontend assets or API responses.
- Undecided gameplay values stay TBD in `docs/GAME_SPEC.md`. Do not invent rules or numbers.

## Testing and Build Performance

- Write focused tests for critical business logic, important edge cases and previously discovered bugs.
- Do not test every method or implementation detail. Avoid redundant tests.
- Each test has exactly one assertion, and it is the final statement. Use fixtures or cleanup mechanisms instead of trailing code.
- Keep test projects separate from production applications (`FoxTales.Api.Tests`). Production builds must not compile or run tests.
- Prefer fast unit tests. Add integration tests only where they give meaningful value. Avoid large end-to-end suites.
- No arbitrary test-count or coverage requirements.
- Run affected tests during development. Run the complete suite in PR validation.
- Optimize for incremental compilation, fast startup and quick feedback. Keep dependencies and project references minimal.
