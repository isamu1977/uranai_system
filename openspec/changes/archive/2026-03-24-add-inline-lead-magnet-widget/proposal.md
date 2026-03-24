# Proposal: Add Inline Lead Magnet Widget

## Summary

Add a simplified 1-card tarot reading widget directly into the homepage hero section (`src/routes/+page.svelte`). This widget serves as a lead magnet to capture user interest and drive conversions to LINE.

## Problem

Users landing on the homepage have no immediate way to experience the tarot reading. The current flow requires clicking through to a separate page. Adding an inline "free 1-card reading" widget in the hero section will:
- Increase engagement by offering instant value
- Create curiosity through the "gap technique" (showing only partial results)
- Drive LINE follows for full reading access

## Solution

Embed a `FreeDrawWidget.svelte` component in the hero section that:
1. Shows an inviting card back with "Consultar os sentimentos dele com 1 carta" text
2. On click, triggers the existing Card.svelte flip animation
3. Fetches a 1-card lead magnet reading from the backend
4. Displays only the first 2 sentences with a fade-out mask
5. Shows a "Read full text on LINE" CTA button below the blurred text

## Scope

### In Scope
- Create `FreeDrawWidget.svelte` component with flip animation
- Integrate widget into homepage hero section
- Add i18n keys for Japanese (primary) and English (secondary)
- Implement text truncation (first 2 sentences) with CSS fade mask
- LINE CTA button with placeholder URL

### Out of Scope
- Portuguese localization (not required for MVP)
- Backend changes (existing `/api/v1/readings/generate` with `spread_type: "lead_magnet"` will be used)
- LINE Official Account setup (URL will be added later)

## Related Specs

- `card-animation`: Reuse existing Card.svelte flip animation
- `trilingual-engine`: Follow i18n patterns for JA/EN
- `ai-interpretation`: Lead magnet prompt already exists in backend

## Tasks Overview

1. Create `FreeDrawWidget.svelte` component
2. Add i18n translations (ja.json, en.json)
3. Integrate widget into `+page.svelte` hero section
4. Implement text truncation + fade mask CSS
5. Add LINE CTA button with placeholder URL

## Risks

- **Backend API readiness**: The lead_magnet endpoint must be functional
- **LINE URL**: Placeholder will be used until LINE Official Account is created
- **Hero section layout**: Must not disrupt existing immersive design

## Approval

Once approved, implementation will follow the tasks in `tasks.md`.
