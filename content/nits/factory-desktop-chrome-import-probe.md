---
title: Factory desktop probes Chrome's profile repeatedly without a user action
parent: nits/index
tags: [nit, factory-desktop, privacy, chrome, browser-panel]
status: draft
summary: The Factory desktop app's Chrome-cookie import feature probes the real Chrome profile directory over and over during normal use — twenty-six times in one day — with no user action and no consent moment; only macOS EPERM stands in the way.
published_at: 2026-11-26T08:30:00Z
---

# Factory desktop probes Chrome's profile repeatedly without a user action

Filed while inventorying the app before uninstall. Evidence pinned in
the research stash: a full day of `desktop-droid.log` and the relevant
code extracted from the shipped `app.asar` (version 1.20.0).

## What I did

Nothing. That is the point. I opened the desktop app, used it normally
across an evening — sessions, browser panel, settings — and later read
`~/Library/Logs/Factory/desktop-droid.log.2026-11-25`.

## What happened

Twenty-six warnings in one day:

```text
WARN: [chromeImport] Could not read Chrome Local State
Context: {"reason":"EPERM", ...}
```

Not once at startup: at 17:20, 17:21 (five times inside two minutes),
17:54, 18:10, 18:48, 20:27, 21:22, on past midnight. Whatever mounts
the browser-panel UI re-runs the probe every time.

Reading the shipped code (`initLifecycle-*.js` inside `app.asar`)
shows what the probe is for. The app ships a feature that imports your
real Google Chrome cookies into the embedded browser panel session:

1. read `~/Library/Application Support/Google/Chrome/Local State` for
   the last-used profile,
2. copy the Chrome Cookies SQLite database to a temp directory, with
   retry logic for when Chrome is mid-write,
3. pull the "Chrome Safe Storage" key out of the macOS keychain with
   `security find-generic-password`,
4. decrypt cookies with the standard saltysalt/PBKDF2 construction,
5. write them into the browser panel's Electron session — so the
   agent's browser is logged in as you, everywhere you use Chrome.

On this machine nothing past step one ever ran. The probe fails at
reading Local State, so the import button presumably never renders.
The keychain was never touched; no cookies were copied.

## What I expected

An import button can exist. But the availability check does not need
to read my browser profile to render a button — and it certainly does
not need to read it dozens of times a day. Probe once, cache the
answer, or better: attempt nothing until the user clicks something
that says what is about to happen.

## The workaround, if one survived

macOS. EPERM is doing all the work. On a machine where the user has
ever granted the access — or where the entitlement landscape shifts —
every one of those retries succeeds silently. The actual decryption
step does have a real consent moment (the keychain prompt), and the
import itself is user-initiated; the probe is the part with no gate.

## Verdict

still-broken — as of version 1.20.0, 2026-11-25. Re-check: relaunch
the app, use the browser panel, count warnings in
`~/Library/Logs/Factory/desktop-droid.log`.
