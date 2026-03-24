# Design: Local MLX Inference

## Context
The project needs to utilize a local M1/M2/M3 MLX inference server for testing to avoid API costs and leverage local compute. The server exposes an OpenAI-compatible API on `http://localhost:8000/v1`.

## Approach
1.  **Configuration**: Add environment variables `.env` for the local server:
    *   `MLX_BASE_URL=http://localhost:8000/v1`
    *   `MLX_CHAT_MODEL=./quantized_models/Qwen3.5-4B-4bit`
    *   `LLM_PROVIDER=mlx` (for tests) or `openrouter` (for external).
2.  **Service Integration**: Use the existing OpenAI client in the backend services but dynamically point the `base_url`, `api_key` ("not-needed" for local), and `model` based on the configured `LLM_PROVIDER`.
3.  **Testing Strategy**: When running the test suite, automatically invoke or mock the local MLX endpoint to ensure AI interpretation functions correctly, assuming the server is running as per `SERVER_DATA.md`.

## Trade-offs
- Local inference can be slower than external APIs but avoids costs.
- The `Qwen3.5-4B-4bit` model requires 8 GB memory and is the recommended default for balance, so tests should expect reasonable local resources.
