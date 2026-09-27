# Tanglaw

A guiding light for heavy days. A web app that acknowledges feelings without
judgment, then gently guides people outward — toward self-kindness, real
people, and the world. Built for the Philippines first.

## Stack

- **Next.js (App Router) + React + TypeScript**
- Plain CSS with design tokens (`src/app/globals.css`) and CSS modules
- Self-hosted fonts via Fontsource (Fraunces, Inter) — no third-party requests
- Vitest + Testing Library

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm test
npm run lint    # typecheck
```

## Structure

```
src/
  app/                 routes (check-in, acknowledge, need, support, privacy…)
  components/          UI
  hooks/               client hooks
  lib/
    feelings.ts        feeling vocabulary
    acknowledgment.ts  reflection copy (reflect, never advise)
    safety/            risk detection + PH crisis resources
    storage/           storage interfaces + localStorage implementation
```

Screens only use `getStorage()` from `lib/storage`; swap the implementation
there when a backend exists.

## Principles

- Core help is always free. No ads, no trackers, no selling data (RA 10173).
- No streaks, points, badges, or AI pretending to be a friend.
- A "Need someone now?" link is visible on every screen.
- Crisis numbers in `src/lib/safety/resources.ts` must be re-verified before
  every public release.
