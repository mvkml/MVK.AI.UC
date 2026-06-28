# Technical Design Document — Users & Roles DB Schema

## Version
001 | Date: 2026-06-28 | Author: Architect Agent

## Status
Draft — based on current `AI.HR.EF` implementation

## Purpose
Defines the database schema for `Users` and `Roles`, the foundation for authentication and role-based access in `AI.HR.Api`.

## Tables

### Roles
| Column | Type | Constraints |
|---|---|---|
| RoleId | int | PK |
| RoleName | nvarchar(100) | Required, Unique |

Seed data:
| RoleId | RoleName |
|---|---|
| 1 | HR Manager |
| 2 | HR Executive |
| 3 | Recruiter |
| 4 | Payroll Manager |
| 5 | Team Lead |
| 6 | Developer |
| 7 | Other |

### Users
| Column | Type | Constraints |
|---|---|---|
| UserId | int | PK |
| FullName | nvarchar(150) | Required |
| Email | nvarchar(255) | Required, Unique |
| Company | nvarchar(150) | Required |
| PasswordHash | nvarchar(255) | Required |
| CreatedAt | datetime2 | Default: UtcNow |
| IsActive | bit | Default: true |
| RoleId | int | FK -> Roles.RoleId |

## Relationships
- `Roles` 1 — N `Users` (one role has many users)

## Source of Truth
- EF Context: `AI.HR.EF/DBContexts/AiHrDbContext.cs`
- Entities: `AI.HR.EF/Entities/User.cs`, `AI.HR.EF/Entities/Role.cs`
- Migration: `AI.HR.EF/Migrations/20260628134601_InitialCreate.cs`

## Pending / Next Steps
- Define `API_users_endpoints.md` covering CRUD + auth endpoints
- Confirm password hashing algorithm to use (not yet implemented)
- Decide if `Company` should become its own table (multi-tenant consideration)
