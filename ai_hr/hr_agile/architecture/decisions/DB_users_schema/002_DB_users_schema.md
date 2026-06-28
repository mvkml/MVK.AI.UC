# Technical Design Document — Users & Roles DB Schema

## Version
002 | Date: 2026-06-28 | Author: Architect Agent

## Status
Draft — updated to reflect `AI.HR.Models` API model layer

## Change from v001
- Added `AI.HR.Models` project models that wrap the EF entities for API responses:
  - `BaseModel` — common base class for all models (`IsNotValid`, `Message`)
  - `UserItem` — mirrors the `Users` table columns
  - `UsersModel : BaseModel` — API response wrapper exposing `UserItem` (single) and `UserItems` (`List<UserItem>`, multiple)
- Coding standard introduced: all public classes/properties in `AI.HR.Models` require XML `<summary>` doc comments (see `CODING_STANDARDS.md`)

## Tables
(unchanged from v001 — see `001_DB_users_schema.md` for full column definitions of `Roles` and `Users`)

## API Model Layer (new in this version)
| Model | Project | Purpose |
|---|---|---|
| `BaseModel` | AI.HR.Models | Common `IsNotValid` / `Message` status fields for all models |
| `UserItem` | AI.HR.Models | Single user record (mirrors `Users` table) |
| `UsersModel` | AI.HR.Models | API response: `UserItem` for single, `UserItems` for multiple |

## Source of Truth
- EF: `AI.HR.EF/DBContexts/AiHrDbContext.cs`, `AI.HR.EF/Entities/User.cs`, `AI.HR.EF/Entities/Role.cs`
- Models: `AI.HR.Models/BaseModel.cs`, `AI.HR.Models/UserItem.cs`, `AI.HR.Models/UsersModel.cs`
- Coding standard: `hr_agile/architecture/decisions/CODING_STANDARDS.md`

## Pending / Next Steps
- Define `API_users_endpoints.md` covering CRUD + auth endpoints using `UsersModel`
- Confirm password hashing algorithm to use (not yet implemented)
- Decide if `Company` should become its own table (multi-tenant consideration)
