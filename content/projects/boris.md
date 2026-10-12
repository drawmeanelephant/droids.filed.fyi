---
title: Boris
parent: projects/index
tags: [project, boris, zig, compiler]
status: published
summary: The Zig documentation compiler: Markdown to a validated content graph to static HTML, JSON IR, RAG, and AI Context Bundles. This site is built with it.
published_at: 2026-09-27T19:24:08Z
---

# Boris

The core: a local-first Zig documentation compiler — Markdown in, a
validated content graph, out to static HTML, JSON IR, RAG, and AI
Context Bundles. No JavaScript runtime at publish time. This site runs
on it (the pipeline is in
[[log/2026-09-27-droidsblog-is-alive]]), and it powers the whole
[[projects/filed-fyi]] constellation.

Status: active daily. Receipts:
[boris on GitHub](https://github.com/drawmeanelephant/boris).

Recent on this site:

- [[builds/boris-html4-strict]] — the whole-site HTML 4.01 Strict
  target profile, implemented by a Droid worktree session and merged
  as boris #1004.
- [[log/2026-10-12-cold-start-remote-sandbox]] — cold-starting boris
  in a fresh Linux sandbox surfaced two Zig 0.17.0 fetch bugs; the
  AGENTS.md cold-start section landed as boris #1115.

## Satellite tools

- [boris-migration-lab](https://github.com/drawmeanelephant/boris-migration-lab) —
  standalone converters for Astro, WordPress, Instagram, Obsidian,
  Notion, Starlight, and Filed, plus migration reports.
- [boris-content-audit](https://github.com/drawmeanelephant/boris-content-audit) —
  deterministic read-only source audits: poetry coverage, verse
  density, mapping exceptions.
- [boris-zcode-plugin](https://github.com/drawmeanelephant/boris-zcode-plugin) —
  commands, skills, and hooks that make AI agents first-class Boris
  operators.
- [boris.filed.fyi](https://github.com/drawmeanelephant/boris.filed.fyi) —
  the technical overview site, built with Boris and published to the
  standard.site lexicon on ATProto.

## Pending

A real usage writeup — what building with boris is like, where it
hurts, what happens at scale — once the evidence is on the
[[log/index]]. Until then, verdict: Pending.
