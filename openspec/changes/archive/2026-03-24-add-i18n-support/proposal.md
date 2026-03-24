# Change: Add Full-Stack i18n Support (ja / en)

## Context

The codebase has **no i18n layer** today — all landing page text is hardcoded in `+page.svelte`, component strings are inline, and the backend LLM prompts only produce Japanese output. However, the DB schema is already **trilingual-ready**: the `Card` model has `name_jp`, `name_en`, and `name_pt` columns.

## Why

Establish the architectural foundations for a bilingual (Japanese / English) experience:
1. Decouple landing page copy from view components so translations are maintainable.
2. Let users select their language preference and persist it.
3. Make the LLM reading engine respond in the user's chosen language using card names in the correct locale.

## Technical Decisions

### Frontend: Custom Svelte store (no heavy library)
A lightweight dictionary approach (`src/lib/i18n/`) avoids the complexity of Paraglide JS (requires CLI & compilation step) and `svelte-i18n` (async init boilerplate). A typed `Record<string, string>` dictionary + a Svelte store passed via context is lean, type-safe, and zero-dependency.

- `src/lib/i18n/ja.ts` — Japanese strings (current copy)
- `src/lib/i18n/en.ts` — English strings
- `src/lib/stores/locale.ts` — Svelte writable store, persisted in `localStorage`
- `src/lib/i18n/index.ts` — `t(key)` helper derived from the active locale store

### Frontend: Language toggle in footer
A subtle `JP / EN` text toggle with gold highlight on the active locale, no flag images.

### Backend: `lang` field on `ReadingRequest`
Add `lang: Literal["ja", "en"] = "ja"` as an optional field with `"ja"` default — fully backward-compatible.

### Backend: Prompt language injection
Each prompt builder receives `lang` and prepends a language directive. Card names are resolved using `card.name_en` when `lang == "en"`, `card.name_jp` otherwise.

The `Card` model already stores both `name_jp` and `name_en`, so no migration is needed.

## Impact

- Affected specs: `frontend`, `api-gateway`, `ai-interpretation`
- Affected files:
  - `src/lib/i18n/ja.ts` **[NEW]**
  - `src/lib/i18n/en.ts` **[NEW]**
  - `src/lib/i18n/index.ts` **[NEW]**
  - `src/lib/stores/locale.ts` **[NEW]**
  - `src/routes/+layout.svelte` **[MODIFIED]** — language toggle in footer, locale store init
  - `src/routes/+page.svelte` **[MODIFIED]** — replace hardcoded strings with `t()` calls
  - `src/lib/data/testimonials.ts` **[MODIFIED]** — bilingual content array
  - `src/lib/components/TestimonialsCarousel.svelte` **[MODIFIED]** — use locale-aware testimonials
  - `app/schemas/reading.py` **[MODIFIED]** — add `lang` field
  - `app/services/prompt_builder.py` **[MODIFIED]** — language injection + card name locale
  - `src/lib/api.ts` **[MODIFIED]** — pass `lang` from locale store in reading requests
