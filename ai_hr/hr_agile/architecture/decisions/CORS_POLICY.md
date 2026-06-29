# Understanding — CORS Policy in Program.cs

## Code in Question
```csharp
builder.Services.AddCors(options =>
    options.AddPolicy("AllowAngularDev", policy =>
        policy.WithOrigins("http://localhost:4201").AllowAnyHeader().AllowAnyMethod()));
```
(`AI.HR.Api/Program.cs`, registered alongside `app.UseCors("AllowAngularDev")` in the request pipeline.)

## What CORS Is
CORS (Cross-Origin Resource Sharing) is a browser security rule: a web page served from one origin (scheme+host+port) is blocked by default from calling an API on a *different* origin, unless that API explicitly says it's allowed to.

`AI.HR.Api` runs on `http://localhost:5298`. The Angular dev server (`aihrweb`) runs on its own port — `http://localhost:4201`. From the browser's point of view, those are two different origins. Without CORS configured, the Angular app's `fetch`/`HttpClient` calls to the API would be blocked by the browser, even though both are running on the same machine.

## What This Specific Code Does
- `AddCors(...)` registers a named policy, `"AllowAngularDev"`.
- `WithOrigins("http://localhost:4201")` — only requests whose `Origin` header is exactly this URL are allowed. Any other origin is rejected.
- `AllowAnyHeader()` — the browser may send any request header (e.g. `Content-Type: application/json`).
- `AllowAnyMethod()` — any HTTP method is allowed (GET, POST, PUT, DELETE, etc.), not just GET.
- `app.UseCors("AllowAngularDev")` later in the pipeline actually applies this policy to incoming requests.

## Why It's Scoped This Narrowly
This is a **Dev-only** allowlist — it only trusts the Angular dev server's local port. It does **not** use `AllowAnyOrigin()`, which would let *any* website call the API. As QA/UAT/Prod environments come online (see `hr_ui/documents/hrweb_doc/REST_API_ENDPOINTS.md`), each will need its own origin added — either as additional named policies or by reading the allowed origin from configuration per environment, rather than hardcoding `localhost:4201`.

## Pending / Next Steps
- Move the allowed origin into `appsettings.{Environment}.json` so QA/UAT/Prod don't require code changes — just config.
- Decide whether to keep one policy per environment, or one policy whose origin list is read from config.

---
*Defined by: Architect Agent | Date: 2026-06-29*
