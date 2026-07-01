# REST API Endpoints — Web Application Reference

Tracks which REST API endpoint each web UI page uses, and the base URL per environment. Maintained by `dev-angular` (UI side) and `dev-dotnet` (API side).

## Environments

| Environment | Base URL | Status |
|---|---|---|
| Dev | `http://localhost:5008` | **Active** — current working environment. Fixed via `AI.HR.Api/Properties/launchSettings.json` (`http` profile `applicationUrl`) — do not run with an ad-hoc `--urls` override. |
| QA | _TBD_ | Not provisioned yet |
| UAT | _TBD_ | Not provisioned yet |
| Prod | _TBD_ | Not provisioned yet |

Once QA/UAT/Prod base URLs are known, populate this table and mirror them into the Angular app's environment files (`src/environments/environment.<env>.ts` — not yet created; `aihrweb` currently has no environment config).

## Endpoint ↔ UI Page Mapping

| Endpoint | Method | UI Page | Component Path | Wired to Real API? |
|---|---|---|---|---|
| `api/users/signup` | POST | Sign Up | `hr_ui/aihrweb/src/app/features/signup/signup.ts` | ❌ No — `onSubmit()` currently uses a mock `setTimeout`, not an HTTP call |
| `api/users/roles` | GET | Sign Up (role dropdown) | `hr_ui/aihrweb/src/app/features/signup/signup.ts` | ❌ No — `roles` is a hardcoded string array, not fetched from the API |
| `api/users/login` | POST | Login | `hr_ui/aihrweb/src/app/features/login/login.ts` | ❌ No — endpoint exists, returns a JWT `token` on success, tested via curl, but `login.ts` not yet wired to call it or store the token |

## Auth
`POST api/users/login` returns a signed JWT in `LoginResponse.Token` (60 min expiry). No endpoint currently requires it (`[Authorize]` not used yet). Once protected endpoints exist, the Angular app should store this token (e.g. in memory or a secure storage mechanism — not yet decided) and send it as `Authorization: Bearer {token}` on subsequent requests.

## Notes
- Backend source of truth for endpoint behavior: `hr_agile/architecture/decisions/TDD_users_signup/002_TDD_users_signup.md` (Sign Up), `004_TDD_users_login.md` (Login + JWT).
- This file should be updated whenever: a new endpoint is added, a UI page is wired to call a real endpoint instead of a mock, or a new environment's base URL becomes available.

## Pending / Next Steps
- Wire `signup.ts` to call `POST api/users/signup` and `GET api/users/roles` instead of mock data.
- Wire `login.ts` to call `POST api/users/login` instead of mock data.
- Provision QA/UAT/Prod environments and populate their base URLs here.
- Create Angular `environment.ts` files once more than one environment exists.
