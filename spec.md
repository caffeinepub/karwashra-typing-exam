# Karwashra Typing Exam

## Current State
The app has separate pages: /live-test (LiveTestPage), /mock-test (MockTestPage), /practice (PracticePage), /exam/:id/test (TypingTest). Home page navigates to each separately.

## Requested Changes (Diff)

### Add
- New unified page `/exam-interface` with 4 top-level tabs:
  1. **Live Test** -- real-time typing test with timer, WPM tracking
  2. **Mock Test** -- full mock exam simulation
  3. **Typing Practice** -- practice mode with paragraph selection
  4. **Typing Exam** -- exam selection grid (all 14 exams), then opens TCS ION test interface
- Each tab renders within the same TCS ION-style container (dark header, Group 1/2/3 sub-tabs, purple info bar, candidate profile panel on right)
- Home page cards and navigation should link to /exam-interface with appropriate tab pre-selected

### Modify
- Home page: update 4 main action buttons to link to /exam-interface?tab=live-test, ?tab=mock-test, ?tab=practice, ?tab=typing-exam
- App.tsx: add route for /exam-interface

### Remove
- Nothing removed; existing pages remain for backwards compatibility

## Implementation Plan
1. Create `src/frontend/src/pages/ExamInterface.tsx` -- unified 4-tab interface in TCS ION style
   - Top: dark blue toolbar (save/print/help icons, title 'Typing Test — DD MMM YYYY', window controls)
   - Tab bar: Live Test | Mock Test | Typing Practice | Typing Exam (horizontal tabs, active = blue filled)
   - Left panel: exam name bar, Group 1/2/3 sub-tabs, purple info bar (Keyboard Layout: Inscript | Language: English), passage area, controls bar (Duration, Select Para, Paragraph X/Y, Backspace ON, Language), typing textarea
   - Right panel: CANDIDATE PROFILE & LOGIN card (avatar, User ID, Password, Log in button, Forgot password, Required WPM, Min Accuracy, Duration, exercise nav)
   - Each main tab switches the content/mode in the left panel while right panel stays fixed
   - For 'Typing Exam' tab: show 14 exam tiles grid first, on click opens the test interface for that exam
2. Update App.tsx to add /exam-interface route
3. Update Home.tsx to link buttons to /exam-interface with correct tab query param
