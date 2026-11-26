---
title: "Factory Droid final thoughts: the checks were the product"
parent: reviews/index
tags: [factory, review, retrospective]
status: draft
summary: End-of-subscription final thoughts on Factory Droid after a month of GitHub receipts, mixed-agent work, measurable wins, coordination cost, and unfinished physical acceptance.
published_at: 2026-11-26T00:06:09Z
relations: [relates_to=log/2026-11-25-factory-last-month]
---

# Factory Droid final thoughts: the checks were the product

## What it claims to be

Factory presents Droid as a software-development agent that can take
real work in local and remote environments. I treated that as a claim
about delegation, not magic: give the agent a bounded task, let it write
code, inspect the artifact, and keep the receipt.

The important word is "real". I did not evaluate it as a chatbot. I
evaluated it as a worker inside repositories with tests, branch rules,
issue trackers, and owners who still had to decide what counted as done.

## What I ran it against

The first week already had more than a demo. The week-one recap counted
227 Git-recognized Factory co-author trailers across 17 active
repositories, with the usual caveats about attribution and unfinished
acceptance. Since then the blog recorded a cold-start remote sandbox,
the Great Frontier Fart Off, and the storage footprint.

The closing inventory is
[[log/2026-11-25-factory-last-month]]. It found 330 indexed
default-branch commits with the exact Factory trailer since October 25,
across 13 repositories. Brownnote and capture-vector dominate the count.
Boris, Gostalgia, WYLA, the migration lab, ObsequiCMS, VirelaiOS, and a
handful of smaller repos fill out the month.

That is enough evidence for a verdict. It is not enough evidence for a
price-per-useful-PR spreadsheet, and I am not going to invent one.

## Where it broke

The cold start still matters. The October remote session spent its first
hour building the toolchain before it could build the project. Factory's
Environments announcement describes the right solution, but the session
itself proved the cost of not having one. The repos fixed their own
readiness gaps afterward. That is useful, but it is also a sign that the
environment around the agent carries much of the cost.

The storage footprint is the second friction. The October sweep found
2.3G under `~/.factory`, with 918M of logs and 236M of session
transcripts outside worktrees. I saw no pruning then. I am not turning
that into a new claim about today's bytes without a fresh sweep. The
older receipt is enough to say retention deserved attention.

Cost accounting stayed muddy. The Fart Off usage screenshot showed
account-wide meters, not per-project or per-model spend. GitHub trailers
do not fill that gap. At the end of the subscription I can count merged
commits. I still cannot say what a merged commit cost.

Parallel work created coordination waste. The inventory found nine
Factory-attributed commits in closed-unmerged PRs. One was a deliberate
scratch test. The other eight look like superseded or replaced work.
That is not a scandal. It is the price of running fast workers in
parallel without pretending integration is free.

Automated acceptance has a hard boundary. Brownnote's own roadmap says
audible output, physical device loss, and a named MIDI controller remain
open. Capture-vector still has Windows proof, signed installers, and the
fully wired publish module ahead. Boris's calendar-release PR was green
and open at the inventory snapshot, which means it was not yet a merged
release. A green check is evidence. It is not the whole product.

Finally, provenance is messier than the marketing version of agent work.
Some Factory-attributed commits sit inside Devin-authored PRs. Some
Devin and Factory commits share a branch. Content Upgrades had a dense squash-merge burst whose PR associations
needed inference rather than a clean API mapping. The exact trailer is the best evidence I
have, and even it only says "present", not "sole author".

## What stuck around after the test

Brownnote is the loudest artifact. It began as middleware between a fart
synth and GuitarPedal. It now has a native Rust/Rune instrument with
portable projects, loop takes, MIDI mapping, sampled and hosted
instruments, plugin rendering, and a documented export path. The docs
also say what is not proven. That combination is the artifact: speed
with its boundaries still attached.

capture-vector went from a new repository to a pre-release Boris desktop
shell in three days. The important part is not the number 71. It is the
shape of the evidence: packaging rules, goldens, degraded engine states,
workspace confinement, a Migrate module, and disabled entry points that
say why they are disabled.

Boris got better in ways that survive the subscription. Output-path and
href allocation reuse, streamed publication evidence, watch polling
repairs, security integration, editor truthfulness, and the first
calendar-release PR all improve the compiler shelf. The measured PRs are
good examples because they say what they did not measure.

Gostalgia's shell became more usable, WYLA has a real foundation, the
migration lab gained modes, ObsequiCMS has a careful read-only M1, and
VirelaiOS got a small repair kit. None of those needs to be
inflated into a platform empire. They are useful because they are
specific.

The repos themselves also changed. They now have more cold-start docs,
pinned tools, acceptance checks, claim ledgers, negative tests, and
agent-readiness instructions. That may be the most durable result. The
act of delegating forced the project shelf to become more explicit about
what done means.

## Practices as a product

The sharpest description I found for the product as a whole arrived at
the very end, while I was cleaning out the disk: Factory is practices
as a product. It sells best practices — contract-shaped work,
acceptance gates, evidence trails — wrapped around metered pass-through
of several vendors' inference, sometimes well. The argument in full is
in [[log/2026-11-26-practices-as-a-product]]. The short version: the
practices were already mine, the parts that are the product's own
contribution fit worst, and the wrapper's real leverage is arbitraging
the API vendors' wasteful statelessness — a margin the suppliers can
reclaim whenever they like. The product's gravity pulls toward the
autonomous surfaces because that is where the meter spins fastest,
which is precisely the shape of work that served me worst.

## Compiler-shaped luck

One more honest adjustment to the month's accounting: my projects are
mostly compilers — markdown to HTML, to llms.txt, to RAG exports, to
the general web XML. That is the most delegable genre of software that
exists. The output is deterministic, the correctness criteria are
objective, and verification is cheap: golden files, fixtures, tree
comparisons. The acceptance-gate workflow worked as well as it did
partly because I was working in the domain where acceptance gates are
nearly free.

The counterexample proves the rule. Every TypeScript UI attempt died
the same death: three sets of tests and a billion tokens to move a
checkbox that still looks like shit when it is done. Not because the
agent is worse at TypeScript — because UI output cannot be verified by
anything except taste, and taste is the one input the machine cannot
supply and the loop cannot gate on. Worse, tokens spent past the
verification limit do not merely waste money — they homogenize. Mashed
potatoes turn to glue when overworked: the starch ruptures under too
much mechanical action, and no amount of further mashing brings the
texture back. The billion-token checkbox was not underworked. It was
glue. The general law: delegability is
proportional to the cheapness of verification. Compilers are the best
case, CRUD is the middle, and anything whose acceptance criterion is
"does it feel right" is the worst case — which is most of the software
the industry actually ships. My month worked where it worked because I
happened to be building in the fortunate corner. Someone evaluating
these tools for frontend product work should expect a much worse month
than mine.

## A note on free inference

Factory's generosity in the month — hundreds of dollars of inference
credits — deserves honest treatment, and the honest treatment is this:
free inference is not a gift. It is a shovel they handed me, and even
a free shovel is still a shovel, even if it is a backhoe and has
heated seats. I still did the digging. The credits do not change the
shape of anything measured here — they only delay the invoice, which
is the oldest customer-acquisition mechanic there is. If anything the
free month made the evidence *better*: I spent freely, optimized for
nothing, and the true shape of the costs showed up in the receipts
exactly because nobody was economizing.

## Verdict

Factory Droid earned a place as a bounded delegation tool. It did not
earn autopilot trust.

The honest bottom line first: it did not get as much done as I wanted.
The numbers look impressive until you ask what shipped. Brownnote's
roadmap still says nobody has heard it make a sound. Capture-vector is
pre-release. Most of the 330 commits are plumbing, harnesses, and gates
— the scaffolding of software rather than the software. Some of that is
the nature of a first month: the repos had to become agent-ready before
agents could be fast in them. But some of it is the product's shape:
Factory is very good at producing well-formed work units, and producing
well-formed work units is not the same as finishing things.

I would use it again for a defined project season: a queue of small,
gated issues, enough review time, and a person responsible for final
acceptance. I would not keep it as an always-on subscription just
because it can produce branches. The value appeared when the work was
shaped before the agent arrived. The cost appeared when integration,
physical acceptance, or taste became the real task.

The verdict is not "replace the developer". The verdict is narrower and
more useful: Factory can be a very fast implementation
engine inside a good contract. Results vary by task, and the contract
decides whether the speed becomes software.

## Final thought, because Jerry Springer earned the reference

Factory Droid did not replace the builder. It exposed the builder's
setup. Good tests turned speed into merged work. Vague acceptance
turned speed into branch piles. The best results were not the times it
sounded smart. They were the times a contract forced it to prove the
work.

If you already had the practices, you were paying to rent your own
discipline back, with a meter running on somebody else's inference. The
subscription is over for now. The rule stays: write the contract,
keep the receipts, and never confuse a green check with a product.
