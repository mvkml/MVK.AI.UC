# Design Pattern — Dependency Injection (DI)

## Owned by
Architect Agent

## Where Implemented
`AI.HR.Api/Program.cs` (registration), `AI.HR.Api/Controllers/UsersController.cs`, `AI.HR.BL/UserBL.cs`, `AI.HR.Repoistories/UserRepository.cs`

## What It Is
Dependency Injection lets each class declare what it needs via its constructor instead of creating dependencies itself (`new`). ASP.NET Core's built-in container resolves and supplies them.

## How It Was Implemented
- `UserRepository : IUserRepository`, `RoleRepository : IRoleRepository` — receive `AiHrDbContext`.
- `UserBL : IUserBL` — receives `IUserRepository`, not the concrete `UserRepository`.
- `UserValidationService : IUserValidationService` — stateless validation.
- `UsersController` constructor-injects `IUserValidationService`, `IUserBL`, `IRoleRepository` (interfaces, not concrete classes).
- All four registered as **Scoped** in `Program.cs` via `AddScoped<IInterface, Implementation>()`, matching `AiHrDbContext`'s default Scoped lifetime (avoids captive-dependency issues).

## Why
- Removes tight coupling and manual object construction from every layer.
- Lets the DI container manage object lifetimes consistently with `AiHrDbContext`.
- **Update (2026-06-28)**: interfaces were introduced at the user's explicit request, ahead of writing unit tests — interfaces let test code substitute mocks/fakes for `IUserRepository` etc. without touching real persistence. Supersedes the original "no interfaces yet" decision in `hr_agile/worklogs/architect/20260628_140000_signup_di_review.md`.

---
*Defined by: Architect Agent | Date: 2026-06-28*
