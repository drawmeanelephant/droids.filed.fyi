---
title: Exorcism eve — what the desktop app leaves behind and what it watched
parent: log/2026-11
tags: [factory, desktop, telemetry, storage, missions]
status: draft
summary: Before uninstalling Factory, an inventory of its logs, its telemetry surface, and its disk footprint — ten-minute telemetry records tagged with persistent identity, and one paused mission that accumulated 3.2 GB of evidence beside three indexed commits in one merged PR.
published_at: 2026-11-26T08:30:00Z
relations: [relates_to=reviews/factory-droid-final-thoughts, relates_to=log/2026-11-25-factory-last-month]
---

# Exorcism eve — what the desktop app leaves behind and what it watched

- Surface: Factory desktop app (1.20.0, auto-updated to 1.21.1 on quit)
- Date: 2026-11-26
- Evidence: `~/Library/Logs/Factory/desktop-droid.log.2026-11-25` (full
  day pinned), the shipped `app.asar` code, `du` over both data dirs
- Verdict: promote — feeds the final-thoughts review and the nit ledger

Before uninstalling I read what the app leaves behind. Three findings
survive the read.

## The telemetry is not anonymous, and it is continuous

One day of the desktop log: 1,745 lines, zero errors. Nearly every
line carries a persistent account ID, org ID, and subscription tier;
the computer and host IDs appear in registration lines rather than on
every metric. The only redaction anywhere is a working-directory
path. While the window is open, the app records periodic telemetry in
ten-minute batches: memory in nine categories, CPU by process type,
renderer main-thread utilization, long animation frames — and how many
agent sessions you have open, in buckets. Factory can reconstruct the
shape of your working day at ten-minute resolution, tied to a
persistent identity.

Evidence boundary: this is the local log. It shows what the app
records; the aggregation flags say it feeds product metrics, but I did
not capture network traffic, so I am not claiming what leaves the
machine. The recorded shape is interesting enough without inflating it.

## The Chrome probe is a real nit

Twenty-six times in that one day, the app tried to read my real Chrome
profile's Local State — not at startup, but repeatedly through normal
use. The shipped code shows a deliberate feature: import your Chrome
cookies into the agent's browser, keychain key and all. macOS denied
every probe with EPERM. Full write-up:
[[nits/factory-desktop-chrome-import-probe]].

## The cost shape moved to mission evidence

`~/.factory` was 2.3 GB in the October storage sweep. It is 5.0 GB
now, and the growth is dominated by `missions/` — a tenant that barely
existed five weeks ago. One mission — the VirelaiOS backlog — accounts
for 3.2 GB by itself. Its fleet-acceptance evidence includes six run
logs of about 400 MB apiece across three runs, plus smaller serial
logs. The distilled gate and report text is tens of kilobytes per run.
The mission itself is paused in its local state file; the only merged
output from it visible in the inventory is three
indexed Factory-attributed commits, all in
[PR #3938](https://github.com/drawmeanelephant/VirelaiOS/pull/3938).

That is the subscription in miniature: evidence at machine scale, far
more proof than a person can read, no pruning evident in the retention
behavior I observed — and the useful tens of kilobytes sitting next to
the 3.2 GB, indistinguishable without a critic.

## Postscript: the temp trees are worse

`~/.factory` is not the whole disk tax. The `/private/tmp` shape is
still bad even without the inflated number I first drafted: at the
pinned re-check, two full retry worktrees for one capture-vector PR
remained, 11 GB and 4.9 GB. Each duplicated a vendored rune checkout
of roughly 300 MB and multiplied it by a multi-gigabyte Rust `target/`
directory. Probe directories for retries r10 through r12 show that
this was a retry loop, not one careful workspace. The `.factory`
jacket in each tree is only two small skill files; it is evidence of
scaffolding replication, not meaningful disk usage. I did not pin the
earlier peak before some retry trees were cleaned, so no larger total
is claimed here.

Honesty requires one counterweight: not all of the disk tax is the
harness. Every language in the stack levies its own version. Rust is
the worst — target directories are gigabytes even without agents. Zig
is a prince by comparison and still leaves a big build directory plus
some CI guilt. Go is isolated build diarrhea — fast, but scattering
its little artifacts everywhere. The agent multiplies the workspaces;
the toolchain multiplies each workspace; nothing in this composition
deduplicates the copies by default. Every layer has a locally
reasonable excuse — workspace-local artifacts are a design choice and
cleanup is always somebody else's job — and the composition is many
gigabytes. Nobody owns deletion at any layer, which is the whole
problem in one sentence.
