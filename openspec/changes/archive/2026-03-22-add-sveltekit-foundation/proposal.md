# Change: SvelteKit Foundation (Enshirube)

## Why
Set up the global layout, Tailwind CSS design system, and the API client to connect the frontend to the FastAPI backend, establishing a cohesive aesthetic for the target demographic.

## What Changes
- Configure Tailwind CSS (colors, typography) for an elegant "Japanese female demographic" aesthetic.
- Setup global layout (`+layout.svelte`) with a minimalist header/footer and central `<slot />`.
- Create `src/lib/api.ts` to abstract API calls to the backend, complete with error handling and environment variables.

## Impact
- Affected specs: frontend
- Affected code: `tailwind.config.js`, `src/app.css`, `src/routes/+layout.svelte`, `src/lib/api.ts`
