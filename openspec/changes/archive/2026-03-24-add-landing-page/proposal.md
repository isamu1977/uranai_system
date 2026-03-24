# Change: SvelteKit Home Page (Landing Page)

## Why
The MVP needs a compelling, mobile-first landing page at `src/routes/+page.svelte` to hook users, explain the Enshirube method, build empathy, and clearly present the pricing options to drive conversions.

## What Changes
- Build a responsive, single-page scrolling layout.
- Implement sections: Hero, Empathy & Pain, The Method, Pricing & Packages, Social Proof, and a Simple Footer.
- Apply the cohesive Tailwind CSS design rules (backgrounds, fonts, accents) defined in the SvelteKit foundation.
- Integrate Stripe checkout links for the 7-card and 12-card premium readings.

## Impact
- Affected specs: frontend
- Affected code:
  - `src/routes/+page.svelte` (NEW/MODIFIED)
  - `src/routes/+layout.svelte` (MODIFIED - Update footer links safely)
