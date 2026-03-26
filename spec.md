# Karwashra Typing Exam

## Current State
The app has a typing test at `/exam/$id/test` using a modern card-based UI with stats, compact passage box, settings panel, and standard controls. Exams are defined in `src/frontend/src/data/exams.ts`.

## Requested Changes (Diff)

### Add
- New TCS ION / SSC Digital Examination Module-style interface for the TypingTest page, exactly matching the uploaded reference screenshots
- New exams to `exams.ts`: Delhi Police HCM, SSC MTS, State Level (general), PCS (Provincial Civil Services), Teaching (TET/CTET), Clerk (general)
- Group tabs (Group 1, Group 2, Group 3) that select from 3 pre-loaded paragraphs for the exam
- Candidate Profile right panel with circular photo placeholder, User ID field, Password field, Log in button

### Modify
- `TypingTest.tsx`: Complete visual redesign to match TCS ION exam interface:
  - Dark gray title bar with "Typing Test [current date]" centered, window-style toolbar icons (save, print, help) at top-left
  - Exam name (e.g., "SSC CHSL/CGL") in small label below title bar
  - Group 1 / Group 2 / Group 3 tabs (active tab highlighted blue) — clicking switches to different paragraph
  - "Time Left: MM:SS" display top-right in bold
  - Purple/indigo info bar below tabs: "Keyboard Layout: Inscript  Language: English" (or Hindi)
  - Main 2-column layout: left ~80% passage + controls + typing area; right ~20% candidate panel
  - Passage area: large white box with justified text, serif font, scrollable, no word highlights (clean official exam style)
  - Controls bar below passage: Duration dropdown (15 Minutes default), << prev exercise, "Exercise: X/270" dropdown, >> next, Pause button, A+ A A- font size buttons
  - Typing textarea: white box below controls, same width as passage
  - Right panel (CANDIDATE PROFILE & LOGIN): circular candidate photo (placeholder avatar), User ID input, Password input (dots), Log in button (blue), "Forgot password?" link; if logged in show username in User ID
  - Footer bar: "SSC Digital Examination Module : Powered by Karwashra Typing Exam"
  - Timer turns red in last 60 seconds
  - Backspace control maintained

### Remove
- Old card-based stats grid and settings panel from TypingTest view (moved into the right panel / controls bar)

## Implementation Plan
1. Add missing exams to `src/frontend/src/data/exams.ts`: Delhi Police HCM (id: delhi-police-hcm), SSC MTS (id: ssc-mts), State Level (id: state-level), PCS (id: pcs), Teaching (id: teaching), Clerk (id: clerk)
2. Rewrite `src/frontend/src/pages/TypingTest.tsx` with TCS ION-style layout:
   - Title bar: dark (#2d2d2d), centered white title text "Typing Test [date]", left side small icons (document/save/print/help using lucide icons)
   - Below title: exam name label (dark bg, white text, left-aligned)
   - Tabs row: Group 1, Group 2, Group 3 (blue active, gray inactive), Time Left right-aligned
   - Info bar: purple/indigo background (#5b5ea6 or similar), white text, Keyboard Layout + Language
   - Main area: flex row, left side ~80%, right side ~20% (fixed ~260px)
   - Left side: passage box (white bg, black justified text, max-height ~280px overflow-y-auto, font-size adjustable), then controls bar (gray bg, Duration dropdown | << | Exercise dropdown | >> | Pause | A+ A A-), then typing textarea
   - Right side panel: header "CANDIDATE PROFILE & LOGIN" (blue bg, white text), circular photo (gray placeholder), User ID + Password inputs (if not logged in), Log in button; if logged in show username and green "Logged In" badge
   - Footer: gray bar, centered text
   - Generate 3 paragraphs for each group on mount, Group tabs switch active paragraph
3. Ensure existing routing and exam navigation still works
