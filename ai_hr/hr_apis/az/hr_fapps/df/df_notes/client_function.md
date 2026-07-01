# Durable Functions — Client Function

## What it is
The entry point that starts (or otherwise manages) a durable orchestration
instance. It's a regular trigger (HTTP, queue, timer, etc.) with a
`DurableTaskClient` injected — it doesn't run the workflow logic itself, it just
kicks off the orchestration and reports back.

## Example in this repo
`HttpStart` in `df_id_extractor/Function1.cs` (lines 36-53):

```csharp
[Function("Function1_HttpStart")]
public static async Task<HttpResponseData> HttpStart(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req,
    [DurableClient] DurableTaskClient client,
    FunctionContext executionContext)
{
    string instanceId = await client.ScheduleNewOrchestrationInstanceAsync(
        nameof(Function1));

    return await client.CreateCheckStatusResponseAsync(req, instanceId);
}
```

## Key points
- **Trigger type is your choice.** Here it's `HttpTrigger`, but a client function
  can be triggered by a queue message, blob upload, timer, etc. — whatever should
  kick off the workflow.
- **`[DurableClient] DurableTaskClient client`** — binding that provides the API to
  manage orchestrations:
  - `ScheduleNewOrchestrationInstanceAsync(orchestratorName, input)` — starts a new
    instance, optionally passing input data. Returns an `instanceId`.
  - `CreateCheckStatusResponseAsync(req, instanceId)` — builds an HTTP 202 response
    with status/query/terminate/purge URLs so the caller can poll progress instead
    of waiting synchronously.
  - `GetInstanceAsync(instanceId)` — fetch current status/output directly.
  - `RaiseEventAsync(instanceId, eventName, data)` — send an external event into a
    running orchestration (e.g. human approval step).
  - `TerminateInstanceAsync(instanceId, reason)` — force-stop a running instance.
- **Not replay-safe-constrained.** Unlike the orchestrator function, the client
  function runs once per invocation like any normal function — no determinism
  rules apply.
- **Typically async/fire-and-forget from the caller's view.** Since orchestrations
  can be long-running, the client function usually returns immediately (202 +
  status URL) rather than waiting for the whole workflow to finish.

## Relevance to df_id_extractor
This is likely the function a caller (e.g. the Angular document-intelligence UI,
or another API) hits to say "here's a document, go extract the ID." It would pass
a document reference as input to `ScheduleNewOrchestrationInstanceAsync`, and the
caller would poll the returned status URL for the extraction result.
