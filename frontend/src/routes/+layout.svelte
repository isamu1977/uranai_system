<script lang="ts">
  import "../app.css";
  import favicon from '$lib/assets/favicon.svg';
  import { locale } from '$lib/stores/locale';
  import { t } from '$lib/i18n';
  import { browser } from '$app/environment';

  let { children } = $props();

  // Init locale from localStorage on mount (client only)
  if (browser) {
    const saved = localStorage.getItem('enshirube_locale');
    if (saved === 'en' || saved === 'ja') locale.set(saved);
  }
</script>

<svelte:head>
  <link rel="icon" href="{favicon}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-[#252321]">
  <!-- Floating Header -->
  <header class="sticky top-0 z-50 w-full py-4 bg-[#252321]/90 backdrop-blur-md border-b border-[#EAE5DF]/5">
    <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
      <a href="/" class="text-2xl md:text-3xl font-serif text-[#EAE5DF] hover:text-[#C5A880] transition-colors duration-200 cursor-pointer tracking-wider" aria-label="縁しるべ ホームページ">
        {$t('nav.brand')}
      </a>
      <nav>
        <a href="/library" class="text-sm font-sans text-[#A9A39C] hover:text-[#C5A880] transition-colors duration-200">
          {$locale === 'ja' ? 'ライブラリ' : 'Library'}
        </a>
      </nav>
    </div>
  </header>

  <main class="flex-grow w-full">
    {@render children()}
  </main>

  <footer class="w-full py-10 md:py-14 border-t border-[#EAE5DF]/5">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="mb-4 flex flex-col sm:flex-row sm:justify-center gap-4 sm:gap-8 text-sm text-[#A9A39C]">
        <a href="/terms" class="hover:text-[#C5A880] transition-colors duration-200 cursor-pointer">{$t('footer.terms')}</a>
        <a href="/privacy" class="hover:text-[#C5A880] transition-colors duration-200 cursor-pointer">{$t('footer.privacy')}</a>
        <a href="/tokushoho" class="hover:text-[#C5A880] transition-colors duration-200 cursor-pointer">{$t('footer.tokushoho')}</a>
      </div>

      <!-- Language Toggle -->
      <div class="flex items-center justify-center gap-3 mb-4" aria-label="言語を選択 / Select language">
        <button
          type="button"
          class="text-xs font-sans tracking-widest transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]/40 {$locale === 'ja' ? 'text-[#C5A880] font-bold' : 'text-[#A9A39C]/50 hover:text-[#A9A39C]'}"
          onclick={() => locale.set('ja')}
          aria-pressed={$locale === 'ja'}
        >JP</button>
        <span class="text-[#EAE5DF]/10 text-xs" aria-hidden="true">|</span>
        <button
          type="button"
          class="text-xs font-sans tracking-widest transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]/40 {$locale === 'en' ? 'text-[#C5A880] font-bold' : 'text-[#A9A39C]/50 hover:text-[#A9A39C]'}"
          onclick={() => locale.set('en')}
          aria-pressed={$locale === 'en'}
        >EN</button>
      </div>

      <p class="text-xs text-[#A9A39C]/60">&copy; {new Date().getFullYear()} 縁しるべ. All rights reserved.</p>
    </div>
  </footer>
</div>
