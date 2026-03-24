import { derived } from 'svelte/store';
import { locale } from '$lib/stores/locale';
import { ja, type TranslationKey } from './ja';
import { en } from './en';

// Map of all dictionaries
const dicts = { ja, en } as const;

/**
 * Reactive `t` store.
 * Usage in Svelte: {$t('hero.headline1')}
 */
export const t = derived(
  locale,
  ($locale) =>
    (key: TranslationKey): string =>
      dicts[$locale][key] ?? key
);
