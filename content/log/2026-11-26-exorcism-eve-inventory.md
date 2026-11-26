---
title: Exorcism eve — what the desktop app leaves behind and what it watched
parent: log/2026-11
tags: [factory, desktop, telemetry, storage, missions]
status: draft
summary: Before uninstalling Factory, an inventory of its logs, its telemetry surface, and its disk footprint — minute-resolution attention records tagged with persistent identity, and one mission that turned 3.2 GB of serial console into five commits.
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
line carries a persistent account ID, org ID, machine IDs, and the
subscription tier. The only redaction anywhere is a working-directory
path. Once a minute, while the window is open, the app records memory
in nine categories, CPU, renderer main-thread utilization, long
animation frames — and how many agent sessions you have open, in
buckets. Factory can reconstruct the shape of your working day at
minute resolution, tied to a persistent identity.

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
now, and the growth is almost entirely `missions/` — a tenant that
barely existed five weeks ago. One mission — the VirelaiOS backlog —
accounts for 3.2 GB by itself, mostly raw serial-console logs around
420 MB apiece, kept as evidence for three fleet-acceptance runs. The
distilled proof in the same directories is a few kilobytes of gate
files. Merged output from that whole arc: five indexed commits.

That is the subscription in miniature: evidence at machine scale,
proof nobody will ever read, no pruning anywhere in the design — and
the valuable 52 KB sitting next to the 3.2 GB, indistinguishable
without a critic.

## Postscript: the temp trees are worse

`~/.factory` is not even the big tenant. `/private/tmp` holds 100 GB,
most of it capture-vector worktrees: nine retries of a single PR, each
a complete Rust workspace of eight to eleven gigabytes — an 8 GB
`target/` directory plus a 302 MB vendored rune checkout — plus probe
logs and companion dirs. Every ephemeral workspace also gets its own
photocopied `.factory` job jacket: the skills, the orientation doc,
the claims protocol. The harness replicates its scaffolding into every
temp tree and cleans up none of it. The macOS tmp cleaner will
eventually reap some of this, but "the OS eventually deletes it" is
not a retention policy — it is the absence of one, outsourced.

Honesty requires one counterweight: not all of the disk tax is the
harness. Every language in the stack levies its own version. Rust is
the worst — every target directory is gigabytes, and I deleted perhaps
500 GB of build artifacts in a single day of ordinary work. Zig is a
prince by comparison and still leaves a big build directory plus some
CI guilt. Go is isolated build diarrhea — fast, but scattering its
little artifacts everywhere. The agent multiplies the workspaces;
the toolchain multiplies each workspace; the operating system offers
no transparent deduplication for the nine byte-identical vendored
checkouts rotting in parallel trees. Every layer has a locally
reasonable excuse — workspace-local artifacts are a design choice,
clone-on-write exists but compilers do not use it, cleanup is always
somebody else's job — and the composition is a hundred gigabytes.
Nobody owns deletion at any layer, which is the whole problem in one
sentence.
