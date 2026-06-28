# Technical Design Document — Users Controller: Sign Up Flow

## Version
001 | Date: 2026-06-28 | Author: Architect Agent

## Status
Draft — design only, not yet implemented

## Scope
`POST /api/users/signup` end-to-end flow: Controller → Validation Service → Business Layer → Repository.

## New Components to Create

| # | Component | Type | Project / Path | Purpose |
|---|---|---|---|---|
| 1 | `UsersController` | Controller | `AI.HR.Api/Controllers/UsersController.cs` | Exposes `SignUp` POST endpoint |
| 2 | `UserRequest` | Model | `AI.HR.Models/UserRequest.cs` | Incoming sign-up payload from client |
| 3 | `UserResponse` | Model | `AI.HR.Models/UserResponse.cs` | Outgoing response payload to client |
| 4 | `UsersModel` (existing) | Model | `AI.HR.Models/UsersModel.cs` | Carries `UserItem`/`UserItems` + `BaseModel` status through Controller → BL |
| 5 | `UserItem` (existing) | Model | `AI.HR.Models/UserItem.cs` | Internal representation mapped from `UserRequest`, used by BL/Repository |
| 6 | `UserValidationService` | Service | `AI.HR.Api/Services/UserValidationService.cs` | Validates `UserRequest` data, sets `IsNotValid`/`Message` |
| 7 | `UserBL` (business logic) | Business Layer | `AI.HR.BL/UserBL.cs` | Maps `UserRequest` → `UserItem`, calls Repository |
| 8 | `UserRepository` | Repository | `AI.HR.Repoistories/UserRepository.cs` | `Create`, `Update`, `Delete`, `Upsert` for `UserItem` |

## Request Flow — Order of Execution

| Step | Layer | Action |
|---|---|---|
| 1 | Controller | `SignUp` endpoint receives `UserRequest` from client |
| 2 | Controller | Assigns `UserRequest` into `UsersModel` |
| 3 | Controller | Sends `UsersModel` to `UserValidationService` |
| 4 | Services | `UserValidationService` validates `UserRequest` fields; sets `UsersModel.IsNotValid` / `Message` on failure |
| 5 | Controller | If invalid → maps `UsersModel` status into `UserResponse`, returns immediately (no BL/Repo call) |
| 6 | Controller | If valid → hands `UsersModel` (containing `UserRequest`) to Business Layer |
| 7 | Business Layer | Maps `UserRequest` → `UserItem` (assigns matching fields) |
| 8 | Business Layer | Calls `UserRepository` with the `UserItem` |
| 9 | Repository | Checks if user exists → `Upsert`: calls `Create` if new, `Update` if existing |
| 10 | Repository | Returns result/status back to Business Layer |
| 11 | Business Layer | Builds `UserResponse` from result, returns to Controller |
| 12 | Controller | Returns `UserResponse` to client |

## Repository Operations Required
| Operation | Description |
|---|---|
| `Create` | Insert new `UserItem` into `Users` table |
| `Update` | Update existing `UserItem` by `UserId`/`Email` |
| `Delete` | Remove a `UserItem` |
| `Upsert` | Create if not exists, else Update — used by Sign Up |

## Notes
- `UsersModel` is the carrier object between Controller and Validation Service (status: `IsNotValid`/`Message`).
- `UserItem` is the carrier object between Business Layer and Repository (actual persisted data).
- `UserRequest`/`UserResponse` are the public-facing contract; they should not be exposed past the Controller/BL boundary.

## Pending — Not Yet Implemented
- `UserRequest` field list (likely: `FullName`, `Email`, `Company`, `Password`)
- `UserResponse` field list
- `UserValidationService` validation rules (required fields, email format, duplicate email check, password rules)
- Password hashing strategy (still open from `002_DB_users_schema.md`)

## Implementation Order (next steps, one by one)
1. `UserRequest` / `UserResponse` models
2. `UserValidationService`
3. `UserRepository` (Create/Update/Delete/Upsert)
4. `UserBL`
5. `UsersController.SignUp`
