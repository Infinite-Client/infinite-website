---
sidebar_position: 4
title: Contributing
---

# Contributing

We welcome lightweight, focused improvements that keep Infinite Client simple and stable.

## Set up

1. Install Java 21+ and Node 18+.
2. Clone the repo and run `./gradlew build` once to download dependencies.
3. For docs tweaks, `cd docs && npm install && npm start`.

## Development notes

- Stick to the existing Fabric versions in `gradle.properties` unless you plan a coordinated upgrade.
- Keep modules minimal: favor small, composable features over large all-in-one toggles.
- Add comments only where behavior is non-obvious (mixins, hooks, safety guards).
- Keep configs tidy; avoid hardcoded server-specific settings.

## Submitting changes

- Run `./gradlew build` before opening a PR.
- If you change behavior, add a short note to the docs (intro/guides) and keep wording concise.
- Follow the existing code style; no auto-formatting sweeps unless requested.
- Open an issue first for larger changes (new modules, version bumps) to align expectations.
