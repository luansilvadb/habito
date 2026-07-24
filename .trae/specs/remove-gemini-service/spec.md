# Remove Google Gemini Service Spec

## Why
O Google Gemini foi planejado como serviço de IA do projeto, mas nunca foi efetivamente implementado no código fonte. A remoção elimina dependências não utilizadas, simplifica a configuração e evita manutenção desnecessária.

## What Changes
- Remover dependência `@google/genai` do `package.json`
- Remover variável de ambiente `GEMINI_API_KEY` do `.env.example`
- Remover capability `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` do `metadata.json`
- Remover endpoints Google do CSP em `index.html`
- Atualizar especificações do Tauri que mencionam Gemini
- Atualizar `README.md` removendo Gemini da stack

## Impact
- Affected specs: `integrate-tauri-desktop`
- Affected code: `package.json`, `package-lock.json`, `.env.example`, `metadata.json`, `index.html`, `README.md`

## REMOVED Requirements

### Requirement: Google Gemini API Integration
**Reason**: Serviço nunca foi implementado no código fonte. Apenas configurações e dependências preparatórias existem.
**Migration**: Nenhuma — nenhum código depende do Gemini em runtime.

### Requirement: GEMINI_API_KEY Environment Variable
**Reason**: Sem o serviço Gemini, a chave de API não é mais necessária.
**Migration**: Remover do `.env.example` e de qualquer referência em especificações.

### Requirement: CSP Allowlist for Google APIs
**Reason**: Sem chamadas à API Gemini, as permissões CSP para `generativelanguage.googleapis.com` e `*.googleapis.com` são desnecessárias.
**Migration**: Remover do `index.html`.
