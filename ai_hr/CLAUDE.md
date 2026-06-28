# ai_hr

AI co-pilot for the HR process (internal project name: `mvkhr`). Part of a 3-product suite alongside `ai_ins` (Insurance) and `ai_rnd` (R&D), coordinated at the portfolio level by `ai_hub` / `ai_hub_agile`.

## Folder Structure
- `hr_agile/` — agile process: team roles, backlog, sprints, ADRs, worklogs (see below)
- `hr_apis/` — FastAPI backend (not started yet)
- `hr_ui/mvkhrweb/` — Angular web frontend (active development)
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
| `dev-angular` | `hr_ui/mvkhrweb`, `hr_ui/mvkhrapp` |
| `dev-fastapi` | `hr_apis/` |
| `dev-sql` | `hr_data_source/` |
| `dev-devops` | `hr_devops/`, CI/CD, `.gitignore`/secrets hygiene |

Each agent's full role definition (responsibilities, "works with") is documented in `hr_agile/team/<role>_agent.md` — the `.claude/agents/*.md` files are built from those.

## Worklogs (the actual persistence mechanism)
Every agent logs completed work to `hr_agile/worklogs/<role>/YYYYMMDD_HHMMSS_subject.md`. If you're picking this project up fresh with no prior context, read the most recent worklog entries per role (especially `dev_angular` and `scrum_master`) to see what was last done and what's pending next.

## Current State (as of last update)
- Frontend (`mvkhrweb`): landing, about, services, portfolio, contact, login, signup pages built. Dashboard shell with chat home, document upload, and employees pages built. Recruitment, payroll, reports, agents pages are linked in the sidebar but **not yet built**.
- Backend (`hr_apis`), database (`hr_data_source`), and devops (`hr_devops`) are all empty — no work started.
- `hr_agile/team/` has 7 of the 9 master-template roles (`tech_interviewer` and `dev_qa` not yet added).
