# Agent guidelines

## Git

- Work directly on `main`. Do not create feature branches.
- Never commit unless explicitly asked. Leave changes uncommitted for review.
- When asked to commit a batch of changes, make one commit per change so each can be reverted on its own.

## Motion

- View transitions between cards and post pages morph the thumbnail only. Do not morph titles, dates, or tag chips: text reflows between the card and header layouts and reads as a stretched crossfade.
- Make motion changes one at a time; expect individual changes to be vetoed.

## Verification

- If the dev server cannot be started in your environment, ask the user to check visual changes with `pnpm dev`.
