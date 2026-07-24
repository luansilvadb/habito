# Pratica Deliberada

Sistema de inducao comportamental de atrito zero para pratica focada em jogos competitivos.

## Scripts

| Comando | Descricao | Ambiente |
|---|---|---|
| `npm run dev` | Inicia o Vite dev server na porta 3000 | Web |
| `npm run build` | Gera build de producao em `dist/` | Web |
| `npm run preview` | Pre-visualiza build de producao | Web |
| `npm run lint` | Verifica tipos TypeScript (`tsc --noEmit`) | Web |
| `npm run tauri` | Inicia o app desktop Tauri com hot-reload | Desktop |
| `npm run tauri:build` | Gera executavel/instalador nativo | Desktop |

## Pre-requisitos

### Desenvolvimento Web
- Node.js 18+
- npm

### Desenvolvimento Desktop (Tauri)
- Node.js 18+
- Rust (instalar via [rustup.rs](https://rustup.rs))
- Dependencias de sistema para Tauri:
  - **Windows**: Microsoft Visual Studio C++ Build Tools
  - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
  - **Linux**: `libwebkit2gtk-4.1-dev`, `libappindicator3-dev`, etc.

## Estrutura

```
src/             # Codigo fonte do frontend (React + Vite + TypeScript)
src-tauri/       # Backend nativo Tauri (Rust)
  src/           # Codigo Rust (main.rs, lib.rs)
  icons/         # Icones do aplicativo
  capabilities/  # Permissoes Tauri
  tauri.conf.json # Configuracao do Tauri
dist/            # Build de producao (Vite)
```

## Tecnologias

- **Frontend**: React 19, Vite 6, Tailwind CSS 4, TypeScript, Motion, Lucide Icons
- **Desktop**: Tauri 2 (Rust backend + WebView nativa)

