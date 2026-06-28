# Technical Design Document — Users & Roles DB Schema

## Version
003 | Date: 2026-06-28 | Author: Dev .NET Agent

## Status
Implemented and verified

## Change from v002
- Added `OrderId` (int, required) column to `Roles` table — controls the display order returned by `GET api/users/roles` (e.g. for a Sign Up role dropdown), independent of `RoleId`.
- Seeded values: `OrderId` matches `RoleId` 1–7 in the original seed order (HR Manager → Other).
- Migration: `20260628182755_AddRoleOrderId` — adds column with `defaultValue: 0`, then backfills each seeded row's correct `OrderId` via `UpdateData`.
- `RoleRepository.GetAll()` now orders by `OrderId` (`_context.Roles.OrderBy(r => r.OrderId)`).
- `RoleItem` model gained an `OrderId` property.

## Tables
### Roles (updated)
| Column | Type | Constraints |
|---|---|---|
| RoleId | int | PK |
| RoleName | nvarchar(100) | Required, Unique |
| OrderId | int | Required |

(`Users` table unchanged — see `001_DB_users_schema.md`)

## Verified
`GET api/users/roles` against running API confirmed roles now return in order `1..7` (previously arbitrary DB-returned order).

## Source of Truth
- Entity: `AI.HR.EF/Entities/Role.cs`
- DbContext: `AI.HR.EF/DBContexts/AiHrDbContext.cs`
- Migration: `AI.HR.EF/Migrations/20260628182755_AddRoleOrderId.cs`
- Repository: `AI.HR.Repoistories/RoleRepository.cs`
- Model: `AI.HR.Models/RoleItem.cs`

## Pending / Next Steps
- Password hashing, Sign Up role-assignment policy still pending (carried over from prior versions).
