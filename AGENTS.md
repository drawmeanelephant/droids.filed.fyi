# AGENTS.md — droids.filed.fyi

A field-notes blog on using Factory AI: what got delegated, what
shipped, and the nits picked out of the fur along the way. Built with
[Boris](https://github.com/drawmeanelephant/boris), a Zig static-site
compiler with a validated page graph — the same pipeline as
squirrel.filed.fyi. If you are an agent working in this repo, this file
is your contract.

## Repository layout

```text
content/            site source (markdown + strict frontmatter)
  index.md          trunk page
  log/              the feed — every entry starts here, YYYY-MM-DD-slug.md
  builds/           finished delegations: goal, setup, result, receipts
  nits/             the friction ledger — every nit needs a repro
  reviews/          Factory surface reviews after real usage
  projects/         the empire — per-project hub pages, grouped by family
manila/             theme (layouts + assets + Geist fonts). See README.
boris-agent-kit/    boris binaries for Darwin-arm64. Do not modify.
boris.json          publication profile (content -> dist via manila theme)
dist/               build output, git-ignored
```

## Toolchain

Binaries live in `boris-agent-kit/bin/` (Darwin-arm64 only) — a snapshot
taken for initial setup that may lag boris main. The live toolchain is
source at `~/t3/zig/boris`; `boris-refresh` (on PATH) pulls origin/main,
rebuilds with Zig, and installs to `~/.local/bin/boris`. CI always
builds the commit pinned in `.github/actions/setup-boris/action.yml`.
Prefer `~/.local/bin/boris` when fresh; fall back to the kit if the
checkout is unavailable. Note that the kit snapshot (0.8.1) predates
the `--static-dir` flag (#804), so the build commands below use `boris`
from PATH. `boris`
is the compiler; the rest are specialist tools (`boris-search-index`,
`boris-content-audit`, ...) you almost never need directly.

On a machine without the Mac checkout — a Linux CI box, a fresh Factory
sandbox — build boris from source instead: install Zig 0.17+ from the
official download index, `zig build` a boris checkout, and copy
`zig-out/bin/boris` to `~/.local/bin/boris`. See boris's AGENTS.md
cold-start section for the full path, including the Zig 0.17.0 fetch traps
(`ResolvConfParseFailed` on a newline-less `resolv.conf`; standalone
`zig fetch` packing cache tarballs one level too deep).

Verify the kit before first use on a new machine:

```sh
cd boris-agent-kit && shasum -a 256 -c SHA256SUMS
```

Core commands (run from repo root):

```sh
# full build: HTML + search index + sitemap + static/ into dist/
# (trunk layout rule keeps the homepage <title> free of the site suffix)
boris build --input content --html-dir dist \
  --theme manila --sitemap --site-url https://droids.filed.fyi/ \
  --layout-rule default id:index manila/layouts/trunk.html \
  --static-dir static

# RSS feed — separate mode, run after the HTML build.
# Items require `status: published` + `summary` + `published_at`.
./boris-agent-kit/bin/boris build --input content --rss --rss-path dist/rss.xml \
  --site-url https://droids.filed.fyi/ \
  --rss-title "droids.filed.fyi" \
  --rss-description "Factory AI field notes — what I delegated, what shipped, and every nit in between."

# zero-write preflight — run this before declaring any task done
boris validate --input content --theme manila \
  --layout-rule default id:index manila/layouts/trunk.html --static-dir static

# read-only graph health report
./boris-agent-kit/bin/boris check --input content

# rebuild on save, serve on loopback :8090
boris watch --input content --html-dir dist \
  --theme manila --serve --static-dir static \
  --layout-rule default id:index manila/layouts/trunk.html

# offline corpus export so an agent can reason over the whole site
./boris-agent-kit/bin/boris build --input content --rag --complete
```

Exit codes: 0 ok, 1 content validation, 2 usage conflict, 3 I/O.
Note that `--rss`, `--llms`, and RAG/context exports are separate modes
and cannot be combined with HTML flags in one invocation.

## Content rules (hard)

Frontmatter accepts **exactly seven keys** — anything else fails the
build with `EFRONTMATTER`. This was verified empirically; do not invent
keys.

| key | required | values |
|---|---|---|
| `title` | yes | human title |
| `parent` | satellites | entity id of parent page, e.g. `log/2026-09` |
| `tags` | recommended | YAML list |
| `status` | recommended | exactly `draft`, `published`, or `archived` |
| `summary` | recommended | one sentence, used by listings/search/RSS |
| `published_at` | feed pages | exactly `YYYY-MM-DDTHH:MM:SSZ`; required for RSS eligibility |
| `relations` | optional | e.g. `[relates_to=reviews/index]` |

More rules:

- Wiki links are `[[path/to/page]]`; external links are normal markdown.
- Raw HTML in pages is passed through, but a blank line inside an HTML
  block ends it — following indented lines become a code block. Keep
  embedded HTML (e.g. inline SVG) free of blank lines. Headings written
  as raw HTML need an explicit `id`, or the build's rendered-search
  publication check fails with `SEARCH_CONTENT_MISMATCH`.
- Log entries open with the title, then a `Surface: / Date: / Evidence:
  / Verdict:` bullet list; the theme renders that list as the session
  record panel, so keep it directly under the `# Title`.
- Draft pages render to HTML but are excluded from nav, search, sitemap,
  RSS, and publication. Draft is the default state for new entries.
- Page images go in `<stem>.assets/` beside the owning page.
- One session (or one cluster) per file in `log/`. Filename:
  `YYYY-MM-DD-short-slug.md`.
- Never edit files under `dist/` — it is generated.
- Nothing under `SUPPORT-DO-NOT-TRACK/` ever gets committed. It is raw
  support material for articles, not site source; the ignore rule
  enforces this — do not work around it. Distill it into normal
  content instead.
- Do not commit secrets or session stores; boris publication sessions
  never belong in this repo.

## Buckets and filing rules

Everything enters `content/log/` as a draft. Then:

- **log** — the running feed: session debriefs, nits noticed
  mid-delegation, Factory news worth a take. Dated, one session (or
  cluster) per file.
- **builds** — finished delegations with artifacts: goal, setup, how it
  went, result, receipts. "I asked it to plan a thing" is not a build.
  Link the receipts: repo, deployed site, PR.
- **nits** — the friction ledger. A nit earns a page when it has a repro
  and will get re-checked. A nit without a repro is a vibe; vibes stay
  in the log. Verdict values: `still-broken | fixed | lived-with`.
- **reviews** — Factory surface reviews (Factory App, Droid CLI,
  Missions, Software Factory, remote delegations, ...) only after
  enough real usage for a verdict. Never fabricate; usage evidence
  required.
- **projects** — hub pages for the owner's projects, grouped by family
  (compiler, renderer, OS, typeface, sites, Mac apps, art). Stubs with
  receipts — repo links — are fine; pages grow with real usage
  evidence. Log entries and builds about a project cross-link to its
  page; undescribed side projects stay on the bucket index until they
  earn a page.

Promotion path: log entry gains `relations: [relates_to=<new page>]`,
new page in the bucket links back with `[[log/<entry>]]`.

## Agent workflows

### Intake (something happened worth charting)

1. Create `content/log/YYYY-MM-DD-slug.md` from the template in
   `content/log/index.md`, `status: draft`.
2. Write what was delegated, what came back, what surprised. Plain
   words, no marketing voice. Cite evidence: session, repo, command
   output — whatever backs the story.
3. Add a `Verdict:` line: `keep | promote-to-<bucket> | toss`.
4. Run `validate`, then stop. Publishing is the owner's call unless
   they asked for autonomous filing.

### Promotion (draft becomes a real page)

1. Write the bucket page using the structure on the bucket's index.
2. Flip the log entry to `published`, add the `relations:` cross-link.
3. Run `validate` then the full `build`. Confirm both exit 0.

### Review drafting (Factory surfaces)

Use the five-part structure in `content/reviews/index.md`. Ground every
claim in observed behavior from the owner's usage notes; if you have no
usage evidence, write the stub and leave `## Verdict` as `Pending`.
Never fabricate benchmark numbers or experience. When Factory ships the
fix for something a review dinged, the review gets updated, not quietly
buried — updates get dated.

### Site-wide reasoning (before big edits)

Export the corpus and read it instead of guessing:

```sh
./boris-agent-kit/bin/boris build --input content --rag --complete
# working packs land in rag/ — read INDEX.md first
```

## Git and pull requests

`main` is guarded by the "Protect main" repository ruleset. It has no
bypass list, so an admin token (including the one you run with) gets
the same treatment as everyone else:

- No direct pushes, force-pushes, or deletion of `main`. Every change
  lands through a pull request.
- Required checks from `ci.yml`: `Validate content`, `Build site`,
  `Verify dist output`. The branch must be up to date with `main`.
- Merge commits only; squash merges are disabled, and linear history is
  not required. Merged branches are deleted.
- Zero approvals required, but every review thread must be resolved.

```sh
git switch -c droid/<short-slug>   # never commit on main
# ...edit, validate, build, commit (only when asked)...
git push -u origin HEAD            # pushing is outward-facing: only when asked
gh pr create --fill --base main
gh pr merge --merge --auto         # merges itself once checks pass
gh pr update-branch                # when main moved and the PR is behind
```

- Auto-merge will not update a branch that is behind `main`; run
  `gh pr update-branch`, or the PR waits forever.
- `gh pr merge --admin` fails by design. Fix the check instead.
- Merge commits preserve the branch commits and their
  `Co-authored-by` trailers. Write commits accordingly.
- Renaming a job in `ci.yml` breaks the required check. Update the
  ruleset in the same change, or PRs wait on a check that never reports.

## Before you declare done

1. `boris validate ...` exits 0.
2. Full build command exits 0.
3. New pages appear in `dist/` with correct paths.
4. No edits to `boris-agent-kit/`, `SHA256SUMS`, or `MANIFEST.json`.
5. No commits unless explicitly asked.
