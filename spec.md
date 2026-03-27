# Karwashra Typing Exam

## Current State
- TypingTest.tsx has a 2-column layout (left: passage + controls + textarea, right: candidate profile)
- The passage box has `flex: 1` style which makes it expand to fill ALL available vertical space
- This pushes the typing textarea (typewriter) to the very bottom of the page, far below the passage
- PASSAGES in exams.ts has only 5 English + 3 Hindi paragraphs
- No paragraph selection UI exists; groups are just 3 randomly generated texts
- Text in some areas is not rendering clearly

## Requested Changes (Diff)

### Add
- 20+ additional English paragraphs to PASSAGES.english (total 25+)
- 15+ additional Hindi paragraphs to PASSAGES.hindi (total 18+)
- Paragraph selection modal/panel: before starting a test, user can click "Select Paragraph" button to see a numbered list of all available paragraphs and choose one
- The 3 group tabs (Group 1/2/3) should let user pick from the paragraph list for each group

### Modify
- Fix passage box: remove `flex: 1`, give it a fixed height of `260px` with `overflow-y: auto` and `flexShrink: 0`
- The typing textarea must appear IMMEDIATELY below the passage box and controls bar, not at the bottom of the screen
- The overall left column should be `overflow: auto` so it scrolls naturally
- Ensure all text (passage, typed input, labels) has proper contrast and font settings
- Make the layout use proper flex so passage + controls + textarea are all visible without scrolling when possible

### Remove
- Nothing

## Implementation Plan
1. In `src/frontend/src/data/exams.ts`: Add 20+ more English paragraphs and 15+ more Hindi paragraphs to PASSAGES
2. In `src/frontend/src/pages/TypingTest.tsx`:
   - Fix the passage container div: change `flex: 1, overflow: hidden` to `height: '260px', overflow: 'hidden', flexShrink: 0`
   - Add state: `showParagraphSelector: boolean`, `paragraphList: string[]`
   - Add a "Select Paragraph" button near the group navigation
   - Add a paragraph selector modal that shows numbered list of all passages, user clicks one to set it as current group's passage
   - Fix the left column container to allow the textarea to be visible directly below controls
