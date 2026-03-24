# Proposal: integrate-api-test-ui

## Description
Integrate the SvelteKit frontend with the FastAPI backend by creating an API service layer and a test UI for the tarot reading flow. This allows verifying end-to-end reading generation before focusing on final UI polish.

## Capabilities
- Adds an API service abstraction (`src/lib/api.ts`) to communicate with the backend.
- Adds an environment variable configuration for the API base URL.
- Introduces a minimalist test UI (`/test-reading`) to verify data fetching, loading states, and error handling.
- Implements a Markdown renderer component for the LLM output.
