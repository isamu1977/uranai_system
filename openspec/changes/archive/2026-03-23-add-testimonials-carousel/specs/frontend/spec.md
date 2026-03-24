## ADDED Requirements

### Requirement: Testimonials Data Module
The frontend SHALL maintain testimonials in a dedicated typed data module separate from view components.

#### Scenario: Testimonial data is imported into a component
- **WHEN** `TestimonialsCarousel` is rendered
- **THEN** it imports all testimonials from `$lib/data/testimonials` and renders each one.

### Requirement: Animated Testimonials Carousel
The frontend SHALL replace the static testimonials grid with a single-card auto-rotating carousel that preserves the Dark Elegance visual style.

#### Scenario: Auto-advance on idle
- **WHEN** the testimonials section is visible and the user has not interacted
- **THEN** the active testimonial changes every 5 seconds with a fade transition.

#### Scenario: Pause on hover
- **WHEN** the user hovers over the carousel
- **THEN** auto-advance is suspended until the pointer leaves.

#### Scenario: Manual navigation via dots or arrows
- **WHEN** the user clicks a dot indicator or prev/next arrow
- **THEN** the carousel immediately fades to the selected testimonial and resets the auto-advance timer.

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set in the OS
- **THEN** auto-advance is disabled and transitions are instant.
