# Durable Functions — Notes

## What it is
An extension of Azure Functions for writing stateful, multi-step workflows on top
of the normally stateless Functions runtime. The runtime checkpoints progress
automatically, so a long-running workflow survives restarts/scaling without a
hand-rolled state store.

## Core building blocks
- **Orchestrator function** — defines the workflow (call step A, then B, then C).
  Must be deterministic/replay-safe: the runtime re-runs this function from its
  history to resume after any restart, so no direct I/O, `DateTime.Now`,
  `Guid.NewGuid()`, etc. inside it — use the context-provided equivalents instead.
- **Activity function** — the actual work (I/O, HTTP calls, computation, non-deterministic
  code). Called from the orchestrator via `context.CallActivityAsync<T>(...)`.
- **Client / trigger function** — entry point that starts a new orchestration instance
  (e.g. HTTP trigger calling `ScheduleNewOrchestrationInstanceAsync`) and can report
  status back (`CreateCheckStatusResponseAsync` returns a 202 + status-check URLs).

## Current state in this repo
- `df_id_extractor` (az/hr_apps/df/df_id_extractor) is an untouched scaffold from
  `func new` — default "Hello Cities" orchestrator (`Function1.cs`), nothing
  ID-extraction-specific implemented yet.
- There's also a sibling folder `df_id_extractors` (plural) — worth checking whether
  that's a duplicate/leftover or intentionally separate.

## Likely shape for an ID extractor workflow
1. HTTP trigger receives a document (or a reference to one, e.g. blob URL).
2. Orchestrator calls activities in sequence:
   - extract text/OCR from the document
   - run ID-extraction logic (regex / AI model) over the text
   - persist or return the extracted result
3. Client polls the status-check URL until the orchestration completes.

Good fit for Durable Functions because the work is multi-step, potentially slow
(OCR/AI calls), and benefits from automatic retry/checkpointing rather than a single
stateless function trying to do it all in one request.
