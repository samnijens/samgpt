# AI Chat — GitHub-ready ChatGPT-style UI

A lightweight, responsive chat interface inspired by modern AI chat applications.

## Included

- Responsive sidebar and chat layout
- New-chat button
- Recent chat history saved in `localStorage`
- Light/dark mode
- Auto-growing message box
- Enter to send / Shift+Enter for a new line
- Mobile sidebar
- Demo assistant responses

## Run locally

No build step is required.

1. Download or clone the project.
2. Open `index.html` in a browser.

For GitHub Pages, upload the files to a repository and enable **Pages** from the repository settings.

## Connecting a real AI backend

The included UI is intentionally frontend-only. Do **not** put a private API key directly into `script.js` or any browser-side JavaScript.

Instead, create a server endpoint such as:

`POST /api/chat`

Then replace the `fakeReply()` call in `script.js` with a `fetch("/api/chat", ...)` request to your backend.

## Important

This project is a look-and-feel recreation, not an official OpenAI/ChatGPT website and does not use OpenAI branding or imply affiliation.
