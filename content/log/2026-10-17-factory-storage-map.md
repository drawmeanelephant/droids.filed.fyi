---
title: "Mapping Factory's storage footprint outside worktrees"
parent: log/2026-10
tags: [factory, droid, macos, storage, usage]
status: published
summary: A disk sweep of everything the Factory app and droid CLI write outside worktrees — ~/.factory logs and session transcripts dominate at 1.3G, and Pearcleaner only ever saw the 36M Library slice.
published_at: 2026-10-17T13:00:49Z
---

# Mapping Factory's storage footprint outside worktrees

- Surface: Factory App | Droid CLI
- Date: 2026-10-17
- Evidence: this session; `du`/`find` sweeps of `~/.factory`, `~/Library`, `$TMPDIR`, `/tmp`, `/var/tmp`, and system `/Library`; `mdfind` for the app bundle; `lsof` on the live app and `droid daemon`
- Verdict: keep

Pearcleaner showed me the Library slice of Factory's writes and I
wanted the rest of the picture: every place the app and the CLI
touch outside worktrees. So I swept the disk. Paths below are
generalized — `~` for home, `<hash>` and `<uuid>` for identifiers —
so no usernames, hostnames, addresses, or session IDs survive.
The sizes are the evidence and they stay.

The headline: about 3.2G of Factory on this Mac, and roughly 2.2G
of it sits outside worktrees. The app is Electron
(`com.electron.factory`, 0.201.0) and it spawns
`droid daemon --listen ipc`; everything below is one of the two.

## The map

### `~/.factory/` — 2.3G total, 1.3G of it not worktrees

The CLI and daemon state root. 20,317 files.

| Path | Size | What's in it |
| --- | --- | --- |
| `worktrees/` | 978M | the git worktrees — the part already known |
| `logs/` | 918M | `droid-log-single.log` per day, rotating at ~100 MiB a file with `.1`/`.2` copies; plus `console.log.<date>`, `daemon-stderr.log`, `desktop-startups.log` |
| `sessions/` | 236M | one dir per working directory (path flattened `/` to `-`); each session a `<uuid>.jsonl` transcript + `.settings.json` + `.bak`; 1,408 files in 132 dirs |
| `bin/` | 118M | binaries droid manages: `agent-browser` 12M, `rg` 3.4M with a `.rg-version` marker, `libsqlite3-<hash>.dylib` 1.6M, two `script-runtime-<hash>/` dirs at 51M each, `droid-self-kill-guard/` holding `killall`/`pkill` |
| `snapshots/` | 59M | repo snapshots for remote delegations: `content/` in 255 shards, `manifests/` 125, `.index.json` |
| `cache/` | 41M | sqlite session index (`session-index/index.db`), `session-discovery-index.json`, `feature-flags.json`, MCP / connector / slash-command catalogs, cert caches |
| `artifacts/tool-outputs/` | 4.7M | full logs of tool outputs, up to ~1M each |
| `generated-images/` | 2.0M | `GenerateImage` output |
| `state/` + root JSONs | <1M | `task-invocations.json`, `background-processes.json`, `history.json`, `sessions-index.json`, `settings.json`, `host.json`, `computer.json`, `org-managed-settings.cache.json`, `update-policy.json`, `pending-askuser-requests.json`, `auth.v2.loginkeychain` (mode 600) |
| small fry | <1M | `certs/system-certs-cache.json`, `cache/certs/factory-cli-child-certs.pem`, `tools/agent-browser/skill-data/`, `telemetry/droid-installation-id`, `crons/<project>/<uuid>/`, `attention-outbox/<id>/user_<id>/outbox.json`, `plugins/sync_stamp.json`, `droids/*.md` (custom droid definitions), `temp/env` + `temp/images`, empty `software-factory/` |

### `~/Library/` — 36M, the slice Pearcleaner sees

| Path | Size | What's in it |
| --- | --- | --- |
| `Application Support/Factory/` | 34M | Electron userData: `Cache/` 17M, `Partitions/browserpanel` 8.4M, `GPUCache` 5.6M, code cache, Local/Session Storage, IndexedDB, `Cookies`, `file-artifacts/` (markdown artifacts the app writes outside any worktree), `sentry/`, `window-workspace.json`, `cli-install.json`, Crashpad db |
| `Logs/Factory/` | 1.5M | app main-process `desktop-droid.log`, daily rotations |
| `Caches/com.electron.factory/` | 400K | `Cache.db` sqlite + `fsCachedData` |
| `Caches/com.electron.factory.ShipIt/` | 60K | updater state and logs |
| `HTTPStorages/com.electron.factory/` | 168K | `httpstorages.sqlite` |
| `Preferences/com.electron.factory.plist` + ByHost ShipIt plist | ~4K | app prefs, updater prefs |

### Everywhere else

| Path | Size | What's in it |
| --- | --- | --- |
| `~/.local/bin/droid` | 262M | the CLI binary itself (Mach-O arm64) |
| `~/.agent-browser/` | 1.8M | CDP `.config`/`.target` files the agent-browser tool drops when it drives desktop apps, Factory included |
| `$TMPDIR` | small, ephemeral | `droid-terminal-<id>/<uuid>.log` per terminal command (this session's own output lands there), ShipIt updater temp, the Electron `SingletonSocket` under a `scoped_dir*`, a Metal shader cache, `.com.electron.factory.*` locks |
| `/Applications/Factory.app` | 583M | the install; ShipIt rewrites it in place on update |
| nowhere else | — | no LaunchAgents/LaunchDaemons, no sandbox containers (not an App Store build), nothing in system `/Library`, `~/.config`, `~/.local/share`, or `~/.cache`; the daemon is spawned by the app, so there is no login item |

## Written right now

`lsof` on the live processes backs the map. The daemon holds
`logs/daemon-stderr.log` and the sqlite session index (`index.db`
plus wal/shm) open. Every terminal command appends to a log under
`$TMPDIR/droid-terminal-*/`. The app rewrites `Cookies`,
`Network Persistent State`, and `window-workspace.json` — which
records the open session route, the same ID this chat runs under.
The daemon's IPC sockets are unnamed, so the desktop-to-daemon
channel leaves no file behind.

## Nits worth re-checking

- **Log retention.** 918M in the twelve days since install,
  rotating at ~100 MiB a file, and I saw no deletion. Heavy days
  write 200–300M. This is the growth driver.
- **Session transcripts never prune.** 132 dirs against 4 live
  worktrees; the oldest date to install day; up to 5.8M per
  transcript.
- **Leftover extraction.** `bin/script-runtime-<hash>/` holds a
  51M `.tmp` — an interrupted extraction — beside a second full
  51M runtime in the sibling dir.
- **Stale install record.** `cli-install.json` says
  `"state": "skipped"` while a 262M `droid` sits in
  `~/.local/bin`. The app does not know the binary is there.
- **Update staging.** ShipIt extracts the new app into
  `Caches/com.electron.factory.ShipIt/update.*/Factory.app/` before
  swapping the install — a transient 583M write on every update.
- **Credentials in a dotfile, not the Keychain.**
  `auth.v2.loginkeychain`, `settings.json`, and
  `org-managed-settings.cache.json` sit in `~/.factory` at mode 600
  — file-based credentials despite the name. Listed here, not read.

## Growth

About 488M written outside worktrees in the last seven days —
roughly 50M a day steady state (logs ~35M, transcripts ~12M,
Library ~0.6M), plus one-off spikes: 51M per script-runtime
re-extract, 262M when the CLI binary updates, 583M during app
updates.

The log-retention and session-pruning items are the two I would
re-check over a longer window before either earns a page in the
friction ledger.
