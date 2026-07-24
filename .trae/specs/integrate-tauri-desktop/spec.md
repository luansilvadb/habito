# Integração Tauri — Aplicativo Desktop Nativo Spec

## Why
Transformar o projeto "Prática Deliberada" (frontend React + Vite existente) em um aplicativo desktop nativo via Tauri, preservando 100% das funcionalidades, layout e lógica já desenvolvidas, e mantendo a capacidade de executar o frontend original como aplicação web separadamente.

## What Changes
- Adição do Tauri CLI e toolchain Rust (`src-tauri/`) ao repositório de forma não intrusiva
- Configuração do `tauri.conf.json` para servir os artefatos de build do Vite (`dist/`)
- Novos scripts no `package.json` para execução (`tauri dev`) e build (`tauri build`) do desktop
- Adaptação do `index.html` para incluir metadados de Content Security Policy compatíveis com Tauri
- Atualização do `.gitignore` para ignorar diretórios de build do Tauri
- Documentação atualizada com instruções para ambos os fluxos (web e desktop)
- **BREAKING**: Nenhuma — todos os scripts e fluxos existentes permanecem inalterados

## Impact
- Affected specs: N/A (primeira spec do projeto)
- Affected code:
  - `package.json` — novos scripts, dependências Tauri CLI
  - `index.html` — ajuste de CSP para compatibilidade com Tauri
  - `.gitignore` — novas entradas
  - `src-tauri/` — novo diretório (Rust backend, ícones, config)
  - `vite.config.ts` — sem alterações necessárias
  - `src/` — **zero alterações** no código fonte do frontend

## ADDED Requirements

### Requirement: Build Desktop Nativo com Tauri
O sistema SHALL prover um aplicativo desktop nativo empacotado via Tauri que carrega o frontend React existente em uma WebView nativa.

#### Scenario: Desenvolvimento desktop
- **WHEN** o desenvolvedor executa `npm run tauri dev`
- **THEN** o Tauri compila o backend Rust, inicia o Vite dev server, e abre uma janela nativa com o app em execução com hot-reload

#### Scenario: Build de produção desktop
- **WHEN** o desenvolvedor executa `npm run tauri build`
- **THEN** o Tauri gera um instalador/executável nativo para a plataforma atual (Windows `.msi`/`.exe`, macOS `.dmg`, Linux `.deb`/`.AppImage`)

### Requirement: Preservação do Fluxo Web Original
O sistema SHALL manter todos os scripts e fluxos de desenvolvimento web existentes completamente funcionais e sem alterações.

#### Scenario: Dev web original
- **WHEN** o desenvolvedor executa `npm run dev`
- **THEN** o Vite dev server inicia na porta 3000 exatamente como antes da integração Tauri

#### Scenario: Build web original
- **WHEN** o desenvolvedor executa `npm run build`
- **THEN** o Vite gera os artefatos em `dist/` exatamente como antes

#### Scenario: Preview web original
- **WHEN** o desenvolvedor executa `npm run preview`
- **THEN** o Vite preview server inicia exatamente como antes

### Requirement: Isolamento de Código Nativo
O sistema SHALL manter todo o código relacionado ao Tauri (Rust, configurações, ícones) no diretório `src-tauri/`, sem misturar com o código fonte do frontend.

#### Scenario: Estrutura de diretórios
- **WHEN** um desenvolvedor inspeciona o diretório raiz do projeto
- **THEN** o diretório `src-tauri/` contém exclusivamente código Rust, configuração do Tauri e recursos de empacotamento, sem nenhum arquivo do frontend

### Requirement: Content Security Policy Compatível
O sistema SHALL configurar o `index.html` com uma CSP que permita tanto a execução web tradicional quanto dentro da WebView do Tauri.

#### Scenario: CSP no ambiente Tauri
- **WHEN** o frontend é carregado na WebView do Tauri
- **THEN** scripts inline e estilos funcionam sem bloqueios de CSP

## MODIFIED Requirements
Nenhuma — todas as funcionalidades existentes são preservadas sem modificação.

## REMOVED Requirements
Nenhuma.
