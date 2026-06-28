# Insurance Credentials

Connection settings for the databases in `ins_data_source/` (`ins_sql`, `ins_pg`, `ins_cosmos`).

## Files
- `ins_sql.env.example`, `ins_pg.env.example`, `ins_cosmos.env.example` — placeholder keys only, safe to commit.
- `ins_sql.env`, `ins_pg.env`, `ins_cosmos.env` — real values go here (you create these by copying the `.example` files). Ignored by git, never committed.

## How these get used
When a database task comes up (connect, create schema, run a migration), fill in the matching `.env` file with real values and the work happens against that database.
