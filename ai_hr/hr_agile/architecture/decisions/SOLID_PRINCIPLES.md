# SOLID Principles — Owned by Architect Agent

Single holder file tracking which SOLID principles are applied where, across the codebase. Update this file (don't create one-per-principle) whenever a new instance is implemented.

## S — Single Responsibility Principle
| Class | Responsibility |
|---|---|
| `UserValidationService` | Only validates `UserRequest` data — no persistence, no mapping |
| `UserRepository` | Only persistence (Create/Update/Delete/Upsert) for users |
| `UserBL` | Only orchestrates the Sign Up business flow (request → item → repository → response) |
| `UsersController` | Only handles HTTP concerns (routing, status codes) — delegates everything else |

## O — Open/Closed Principle
- Not yet exercised — no extension points required so far (single concrete implementation per class).

## L — Liskov Substitution Principle
- `UserResponse : BaseModel`, `UsersModel : BaseModel` — both are safely substitutable wherever `BaseModel`'s `IsNotValid`/`Message` contract is expected.

## I — Interface Segregation Principle
- **Update (2026-06-28)**: superseded the earlier "no interfaces yet" decision — user explicitly requested interfaces be introduced now, ahead of future unit testing.
- `IUserRepository`, `IRoleRepository`, `IUserBL`, `IUserValidationService` each expose only the methods their consumers actually call — no fat/unused-method interfaces.

## D — Dependency Inversion Principle
- `UsersController` depends on `IUserValidationService`, `IUserBL`, `IRoleRepository` — not the concrete classes.
- `UserBL` depends on `IUserRepository`, not `UserRepository` directly.
- `UserRepository`/`RoleRepository` still depend on `AiHrDbContext` via constructor injection (EF Core's own DbContext is the persistence boundary; not abstracted further at this stage).
- DI registrations in `Program.cs` map interface → concrete implementation (`AddScoped<IUserRepository, UserRepository>()`, etc.).
- See `design_patterns/DEPENDENCY_INJECTION.md` for full DI implementation details.

---
*Defined by: Architect Agent | Date: 2026-06-28*
