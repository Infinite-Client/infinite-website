---
sidebar_position: 3
title: Code Structure
---

# Code Structure

A quick map of the mod so you know where to look when adding or debugging features.

## Source sets

- `src/main/resources`: shared metadata (`fabric.mod.json`), the main mixin list (`infinite.mixins.json`), and the access widener (`infinite.accesswidener`).
- `src/client/kotlin`: all client-side code in Kotlin. Fabric runs `org.infinite.InfiniteClient` as the `ClientModInitializer`.
- `src/client/resources`: client-only mixin config (`infinite.client.mixins.json`).

## Entry points

- `src/client/kotlin/org/infinite/InfiniteClient.kt`: boots the client, registers commands/keybinds, loads config, and starts/stops every feature on join/leave.
- `src/client/kotlin/org/infinite/Features.kt`: declares feature categories and wires each feature instance.
- `src/client/kotlin/org/infinite/InfiniteDataGenerator.kt`: hooks Fabric data generation for client assets.

## Feature system

- Features live under `src/client/kotlin/org/infinite/features` (movement, rendering, fighting, automatic, server, utils).
- Each feature extends `ConfigurableFeature`, defines `settings` (from `org.infinite.settings`), and can register commands, render hooks, or tick handlers.
- Categories are collected in `featureCategories`, and helper `feature()` builds the `Feature` metadata.

## Shared libraries

- `org.infinite.libs`: common helpers for commands (`InfiniteCommand`), keybinds (`InfiniteKeyBind`), world access (`WorldManager`), rendering (`graphics`), and player utilities.
- `org.infinite.utils`: small utilities such as `LogQueue`, `FakePlayerEntity`, and math helpers.

## Assets

- `src/main/resources/assets/infinite`: icons and other branded assets bundled with the mod.

