## ADDED Requirements
### Requirement: Home Page (Landing Page) Structure
The frontend SHALL provide a compelling, single-page scrolling landing page at the root route that clearly communicates the value proposition and pricing.

#### Scenario: User visits the root URL
- **WHEN** the user navigates to `/`
- **THEN** they see the Hero section, Empathy section, Method section, Pricing cards, and Social Proof reviews, styled with the cohesive "Japanese Minimalist" design system.

#### Scenario: User selects a reading package
- **WHEN** the user clicks a CTA button in the pricing section
- **THEN** they are directed to the corresponding Stripe Checkout URL for either the 7-card or 12-card reading.
