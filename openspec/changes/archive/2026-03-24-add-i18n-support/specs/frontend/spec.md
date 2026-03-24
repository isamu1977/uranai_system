## ADDED Requirements

### Requirement: Locale Store
The frontend SHALL maintain the user's selected language (`"ja"` or `"en"`) in a Svelte writable store, persisted to `localStorage`, defaulting to `"ja"`.

#### Scenario: First-time visitor
- **WHEN** a user visits the site for the first time
- **THEN** the locale defaults to `"ja"` and all UI text is displayed in Japanese.

#### Scenario: Returning visitor with saved preference
- **WHEN** a user who previously selected `"en"` revisits the site
- **THEN** the stored locale is restored from `localStorage` and the UI displays in English.

### Requirement: Translation Dictionary
The frontend SHALL maintain all UI copy in typed translation dictionaries (`ja.ts`, `en.ts`) under `src/lib/i18n/`, accessed via a `t(key)` reactive helper.

#### Scenario: Language switch
- **WHEN** the user changes the active locale via the language toggle
- **THEN** all `$t()` bindings in the page re-render immediately with the new locale's text, without a full page reload.

### Requirement: Language Toggle in Footer
The frontend SHALL display a subtle `JP | EN` toggle in the site footer.

#### Scenario: Selecting English
- **WHEN** the user clicks `EN` in the footer toggle
- **THEN** the locale store updates to `"en"`, localStorage is persisted, and all page text switches to English.

### Requirement: Bilingual Testimonials
The frontend SHALL display testimonials in the active locale language.

#### Scenario: Testimonials in English
- **WHEN** the active locale is `"en"`
- **THEN** the Testimonials Carousel renders English-language testimonial content.
