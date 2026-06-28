# 🗄️ Dev SQL Agent — Work Log
## Date: 2026-06-28
## Time: 13:50:00
## Subject: Users/Roles Schema Design for Signup + Login

### What Was Done
- Reviewed actual `signup.ts`/`login.ts` form fields in `aihrweb` to ground the schema in real UI data rather than guessing.
- Designed two tables for `AI_HR`:
  - `Roles` — lookup table seeded with the 7 fixed values already in the signup role dropdown (HR Manager, HR Executive, Recruiter, Payroll Manager, Team Lead, Developer, Other).
  - `Users` — FullName, Email (unique), Company, RoleId (FK), PasswordHash (hashed, never plaintext), CreatedAt, IsActive.
- Confirmed `confirmPassword` from the signup form is client-side-only validation and correctly excluded from the schema.
- Initially drafted a raw `.sql` script (`hr_data_source/hr_sql/001_create_roles_and_users.sql`), then — after discussing approach with the user — switched to EF Core Code-First so schema lives in C# entities with migration history, instead of a hand-maintained SQL script.

### Status
| Table | Status |
|---|---|
| `Roles` | ✅ Created (via EF migration), 7 rows seeded |
| `Users` | ✅ Created (via EF migration), 0 rows |

### Pending / Next Steps
- No further schema work needed until a new feature requires it (e.g. Employees table to back the existing UI page).
