# Quiz Application Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by Google Forms and Kahoot's clean, intuitive interfaces with emphasis on clarity and user-friendly form design.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Primary: #4285F4 (Google blue) - buttons, links, active states
- Secondary: #34A853 (success green) - confirmation messages, correct answers
- Accent: #EA4335 (red) - error states, required field indicators

**Neutral Colors:**
- Background: #FFFFFF (white) - main background
- Text Primary: #202124 (dark grey) - headings, body text
- Text Secondary: #5F6368 (medium grey) - labels, helper text
- Borders: #DADCE0 (light grey) - form inputs, card borders

### B. Typography
- **Primary Font**: Inter or Roboto from Google Fonts
- **Hierarchy**: 
  - H1 (Modal titles): 24px, font-weight 600
  - H2 (Question titles): 20px, font-weight 500
  - Body text: 16px, font-weight 400
  - Labels/captions: 14px, font-weight 400

### C. Layout System
**Spacing System**: Tailwind units of 4, 6, and 8 (p-4, m-6, h-8)
- Container max-width: 640px (centered)
- Card padding: p-6
- Form field spacing: gap-4
- Section margins: mb-8

### D. Component Library

**Registration Modal:**
- Centered overlay with backdrop blur
- White card with rounded-lg corners
- Drop shadow for elevation
- Close button (X) in top-right
- Form fields with floating labels
- Primary blue submit button

**Quiz Container:**
- Centered card layout with subtle border
- Progress bar at top showing completion
- Question counter (e.g., "Question 3 of 10")

**Question Display:**
- Question text in H2 style
- Radio button options with hover states
- Clear visual feedback for selected answers
- Consistent vertical spacing between options

**Navigation:**
- Previous/Next buttons at bottom
- Submit button on final question (green)
- Progress indicator dots or bar

**Form Elements:**
- Input fields with border-grey borders
- Focus states with primary blue outline
- Error states with red text and borders
- Required field indicators with red asterisks

### E. Responsive Design
- Mobile-first approach
- Stack navigation buttons vertically on small screens
- Maintain consistent padding and spacing
- Modal takes full width on mobile with safe margins

### F. Interactive States
- **Hover**: Subtle background color changes on buttons and radio options
- **Focus**: Blue outline for keyboard navigation
- **Active**: Pressed state with slight opacity reduction
- **Selected**: Radio buttons with filled primary color
- **Disabled**: 50% opacity for unavailable options

### G. Accessibility Features
- Proper form labels and ARIA attributes
- Keyboard navigation support
- High contrast ratios for all text
- Focus indicators for screen readers
- Semantic HTML structure

## Key Design Principles
1. **Clarity First**: Every element serves a clear purpose
2. **Progressive Disclosure**: Show only necessary information at each step
3. **Familiar Patterns**: Use established form and quiz conventions
4. **Visual Hierarchy**: Clear distinction between questions, options, and actions
5. **Error Prevention**: Clear validation and helpful error messages