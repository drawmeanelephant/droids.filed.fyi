---
title: Counting the last month of Factory Droid in receipts
parent: log/2026-11
tags: [factory, inventory, retrospective, receipts]
status: published
summary: A pinned GitHub inventory of Factory-attributed work since October 25, with 330 indexed commits across 13 repositories, the shipped arcs, the open tail, and the limits of the count.
published_at: 2026-11-26T00:06:09Z
relations: [relates_to=reviews/factory-droid-final-thoughts, relates_to=farts/brownnote, relates_to=projects/capture-vector, relates_to=projects/boris]
---

# Counting the last month of Factory Droid in receipts

- Surface: GitHub receipts from Factory Droid delegations, inventoried by Devin
- Date: 2026-11-25 local time, snapshot at 2026-11-26T00:06:09Z
- Evidence: [the pinned inventory](2026-11-25-factory-last-month.assets/factory-droid-inventory.json), its exact GitHub search query, and the pull requests linked below
- Verdict: keep

The subscription is done for now, so I asked the competition to do the
unsexy part: count what Factory Droid actually left in GitHub during the
last month. Devin ran the inventory. The filing system does not care
which agent does the archaeology, as long as the receipts survive.

The exact search was:

```text
user:drawmeanelephant "factory-droid[bot]" committer-date:>=2026-10-25
```

At the snapshot, GitHub returned **330 indexed default-branch commits**
across **13 repositories**. Of those, **290 are non-merge commits** and
**40 are merge commits**. They map to **209 distinct merged pull
requests** with at least one Factory-attributed commit. Another **8
indexed commits have no pull-request unit in the scan**. That count
excludes 22 Content Upgrades squash-merge commits whose PR associations
were inferred from embedded PR numbers or exact unique title matches.

This is provenance, not a productivity score. It does not measure hours,
money, model mix, or how much of any diff was mine. A co-author trailer
proves presence, not sole authorship. Several pull requests mix Factory
with Devin or dependency-bot work, and integration commits can carry yet
another trailer.

## The count by repository

| Repository | Indexed commits | Non-merge | Associated merged PRs | No PR unit | What the receipts represent |
| --- | ---: | ---: | ---: | ---: | --- |
| [brownnote](https://github.com/drawmeanelephant/brownnote) | 157 | 136 | 101 | 5 | Native pads, projects, takes, MIDI, plugins, and export |
| [capture-vector](https://github.com/drawmeanelephant/capture-vector) | 71 | 66 | 38 | 0 | A new Boris desktop shell, from packaging to Migrate |
| [boris](https://github.com/drawmeanelephant/boris) | 23 | 15 | 9 | 0 | Performance, security, streaming, and editor truthfulness |
| [content-upgrades](https://github.com/drawmeanelephant/content-upgrades) | 22 | 22 | 22 | 0 | The hackathon content engine in a one-day PR burst |
| [gostalgia](https://github.com/drawmeanelephant/gostalgia) | 20 | 20 | 17 | 0 | The bloom shell and multi-window experience |
| [boris-migration-lab](https://github.com/drawmeanelephant/boris-migration-lab) | 11 | 5 | 6 | 0 | Inventory and emit modes, some inside mixed-agent PRs |
| [obsequicms](https://github.com/drawmeanelephant/obsequicms) | 8 | 8 | 4 | 2 | CMS planning, hardening, and the read-only M1 |
| [wyla](https://github.com/drawmeanelephant/wyla) | 6 | 6 | 5 | 1 | Scaffold through the collector agent |
| [VirelaiOS](https://github.com/drawmeanelephant/VirelaiOS) | 5 | 5 | 3 | 0 | Networking, documentation, and hover-preview repairs |
| [k4o](https://github.com/drawmeanelephant/k4o) | 3 | 3 | 1 | 0 | Corpus conformance repairs |
| [dogbed](https://github.com/drawmeanelephant/dogbed) | 2 | 2 | 1 | 0 | The k4o-to-Oliver rendering path |
| [squirrel.filed.fyi](https://github.com/drawmeanelephant/squirrel.filed.fyi) | 1 | 1 | 1 | 0 | A light-mode homepage repair |
| [swe2-dogbed](https://github.com/drawmeanelephant/swe2-dogbed) | 1 | 1 | 1 | 0 | The final archive close-out |

The pull-request column counts distinct merged PRs associated with at
least one indexed Factory-attributed commit, including the inferred
Content Upgrades squash mappings. It does not mean Factory authored
every commit in those PRs. Two Dependabot-authored PRs appear because
integration work carried the trailer; other dependency-update PRs are
ordinary mixed work. The eight commits without a PR unit are five
Brownnote housekeeping or CI commits, two ObsequiCMS commits, and the
initial WYLA scaffold. The scan does not prove whether they were direct
pushes or simply unmapped.

## October 26: the content engine got its one-day blast

The month opened with 22 squash-merged PR commits in
[content-upgrades](https://github.com/drawmeanelephant/content-upgrades),
plus [k4o #72](https://github.com/drawmeanelephant/k4o/pull/72) and
[dogbed #33](https://github.com/drawmeanelephant/dogbed/pull/33).
The first Factory-attributed commit was the
[parallel agent plan](https://github.com/drawmeanelephant/content-upgrades/commit/ac45f06958c43eca76143aacdc1dcfd9632e2876),
and the last that day was a
[README pin correction](https://github.com/drawmeanelephant/content-upgrades/commit/59b87b82d05a3da9e17486ee3189b6b5b5344631).

The repository now describes `knap-mcp`: one Zig binary that serves MCP
and CLI calls, human-authored templates, deterministic formatting-density
checks, guarded voice passes, pinned k4o and dogbed renderers, and an
offline demo. Its
[frozen submission capture](https://github.com/drawmeanelephant/content-upgrades/tree/a47a36ca41a81012f531dcd593941842fd336760/demo/frozen-submission)
records two genuine Meta Muse Spark calls through Baseten. The bounded
upgrade take accepted one receipts row and moved the density score from
24.7 to 34.4 out of a 34.8 ceiling. The same README says the right
thing: this is a formatting-density example, not a model-quality
benchmark.

This burst is not a direct-push outlier. The commits are squash results
from small merged PRs. GitHub's commit-to-PR API does not associate
those result commits with their source PRs, so the inventory labels the
mappings as inferred rather than API-backed. The correction matters: the
audit shape is better than the raw API first suggested, not worse.

## November 6 through 20: Brownnote became an instrument

The largest arc is not close. Brownnote has **157 indexed commits** and
**101 associated merged PRs** between November 6 and November 20. The
first commit in the window adds the
[Rust/Rune pressure-pad instrument](https://github.com/drawmeanelephant/brownnote/commit/452c0962ea022b1b5d040f2a46fd2edbee95e038).
By the end, the CLI middleware joke had grown a native instrument beside
it.

The [public roadmap](https://github.com/drawmeanelephant/brownnote/blob/b4da62ff34a1dbb17390a7ed35da6e4c7d22fe3c/docs/site/content/roadmap.md) now records a careful list rather than a victory lap:
sixteen pads, sample import, gain, pan, pitch, ordered GuitarPedal
chains, portable projects, validated save and open, loop takes,
overdubbing, reversible quantization, MIDI learn, a sampled SF2
instrument, one live CLAP instrument, offline CLAP and LADSPA pedal
stages, neutral export, and a pinned SoundCraft handoff.
[PR #199](https://github.com/drawmeanelephant/brownnote/pull/199) is the
useful checkpoint because it corrected the docs to say what exists and
what does not. [PR #248](https://github.com/drawmeanelephant/brownnote/pull/248)
made the SoundCraft handoff actionable and packaged the adapter without
pretending that the app can launch SoundCraft.

The limits are part of the receipt. The roadmap says these paths are
proven by automated tests and a packaged smoke run with a silent mixer.
Audible output, physical device loss, and a named MIDI controller remain
open. Those are exactly the kinds of acceptance a coding agent cannot
declare complete for itself.

The same week also gave Boris a smaller, sharper performance series.
[PR #1157](https://github.com/drawmeanelephant/boris/pull/1157) reduced
a renderer harness from 4,164,022 successful allocation calls to 20,998
while preserving identical output bytes. The PR correctly refuses to
claim a wall-clock speedup. [PR #1158](https://github.com/drawmeanelephant/boris/pull/1158)
streamed file-backed publication evidence without whole-file input
copies. [PR #1160](https://github.com/drawmeanelephant/boris/pull/1160)
cut median idle watch polling on a 10,000-file fixture from 18.08 ms to
9.41 ms and reduced steady-state heap allocations to zero. Those are the
kinds of numbers worth keeping because their boundaries are written on
the label.

ObsequiCMS entered the shelf in the same burst. Its Factory-attributed
commits cover the foundation plan, public-repository hardening, Astryx
demo polish, and the read-only M1 connection. The [current README](https://github.com/drawmeanelephant/obsequicms/blob/81204350a2a4b0b172e3ef873eded00d05a36bbe/README.md) is
careful to separate the demo interface, the real Boris adapter, and the
connected read-only mode. It also says the app is not approved for
public hosting. That sentence stays.

## November 18 through 20: shells, sensors, migrations, and one OS repair kit

The next burst was shorter and broader: **43 indexed commits** in three
days.

Gostalgia accounts for 20 of them across 17 merged PRs. Factory did not
invent the project in this window. The M1 runtime already existed. The
Factory-attributed work is the bloom-era shell and window arc: layout,
layers, buffers, mouse input, finite motion, readability repairs, and
then floating app windows. [PR #257](https://github.com/drawmeanelephant/gostalgia/pull/257)
is the endpoint. It puts app presentations in bounded floating windows,
keeps every mouse action available by keyboard, documents the artifact
found in a real PTY, and runs the window scenarios repeatedly under the
race detector. The evidence is good because it says what the terminal
emulator did and did not prove.

[WYLA](https://github.com/drawmeanelephant/wyla) went from scaffold to
collector agent in one day: the repository scaffold, agent-readiness
checks, sensor log findings, parsers, append-only hash-chained storage,
and the collector. [PR #10](https://github.com/drawmeanelephant/wyla/pull/10)
is the readiness receipt: pinned tools, checks, integration tests,
release automation, CodeQL, privacy docs, and a way to drive the real
app. WYLA is still early development, not a released privacy product.

The migration lab gained Jekyll and MkDocs inventory modes, MkDocs and
Hugo emit modes, and ATProto inventory work. Some of those PRs were
opened by Devin and contain Factory-attributed commits. That mixture is
the point of using trailers rather than PR authors as the evidence
source.

VirelaiOS had only five indexed Factory-attributed commits, but they are
small, concrete changes:
[rxstarve inbound delivery-loss hops](https://github.com/drawmeanelephant/VirelaiOS/pull/3852),
documentation presentation, and the
[rail hover-preview card](https://github.com/drawmeanelephant/VirelaiOS/pull/3938).
This was a repair kit, not a new operating-system milestone.

## November 23 through 25: capture-vector appeared whole enough to name

[capture-vector](https://github.com/drawmeanelephant/capture-vector) was
created on November 23. Three days later it accounts for **71 indexed
Factory-attributed commits** and **38 associated merged PRs**. The speed
is absurd. The more important fact is that the repository already knows
what it is.

The [README](https://github.com/drawmeanelephant/capture-vector/blob/3fddabba2762f660182c1ac1ef7ef2e29c64ec7a/README.md) describes a pre-release native Rust desktop app: Outlook-style
mailboxes for authoring, auditing, and publishing Boris content, with
rune for the UI and Boris and Oliver as subprocess engines. It says the
shell can browse Pages, Outputs, Audit, Research, and Activity; edit
source pages in companion windows; run engine-backed builds and watches;
and verify itself through headless element-tree and layout goldens. It
also says signed installers, Windows proof, and the fully wired publish
module are still ahead.

The large UI checkpoint is
[PR #153](https://github.com/drawmeanelephant/capture-vector/pull/153),
with 17 Factory-attributed commits for the raised reading pane, sticky
headers, and one type scale. The migration checkpoint is
[PR #207](https://github.com/drawmeanelephant/capture-vector/pull/207),
which adds the Migrate module over real `boris-migration-lab` runs and
keeps human-review items advisory instead of blocking.

This is the strongest late-subscription evidence for the workflow that
works: small cards, visible acceptance, checked-in goldens, honest
degraded states, and a human still reading the result.

## The open tail is not shipped

The default-branch inventory misses work still sitting in open branches,
so the scan checked all 17 open PRs created since October 25. Four of
those PRs contain **5 unique Factory-attributed commits**:

- [boris #1193](https://github.com/drawmeanelephant/boris/pull/1193),
  the v2026.11.0 calendar-release PR, contains two Factory-attributed
  commits and one Devin commit. It was open, mergeable, up to date, and
  green at 2026-11-26T00:17:59Z. It is still not merged in the snapshot.
- [capture-vector #208](https://github.com/drawmeanelephant/capture-vector/pull/208),
  the copy-to-folder publish slice, is a draft. It contains two
  Factory-attributed commits that also appear on
  [#213](https://github.com/drawmeanelephant/capture-vector/pull/213),
  a draft artifact-probe PR.
- [capture-vector #211](https://github.com/drawmeanelephant/capture-vector/pull/211),
  the new-import wizard, is a draft with one Factory-attributed commit.

Those commits count as in-flight work, not delivered software. The
release PR in particular may be excellent, but excellence does not move
it into the merged column.

## The closed-unmerged tail is the coordination cost

The scan also checked the 21 closed, unmerged PRs created in the window.
Four contain **9 unique Factory-attributed commits**:

- [capture-vector #156](https://github.com/drawmeanelephant/capture-vector/pull/156)
  has three commits for the same editor-toolbar slice that
  [#155](https://github.com/drawmeanelephant/capture-vector/pull/155)
  carried into main.
- [brownnote #235](https://github.com/drawmeanelephant/brownnote/pull/235)
  has four commits for a combined SoundCraft handoff repair later
  represented by the merged
  [#242](https://github.com/drawmeanelephant/brownnote/pull/242).
- [brownnote #228](https://github.com/drawmeanelephant/brownnote/pull/228)
  has one export-fixture commit later represented by
  [#226](https://github.com/drawmeanelephant/brownnote/pull/226).
- [brownnote #91](https://github.com/drawmeanelephant/brownnote/pull/91)
  was a deliberate mismatch scratch PR used to prove a native job fails.

The scratch PR is intentional. The other eight commits look like
superseded or replaced work. That is not automatically a Factory defect;
parallel delegation creates branches, and some branches should die. It
is still a cost. The review queue is part of the system, and the system
does not end when a session says "done".

## The small shelf still counts

Not everything was a platform arc:

- [squirrel.filed.fyi #18](https://github.com/drawmeanelephant/squirrel.filed.fyi/pull/18)
  redrew the homepage venn for light mode.
- [swe2-dogbed #8](https://github.com/drawmeanelephant/swe2-dogbed/pull/8)
  closed the Cognition Annals archive with public merge receipts,
  checksums, and private material explicitly separated. Yes, Factory
  helped file the competition's archive. The trailer does not care about
  corporate boundaries either.

## What this count cannot say

The inventory cannot say what the month cost. The October usage
screenshot was account-wide, and this GitHub scan has no price, token,
or model data. It cannot say which agent wrote the most useful line,
because several PRs mix Factory and Devin. It cannot say every merged
change was good. It cannot say open work is finished, or that automated
acceptance replaces a person listening to audio, plugging in a MIDI
controller, installing on Windows, or using the app for a week.

It can say this: the last month was not ambient typing. It was a series
of bursts aimed at repositories that increasingly had executable
contracts. When the contract was strong, the output became reviewable
software at a strange speed. When the work was still open, superseded,
or physical, the receipt kept the correct label.

That is the factual end of the subscription inventory. The opinionated
version lives in [[reviews/factory-droid-final-thoughts]], still a draft
until the owner gives it the final voice pass.
