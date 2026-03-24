# Tasks: integrate-api-test-ui

1. [x] Add `PUBLIC_API_BASE_URL` to `.env.example` and instruct setup of local `.env` pointing to local FastAPI server (`http://localhost:8000/api/v1`).
2. [x] Create `src/lib/api.ts` with `generateReading(spreadType: string, sessionId?: string)` function handling fetch (POST `/readings/generate`), JSON parsing, and returning a generic error state on network/500 errors.
3. [x] Install a lightweight markdown rendering library (e.g., `marked`).
4. [x] Create `src/lib/components/MarkdownRenderer.svelte` to parse and render Markdown text correctly (handling `<h1>`, `<h2>`, `<p>`, `<br>`).
5. [x] Create `src/routes/test-reading/+page.svelte` test UI strictly for testing backend connection with:
   - Dropdown/buttons for 'Lead Magnet (1)', 'Standard (7)', 'Premium (12)' spread types.
   - "Generate Reading" button triggering `api.generateReading()`.
   - Loading indicator area ("サーバーと通信中...").
   - Results area validating JSON array of drawn cards and rendered Markdown of LLM text.
   - Error state display.
