---
title: Flatlophone / fart-app
parent: farts/index
tags: [project, factory, fart-app, zig, audio, ninjam]
status: published
summary: The deterministic Zig fart synthesizer, its headless kujamba instrument, and a nine-model competition judged by ear.
relations: [relates_to=farts/brownnote]
---

# Flatlophone / fart-app

A fart synthesizer with a surprisingly serious engineering trail.
Flatlophone is written in Zig; `kujamba` is its headless NINJAM
instrument. The owner's work on it is mostly Factory-droid-assisted.

Receipts: [repository](https://github.com/drawmeanelephant/fart-app),
[public Fart Off scorecard](https://drawmeanelephant.github.io/fart-app/contributors/fart-off.html),
and [M9 tracker #95](https://github.com/drawmeanelephant/fart-app/issues/95).

## The Great Frontier Fart Off

Nine models got the same brief, the same repository base, and isolated
worktrees: make the farts better without losing deterministic rendering
or breaking the instrument. Each returned two fixed baselines and a
freestyle showcase. That is **27 renders**, not 27 contestants.

The public page lets people hear every entry and inspect its recipe.
The October 14 receipt still says judging is open. Delivered entries
and a listenable page are real results; a winning synth and completed
M9 acceptance are not established by those results alone.

The Day 1 account is [[log/2026-10-14-great-frontier-fart-off]].
Its numbers are a dated snapshot, not a live scoreboard.

## Before the competition

An earlier October 1 CI study found a demo gate that looked stuck but
had already passed. The failed attempt hit cache/DNS trouble before
the musical assertions ran; [PR #56](https://github.com/drawmeanelephant/fart-app/pull/56)
had already merged. That write-up remains a draft. Keep the
infrastructure verdict separate from the sound verdict.

## Beyond the dry fart

[[farts/brownnote]] routes rendered audio through GuitarPedal effects.
It belongs beside the synth, but it is a separate project, not another
Fart Off contestant or evidence that M9 is finished.
