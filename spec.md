# Karwashra Typing Exam

## Current State
Home page uses a Soni Typing Tutor 5.1 style layout (light gray background, orange icon tiles, 2-column panels, exam category buttons). The app has 13+ government exams. There are pages for Live Test, Practice, Learning. Footer has social media icons.

## Requested Changes (Diff)

### Add
- New home page design matching uploaded reference image (1774530358460...png):
  - Blue gradient header with keyboard logo "Manish Karwashra Typing", Login/Register buttons top right
  - Language selector bar below header (Hindi | English | All Language)
  - Hero section: welcome text, keyboard/books illustration, 4 large action buttons (Live Test, Typing Practice, Mock Test, Learning Typing)
  - Gaming section: 4 cards flanking the hero buttons (left: eSports Officials, Competitive Gaming League; right: Gaming Ethics & Law, Gaming Strategy)
  - "Prepare for All Competitive and Gaming Exams" heading
  - Exam grid: 2 rows of 12 exam tiles with icons and labels
    Row 1: All Govt Exam, State Exam, Harton Exam, Court, Banking, DCSCB, HSSC, Clerk, NVS, UP Police, Delhi Police, SBI PO
    Row 2: USC, DSSSB, SSC, KNK, EDV, NABARD, KVS, CTET, IBPS Clerk, LIC ADO, PSU Exams, State PCS
  - Social media icons footer (YouTube, Instagram, Twitter, Threads)
  - Footer links: About Us | Contact Us | Privacy Policy | Terms & Conditions
  - Copyright line
- New exams data: NVS, UP Police, Delhi Police, SBI PO, USC, KNK, EDV, NABARD, KVS, CTET, LIC ADO, PSU Exams, State PCS with typing test data
- Gaming section: 4 gaming typing categories with game-themed paragraphs
  - eSports Officials (English, 10 min, 35 WPM)
  - Competitive Gaming League (English, 10 min, 35 WPM)
  - Gaming Ethics & Law (English, 10 min, 35 WPM)
  - Gaming Strategy (English, 10 min, 35 WPM)
- /mock-test page: same as typing test but styled as "Mock Test" with exam selection
- Mock Test button on home page navigates to /mock-test

### Modify
- exams.ts: Add new exam entries for all new exams + gaming categories
- App.tsx: Add /mock-test route
- Home.tsx: Complete redesign to match reference image

### Remove
- Old Soni Typing Tutor 5.1 orange-tile layout from Home.tsx

## Implementation Plan
1. Update src/frontend/src/data/exams.ts -- add 13+ new exam entries including gaming categories
2. Create src/frontend/src/pages/MockTestPage.tsx -- reuse TypingTest component with mock test mode
3. Update src/frontend/src/App.tsx -- add /mock-test route
4. Rewrite src/frontend/src/pages/Home.tsx -- new design matching reference image exactly
