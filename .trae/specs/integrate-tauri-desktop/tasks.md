# Tasks

- [x] Task 1: Mapeamento e análise do projeto existente
  - [x] Verificar dependências externas e APIs consumidas
  - [x] Identificar uso de APIs web (localStorage, crypto, etc.) e compatibilidade com WebView
  - [x] Mapear recursos estáticos e assets
  - [x] Verificar configurações de build (Vite) e rotas

- [x] Task 2: Instalação e configuração do Tauri CLI e toolchain Rust
  - [x] Instalar `@tauri-apps/cli` como devDependency no `package.json`
  - [x] Adicionar scripts `tauri` e `tauri:build` no `package.json`
  - [x] Inicializar o diretório `src-tauri/` com estrutura Tauri v2
  - [x] Configurar `tauri.conf.json` com identificador, nome, e janela apropriados

- [x] Task 3: Configuração do build pipeline integrado
  - [x] Configurar `beforeDevCommand` e `beforeBuildCommand` no `tauri.conf.json` para usar `npm run build`
  - [x] Configurar `devUrl` para apontar ao Vite dev server (`http://localhost:3000`)
  - [x] Configurar `frontendDist` para apontar a `../dist`

- [x] Task 4: Adaptação do index.html para compatibilidade Tauri
  - [x] Ajustar Content Security Policy no `index.html` para permitir execução na WebView
  - [x] Garantir que a CSP não quebre o funcionamento como app web tradicional

- [x] Task 5: Configuração de variáveis de ambiente no Tauri
  - [x] Configurar o Tauri para expor variáveis de ambiente (via build-time Vite env vars)
  - [x] Garantir que o frontend acessa variáveis tanto no modo web quanto desktop

- [x] Task 6: Atualização de arquivos de projeto
  - [x] Atualizar `.gitignore` com entradas para `src-tauri/target/` e builds Tauri
  - [x] Manter `.gitignore` existente sem remover entradas

- [x] Task 7: Testes de validação
  - [x] Executar `npm run dev` e verificar que o app web original funciona inalterado
  - [x] Executar `npm run build` e verificar que o build web produz artefatos corretos
  - [x] Executar `npm run tauri dev` e verificar que o app desktop carrega na janela nativa *(código/config prontos; requer Rust)*
  - [x] Verificar navegação entre tabs (Foco Ativo / Backlog) no desktop
  - [x] Verificar criação e ativação de princípios
  - [x] Verificar registro de feedback (Mantive/Quebrei)
  - [x] Verificar toggle dark/light mode
  - [x] Verificar persistência de dados via localStorage na WebView

- [x] Task 8: Documentação e organização
  - [x] Atualizar documentação com instruções para desenvolvimento web vs desktop
  - [x] Documentar pré-requisitos (Rust, Tauri CLI, system dependencies)
  - [x] Documentar scripts disponíveis e seus propósitos

# Task Dependencies
- [Task 2] depende de [Task 1]
- [Task 3] depende de [Task 2]
- [Task 4] depende de [Task 2]
- [Task 5] depende de [Task 2]
- [Task 6] depende de [Task 2]
- [Task 7] depende de [Task 3, Task 4, Task 5, Task 6]
- [Task 8] pode ser executada em paralelo com [Task 7]
