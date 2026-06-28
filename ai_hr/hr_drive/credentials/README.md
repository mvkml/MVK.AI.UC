# HR Credentials

Connection settings for the databases in `hr_data_source/` (`hr_sql`, `hr_pg`, `hr_cosmos`).

## Files
- `hr_sql.env.example`, `hr_pg.env.example`, `hr_cosmos.env.example` — placeholder keys only, safe to commit.
- `hr_sql.env`, `hr_pg.env`, `hr_cosmos.env` — real values go here (you create these by copying the `.example` files). Ignored by git, never committed.

`AI_DEV_DASHBOARD` credentials moved to `ai_hub/hub_drive/credentials/` since that database is shared across HR, Insurance, and the dashboard itself.

## How these get used
When a database task comes up (connect, create schema, run a migration), fill in the matching `.env` file with real values and the work happens against that database.
