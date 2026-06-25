# MR Assistant for GitLab

> A Chrome extension that uses Google Gemini AI to generate merge request titles and descriptions directly on GitLab.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Manifest](https://img.shields.io/badge/manifest-v3-green)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)

---


## Contributing

Contributions are welcome! To submit changes:

- Fork this repository
- Create a new branch for your feature or fix
- Make your changes and test them
- Open a merge request with a clear description

Thank you for helping improve this project!


## Overview

MR Assistant reads the GitLab compare or new merge request page you have open, extracts context such as commit messages, branch names, and changed file names, then sends that context to Gemini to draft an MR title, description, or both. The result is rendered inline in the popup, and you can paste it directly into the GitLab MR form with one click.

---

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Loading the Extension in Chrome](#loading-the-extension-in-chrome)
- [Available Scripts](#available-scripts)
- [Usage Notes](#usage-notes)
- [Current Limitations](#current-limitations)
- [Future Improvements](#future-improvements)

---

## Features

- **AI-powered generation** — generate an MR title, description, or both using Gemini 2.5 Flash
- **Optional instructions** — steer the output with a free-text prompt (e.g. "keep it concise, use bullet points")
- **Markdown rendering** — generated content is rendered with proper formatting inside the popup
- **One-click paste** — apply the generated content directly into the GitLab MR title and description fields
- **Secure key storage** — Gemini API key is stored locally via `chrome.storage.local`, never sent anywhere else
- **Error handling** — clear feedback for invalid API keys, rate limits, and general failures
- **Keyboard shortcut** — press Enter in the instructions field to trigger generation

---

## How It Works

```
GitLab Compare / New MR Page
       │
       ▼
Content Script extracts:
  • Commit messages
  • Branch names (target → source)
  • Changed file names
       │
       ▼
Background Service Worker sends context to Gemini API
       │
       ▼
Popup renders generated title / description
       │
       ▼
"Paste to GitLab" injects content into the MR form
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript 5.9 |
| Bundler | Vite + CRXJS Vite Plugin |
| State | Zustand |
| AI | Google GenAI SDK (Gemini 2.5 Flash) |
| Extension | Chrome Manifest v3 |

---

## Project Structure

```text
src/
├── background/       Background service worker, Gemini API integration
├── components/       Popup UI components (buttons, checkboxes, textarea, results)
├── content/          GitLab page detection, data extraction, DOM updates
│   └── extractors/   Commit, branch, and filename extraction
├── interfaces/       TypeScript interfaces and types
├── pages/            Popup page composition
├── shared/           Constants and shared types
├── store/            Zustand stores (MR state, API key state)
└── utils/            Chrome storage helpers, message listeners, utilities
public/
└── manifest.json     Chrome extension manifest
build/                Production build output (load this into Chrome)
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A [Google Gemini API key](https://aistudio.google.com/apikey)
- Google Chrome or a Chromium-based browser

### Install Dependencies

```bash
npm install
```

### Development Build (with watch)

```bash
npm run build:watch
```

Rebuilds automatically on file changes. Reload the extension in Chrome after each build.

### Production Build

```bash
npm run build
```

Output goes to the `build/` directory.

---

## Loading the Extension in Chrome

1. Run `npm run build` (or `npm run build:watch` for development)
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the `build/` directory from this project

> After each rebuild, click the refresh icon on the extension card in `chrome://extensions` to pick up the latest changes.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Full TypeScript + Vite production build |
| `npm run build:watch` | Rebuild on file changes (development) |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the Vite app output |

---


## Security & Privacy

**MR Assistant is designed with your privacy and code security in mind.**

- The extension only extracts commit messages, branch names, and changed file names from the GitLab compare or new MR page.
- **It does NOT access, read, or transmit the actual code changes or file contents.**
- All data extraction happens locally in your browser; only the minimal context (commit messages, branch names, file names) is sent to the Gemini API for MR generation.
- Your Gemini API key is stored securely in your browser's local storage and is never shared externally.

This ensures your source code and sensitive information remain private and are never exposed to any third party.

---

## Usage Notes

- The extension activates on GitLab compare pages (`/-/compare/`) and new merge request pages (`/-/merge_requests/new`).
- On first use, you will be prompted to enter your Gemini API key. This is stored locally in the browser.
- The API key can be updated at any time by clearing it from Chrome extension storage and relaunching the popup.
- Content is extracted from the live GitLab DOM. The extension does not make any direct GitLab API calls.
- For pasting generated content, open the new merge request page where the title and description fields are visible.

---

## License

No license has been added to this repository yet.
