---
title: A flatlophone, briefly waiting on DNS
parent: log/2026-10
tags: [factory, empire, fart-app, ci]
status: draft
summary: The supposedly stuck demo PR had merged; its red attempt failed during provisioning, before the instrument played.
published_at: 2026-10-01T00:00:00Z
relations: [relates_to=farts/fart-app]
---

# A flatlophone, briefly waiting on DNS

- Surface: repository and CI study, not an implementation delegation
- Date: 2026-10-01
- Evidence: [PR #56](https://github.com/drawmeanelephant/fart-app/pull/56),
  the run receipts below, and
  `2026-10-01-empire-self-study.assets/03-fart-app/report.md`
- Verdict: keep

## Where we are

I went looking for a stuck fart-app PR and found that it had already
escaped: [#56 merged](https://github.com/drawmeanelephant/fart-app/pull/56),
and [main's live demo passed](https://github.com/drawmeanelephant/fart-app/actions/runs/36860373305/job/110364323812).
The red receipt was less musical. A cache download stalled, the
fallback clone couldn't resolve `github.com`, and the actual demo never
started. That's a provisioning failure, not evidence that the
instrument lost its beat.
[Failed attempt](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110351731710).

## What's improved

The same PR head got a clean cache restore on retry and printed
**DEMO PASS**, with silence rejected and matching payload bytes. No
workflow repair happened between those attempts.
[Retry](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110358988801);
[PR change](https://github.com/drawmeanelephant/fart-app/commit/295e0fa95e2b3843e65bdf9bffbbe28ee4f419a2).
There is already a live reference-server gate, a 30-minute ceiling,
and a listen-ready check instead of a hopeful sleep.
[Workflow](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L148-L160);
[readiness check](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/demo/run_demo.sh#L91-L101).
For a project called fart-app, that's a pleasingly serious set of
receipts.

## What's next

Keep the gate; make its setup less ambiguous. The reference SHA is
currently part of the cache key, but the checkout only prints whether
it matches, and the clone gets one attempt.
[Bootstrap](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L179-L231).
The follow-up scope is to verify identity, recover from bounded
transient fetch failures, and label current bootstrap evidence
separately from the historical files the upload can collect even when
the demo is skipped.
[Upload](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L236-L243);
[failed job](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110351731710).
That is a recommendation, not a repair shipped by this study.
The scope is now filed as
[#58](https://github.com/drawmeanelephant/fart-app/issues/58).

Prove the eventual change on cold and warm caches, not by repeatedly
rerunning a failed musical assertion. The older second-session
disconnect remains a different story:
[#28 is closed](https://github.com/drawmeanelephant/fart-app/issues/28),
with clean investigation runs but no established cause in
[#54's measurements](https://github.com/drawmeanelephant/fart-app/pull/54).
No new runtime reproduction here means no new runtime verdict.

Part of [[log/2026-10-01-empire-self-study]]. The study records research
work, not a claimed Luna implementation run.

Later work lives on [[farts/fart-app]], including
[[log/2026-10-14-great-frontier-fart-off]]. This entry remains the
October 1 CI snapshot.
