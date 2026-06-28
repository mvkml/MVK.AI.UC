# Design Pattern — Dependency Injection (DI)

## Owned by
Architect Agent

## Where Implemented
`AI.HR.Api/Program.cs` (registration), `AI.HR.Api/Controllers/UsersController.cs`, `AI.HR.BL/UserBL.cs`, `AI.HR.Repoistories/UserRepository.cs`

## What It Is
Dependency Injection lets each class declare what it needs via its constructor instead of creating dependencies itself (`new`). ASP.NET Core's built-in container resolves and supplies them.

## How It Was Implemented
- `UserRepository(AiHrDbContext context)` — receives the DbContext.
- `UserBL(UserRepository userRepository)` — receives the repository.
- `UserValidationService` and `UserBL` are constructor-injected into `UsersController`.
- All three (`UserRepository`, `UserBL`, `UserValidationService`) are registered as **Scoped** in `Program.cs`, matching `AiHrDbContext`'s default Scoped lifetime (avoids captive-dependency issues).
- No interfaces introduced yet — concrete classes are registered directly, since each currently has a single consumer/implementation. Revisit once unit tests require mocking.

## Why
- Removes tight coupling and manual object construction from every layer.
- Lets the DI container manage object lifetimes consistently with `AiHrDbContext`.
- Decision and rationale recorded by Architect Agent — see `hr_agile/worklogs/architect/20260628_140000_signup_di_review.md`.

---
*Defined by: Architect Agent | Date: 2026-06-28*
