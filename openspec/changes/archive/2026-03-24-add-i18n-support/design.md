# Design: i18n Architecture

## Approach: Lightweight Custom Store (No Paraglide / svelte-i18n)

### Rationale

| Option | Pros | Cons |
|---|---|---|
| **Paraglide JS** | Type-safe, tree-shaking, SvelteKit-native | Requires CLI compilation, complex setup, overkill for 2 locales |
| **svelte-i18n** | Mature, rich formatting | Async init, bundle overhead, ICU syntax complexity |
| **Custom store** | Zero deps, fully type-safe, instant, minimal bundle | Manual maintenance of keys |

For 2 locales and a fixed copy set, the custom store is the clear winner.

### Directory Structure

```
src/lib/
  i18n/
    index.ts       ← t() helper + derived store
    ja.ts          ← Japanese strings (source of truth)
    en.ts          ← English strings
  stores/
    locale.ts      ← writable('ja'), persisted in localStorage
```

### `t()` helper pattern

```ts
// src/lib/i18n/index.ts
import { derived } from 'svelte/store';
import { locale } from '$lib/stores/locale';
import { ja } from './ja';
import { en } from './en';

const dicts = { ja, en } as const;
export const t = derived(locale, ($locale) => (key: keyof typeof ja) => dicts[$locale][key] ?? key);
```

Usage in a component: `{$t('hero.headline')}`

## Backend Language Injection Pattern

```python
# Reading request carries lang
class ReadingRequest(BaseModel):
    lang: Literal["ja", "en"] = "ja"
    ...

# Prompt builder receives lang, selects card name
card_name = card.name_en if lang == "en" else card.name_jp

# Language directive prepended to all prompts
lang_directive = (
    "IMPORTANT: Your entire response MUST be written in professional, empathetic, "
    "sophisticated British English." if lang == "en"
    else ""  # ja is default, no directive needed
)
```

## Language Toggle Placement

Footer: `JP | EN` — minimal text links, gold highlight on active. Language change triggers `locale.set()`, which persists to `localStorage` and re-renders all reactive `$t()` calls instantly (no page reload needed).
