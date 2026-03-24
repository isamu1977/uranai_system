# Tasks: integrate-llm-providers

1. [x] **Activate Virtual Environment and Install Dependencies**: Verify that the `backend/.venv` is active and run `pip install -r requirements.txt` to ensure `openai` and `httpx` are installed.
2. [x] **Update Environment Settings**: 
   - Add `LLM_PROVIDER` (default `openrouter`), `OPENROUTER_API_KEY`, `OLLAMA_BASE_URL` (default `http://localhost:11434/v1`), `OPENROUTER_MODEL` (default `deepseek/deepseek-chat`), and `OLLAMA_MODEL` (default `gpt-oss:20b`) to `backend/.env.example`.
   - Update the FastAPI settings/config to load these variables.
3. [x] **Implement Real LLM Client**:
   - Create or update an LLM service class (e.g., `RealLLMClient` or `LLMService`) using `openai.AsyncOpenAI`.
   - Implement logic to switch the `base_url`, `api_key`, and `model` based on the `LLM_PROVIDER` setting.
   - For OpenRouter, set `base_url="https://openrouter.ai/api/v1"` and use `OPENROUTER_API_KEY`.
   - For Ollama, set `base_url=OLLAMA_BASE_URL` and `api_key="ollama"`.
4. [x] **Wire Client to ReadingService**:
   - Modify `backend/app/services/reading_service.py` to instantiate and use the new real LLM client instead of `MockLLMClient`.
   - Pass the full prompt from `prompt_builder` to the LLM client properly formatted as conversational messages (e.g., `[{"role": "user", "content": prompt}]`).
5. [x] **Verify API Connections**: Ensure the response is properly returned and recorded in the database `llm_provider` and `llm_model` fields transparently.
