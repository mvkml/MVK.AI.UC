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
- Not yet applicable — no interfaces introduced yet (see Architect decision in `hr_agile/worklogs/architect/20260628_140000_signup_di_review.md`: concrete classes only until a second implementation or test-mocking need arises).

## D — Dependency Inversion Principle
- `UserBL` depends on `UserRepository` via constructor injection rather than constructing it itself.
- `UserRepository` depends on `AiHrDbContext` via constructor injection.
- See `design_patterns/DEPENDENCY_INJECTION.md` for full DI implementation details.

---
*Defined by: Architect Agent | Date: 2026-06-28*
