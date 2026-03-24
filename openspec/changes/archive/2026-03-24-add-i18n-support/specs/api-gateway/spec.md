## MODIFIED Requirements

### Requirement: ReadingRequest Language Field
The `ReadingRequest` schema SHALL include an optional `lang` field (`"ja"` | `"en"`, default `"ja"`) that controls the language of the LLM-generated reading.

#### Scenario: Japanese reading (default)
- **WHEN** a reading is requested without a `lang` field, or with `lang: "ja"`
- **THEN** the API processes the request identically to existing behavior (backward compatible).

#### Scenario: English reading
- **WHEN** a reading is requested with `lang: "en"`
- **THEN** the API returns a reading in professional British English.
