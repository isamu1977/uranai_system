# Tasks: Local MLX inference

- [x] 1. Update `.env.example` and configuration loading (`backend/app/core/config.py` or similar) to support `MLX_BASE_URL`, `MLX_CHAT_MODEL`, and `LLM_PROVIDER=mlx`.
- [x] 2. Modify the LLM service factory or client initialization to configure the `base_url` to `http://localhost:8000/v1` and use "not-needed" for the API key when `LLM_PROVIDER` is `mlx`.
- [x] 3. Update testing setup to override `LLM_PROVIDER` to `mlx` (if local server is running) or provide a fallback.
- [x] 4. Verify local chat completion works by adding an integration test that hits the local MLX server.
