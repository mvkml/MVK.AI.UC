# R&D Credentials

Connection settings for the databases in `rnd_data_source/` (`rnd_sql`, `rnd_pg`, `rnd_cosmos`).

## Files
- `rnd_sql.env.example`, `rnd_pg.env.example`, `rnd_cosmos.env.example` — placeholder keys only, safe to commit.
- `rnd_sql.env`, `rnd_pg.env`, `rnd_cosmos.env` — real values go here (you create these by copying the `.example` files). Ignored by git, never committed.

## How these get used
When a database task comes up (connect, create schema, run a migration), fill in the matching `.env` file with real values and the work happens against that database.
