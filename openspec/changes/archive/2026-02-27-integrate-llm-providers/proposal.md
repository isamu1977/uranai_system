# Proposal: integrate-llm-providers

## Description
Integrate the FastAPI backend with real LLM providers, specifically OpenRouter (using DeepSeek 3.2 by default) and a local Ollama instance (using `gpt-oss:20b` by default). The system will be configurable via `.env` to easily toggle between external and internal APIs without hardcoding any keys or URLs.

## Capabilities
- **LLM Configuration Environment**: Adds variables (`LLM_PROVIDER`, `OPENROUTER_API_KEY`, `OLLAMA_BASE_URL`, `OPENROUTER_MODEL`, `OLLAMA_MODEL`) to `.env` to control which model and provider to use dynamically.
- **Provider Abstraction**: Replaces the `MockLLMClient` with a production-ready LLM service using the `openai` Python SDK (which is compatible with both OpenRouter and Ollama).
- **Environment Automation**: Ensures dependencies are correctly installed in the local virtual environment.
