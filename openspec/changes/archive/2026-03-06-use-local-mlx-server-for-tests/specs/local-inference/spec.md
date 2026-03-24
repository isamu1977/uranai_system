# Local MLX Inference Support

## ADDED Requirements

### Requirement: Support for Apple MLX Inference Server

The backend MUST support connecting to a local MLX server that exposes an OpenAI-compatible API for model inference.

#### Scenario: Switching to MLX for testing

Given the `.env` configures `LLM_PROVIDER=mlx` and `MLX_BASE_URL=http://localhost:8000/v1`
When the backend requests a chat completion
Then the request is routed to `http://localhost:8000/v1/chat/completions` using the model configured in `MLX_CHAT_MODEL` (e.g., `./quantized_models/Qwen3.5-4B-4bit`) without requiring real API key authentication.

#### Scenario: Fallback to OpenRouter for external API

Given the `.env` configures `LLM_PROVIDER=openrouter`
When the backend requests a chat completion
Then the request is routed to OpenRouter as standard, using `OPENROUTER_API_KEY` and the respective `OPENROUTER_MODEL`.
