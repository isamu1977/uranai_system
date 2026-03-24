# Tasks: Add Inline Lead Magnet Widget

## Task List

1. **Create i18n translations for widget**
   - Add keys to `frontend/src/lib/i18n/ja.ts` and `frontend/src/lib/i18n/en.ts`
   - Keys needed:
     - `widget.card_back_text`: "彼の本音を 1 枚占う" / "Consultar os sentimentos dele com 1 carta"
     - `widget.loading`: "AI が読み解いています..." / "AI is interpreting..."
     - `widget.cta_line`: "LINE で全文を無料で読む" / "Ler o texto completo gratuitamente no LINE"
     - `widget.error`: "鑑定に失敗しました。もう一度お試しください。" / "Failed to read. Please try again."

2. **Create FreeDrawWidget.svelte component**
   - File: `frontend/src/lib/components/FreeDrawWidget.svelte`
   - Features:
     - Initial state: Card back image with subtle glow + invite text
     - On click: Call backend `/api/v1/readings/generate` with `spread_type: "lead_magnet"`
     - Loading state: Pulse animation with "AI が読み解いています..."
     - Result state: Show Card.svelte with flip animation + truncated text (first 2 sentences)
     - CSS fade-to-transparent mask at bottom of text
     - LINE CTA button below blurred text

3. **Implement text truncation logic**
   - Split AI response by sentences (。or .)
   - Take first 2 sentences
   - Apply CSS gradient mask: `mask-image: linear-gradient(to bottom, black 50%, transparent 100%)`

4. **Integrate widget into +page.svelte hero section**
   - Place widget after the hero CTA button ("鑑定メニューを見る")
   - Ensure mobile-first responsive layout
   - Maintain "Dark Elegance" visual style

5. **Add LINE CTA placeholder URL**
   - Use `https://line.me/` as temporary placeholder
   - Add comment indicating where actual LINE OA URL will be added

6. **Validate and test**
   - Run `npm run check` (TypeScript)
   - Test widget in JA and EN locales
   - Verify flip animation works on mobile
   - Confirm text truncation displays correctly

## Dependencies

- Task 1 must complete before Task 2 (i18n keys needed for component)
- Task 2 must complete before Task 4 (component needed for integration)
- Backend `/api/v1/readings/generate` endpoint must be functional with `spread_type: "lead_magnet"`

## Parallelizable Work

- Task 3 (text truncation CSS) can be done in parallel with Task 2
