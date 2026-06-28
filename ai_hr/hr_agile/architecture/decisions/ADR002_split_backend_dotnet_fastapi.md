# ADR002 - Split Backend: ASP.NET Core (non-AI) + FastAPI (AI)

## Status: Accepted

## Context
ADR001 established FastAPI as the backend framework, reasoning it would serve both general REST APIs and AI-agent integration. In practice, an ASP.NET Core REST API solution (`AI.HR.Api`) has already been scaffolded at `hr_apis/az/hr_core_apis/AI.HR.Api/` with a layered architecture (`AI.HR.Api`, `AI.HR.BL`, `AI.HR.DAL`, `AI.HR.EF`).

## Decision
The backend is split by responsibility:
- **ASP.NET Core (.NET/C#)** — handles all **non-AI functionality**: standard CRUD REST APIs, business logic, data access (`AI.HR.Api/AI.HR.BL/AI.HR.DAL/AI.HR.EF`).
- **FastAPI (Python)** — reserved for **AI-related functionality** (Claude agent integration, Graphify backend connections, etc.). Scope to be detailed later; ADR001 remains valid for this narrower purpose.

## Reasons
- ASP.NET Core solution already exists and is the active development target for standard API work.
- Keeps AI-specific integration isolated in the stack best suited for it (Python ecosystem), without forcing all business logic through that same service.

## Consequences
- Two backend codebases to maintain: `hr_apis/az/hr_core_apis/AI.HR.Api/` (.NET) and a FastAPI service (location TBD).
- A new role/agent (`dev-dotnet`) is needed alongside the existing `dev-fastapi` agent.
- `BACKLOG.md` PB001 is re-scoped to ASP.NET Core; a new backlog item tracks FastAPI's narrower AI-only scope once detailed.
