# Proposal: Switch Local Testing to Ollama

## Problem
Currently, the local testing environment supports using the MLX Inference Server (`mlx`), but we need to switch the primary local serving strategy to Ollama (`ollama`) for testing.

## Solution
Modify the default local LLM configuration to use Ollama instead of MLX. This updates the backend configuration templates `.env.example` and the active `.env` file to set `LLM_PROVIDER=ollama` and prioritizes Ollama as the local system of choice.

## Impact
- **Configuration:** Updates `backend/.env` and `backend/.env.example` to point the `LLM_PROVIDER` to `ollama`.
- **Specifications:** Edits the `local-inference` spec to formally replace MLX with Ollama as the primary testing server.
