# Tasks

- [x] 1.1 Create `src/lib/data/testimonials.ts` with all 6 typed testimonials (name, age, type, content)
- [x] 1.2 Create `src/lib/components/TestimonialsCarousel.svelte`:
        - Single-card fade animation (CSS opacity/translate, 400ms)
        - Auto-advance every 5 seconds, pauses on hover
        - `prefers-reduced-motion` guard (stops auto-advance)
        - Dot navigator with aria-label / aria-selected
        - Prev / Next arrow SVG buttons
- [x] 1.3 Replace static testimonials grid in `+page.svelte` with `<TestimonialsCarousel />`
