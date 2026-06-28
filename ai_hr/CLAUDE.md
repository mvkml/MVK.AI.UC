# ai_hr

AI co-pilot for the HR process (internal project name: `mvkhr`). Part of a 3-product suite alongside `ai_ins` (Insurance) and `ai_rnd` (R&D), coordinated at the portfolio level by `ai_hub` / `ai_hub_agile`.

## Folder Structure
- `hr_agile/` — agile process: team roles, backlog, sprints, ADRs, worklogs (see below)
- `hr_apis/` — split backend (see ADR002):
  - `hr_apis/az/hr_core_apis/AI.HR.Api/` — ASP.NET Core REST API, non-AI functionality (active: `AI.HR.Api`/`AI.HR.BL`/`AI.HR.DAL`/`AI.HR.EF`)
  - FastAPI service — AI-only functionality, scope/location TBD
- `hr_ui/aihrweb/` — Angular web frontend (active development)
- `hr_data_source/` — databases: `hr_sql/`, `hr_pg/`, `hr_cosmos/` (empty so far)
- `hr_devops/` — CI/CD, infra (empty so far)
- `hr_drive/` — `learn/`, `vibe/` (dev tooling, e.g. `hr_dev_dashboard/`), `credentials/` (DB connection `.env` files, gitignored)
- `graphify-out/` — generated knowledge graph for this repo (`graph.json`)

## Team / Agents
This project is worked on through defined agile roles rather than one generic assistant. Real subagent definitions live in `.claude/agents/`:

| Agent | Owns |
|---|---|
| `architect` | System design, ADRs, naming conventions, schemas, API contracts |
| `product-owner` | Backlog, roadmap, user stories, acceptance criteria |
| `scrum-master` | Sprints, tasks, retrospectives, enforces worklog discipline |
| `dev-angular` | `hr_ui/aihrweb`, `hr_ui/mvkhrapp` |
| `dev-dotnet` | `hr_apis/az/hr_core_apis/AI.HR.Api/` (non-AI REST API) |
| `dev-fastapi` | FastAPI service (AI-only functionality, scope TBD) |
| `dev-sql` | `hr_data_source/` |
| `dev-devops` | `hr_devops/`, CI/CD, `.gitignore`/secrets hygiene |

Each agent's full role definition (responsibilities, "works with") is documented in `hr_agile/team/<role>_agent.md` — the `.claude/agents/*.md` files are built from those.

## Worklogs (the actual persistence mechanism)
Every agent logs completed work to `hr_agile/worklogs/<role>/YYYYMMDD_HHMMSS_subject.md`. If you're picking this project up fresh with no prior context, read the most recent worklog entries per role (especially `dev_angular` and `scrum_master`) to see what was last done and what's pending next.

## Current State (as of last update)
- Frontend (`aihrweb`): landing, about, services, portfolio, contact, login, signup pages built. Dashboard shell with chat home, document upload, and employees pages built. Recruitment, payroll, reports, agents pages are linked in the sidebar but **not yet built**.
- Backend: ASP.NET Core solution `AI.HR.Api` scaffolded (default Controllers/Program.cs, no real endpoints yet). FastAPI service not started — scope TBD.
- Database (`hr_data_source/hr_sql`): `AI_HR` database exists on `(localdb)\MSSQLLocalDB` via Windows Auth, but has no tables yet.
- Devops (`hr_devops`) is empty — no work started.
- `hr_agile/team/` has 8 roles (7 original + `dev_dotnet`); `tech_interviewer` and `dev_qa` from the 9-role master template still not added.
