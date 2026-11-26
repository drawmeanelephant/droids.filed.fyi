---
title: capture-vector
parent: projects/index
tags: [project, capture-vector, boris, rust, desktop]
status: published
summary: A pre-release native Rust desktop app for authoring, auditing, and publishing Boris content through Outlook-style mailboxes.
published_at: 2026-11-26T00:06:09Z
relations: [relates_to=projects/boris, relates_to=log/2026-11-25-factory-last-month]
---

# capture-vector

[capture-vector](https://github.com/drawmeanelephant/capture-vector) is
a pre-release native Rust desktop app for working on Boris content. Its
[README](https://github.com/drawmeanelephant/capture-vector/blob/3fddabba2762f660182c1ac1ef7ef2e29c64ec7a/README.md) describes Outlook-style mailboxes for authoring, auditing, and
publishing, with rune for the UI and Boris and Oliver as subprocess
engines.

The current shell can browse Pages, Outputs, Audit, Research, and
Activity. It can edit source pages in companion windows, run
engine-backed builds and watches when a pinned Boris is present, and
verify itself through headless element-tree and layout goldens. Missing,
mismatched, and dead engine states are supposed to be disclosed rather
than hidden.

Still ahead, again from the README: signed installers, Windows proof,
and the fully wired publish module.

## Factory evidence

The repository was created on November 23, 2026. The
[[log/2026-11-25-factory-last-month]] inventory found 71 indexed
Factory-attributed commits and 38 associated merged PRs in its first
three days. Large merged checkpoints include
[#153](https://github.com/drawmeanelephant/capture-vector/pull/153),
the raised reading pane and type-scale pass, and
[#207](https://github.com/drawmeanelephant/capture-vector/pull/207),
the Migrate module over real `boris-migration-lab` runs.

Open draft work at the inventory snapshot included copy-to-folder
publishing, the new-import wizard, and a temporary PNG artifact probe.
Those are not counted here as shipped.

## Evidence boundary

This page is grounded in the repository README, the two PRs above, and
the pinned November inventory. I have not written a usage review. The
correct verdict remains Pending until the app has been used for real
authoring rather than merely counted.
