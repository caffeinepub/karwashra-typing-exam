# Karwashra Typing Exam

## Current State
- `src/frontend/src/data/exams.ts` contains `PASSAGES` object with `english` (20 paragraphs) and `hindi` (several paragraphs) arrays used for all exam typing tests.
- `generatePassageOfLength` function picks random passages from these arrays and concatenates/repeats to fill requested length.
- Home page (`Home.tsx`) has gaming section cards (GAMING_LEFT, GAMING_RIGHT) displayed in the hero 3-column layout — gaming cards are on the left and right columns with the main CTA in the center. Gaming cards appear in the upper portion of the page.
- Exam grid (ROW1, ROW2) showing 14 exams is below the hero section.

## Requested Changes (Diff)

### Add
- 20+ additional high-quality English paragraphs to PASSAGES.english array in exams.ts — government/exam/India/Haryana themed, 300-500 words each, matching style of existing paragraphs
- 10+ additional Hindi paragraphs to PASSAGES.hindi array — government/Haryana themed in Devanagari
- Also add exam-specific passage pools for key exams: SSC, HARTRON/Haryon, Delhi Police, DSSSB, Railway, Banking, DEO, PCS, Teaching, Clerk

### Modify
- Home.tsx: Move gaming section cards BELOW the exam grid tiles section. Currently gaming cards are in the hero 3-column area (top). They should appear as a separate section underneath the exam grid/tiles.
- `getPassagesForExam` function: ensure each exam returns a larger pool (20+ relevant passages)

### Remove
- Nothing to remove

## Implementation Plan
1. In `exams.ts`, add 20+ new English paragraphs to PASSAGES.english
2. Add 10+ new Hindi paragraphs to PASSAGES.hindi
3. Add exam-specific passage arrays for key exams and update `getPassagesForExam` to use them
4. In `Home.tsx`, restructure layout: remove gaming cards from the hero 3-column area, add a "Gaming Section" card grid below the exam tiles section
