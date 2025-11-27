---
sidebar_position: 5
title: FAQ
---

# FAQ

## Is Infinite Client allowed on every server?

No. Many servers ban client-side automation or visual aids. Read and follow each server's rules before enabling modules.

## Does it work on other Minecraft versions?

The current build targets `1.21.10`. Using it on other versions is unsupported and may crash. Wait for a matching release or build from source against the correct version.

## Where do settings live?

Controls for opening the client and per-module settings live inside Minecraft's `Options → Controls` and in the in-game Infinite Client menu. Remove the jar from `mods` to reset everything.

## Can I build it myself?

Yes. Clone the repo, install Java 21+, and run `./gradlew build`. The jar will appear in `build/libs/`.

## Having issues?

- Reinstall Fabric Loader and Fabric API for `1.21.10`.
- Test in a fresh single-player world without other mods to rule out conflicts.
- Check the latest release notes on GitHub for known issues or patches.
