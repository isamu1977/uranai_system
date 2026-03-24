## ADDED Requirements
### Requirement: SvelteKit Foundation Theming and Structure
The frontend SHALL implement a cohesive design system and provide a reliable API client interface for backend communication.

#### Scenario: Global Layout and Theming
- **WHEN** the user accesses any page
- **THEN** they see an elegant, mobile-first design with the "縁しるべ" header, using the defined charcoal text, off-white background, and serif typography.

#### Scenario: API Communication
- **WHEN** the frontend needs to request a reading
- **THEN** it uses the unified API client to abstract the network request, applying global environment variables for the base URL and handling errors consistently.
