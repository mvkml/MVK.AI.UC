# Technical Design Document — Users Controller: Login Flow

## Version
003 | Date: 2026-06-30 | Author: Dev .NET Agent

## Status
Implemented and manually verified end-to-end against running API + LocalDB

## Scope
`POST api/users/login` — same `UsersController`, same layering pattern as Sign Up (`002_TDD_users_signup.md`).

## New Components
| Component | Type | Path | Purpose |
|---|---|---|---|
| `LoginRequest` | Model | `AI.HR.Models/LoginRequest.cs` | Incoming `{ Email, Password }` |
| `LoginResponse` | Model | `AI.HR.Models/LoginResponse.cs` | Outgoing `UserId/FullName/Email/Company/RoleId`, inherits `BaseModel` |
| `LoginModel` | Model | `AI.HR.Models/LoginModel.cs` | Carrier: `LoginRequest` + `LoginResponse`, inherits `BaseModel` — same role as `UsersModel` plays for Sign Up |
| `IUserValidationService.ValidateLogin` | Service | `AI.HR.BL/UserValidationService.cs` | Validates Email format + Password not empty |
| `IUserBL.Login` | Business Layer | `AI.HR.BL/UserBL.cs` | Looks up user by Email, verifies password hash, builds response |
| `IUserRepository.GetByEmail` | Repository | `AI.HR.Repoistories/UserRepository.cs` | New read method, added to support Login lookup |

## Request Flow
| Step | Layer | Action |
|---|---|---|
| 1 | Controller | `Login` endpoint receives `LoginRequest` |
| 2 | Controller | Wraps into `LoginModel`, sends to `UserValidationService.ValidateLogin` |
| 3 | Services | Validates Email format + Password presence; sets `IsNotValid`/`Message` on failure |
| 4 | Controller | If invalid → `400 BadRequest` with `LoginResponse { IsNotValid, Message }` |
| 5 | Controller | If valid → hands `LoginModel` to `UserBL.Login` |
| 6 | Business Layer | `IUserRepository.GetByEmail` — if not found, or `PasswordHasher.Verify` fails → `IsNotValid = true`, `Message = "Invalid email or password."` |
| 7 | Business Layer | If found but `IsActive == false` → `IsNotValid = true`, `Message = "This account is inactive."` |
| 8 | Business Layer | Otherwise builds `LoginResponse` from the `UserItem`, `Message = "Login successful."` |
| 9 | Controller | If `IsNotValid` after BL call → `401 Unauthorized`; else `200 OK` with `LoginResponse` |

## Security Notes
- Login never reveals whether the failure was "no such email" vs "wrong password" — both produce the same generic `"Invalid email or password."` message, to avoid leaking which emails are registered.
- No session/token issuance implemented yet — `LoginResponse` returns user profile data only. Auth token (JWT or cookie-based) is a separate, not-yet-designed concern.

## Manual Verification (curl against `http://localhost:5008`)
| Case | Result |
|---|---|
| Valid login | `200 OK`, `LoginResponse` with correct `userId`/`roleId`, `isNotValid:false` |
| Wrong password | `401 Unauthorized`, `isNotValid:true`, generic message |
| Missing email (validation) | `400 BadRequest`, `isNotValid:true`, `"A valid Email is required."` |

## Pending / Next Steps
- No auth token/session issued on successful login — frontend has nothing to persist yet for "being logged in." Needs a follow-up design (JWT vs cookie) before `login.ts` can be wired for real.
- `login.ts` (Angular) still uses mock data — not yet calling this endpoint.
