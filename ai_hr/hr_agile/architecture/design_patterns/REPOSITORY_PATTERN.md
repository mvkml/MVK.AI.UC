# Design Pattern — Repository Pattern

## Owned by
Architect Agent

## Where Implemented
`AI.HR.Repoistories/UserRepository.cs`

## What It Is
Repository Pattern abstracts data persistence behind a class that exposes domain-level operations (`Create`, `Update`, `Delete`, `Upsert`), hiding EF Core / `DbContext` details from the layers above it.

## How It Was Implemented
- `UserRepository` takes `AiHrDbContext` via constructor injection.
- Callers (e.g. `UserBL`) only deal with `UserItem` (a model from `AI.HR.Models`) — never the EF `User` entity directly.
- `ToEntity` / `ToModel` private mapping methods convert between `UserItem` and the EF `User` entity at the repository boundary.
- `Upsert` composes `Create`/`Update` based on existence check by `Email`, keeping that decision out of the Business Layer.

## Why
- Keeps EF Core concerns isolated to one layer.
- `AI.HR.BL` stays persistence-agnostic — it could swap repositories without changing business logic.
- Matches the layered architecture already defined in `ADR002_split_backend_dotnet_fastapi.md`.

---
*Defined by: Architect Agent | Date: 2026-06-28*
