# Karwashra Typing Exam

## Current State
- Full typing test with settings (time, paragraph length, backspace toggle, language, highlight), live WPM/accuracy stats, auto-scroll passage, and reset button.
- Home page has exam cards, Learn Typing banner, features section.
- No way to get a new paragraph without resetting the entire test or reloading.
- No dedicated Practice Sets section.

## Requested Changes (Diff)

### Add
1. **"New Paragraph" button** in TypingTest:
   - In idle state (settings panel): button labeled "New Paragraph" or "🔄 Change Paragraph" near the Start Test button that calls `generatePassageOfLength` with current settings and replaces the passage without starting the test.
   - In running state: a small button in the passage box header area that changes the paragraph AND resets timer + typed input (restarts test from idle so user can start again).
2. **Practice Sets page** at `/practice-sets`:
   - New page `PracticeSets.tsx` with 100+ pre-written paragraphs organized by exam category (SSC, Banking, Haryana, Railway, Court, Steno, etc.) and language (Hindi/English).
   - Category filter tabs/buttons at top.
   - Each practice set card shows: title, category, language, word count, difficulty.
   - Clicking a practice set opens the typing test with that fixed paragraph (use existing TypingTest flow or an inline mini-test).
   - Results (WPM, accuracy) shown at end and saved to dashboard if logged in.
3. **Practice Sets icon/card on Home page**: Add a prominent card/banner on the home page linking to `/practice-sets`, similar to the "Learn Typing" green banner.
4. **Route** for `/practice-sets` in App.tsx.

### Modify
- `TypingTest.tsx`: Add "Change Paragraph" button in idle settings panel and in running state toolbar.
- `Home.tsx`: Add Practice Sets section/banner between Learn Typing banner and Popular Exams grid.
- `App.tsx`: Register new `/practice-sets` route.
- `Header.tsx`: Optionally add Practice Sets nav link.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/data/practiceSets.ts` with 100+ pre-written paragraphs across categories (SSC English, SSC Hindi, Banking, Railway, Haryana Hindi, Haryana English, High Court, Steno, LDC/DEO) and languages.
2. Create `src/frontend/src/pages/PracticeSets.tsx` with category filter, grid of practice set cards, and click to launch inline typing test with that fixed paragraph.
3. Modify `TypingTest.tsx` to add a "Change Paragraph" button in both idle and running states.
4. Modify `Home.tsx` to add Practice Sets banner/card.
5. Modify `App.tsx` to add the new route.
6. Optionally update `Header.tsx` to add navigation link.
