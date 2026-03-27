# Karwashra Typing Exam

## Current State
App has exam tiles with MCQ buttons but clicking them navigates to typing test. No actual MCQ functionality exists yet.

## Requested Changes (Diff)

### Add
- New `/mcq` route and `MCQTestPage.tsx` with full MCQ functionality
- Question bank: 20+ questions per part per exam, bilingual (Hindi+English) where applicable
- Each question has 4 options (a, b, c, d)
- Parts structure per exam:
  - SSC CGL/CHSL/MTS, Delhi Police HCM, DSSSB: Part A=Reasoning, Part B=Maths, Part C=GK/GS, Part D=English+Computer
  - Railway NTPC: Part A=Reasoning, Part B=Maths, Part C=GK (no Hindi/English)
  - Banking: Part A=Reasoning, Part B=Quant/DI, Part C=English, Part D=Computer+Banking Awareness
  - State Level/PCS: Part A=GK/GS, Part B=Reasoning, Part C=Maths, Part D=Hindi
  - Teaching (CTET): Part A=Pedagogy+Child Dev, Part B=Reasoning+GK, Part C=Subject Specific, Part D=Hindi/English
  - DEO/Clerk/Harton: Part A=Computer Basics, Part B=Reasoning, Part C=Maths, Part D=Hindi
- Language: Reasoning/Maths/GK = Bilingual; English section = Only English; Hindi section = Only Hindi
- Timer per part (20 minutes), score display after each part and final result
- MCQ buttons on Home page navigate to `/mcq?exam=EXAMID`

### Modify
- `App.tsx`: Add `/mcq` route pointing to MCQTestPage
- `Home.tsx`: Update `handleMCQ` to navigate to `/mcq?exam=...`

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/data/mcqQuestions.ts` with full question bank
2. Create `src/frontend/src/pages/MCQTestPage.tsx` with part selector, question UI, timer, score
3. Update `App.tsx` to add mcq route
4. Update `Home.tsx` handleMCQ function
