# Technical Design Document — Users Controller: Sign Up Flow

## Version
002 | Date: 2026-06-28 | Author: Dev .NET Agent

## Status
Implemented and manually verified end-to-end against running API + LocalDB

## Change from v001
- All components from v001's "New Components to Create" table are now implemented:
  `UsersController`, `UserRequest`, `UserResponse`, `UsersModel`, `UserItem`, `UserValidationService` (relocated to `AI.HR.BL`), `UserBL`, `UserRepository`.
- DI wired in `Program.cs`: `UserRepository`, `UserBL`, `UserValidationService` registered as Scoped (architect-approved, see `hr_agile/worklogs/architect/20260628_140000_signup_di_review.md`).
- Swagger/SwaggerUI (Swashbuckle.AspNetCore) added for manual endpoint testing in Development.

## Bug Found & Fixed During Verification
- **Issue**: `UserBL.ToUserItem` never set `RoleId`, defaulting to `0`. The `Roles` table is seeded starting at `RoleId = 1`, so every Sign Up failed with `FK_Users_Roles_RoleId` constraint violation (HTTP 500).
- **Fix**: `UserBL` now defaults self-service Sign Up to `RoleId = 7` ("Other") via a `DefaultSignUpRoleId` constant, since `UserRequest` doesn't collect a role.
- **Open question**: should Sign Up allow specifying a role, or should role assignment always be a separate admin action? Not decided — flagged for product/architect input.

## Manual Verification (curl against `http://localhost:5298`)
| Case | Request | Result |
|---|---|---|
| Valid Sign Up | `POST api/users/signup` with full valid payload | `200 OK`, `UserResponse` with `userId`, `isNotValid:false` |
| Invalid (short password) | Same payload, `password: "123"` | `400 BadRequest`, `isNotValid:true`, `message: "Password is required and must be at least 8 characters."` |
| Upsert — repeat email | Same `email` as the valid case, different `fullName`/`company`/`password` | `200 OK`, same `userId`, fields updated (confirms `Upsert` → `Update` path, not duplicate insert) |

## Source of Truth
- Controller: `AI.HR.Api/Controllers/UsersController.cs`
- BL: `AI.HR.BL/UserBL.cs`, `AI.HR.BL/UserValidationService.cs`
- Repository: `AI.HR.Repoistories/UserRepository.cs`
- Models: `AI.HR.Models/UserRequest.cs`, `UserResponse.cs`, `UserItem.cs`, `UsersModel.cs`, `BaseModel.cs`
- DI: `AI.HR.Api/Program.cs`

## Pending / Next Steps
- Password hashing not implemented — `PasswordHash` currently stores plain text (carried over from v001).
- Decide Sign Up role-assignment policy (see bug note above).
- No automated tests yet — only manual curl verification documented here.
- Consider `API_users_endpoints.md` once more endpoints (login, get user, etc.) are added.
