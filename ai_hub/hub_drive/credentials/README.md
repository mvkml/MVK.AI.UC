# Hub Credentials

Connection settings shared across projects (not specific to any single ai_hr/ai_ins/ai_rnd).

## Files
- `dev_dashboard_sql.env(.example)` — `AI_DEV_DASHBOARD` (LocalDB, Windows Auth). Used by HR, Insurance, and the dev dashboard itself — shared agent-status / agile-task data, not project-specific.

## How these get used
Same pattern as the per-project credentials folders: copy `.example` → real `.env`, fill in real values. Ignored by git, never committed.
