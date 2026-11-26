---
title: Waking the human is the most expensive operation in the system
parent: log/2026-11
tags: [factory, agents, attention, design, cognition]
status: draft
summary: The economics of agentic tooling — tokens are cheap, human interruption is the scarce resource, vendors leak because they don't bear the leak cost, and attention is the only moat.
published_at: 2026-11-26T08:30:00Z
relations: [relates_to=reviews/factory-droid-final-thoughts]
---

# Waking the human is the most expensive operation in the system

- Surface: industry — Factory vs Cognition failure modes
- Date: 2026-11-26
- Evidence: a month of watching both products mishandle commit
  identity, plus the month's receipts
- Verdict: keep — this is the lens the final review needed

Both agent harnesses I used this month mishandled commit identity.
They fail in opposite directions, and the failure modes are a perfect
little economics lesson.

Factory stops and asks. The agent blocks mid-task on a human answer,
and the human might be asleep. The cost is not the seconds of reading
the prompt: it is the hours until the human returns, the
re-contextualization, the broken flow. Waking the human is the most
expensive operation in the system.

Cognition does not ask. It commits with whatever email it found —
sometimes my real one — and publishes it in Git history. Once public,
that address can be copied by crawlers. Fixing it costs some tokens
and a force-push, but only for my visible copy; copies already taken
do not come back.

The tempting lesson is "forgiveness beats permission," and for
reversible mistakes it is correct. Tokens are cheap and falling;
human interruption is expensive and not falling. Wrong branch names,
ugly commit messages, mediocre first drafts — never worth blocking
on. But the email is the wrong exemplar, because the math depends on
reversibility, and a leaked email in public history is close to the
least reversible mistake in the workflow.

There is also no universal "GitHub commit email" field sitting one
API request away. The public user endpoint can return no email at
all; a noreply identity often has to be inferred from the numeric
user ID or prior commits. That does not excuse either failure mode.
It sharpens them: the correct behavior is bounded discovery, a
confidence check, and a hard stop only when publication is
irreversible and the answer is still uncertain. The damning part is
not which error each vendor picked. It is that neither harness knows
the environment it works in.

## Why both vendors fail the same way

The costs are asymmetric in who bears them. Blocking is immediate and
loud — users complain the product feels slow, and vendors hear it.
Leaking is delayed and quiet — nobody notices their email in a spam
list for months, and nobody attributes it. Vendors internalize the
first cost and externalize the second, so the industry drifts toward
leak-biased design regardless of which failure is actually cheaper
for the user. The vendor cannot be trusted to run the forgiveness
calculation, because they are not the ones paying when the
forgiveness is owed.

## The cringe word that is nonetheless true

Startup AI talk loves "moat." Strip the cringe and there is a real
one: attention — specifically good feedback. Judgment is the scarce
input in every agentic workflow, and every product in this space is
optimized as if production were scarce instead. The companies that
win will be the ones that treat human attention as the expensive
resource it is: batching interruptions, never blocking on what is
discoverable, making the common case reversible and the irreversible
case loud. Most of what is being sold today does the opposite, and
sells the opposite as a feature.
