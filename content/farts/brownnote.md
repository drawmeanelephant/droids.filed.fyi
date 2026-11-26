---
title: Brownnote
parent: farts/index
tags: [project, brownnote, audio, effects, ninjam]
status: published
summary: Middleware that grew a native Rust/Rune instrument, with GuitarPedal effects, portable projects, takes, MIDI, plugins, and a documented SoundCraft export path.
relations: [relates_to=farts/fart-app, relates_to=log/2026-11-25-factory-last-month]
---

# Brownnote

A fart goes in; a fuzzed fart comes out.

[Brownnote](https://github.com/drawmeanelephant/brownnote) is the
plumbing between [[farts/fart-app]] and
[Linus Torvalds' GuitarPedal](https://github.com/torvalds/GuitarPedal)
effects, with [zcn](https://github.com/drawmeanelephant/zcn)/NINJAM
on the other side. Its effect processing comes from GuitarPedal's
unmodified `Validation/bench` audio core, compiled as a host program.
Brownnote handles the transport and conversion; it does not implement
its own pedal effects.

## The concrete route

The repository's documented file-based example:

```sh
kujamba render --phrase "kujamba karibu" --out fart.wav
brownnote --effect fuzz < fart.wav > fuzzed.wav
zcn check-wav fuzzed.wav --min-rms 0.01
```

That is a render, an effects pass, and a signal check, not a claim that
this article ran a live NINJAM session.

## More than a fuzz switch

The README documents repeatable effect chains, pot and mix controls,
raw float32 stereo transport, and streaming WAV conversion. It also
lists recordings, named pedal presets, genre arrangements, and a local
browser studio with a sequencer and stem mixer.

Those give this shelf somewhere to go after the
[[log/2026-10-14-great-frontier-fart-off]]: compare the dry synth,
then see what happens when it meets the pedal board. That is a possible
next piece, not a listening verdict invented for this stub.

## November: the plumbing grew an instrument

The November inventory in [[log/2026-11-25-factory-last-month]] found
157 indexed Factory-attributed commits and 101 associated merged PRs in
this repository. The arc is much larger than the original pipe.

The current roadmap says the native Rust/Rune app can import WAV samples
into sixteen pads, shape each pad, run ordered GuitarPedal chains, keep
portable projects, record and edit loop takes, learn MIDI mappings, play
a sampled SF2 instrument, host one live CLAP instrument, render offline
through CLAP and LADSPA effects, export a neutral bundle, and hand that
bundle to a pinned SoundCraft build.

The same roadmap keeps the important labels attached. Those paths are
proven by automated tests and a packaged smoke run with a silent mixer.
Audible output, physical device loss, and a named MIDI controller remain
open. The instrument exists as software evidence; the listening verdict
still belongs to a person.

Useful receipts:
[the roadmap](https://github.com/drawmeanelephant/brownnote/blob/b4da62ff34a1dbb17390a7ed35da6e4c7d22fe3c/docs/site/content/roadmap.md),
[PR #199](https://github.com/drawmeanelephant/brownnote/pull/199), and
[PR #248](https://github.com/drawmeanelephant/brownnote/pull/248).

## Evidence boundary

The original stub was grounded in the
[README at `d793d2d`](https://github.com/drawmeanelephant/brownnote/blob/d793d2dc48c48bfa0411574c4df430c52b013255/README.md),
read on October 14, 2026. The November section is grounded in the
current roadmap, the two linked pull requests, and the pinned inventory
in [[log/2026-11-25-factory-last-month]]. No Brownnote build, effects
test, studio session, or listening comparison was run for this write-up.

The README also notes that real-bench and full round-trip tests can
skip when the required binaries are absent, and that its checked-in
recordings predate the resampler's anti-aliasing repair. A green suite
or an old recording needs those labels left attached.
