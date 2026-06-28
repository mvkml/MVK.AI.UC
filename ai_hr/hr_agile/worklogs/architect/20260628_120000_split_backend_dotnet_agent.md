# 🏗️ Architect Agent — Work Log
## Date: 2026-06-28
## Time: 12:00:00
## Subject: Split Backend Decision (ASP.NET Core + FastAPI) + New Dev .NET Role

### What Was Done
- Discovered an existing ASP.NET Core solution at `hr_apis/az/hr_core_apis/AI.HR.Api/` (layered: `AI.HR.Api`/`AI.HR.BL`/`AI.HR.DAL`/`AI.HR.EF`) that wasn't reflected anywhere in the agile docs (which all assumed FastAPI per ADR001).
- Wrote `ADR002_split_backend_dotnet_fastapi.md`: ASP.NET Core now owns non-AI REST API functionality; FastAPI is re-scoped to AI-only functionality (exact scope still TBD, per user).
- Created new role `dev_dotnet_agent.md` (`hr_agile/team/`) and the matching real subagent `.claude/agents/dev-dotnet.md`.
- Added `hr_agile/worklogs/dev_dotnet/` folder.
- Updated `BACKLOG.md`: re-scoped PB001 (FastAPI, AI-only, TBD), added PB006 (ASP.NET Core REST API, non-AI, In Progress).
- Updated `CLAUDE.md` to reflect the split backend and the new `dev-dotnet` agent.

### Decision
Backend is split by responsibility, not replaced: ASP.NET Core for standard CRUD/business logic, FastAPI reserved for AI-specific integration work (Claude agents, Graphify backend). Did not rename or remove the existing `dev-fastapi` agent — user will provide more detail on its scope later.

### Pending / Next Steps
- Define FastAPI's actual scope once the user provides it.
- `dev-dotnet` agent's first real task: build out actual Controllers/BL/DAL/EF for an HR module (e.g. Employees) against the existing empty `AI_HR` database.
