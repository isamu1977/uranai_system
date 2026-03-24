<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllCards, filterCards, getCardName, type TarotCard, type ArcanaType, type Suit } from '$lib/data/tarotCards';
  import { locale } from '$lib/stores/locale';
  import { t } from '$lib/i18n';

  let cards: TarotCard[] = [];
  let filteredCards: TarotCard[] = [];
  let searchTerm = '';
  let arcanaFilter: ArcanaType | 'all' = 'all';
  let suitFilter: Suit | 'all' = 'all';
  let isLoading = true;
  let debounceTimer: ReturnType<typeof setTimeout>;

  const suits: { value: Suit; label: string }[] = [
    { value: 'wands', label: 'Wands' },
    { value: 'cups', label: 'Cups' },
    { value: 'swords', label: 'Swords' },
    { value: 'pentacles', label: 'Pentacles' }
  ];

  onMount(async () => {
    cards = await getAllCards();
    filteredCards = cards;
    isLoading = false;
  });

  function handleSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filteredCards = filterCards(cards, searchTerm, arcanaFilter, suitFilter);
    }, 200);
  }

  function setArcanaFilter(type: ArcanaType | 'all') {
    arcanaFilter = type;
    filteredCards = filterCards(cards, searchTerm, arcanaFilter, suitFilter);
  }

  function setSuitFilter(suit: Suit | 'all') {
    suitFilter = suit;
    filteredCards = filterCards(cards, searchTerm, arcanaFilter, suitFilter);
  }

  function resetFilters() {
    searchTerm = '';
    arcanaFilter = 'all';
    suitFilter = 'all';
    filteredCards = cards;
  }
</script>

<svelte:head>
  <title>{$t('library.meta.title')}</title>
  <meta name="description" content={$t('library.meta.description')}>
</svelte:head>

<div class="w-full min-h-screen py-12 md:py-16 px-4 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <p class="text-[#C5A880] text-xs md:text-sm tracking-[0.3em] uppercase font-sans mb-4">
        {$t('library.label')}
      </p>
      <h1 class="text-3xl md:text-5xl font-serif text-[#EAE5DF] mb-4">
        {$t('library.heading')}
      </h1>
      <p class="text-[#A9A39C] text-base max-w-2xl mx-auto">
        {$t('library.subtitle')}
      </p>
    </div>

    <!-- Search and Filters -->
    <div class="mb-10 space-y-6">
      <!-- Search Input -->
      <div class="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder={$t('library.search.placeholder')}
          bind:value={searchTerm}
          oninput={handleSearch}
          class="w-full bg-[#312E2B] border border-[#EAE5DF]/10 rounded-xl px-5 py-3 text-[#EAE5DF] placeholder-[#A9A39C]/50 font-sans text-sm focus:outline-none focus:border-[#C5A880]/40 transition-colors"
          aria-label={$t('library.search.aria')}
        />
        {#if searchTerm}
          <button
            type="button"
            onclick={() => { searchTerm = ''; handleSearch(); }}
            class="absolute right-4 top-1/2 -translate-y-1/2 text-[#A9A39C] hover:text-[#EAE5DF] transition-colors"
            aria-label={$t('library.search.clear')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center gap-3">
        <!-- Arcana Filters -->
        <div class="flex gap-2">
          <button
            type="button"
            onclick={() => setArcanaFilter('all')}
            class="px-4 py-2 rounded-full text-sm font-sans transition-all {arcanaFilter === 'all' ? 'bg-[#C5A880] text-[#252321]' : 'bg-[#312E2B] text-[#A9A39C] hover:text-[#EAE5DF] border border-[#EAE5DF]/10'}"
            aria-pressed={arcanaFilter === 'all'}
          >
            {$t('library.filter.all')}
          </button>
          <button
            type="button"
            onclick={() => setArcanaFilter('major')}
            class="px-4 py-2 rounded-full text-sm font-sans transition-all {arcanaFilter === 'major' ? 'bg-[#C5A880] text-[#252321]' : 'bg-[#312E2B] text-[#A9A39C] hover:text-[#EAE5DF] border border-[#EAE5DF]/10'}"
            aria-pressed={arcanaFilter === 'major'}
          >
            {$t('library.filter.major')}
          </button>
          <button
            type="button"
            onclick={() => setArcanaFilter('minor')}
            class="px-4 py-2 rounded-full text-sm font-sans transition-all {arcanaFilter === 'minor' ? 'bg-[#C5A880] text-[#252321]' : 'bg-[#312E2B] text-[#A9A39C] hover:text-[#EAE5DF] border border-[#EAE5DF]/10'}"
            aria-pressed={arcanaFilter === 'minor'}
          >
            {$t('library.filter.minor')}
          </button>
        </div>

        <!-- Suit Filters (only show when Minor is selected or on larger screens) -->
        {#if arcanaFilter === 'minor' || arcanaFilter === 'all'}
          <div class="flex gap-2 flex-wrap justify-center">
            {#each suits as suit}
              <button
                type="button"
                onclick={() => setSuitFilter(suitFilter === suit.value ? 'all' : suit.value)}
                class="px-4 py-2 rounded-full text-sm font-sans transition-all {suitFilter === suit.value ? 'bg-[#DCAE96] text-[#252321]' : 'bg-[#312E2B] text-[#A9A39C] hover:text-[#EAE5DF] border border-[#EAE5DF]/10'}"
                aria-pressed={suitFilter === suit.value}
              >
                {suit.label}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Results Count -->
      <div class="text-center">
        <p class="text-[#A9A39C]/60 text-sm font-sans">
          {filteredCards.length} cards found
        </p>
      </div>
    </div>

    <!-- Card Grid -->
    {#if isLoading}
      <div class="flex justify-center items-center py-20">
        <div class="animate-pulse text-[#C5A880] font-serif">
          {$t('library.loading')}
        </div>
      </div>
    {:else if filteredCards.length === 0}
      <div class="text-center py-20">
        <p class="text-[#A9A39C] font-serif text-xl mb-4">{$t('library.empty.title')}</p>
        <p class="text-[#A9A39C]/60 text-sm mb-6">{$t('library.empty.desc')}</p>
        <button
          type="button"
          onclick={resetFilters}
          class="px-6 py-2 bg-[#C5A880] text-[#252321] rounded-full font-serif text-sm hover:bg-[#b59060] transition-colors"
        >
          {$t('library.empty.reset')}
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {#each filteredCards as card (card.slug)}
          <a
            href="/library/{card.slug}"
            class="group relative aspect-[2/3] bg-[#312E2B] rounded-xl overflow-hidden border border-[#EAE5DF]/5 hover:border-[#C5A880]/30 transition-all duration-300 cursor-pointer"
            aria-label="{getCardName(card, $locale)} - {$t('library.card.view')}"
          >
            <!-- Card Back Design -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#3a3632] to-[#252321] flex items-center justify-center">
              <!-- Decorative Pattern -->
              <div class="absolute inset-4 border border-[#C5A880]/20 rounded-lg"></div>
              <div class="absolute inset-8 border border-[#C5A880]/10 rounded-md"></div>
              <div class="w-16 h-16 border-2 border-[#C5A880]/30 rounded-full flex items-center justify-center">
                <div class="w-8 h-8 border border-[#C5A880]/40 rounded-full"></div>
              </div>
            </div>

            <!-- Card Number Badge -->
            <div class="absolute top-3 left-3 bg-[#252321]/80 text-[#C5A880] text-xs font-sans px-2 py-0.5 rounded-full">
              {#if card.arcana_type === 'major'}
                {card.number}
              {:else if card.suit === 'wands'}
                {card.number > 10 ? ['Page', 'Knight', 'Queen', 'King'][card.number - 11] : card.number} W
              {:else if card.suit === 'cups'}
                {card.number > 10 ? ['Page', 'Knight', 'Queen', 'King'][card.number - 11] : card.number} C
              {:else if card.suit === 'swords'}
                {card.number > 10 ? ['Page', 'Knight', 'Queen', 'King'][card.number - 11] : card.number} S
              {:else}
                {card.number > 10 ? ['Page', 'Knight', 'Queen', 'King'][card.number - 11] : card.number} P
              {/if}
            </div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#252321] via-[#252321]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p class="text-[#EAE5DF] font-serif text-sm leading-tight">
                {getCardName(card, $locale)}
              </p>
              <p class="text-[#C5A880] text-xs font-sans mt-1">
                {card.arcana_type === 'major' ? ($locale === 'ja' ? '大牌' : 'Major') : ($locale === 'ja' ? '小牌' : 'Minor')}
              </p>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
