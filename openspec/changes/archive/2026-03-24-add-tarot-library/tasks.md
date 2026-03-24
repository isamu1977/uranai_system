## 1. Data Layer
- [x] 1.1 Create `src/lib/data/tarotCards.ts` to load and parse card data
- [x] 1.2 Define TypeScript interface for TarotCard with all required fields
- [x] 1.3 Add slug generation utility for card URLs
- [x] 1.4 Write unit tests for data utilities

## 2. Library Index Page
- [x] 2.1 Create `src/routes/library/+page.svelte` with grid layout
- [x] 2.2 Implement search input with debounced filtering
- [x] 2.3 Add filter buttons for Major/Minor arcana and suits
- [x] 2.4 Style card grid (3-col desktop, 2-col mobile)
- [x] 2.5 Add hover interactions showing card name
- [x] 2.6 Implement loading and empty states
- [x] 2.7 Add SEO meta tags

## 3. Card Detail Page
- [x] 3.1 Create `src/routes/library/[slug]/+page.svelte`
- [x] 3.2 Load card data by slug (from JSON or API)
- [x] 3.3 Display full card information with i18n support
- [x] 3.4 Add navigation to prev/next card
- [x] 3.5 Add structured data (JSON-LD) for SEO
- [x] 3.6 Create 404 handling for invalid slugs

## 4. Navigation
- [x] 4.1 Add "Library" link to header navigation
- [x] 4.2 Add breadcrumb on detail pages

## 5. Polish
- [x] 5.1 Ensure accessibility (keyboard nav, ARIA labels)
- [x] 5.2 Verify responsive behavior on mobile
- [x] 5.3 Test i18n display for all three languages
