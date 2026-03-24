<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { getAllCards, getCardBySlug, getCardName, getCardGlowColor, getCardImageUrl, type TarotCard } from '$lib/data/tarotCards';
  import { locale } from '$lib/stores/locale';
  import { t } from '$lib/i18n';

  let cards: TarotCard[] = [];
  let currentCard: TarotCard | undefined;
  let currentIndex = -1;
  let isLoading = true;
  let notFound = false;
  let imageError = false;
  let showUpright = false;
  let showReversed = false;
  let showLove = false;
  let showNav = false;

  onMount(async () => {
    cards = await getAllCards();
    
    const slug = $page.params.slug ?? '';
    currentCard = getCardBySlug(cards, slug);
    
    if (currentCard) {
      currentIndex = cards.findIndex(c => c.slug === slug);
    } else {
      notFound = true;
    }
    
    isLoading = false;

    setTimeout(() => showUpright = true, 300);
    setTimeout(() => showReversed = true, 600);
    setTimeout(() => showLove = true, 900);
    setTimeout(() => showNav = true, 1200);
  });

  function handleImageError() {
    imageError = true;
  }

  $: prevCard = currentIndex > 0 ? cards[currentIndex - 1] : null;
  $: nextCard = currentIndex < cards.length - 1 ? cards[currentIndex + 1] : null;
  $: glowColor = currentCard ? getCardGlowColor(currentCard) : { primary: '#C5A880', secondary: '#DCAE96' };
  $: imageUrl = currentCard ? getCardImageUrl(currentCard) : '';

  $: pageTitle = currentCard 
    ? `${currentCard.name_jp} (${currentCard.name_en}) | 縁しるべ`
    : `${$t('library.notfound.title')} | ${$t('library.heading')}`;

  $: metaDescription = currentCard 
    ? currentCard.meaning_upright.split('。')[0] + '。'
    : $t('library.meta.description');

  $: jsonLd = currentCard ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': currentCard.name_en,
    'name': currentCard.name_jp,
    'description': currentCard.meaning_upright,
    'keywords': ['tarot', 'tarot card', currentCard.name_en, currentCard.name_jp, 'love tarot', '恋愛鑑定']
  } : null;
</script>

<svelte:head>
  {#if currentCard}
    <title>{pageTitle}</title>
    <meta name="description" content={metaDescription}>
    {#if jsonLd}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    {/if}
  {:else}
    <title>{$t('library.notfound.title')} | {$t('library.heading')}</title>
  {/if}
</svelte:head>

<div class="w-full min-h-screen py-8 md:py-12 px-4 sm:px-6">
  <div class="max-w-3xl mx-auto">
    {#if isLoading}
      <div class="flex justify-center items-center py-20">
        <div class="animate-pulse text-[#C5A880] font-serif">
          {$t('library.loading')}
        </div>
      </div>
    {:else if notFound}
      <div class="text-center py-20">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-[#312E2B] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-[#A9A39C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 class="text-2xl font-serif text-[#EAE5DF] mb-4">{$t('library.notfound.title')}</h1>
        <p class="text-[#A9A39C] mb-8">{$t('library.notfound.desc')}</p>
        <a
          href="/library"
          class="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#252321] rounded-full font-serif text-sm hover:bg-[#b59060] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {$t('library.nav.back')}
        </a>
      </div>
    {:else if currentCard}
      <!-- Breadcrumb -->
      <nav class="mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 text-sm font-sans">
          <li>
            <a href="/" class="text-[#A9A39C] hover:text-[#C5A880] transition-colors">
              {$t('library.breadcrumb.home')}
            </a>
          </li>
          <li class="text-[#EAE5DF]/20">/</li>
          <li>
            <a href="/library" class="text-[#A9A39C] hover:text-[#C5A880] transition-colors">
              {$t('library.breadcrumb.library')}
            </a>
          </li>
          <li class="text-[#EAE5DF]/20">/</li>
          <li class="text-[#EAE5DF]" aria-current="page">
            {currentCard.name_en}
          </li>
        </ol>
      </nav>

      <!-- Card Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-3 mb-4">
          <span class="px-3 py-1 bg-[#312E2B] text-[#C5A880] text-xs font-sans rounded-full">
            {currentCard.arcana_type === 'major' ? ($locale === 'ja' ? '大牌' : 'Major Arcana') : ($locale === 'ja' ? '小牌' : 'Minor Arcana')}
          </span>
          {#if currentCard.suit}
            <span class="px-3 py-1 bg-[#312E2B] text-[#DCAE96] text-xs font-sans rounded-full capitalize">
              {currentCard.suit}
            </span>
          {/if}
        </div>
        <h1 class="text-3xl md:text-4xl font-serif text-[#EAE5DF] mb-2">
          {currentCard.name_jp}
        </h1>
        <p class="text-[#A9A39C] text-sm font-sans">
          {currentCard.name_en}
        </p>
      </div>

      <!-- Card Visual with Glow Effect -->
      <div class="mb-12 flex justify-center">
        <div class="relative">
          <!-- Glow Effect -->
          <div 
            class="absolute inset-0 blur-3xl opacity-30 scale-110"
            style="background: radial-gradient(circle, {glowColor.primary}40 0%, transparent 70%);"
            aria-hidden="true"
          ></div>
          
          <!-- Card Container -->
          <div 
            class="relative w-48 aspect-[2/3] rounded-2xl overflow-hidden border border-[#EAE5DF]/10 shadow-2xl"
            style="box-shadow: 0 0 60px {glowColor.primary}20, 0 0 100px {glowColor.secondary}10;"
          >
            {#if imageError}
              <!-- Fallback Card Back Design -->
              <div class="w-full h-full bg-gradient-to-br from-[#3a3632] to-[#252321] flex items-center justify-center">
                <div class="absolute inset-4 border border-[{glowColor.primary}]/30 rounded-lg"></div>
                <div class="absolute inset-8 border border-[{glowColor.primary}]/15 rounded-md"></div>
                <div class="w-20 h-20 border-2 border-[{glowColor.primary}]/40 rounded-full flex items-center justify-center">
                  <div class="w-10 h-10 border border-[{glowColor.primary}]/50 rounded-full"></div>
                </div>
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-[{glowColor.primary}]/60 text-xs font-serif">
                  {currentCard.number}
                </div>
              </div>
            {:else}
              <img
                src={imageUrl}
                alt="{currentCard.name_jp} - {currentCard.name_en}"
                class="w-full h-full object-cover"
                onerror={handleImageError}
              />
            {/if}
          </div>
        </div>
      </div>

      <!-- Meanings with Staggered Entry -->
      <div class="space-y-6 mb-10">
        <!-- Upright Meaning -->
        <div 
          class="bg-[#312E2B] rounded-xl p-6 border border-[#EAE5DF]/5 transition-all duration-700 ease-out"
          style="opacity: {showUpright ? 1 : 0}; transform: translateY({showUpright ? 0 : 20}px);"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#C5A880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <h2 class="text-lg font-serif text-[#EAE5DF]">{$t('library.meaning.upright')}</h2>
          </div>
          <p class="text-[#EAE5DF]/80 leading-relaxed">
            {currentCard.meaning_upright}
          </p>
        </div>

        <!-- Reversed Meaning -->
        <div 
          class="bg-[#312E2B] rounded-xl p-6 border border-[#EAE5DF]/5 transition-all duration-700 ease-out"
          style="opacity: {showReversed ? 1 : 0}; transform: translateY({showReversed ? 0 : 20}px);"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-[#DCAE96]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#DCAE96]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h2 class="text-lg font-serif text-[#EAE5DF]">{$t('library.meaning.reversed')}</h2>
          </div>
          <p class="text-[#EAE5DF]/80 leading-relaxed">
            {currentCard.meaning_reversed}
          </p>
        </div>
      </div>

      <!-- Love Context with Staggered Entry -->
      <div 
        class="mb-10 transition-all duration-700 ease-out"
        style="opacity: {showLove ? 1 : 0}; transform: translateY({showLove ? 0 : 20}px);"
      >
        <h2 class="text-xl font-serif text-[#C5A880] mb-6 text-center">
          {$locale === 'ja' ? '恋愛鑑定' : 'Love Reading'}
        </h2>
        
        <div class="space-y-6">
          <!-- Upright Love -->
          <div class="bg-gradient-to-r from-[#312E2B] to-[#3a3632] rounded-xl p-6 border-l-4 border-[#C5A880]">
            <h3 class="text-sm font-sans text-[#C5A880] mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {$t('library.love.upright')}
            </h3>
            <p class="text-[#EAE5DF]/80 leading-relaxed text-sm">
              {currentCard.love_context_upright}
            </p>
          </div>

          <!-- Reversed Love -->
          <div class="bg-gradient-to-r from-[#312E2B] to-[#3a3632] rounded-xl p-6 border-l-4 border-[#DCAE96]">
            <h3 class="text-sm font-sans text-[#DCAE96] mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {$t('library.love.reversed')}
            </h3>
            <p class="text-[#EAE5DF]/80 leading-relaxed text-sm">
              {currentCard.love_context_reversed}
            </p>
          </div>

          <!-- Floating CTA -->
          <div class="mt-8 p-6 bg-gradient-to-r from-[#252321] via-[#312E2B] to-[#252321] rounded-xl border border-[#C5A880]/20 text-center">
            <p class="text-[#EAE5DF]/90 font-serif text-base mb-4 leading-relaxed">
              {$locale === 'ja' 
                ? 'このカードがあなたの恋をどう変えるか、もっと詳しく知りませんか？' 
                : 'Want to know how this card can change your love life?'}
            </p>
            <a
              href="/#lead-magnet"
              class="inline-flex items-center gap-2 px-8 py-3 bg-[#C5A880] text-[#252321] rounded-full font-serif font-medium text-sm hover:bg-[#b59060] transition-all duration-200 shadow-lg shadow-[#C5A880]/20 hover:shadow-xl hover:shadow-[#C5A880]/30 hover:-translate-y-0.5"
            >
              {$locale === 'ja' ? '今すぐ占う' : 'Consult Now'}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Navigation with Staggered Entry -->
      <div 
        class="flex justify-between items-center pt-6 border-t border-[#EAE5DF]/5 transition-all duration-700 ease-out"
        style="opacity: {showNav ? 1 : 0}; transform: translateY({showNav ? 0 : 20}px);"
      >
        {#if prevCard}
          <a
            href="/library/{prevCard.slug}"
            class="flex items-center gap-2 text-[#A9A39C] hover:text-[#C5A880] transition-colors group"
            aria-label="{$t('library.nav.prev')}: {prevCard.name_en}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <div class="text-left">
              <p class="text-xs text-[#A9A39C]/60">{$t('library.nav.prev')}</p>
              <p class="text-sm">{prevCard.name_en}</p>
            </div>
          </a>
        {:else}
          <div></div>
        {/if}

        <a
          href="/library"
          class="px-4 py-2 bg-[#312E2B] text-[#A9A39C] hover:text-[#EAE5DF] rounded-full text-sm transition-colors"
          aria-label={$t('library.nav.back')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </a>

        {#if nextCard}
          <a
            href="/library/{nextCard.slug}"
            class="flex items-center gap-2 text-[#A9A39C] hover:text-[#C5A880] transition-colors group"
            aria-label="{$t('library.nav.next')}: {nextCard.name_en}"
          >
            <div class="text-right">
              <p class="text-xs text-[#A9A39C]/60">{$t('library.nav.next')}</p>
              <p class="text-sm">{nextCard.name_en}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        {:else}
          <div></div>
        {/if}
      </div>
    {/if}
  </div>
</div>
