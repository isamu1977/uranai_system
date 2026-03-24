# Change: Add Testimonials Carousel with Auto-Fade

## Context
The current "お客様の声" (Testimonials) section in `src/routes/+page.svelte` renders a static grid of 2 hardcoded reviews. There is no separate data source — the content is embedded inline.

## Why
- 6 richer testimonials were provided, covering a broader demographic (age 24–41, multiple plan types).
- Displaying all 6 at once would break the page rhythm and overwhelm the user.
- A subtle auto-rotating fade carousel keeps the section compact, elegant, and visually alive — consistent with the "Dark Elegance" night aesthetic.

## What Changes

### 1. New data module: `src/lib/data/testimonials.ts`
Extract testimonials into a typed TypeScript array so the data is decoupled from the view and easy to extend.

### 2. New component: `src/lib/components/TestimonialsCarousel.svelte`
- Displays **one testimonial at a time** with a smooth CSS opacity/translate fade (no heavy library dependency).
- **Auto-advances** every 5 seconds (`setInterval`), pauses on hover, respects `prefers-reduced-motion`.
- **Dot indicators** below the card for manual navigation (accessible: `role="tab"`, `aria-selected`).
- Prev / Next arrow buttons for explicit control (visible on desktop, always tappable on mobile).
- Maintains the existing card visual style (`bg-[#312E2B]`, gold borders, 5-star SVGs, `<blockquote>` + `<cite>` semantics).

### 3. Modify `src/routes/+page.svelte`
Replace the current static 2-review grid with `<TestimonialsCarousel />`. The section container and heading remain unchanged to preserve layout harmony.

## Impact
- Affected specs: `frontend`
- Affected files:
  - `src/lib/data/testimonials.ts` **[NEW]**
  - `src/lib/components/TestimonialsCarousel.svelte` **[NEW]**
  - `src/routes/+page.svelte` **[MODIFIED]** (testimonials section only)
