# Change: Add AI Science Section & FAQ Accordion

## Why
The landing page needs two additional conversion-critical sections:
1. An "AI Science" section explaining the unique AI × Psychology approach to differentiate from generic fortune-telling.
2. A FAQ accordion that addresses common objections from potential Japanese female customers.

## What Changes
- Add an "AIと心理学の融合" two-column section to `+page.svelte` (before FAQ).
- Create a new `AccordionFaq.svelte` component with `transition:slide` for smooth open/close.
- Add a FAQ section to `+page.svelte` using the accordion, with 4 strategically chosen Q&A pairs.

## Impact
- Affected specs: frontend
- Affected code:
  - `src/routes/+page.svelte` (MODIFIED — two new sections inserted)
  - `src/lib/components/AccordionFaq.svelte` (NEW — reusable accordion component)
