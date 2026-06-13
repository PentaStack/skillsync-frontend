---
name: Academic Ember
colors:
  surface: '#121413'
  surface-dim: '#121413'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0e'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e1'
  on-surface-variant: '#e3beb6'
  inverse-surface: '#e3e2e1'
  inverse-on-surface: '#2f3130'
  outline: '#aa8982'
  outline-variant: '#5a413b'
  surface-tint: '#ffb4a3'
  primary: '#ffb4a3'
  on-primary: '#630f00'
  primary-container: '#ff5e3a'
  on-primary-container: '#5c0e00'
  inverse-primary: '#b42907'
  secondary: '#cbc5c2'
  on-secondary: '#33302e'
  secondary-container: '#4c4846'
  on-secondary-container: '#bdb7b4'
  tertiary: '#cac6c3'
  on-tertiary: '#32302f'
  tertiary-container: '#979391'
  on-tertiary-container: '#2e2c2b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a3'
  on-primary-fixed: '#3d0600'
  on-primary-fixed-variant: '#8b1a00'
  secondary-fixed: '#e8e1dd'
  secondary-fixed-dim: '#cbc5c2'
  on-secondary-fixed: '#1d1b19'
  on-secondary-fixed-variant: '#494644'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#121413'
  on-background: '#e3e2e1'
  surface-variant: '#343535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  code-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system establishes a sophisticated, editorial atmosphere for high-level academic mentorship and technical discourse. The visual narrative centers on the "Scholar’s Night": a focused, warm, and quiet environment conducive to deep work and critical thinking.

The style is a fusion of **Modern Editorial** and **High-Fidelity Minimalism**. It leverages the prestige of traditional publishing—characterized by bold, expressive serifs—and marries it with the precision of developer-centric UI. The emotional response should be one of quiet authority, intellectual rigor, and premium quality.

Key stylistic pillars include:
- **Depth through Darkness:** Utilizing a near-black palette to reduce eye strain during long review sessions.
- **Warm Accents:** Using 'Ember Orange' sparingly to represent the "spark" of insight or critical feedback.
- **Intentional Whitespace:** Generous margins that allow complex academic text and code to breathe.

## Colors

The palette is anchored in a warm-black spectrum to create a sense of enclosure and focus. 

- **Canvas (#0b0a09):** The primary background, a deep charcoal with a hint of warmth to avoid the "cold" feel of pure black.
- **Surface (#161412):** Used for cards, navigation bars, and layered elements to create subtle separation from the canvas.
- **Ember Orange (#ff5e3a):** The sole accent color. It is used for primary calls-to-action, active states, and highlighting critical errors in code reviews.
- **Typography:** Headlines and primary body text utilize **#f9f8f7** for high legibility against the dark background, while secondary information uses **#a3a19f** to maintain visual hierarchy.

## Typography

The typography strategy relies on the contrast between the intellectual history of serifs and the modern utility of sans-serifs.

- **Headlines:** Playfair Display in bold italics provides the "Editorial" feel. It should be used for page titles and major section headers to signal prestige.
- **UI & Body:** Hanken Grotesk provides a clean, contemporary feel for long-form reading and functional UI elements. It is optimized for high-contrast dark mode legibility.
- **Technical Content:** Geist is utilized for code snippets, diffs, and metadata. Its mono-inspired structure ensures that technical characters are easily distinguishable.

**Implementation Note:** Always use italicized weights for Playfair Display to maximize the "Reviewer" editorial aesthetic.

## Layout & Spacing

The design system employs a **Fixed Grid** philosophy for desktop to maintain the centered, focused feel of a printed journal, transitioning to a fluid model for mobile devices.

- **Desktop:** A 12-column grid with a maximum width of 1280px. Gutters are kept wide (24px) to ensure technical content does not feel cramped.
- **Rhythm:** A strict 8px baseline grid governs all vertical spacing.
- **Padding:** Content containers utilize "Atmospheric Padding"—generous internal spacing (minimum 32px) to signify a premium, unhurried user experience.
- **Mobile:** Elements reflow to a single column with 20px side margins. Typography scales down slightly, but the italicized serif headlines remain the focal point.

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Subtle Glows** rather than traditional heavy shadows.

- **Levels:** Level 0 is the Canvas (#0b0a09). Level 1 is the Surface (#161412). 
- **Borders:** Instead of distinct shadows, use 1px solid borders in a slightly lighter shade (#2a2826) to define card boundaries.
- **Accent Elevation:** For primary interactive elements (like the 'Ember' CTA), use a very soft, low-opacity outer glow using the primary color (#ff5e3a at 15% opacity) to simulate the warmth of a literal ember.
- **Modals:** Use a heavy backdrop blur (20px) to isolate the user from the background content, maintaining focus on the task at hand.

## Shapes

The shape language is "Soft" (0.25rem - 0.75rem) to balance professional structure with a modern touch.

- **Core Elements:** Buttons and input fields use a standard 4px (0.25rem) radius for a sharp, disciplined look.
- **Containers:** Large cards and mentor profile sections use a 12px (0.75rem) radius to feel more approachable.
- **Interactive States:** Avoid fully rounded pills; maintain the structured corner radius to preserve the "academic paper" feel.

## Components

### Buttons
- **Primary:** Background #ff5e3a, Text #0b0a09, Bold weight. Use for "Submit Review" or "Hire Mentor."
- **Secondary:** Transparent background, 1px border #a3a19f, Text #f9f8f7.
- **Ghost:** No background or border, Text #a3a19f.

### Cards & Surfaces
- **Mentor Profiles:** Surface #161412 with a 1px border. Use Playfair Display for the name and Hanken Grotesk for the credentials.
- **Review Cards:** Utilize a vertical accent bar of #ff5e3a on the left edge to indicate "High Priority" or "New Feedback."

### Code Diffs
- **Addition:** Subtle green tint on the background (approx 10% opacity) with #f9f8f7 text.
- **Deletion:** Subtle red/orange tint on the background (approx 10% opacity) with #f9f8f7 text.
- **Font:** Always Geist Mono-style for the code content.

### Input Fields
- **Default:** Surface #161412 with a subtle bottom border in #a3a19f. 
- **Focus:** Border changes to #ff5e3a with a slight upward "lift" via a 2px offset.

### Mentor Badges
- Small, uppercase labels with high letter spacing (0.1em) using #a3a19f text on a #2a2826 background.