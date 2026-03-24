# Proposal: Update Ollama Model to Qwen 3.5 9B

## Problem
The local testing environment is currently configured to use `gpt-oss:20b` for Ollama. However, we need to update the configuration to use the `qwen3.5:9b` model for local inference to better align with the required testing and performance profiles.

## Solution
Modify the default local LLM configuration to use the `qwen3.5:9b` model when Ollama is the active provider. This updates the backend configuration templates (`.env.example`), the active `.env` file, and the backend service default fallbacks.

## Impact
- **Configuration:** Updates `backend/.env`, `backend/.env.example`, and `backend/app/services/llm_service.py` to point the `OLLAMA_MODEL` to `qwen3.5:9b`.
- **Specifications:** Edits the `local-inference` spec to formally document the use of `qwen3.5:9b` as the primary Ollama testing model.
