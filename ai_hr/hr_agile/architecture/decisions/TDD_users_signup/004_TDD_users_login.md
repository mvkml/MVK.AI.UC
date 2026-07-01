# Technical Design Document — Users Controller: Login Flow

## Version
004 | Date: 2026-06-30 | Author: Dev .NET Agent

## Status
Implemented and manually verified — JWT issuance added

## Change from v003
v003 left Login without any session/token issuance (flagged as the main open gap). This version adds JWT access tokens.

**Scope decision (user-confirmed)**: Basic JWT only — no refresh-token persistence, no DB change. Token simply expires (60 min) and the user must log in again. Revisit refresh tokens / revocation only if a real need for "stay logged in" UX or server-side logout appears later.

## New Components
| Component | Type | Path | Purpose |
|---|---|---|---|
| `JwtSettings` | Config POCO | `AI.HR.BL/Security/JwtSettings.cs` | `Issuer`, `Audience`, `SecretKey`, `ExpiryMinutes` — bound from `appsettings.json` `"Jwt"` section |
| `ITokenService` / `TokenService` | Service | `AI.HR.BL/Security/TokenService.cs` | `GenerateToken(UserItem)` — builds a signed JWT (HMAC-SHA256) with `sub`, `email`, role claims |
| `LoginResponse.Token` (new property) | Model | `AI.HR.Models/LoginResponse.cs` | Carries the JWT back to the client |
| `UserBL.Login` (updated) | Business Layer | `AI.HR.BL/UserBL.cs` | Now constructor-injects `ITokenService`; calls `GenerateToken` after password verification succeeds |
| JWT Bearer middleware | Config | `AI.HR.Api/Program.cs` | `AddAuthentication().AddJwtBearer(...)`, `app.UseAuthentication()` (before `UseAuthorization()`) |

## No Database Change
Confirmed and implemented as a stateless JWT — the token's signature + `exp` claim are the only validity check; nothing is persisted server-side. `Users` and `Roles` tables are unchanged.

## Packages Added
- `AI.HR.BL`: `System.IdentityModel.Tokens.Jwt` (token generation)
- `AI.HR.Api`: `Microsoft.AspNetCore.Authentication.JwtBearer` (pinned to `8.0.28` — the `10.x` latest only targets `net10.0`, this solution is `net8.0`)

## Config (Dev)
`appsettings.json` → `"Jwt"` section: `Issuer: "AI.HR.Api"`, `Audience: "AI.HR.Web"`, `ExpiryMinutes: 60`, plus a dev-only `SecretKey`.

**Pending hardening**: the Dev `SecretKey` is currently committed in `appsettings.json` in plain text. Before QA/UAT/Prod exist, this must move to a secrets manager (Azure Key Vault / environment variable / user-secrets) — each environment needs its own key, never reused from Dev. Flagged here so it isn't missed.

## Manual Verification (curl against `http://localhost:5008`)
- `POST api/users/login` with valid credentials → `200 OK`, response now includes a `token` field.
- Decoded the JWT payload: contains `sub` (UserId), `email`, role claim, `exp`, `iss`, `aud` — all correct.
- `GET api/users/roles` (no `[Authorize]` attribute) still works without a token — confirms adding auth middleware didn't break existing unauthenticated endpoints.

## Pending / Next Steps
- No endpoint actually requires the token yet (`[Authorize]` not used anywhere) — there's nothing to protect until a feature needs it.
- Move `Jwt:SecretKey` out of `appsettings.json` before any non-Dev environment is provisioned.
- `login.ts` (Angular) still uses mock data — needs to call this endpoint and store the returned token (e.g. for sending `Authorization: Bearer` on future requests).
- Refresh tokens / logout-revocation deliberately deferred — revisit if/when "stay logged in" or admin-initiated logout becomes a real requirement.
