---
title: The Log
parent: index
tags: [log, feed]
summary: Dated entries on Factory AI usage — session debriefs, nits noticed, news takes. Everything lands here first.
---

# The Log

Everything enters the system here: session debriefs from real
delegations, nits noticed mid-flight, Factory news worth a take,
half-thoughts that need a parking spot. Entries are dated files,
`YYYY-MM-DD-slug.md`, one session (or one cluster) per file.

Entries parent to their **month hub** (`log/2026-09` for September
2026), never directly to this page — this page only lists the months,
so it stays short no matter how much gets filed.

Draft entries stay out of nav, search, sitemap, RSS, and publication
until promoted to `status: published`.

## Months

- [[log/2026-09]] — the site ships itself. September 2026.
- [[log/2026-10]] — remote cold starts and the Great Frontier Fart Off.

## Entry template

```markdown
---
title: Short human title
parent: log/YYYY-MM
tags: [factory]
status: draft
summary: One sentence on what this entry charts.
published_at: YYYY-MM-DDTHH:MM:SSZ
---

# <title>

- Surface: Factory App | Droid CLI | Missions | API | other
- Date: YYYY-MM-DD
- Evidence: session link, repo, command output — whatever backs the story
- Verdict: keep | promote-to-<bucket> | toss

What was delegated, what came back, what surprised. Plain words.
```

When an entry gets promoted into a bucket, add a `relations:
[relates_to=<bucket-entry>]` line so the graph keeps both halves.
