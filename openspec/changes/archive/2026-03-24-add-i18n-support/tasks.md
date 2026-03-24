# Tasks

## Phase 1 — Frontend i18n Foundation
- [x] 1.1 Create `src/lib/stores/locale.ts` — Svelte writable store defaulting to `"ja"`, persisted in `localStorage`
- [x] 1.2 Create `src/lib/i18n/ja.ts` — extract all landing page strings from `+page.svelte`, FAQ items, and footer into a typed Japanese dictionary
- [x] 1.3 Create `src/lib/i18n/en.ts` — English translations for all keys in `ja.ts`
- [x] 1.4 Create `src/lib/i18n/index.ts` — `t` derived store exposing `(key) => string` helper

## Phase 2 — Frontend View Layer
- [x] 2.1 Update `src/routes/+layout.svelte` — init locale store from `localStorage`, add `JP | EN` toggle to footer
- [x] 2.2 Update `src/routes/+page.svelte` — replace all hardcoded strings with `$t('key')` reactive calls
- [x] 2.3 Update `src/lib/data/testimonials.ts` — add `en` variants for all 6 testimonials; export `getTestimonials(lang)` helper
- [x] 2.4 Update `src/lib/components/TestimonialsCarousel.svelte` — pass locale-correct testimonials

## Phase 3 — Backend Schema & Prompt Language
- [x] 3.1 Update `app/schemas/reading.py` — add `lang: Literal["ja", "en"] = "ja"` to `ReadingRequest`
- [x] 3.2 Update `app/services/prompt_builder.py` — add language directive injection, resolve card names using `card.name_en` vs `card.name_jp` based on `lang`
- [x] 3.3 Update `src/lib/api.ts` — read `lang` from locale store and include in `ReadingRequest` payload
