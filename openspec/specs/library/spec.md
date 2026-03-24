# library Specification

## Purpose
TBD - created by archiving change add-tarot-library. Update Purpose after archive.
## Requirements
### Requirement: Tarot Library Index Page
The system SHALL provide a browsable library page at `/library` displaying all 78 tarot cards with search and filter functionality.

#### Scenario: Page loads with all cards
- **WHEN** a user navigates to `/library`
- **THEN** all 78 cards are displayed in a responsive grid (3 columns desktop, 2 columns mobile)
- **AND** cards show minimalist backs with name revealed on hover

#### Scenario: Search filters cards
- **WHEN** a user types in the search input
- **THEN** cards are filtered in real-time by card name matching the search term
- **AND** results update without page reload

#### Scenario: Filter by arcana type
- **WHEN** a user clicks "Major" or "Minor" filter
- **THEN** only cards of the selected arcana type are displayed
- **AND** the filter state is visually indicated as active

#### Scenario: Filter by suit
- **WHEN** a user clicks a suit filter (Wands, Cups, Swords, Pentacles)
- **THEN** only cards of the selected suit are displayed

### Requirement: Individual Card Detail Page
The system SHALL provide a dedicated page at `/library/[slug]` for each card with full information and i18n support.

#### Scenario: Card page loads
- **WHEN** a user navigates to `/library/the-fool`
- **THEN** the page displays the card name, meanings (upright/reversed), love context, and keywords
- **AND** content is displayed in the user's selected language (JA/EN)

#### Scenario: Invalid slug shows 404
- **WHEN** a user navigates to `/library/invalid-card`
- **THEN** a 404 page is displayed with a link back to the library index

#### Scenario: SEO structured data
- **WHEN** a card detail page is rendered
- **THEN** JSON-LD structured data is included for rich search results

### Requirement: Library Navigation
The system SHALL provide navigation links to the library from the header and breadcrumbs on detail pages.

#### Scenario: Header navigation
- **WHEN** the user views any page
- **THEN** a "Library" link is visible in the header
- **AND** clicking it navigates to `/library`

#### Scenario: Breadcrumb on detail page
- **WHEN** a user views a card detail page
- **THEN** breadcrumbs show: Home > Library > [Card Name]

