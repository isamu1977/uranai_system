# Proposal: Local MLX inference server integration for tests

## User Request
Preciso que vc crie a estrutura para quando for usar o servidor local para testes, vc se guie com base no que está contido no arquivo SERVER_DATA.md que se encontra na raiz do projeto.
No caso de usar um API externa, continuarei usando o OpenRouter.

## Scope
- Integrate the local MLX inference server running on `http://localhost:8000` for test environments.
- Maintain OpenRouter as the external API for production/development usage.
- Configure endpoints and models as specified in `SERVER_DATA.md` (e.g., using quantization like `./quantized_models/Qwen3.5-4B-4bit` for chat).
- Ensure configuration is flexible and togglable between OpenRouter and MLX local inference.

## Related Specs
- `ai-interpretation`
