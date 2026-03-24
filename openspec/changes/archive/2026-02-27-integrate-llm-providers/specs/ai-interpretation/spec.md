# ai-interpretation Specification

## MODIFIED Requirements

### Requirement: Dual LLM Provider Support

The system SHALL support both OpenRouter (using DeepSeek 3.2 by default) and a local Ollama instance (using `gpt-oss:20b` by default) as interpretation providers, selectable via environment variable.

#### Scenario: Using OpenRouter (External)
- **WHEN** the environment variable `LLM_PROVIDER` is set to `openrouter`
- **THEN** the system uses the `OPENROUTER_API_KEY` and calls the OpenRouter API
- **AND** it uses the model specified by `OPENROUTER_MODEL` (e.g., DeepSeek 3.2 / `deepseek/deepseek-chat`)

#### Scenario: Using Ollama (Internal)
- **WHEN** the environment variable `LLM_PROVIDER` is set to `ollama`
- **THEN** the system sends the request to the local Ollama instance specified by `OLLAMA_BASE_URL`
- **AND** it uses the model specified by `OLLAMA_MODEL` (e.g., `gpt-oss:20b`)

#### Scenario: No Hardcoded Keys
- **WHEN** initializing the LLM client
- **THEN** it strictly reads API keys and base URLs from environment variables
- **AND** no secrets are hardcoded in the codebase
