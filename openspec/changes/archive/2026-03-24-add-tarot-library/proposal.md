# Change: Tarot Library / Encyclopedia Page

## Why
Users need a browsable encyclopedia to explore all 78 cards independently. This page serves as an SEO magnet for organic traffic (e.g., "The Fool meaning love") and supports the freemium model by offering free value before conversion.

## What Changes
- New route `src/routes/library/+page.svelte` listing all 78 cards with search/filter
- New route `src/routes/library/[slug]/+page.svelte` for individual card detail pages (SEO)
- New Svelte store or data loader for card data
- Card grid with minimalist design and hover interactions
- Modal/slide-over panel for card details with full description
- Filter by arcana type (Major/Minor) and suit

## Impact
- Affected specs: `frontend` (new library capability)
- Key files: `frontend/src/routes/library/`, `frontend/src/lib/stores/`, `backend/data/tarot_cards.json`
