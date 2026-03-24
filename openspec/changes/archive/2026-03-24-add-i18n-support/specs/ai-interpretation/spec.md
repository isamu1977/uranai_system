## MODIFIED Requirements

### Requirement: Language-Aware Prompt Building
The prompt builder SHALL inject a language directive and resolve card names in the user's selected language.

#### Scenario: LLM responds in English
- **WHEN** `lang` is `"en"`
- **THEN** the system prompt prepends an instruction instructing the LLM to respond entirely in professional, empathetic British English, and card names are resolved using `card.name_en`.

#### Scenario: LLM responds in Japanese (default)
- **WHEN** `lang` is `"ja"` or omitted
- **THEN** the system prompt behavior is unchanged from current behavior, and card names are resolved using `card.name_jp`.

#### Scenario: Card name display in selected language
- **WHEN** the reading result is rendered
- **THEN** card names (used in position headings and inline references) match the selected locale.
