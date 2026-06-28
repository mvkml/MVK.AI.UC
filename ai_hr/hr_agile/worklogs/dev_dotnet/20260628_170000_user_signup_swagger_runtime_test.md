# Dev .NET Agent — Work Log
## Date: 2026-06-28
## Time: 17:00:00
## Subject: user_signup_swagger_runtime_test

### What Was Done
- Added `Swashbuckle.AspNetCore` to `AI.HR.Api`; wired `AddSwaggerGen`/`UseSwagger`/`UseSwaggerUI` in `Program.cs` (Development only).
- Applied EF migrations to LocalDB (`dotnet ef database update`) — already up to date.
- Ran `AI.HR.Api` locally (`dotnet run`, `http://localhost:5298`) and manually tested `POST api/users/signup` with curl.
- **Found and fixed a bug**: `UserBL.ToUserItem` didn't set `RoleId`, defaulting to `0` — violated `FK_Users_Roles_RoleId` (Roles seeded starting at 1), causing every Sign Up to fail with HTTP 500. Fixed by defaulting to `RoleId = 7` ("Other") via new `UserBL.DefaultSignUpRoleId` constant.
- Re-verified after fix: valid Sign Up → 200; invalid (short password) → 400 with correct message; repeat email → 200, same `userId`, fields updated (confirms `Upsert` path works, no duplicate row).
- Updated dashboard (`hr_drive/vibe/dev_dashboard/hr_dev_dashboard/api_data.js`) — `AI.HR.Api` (UsersController, DI, Swagger), `AI.HR.BL` (UserBL, UserValidationService), `AI.HR.Models` (UserRequest, UserResponse), new `AI.HR.Repoistories` section (UserRepository).
- Updated design doc: `hr_agile/architecture/decisions/TDD_users_signup/002_TDD_users_signup.md` (bug + fix + verification table).

### Decisions Made
- Self-service Sign Up defaults new users to `RoleId = 7` ("Other") since `UserRequest` has no role field — open question on whether this should be configurable, flagged for product/architect.

### Pending / Next Steps
- Password hashing still not implemented.
- Role-assignment policy for Sign Up not finalized.
- No automated test suite yet — verification so far is manual curl only.
