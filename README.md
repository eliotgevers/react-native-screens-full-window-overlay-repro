# `FullWindowOverlay` lifecycle investigation (reproduction retracted)

This repository was created from the default Expo 57 template to investigate a suspected iOS/Fabric sibling-order defect in `react-native-screens` `FullWindowOverlay`.

## Verification correction — 2026-08-17

The repository does **not** currently reproduce the reported defect. I am retracting the earlier package-boundary and regression claims rather than leaving maintainers with an unsupported reproduction.

A fresh clean-room audit found:

- Stock `react-native-screens` 4.27.0 passed 20 raw sibling-overlay lifecycle runs.
- Stock 4.27.0 passed 10 HeroUI Native 1.0.8 Dialog/Select cycles.
- Stock 4.25.2 passed 10 Dialog/Select cycles where the Select closed through selection.
- Stock 4.25.2 passed another 10 cycles where the Select closed through its backdrop.
- The previously published “before” and “after” screenshots both showed the Select menu visible; they did not document a failure.
- An older nearly blank raw screenshot was a transient Simulator framebuffer capture, not evidence that mounted overlays had moved behind the app surface.

The native experiment in [software-mansion/react-native-screens#4512](https://github.com/software-mansion/react-native-screens/pull/4512) therefore lacks a verified stock failure and should not be merged. The issue and PR have been retracted and closed.

## What remains known

An AeroVia app build previously showed a nested Dialog/Select ordering symptom and native hierarchy reuse. That observation is real, but this clean default-template reduction does not reproduce it, so the responsible package boundary remains unresolved. Possible app-specific contributors must be isolated before any new upstream report.

## Versions audited

- Expo 57.0.14
- React Native 0.86.2
- React 19.2.3
- HeroUI Native 1.0.8 for the consumer test
- `react-native-screens` 4.25.2 and 4.27.0
- Fabric / New Architecture
- iPhone 17 Pro Simulator, iOS 26.5

## Historical harness

The source remains available as an investigation harness and negative control:

```bash
bun install
bunx expo run:ios
```

It must not be cited as a deterministic reproduction unless a future stock run produces a stable, repeatable failure with independently verified visual evidence.
