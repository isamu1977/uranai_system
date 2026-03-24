## ADDED Requirements
### Requirement: 12-Card Premium Spread Prompt Generation
The system SHALL generate a cohesive, context-aware prompt customized for a 12-card premium reading spread.

#### Scenario: User requests a 12-card premium spread
- **WHEN** the `spread_type` is "premium" (12 cards)
- **THEN** the system generates a prompt including 12 defined positions and formatting instructions without out-of-bounds index errors.
