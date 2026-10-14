---
title: droids.filed.fyi
tags: [home]
summary: Field notes from delegating real work to Factory Droid — what I did, what it did, and every nit in between.
---

<header class="hero">
<p class="eyebrow">Field notes on Factory droids</p>
<h1 class="hero__title" id="field-notes">What I delegated, what shipped, <span>and every nit in between.</span></h1>
<p class="hero__lede">Where the Factory AI experience gets charted: what I delegated, what actually shipped, and the nits picked out of the fur along the way. The human writes the verdicts. The droids do most of the typing. The pipeline keeps the receipts.</p>
</header>

<figure class="loop">
<svg viewBox="0 20 800 225" role="img" aria-label="The delegation loop: I delegate to the droid, the droid ships to prod, prod generates nits and receipts, and they come back to me.">
<g class="n"><rect x="35" y="40" width="150" height="70" rx="10"/><text x="110" y="83" text-anchor="middle">me</text></g>
<g class="n n--droid"><rect x="325" y="40" width="150" height="70" rx="10"/><text x="400" y="83" text-anchor="middle">droid</text><circle class="dot" cx="461" cy="54" r="5"/></g>
<g class="n"><rect x="615" y="40" width="150" height="70" rx="10"/><text x="690" y="83" text-anchor="middle">prod</text></g>
<path class="e" d="M 191 75 H 309"/>
<path class="e" d="M 481 75 H 599"/>
<path class="e e--back" d="M 690 116 V 222 H 110 V 124"/>
<polygon class="h" points="307,69 319,75 307,81"/>
<polygon class="h" points="597,69 609,75 597,81"/>
<polygon class="h h--back" points="104,124 110,112 116,124"/>
<text class="l" x="251" y="62" text-anchor="middle">delegate</text>
<text class="l" x="541" y="62" text-anchor="middle">ship</text>
<text class="l l--back" x="400" y="210" text-anchor="middle">nits, surprises, receipts</text>
</svg>
<figcaption>the content strategy is a control loop and the droid is the plant</figcaption>
</figure>

## Buckets

- [[log/index]]
  The running feed: session debriefs, news takes, nits noticed
  mid-delegation. Newest first.
- [[builds/index]]
  Things built with Factory end-to-end, with receipts.
- [[nits/index]]
  The friction ledger. Every nit with a repro, none without.
- [[reviews/index]]
  Factory surfaces reviewed after real usage. What broke, what stuck.
- [[projects/index]]
  The empire: hub pages for the projects built and worked on,
  grouped by family, with receipts.
- [[farts/index]]
  The fart drawer: Flatlophone, the Great Frontier Fart Off, and
  Brownnote. Audio work with its own shelf and receipts.

## How filing works

Everything lands in [[log/index]] first as a draft. If it deserves its
own page it gets promoted into the right bucket and cross-linked back.
Agents do the triage; rules live in AGENTS.md at the repo root.
Publishing is the owner's call. The first entry on the log is this
site's own birth certificate — a droid session, start to finish.
