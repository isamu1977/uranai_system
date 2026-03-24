# frontend Specification

## ADDED Requirements

### Requirement: API Service Integration

The frontend SHALL provide a standardized API service layer (`src/lib/api.ts`) for communicating with the backend.

#### Scenario: Generate Reading Request
- **WHEN** `api.generateReading()` is called with a spread type and optional session ID
- **THEN** it sends a POST request to `$PUBLIC_API_BASE_URL/readings/generate`
- **AND** it handles network or 500 errors gracefully by returning an error state so the UI doesn't crash

### Requirement: Test UI for Reading Generation

The system SHALL provide a temporary test route (`/test-reading`) to verify end-to-end integration without final styling.

#### Scenario: Generating a test reading
- **WHEN** a user selects a spread type and clicks "Generate Reading"
- **THEN** a loading indicator "サーバーと通信中..." is displayed
- **AND** upon success, the drawn cards and formatted Markdown interpretation are displayed
- **AND** upon failure, an error message is displayed
