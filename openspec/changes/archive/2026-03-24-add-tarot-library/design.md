## Context
The Tarot Library page serves as both an encyclopedia and an SEO entry point. Users may land from Google searching specific card meanings. The implementation must balance information density with the Premium Night aesthetic.

## Goals / Non-Goals
- Goals:
  - Fast initial load (static card data bundled or cached)
  - SEO-friendly URLs for each card
  - Responsive grid layout matching existing design language
  - Search/filter without page reloads
- Non-Goals:
  - Full card images (placeholder backs only)
  - Backend API integration (use JSON seed data directly)
  - User authentication

## Decisions

### Data Loading Strategy
**Decision**: Load card data directly from `backend/data/tarot_cards.json` as a static JSON module in the frontend.
- Pros: No API roundtrip, instant rendering, works offline
- Cons: Need to sync with backend seed data
**Alternative**: Fetch from `/api/v1/cards` - rejected due to added latency and dependency on backend availability.

### URL Structure
**Decision**: Use `/library` for index, `/library/the-fool` for individual cards.
- Card slugs generated from `name_en` lowercased with spaces replaced by hyphens
- 404 handled gracefully with redirect suggestion

### Detail Display
**Decision**: Dedicated page for details rather than modal/slide-over.
- Better SEO (unique URL per card)
- Allows browser back/forward navigation
- Modal alternative rejected due to complexity and SEO limitations

## Risks / Trade-offs
- **Data sync**: JSON copied to frontend vs. imported from backend - mitigate by documenting sync process
- **Performance**: 78 cards in grid - mitigated with lazy loading images and virtualized search results if needed

## Open Questions
- Should card images be added in future iteration or use placeholder?
- Prefer slide-over panel or dedicated page for mobile? (Decision: dedicated page for consistency)
