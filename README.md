# NoteHub

**NoteHub** is a modern note management application built with **Next.js (App Router)**. It supports both **SSR** and **CSR**, uses **TypeScript**, **Zustand** for draft state management, **TanStack Query** for API requests, and **CSS Modules** for styling.

---

## Features

- Create, edit, and filter notes.
- Draft support: unsaved data is stored in **Zustand** and persisted in **localStorage**.
- Search notes with **debounced input** for better performance.
- Pagination for notes list.
- SEO optimized: metadata and Open Graph tags for all pages.
- Global **Roboto** font via `next/font/google`.
- Intuitive interface with **Create Note** and **Cancel** buttons.

---

## Technologies

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/)
- CSS Modules

---

## Project Structure

/app
/notes
/action
/create
page.tsx
/filter
[...slug]
page.tsx
/notes/[id]
page.tsx
layout.tsx
not-found.tsx
/components
Header/Header.tsx
Footer/Footer.tsx
NoteForm/NoteForm.tsx
NoteList/NoteList.tsx
Pagination/Pagination.tsx
SearchBox/SearchBox.tsx
/lib
/api
notes.ts
/store
noteStore.ts
/types
note.ts

- **components** — reusable UI components.
- **lib/api** — Axios-based API calls.
- **lib/store/noteStore.ts** — Zustand store for drafts.
- **types/note.ts** — TypeScript types and interfaces for notes.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/08-zustand.git
cd 08-zustand

Install dependencies:

npm install
# or
yarn install

Run locally:

npm run dev
# or
yarn dev

Open http://localhost:3000
 in your browser.

Usage
Creating a Note

Go to /notes/action/create.

Fill in Title, Content, and Tag fields.

The draft is saved automatically as you type.

Click Create note + to save or Cancel to return without losing the draft.

Filtering Notes

Choose a category from the filter menu or enter a search query.

Notes update automatically with debounce.

SEO & Open Graph

All pages include configured title, description, and og:image.

Links will display correctly in social networks.

Draft State

Each form field is linked to the global draft state in Zustand.

Draft is persisted in localStorage using persist middleware.

Draft is cleared after successfully creating a note.

Demo

View live on Vercel
https://hannamuzychuk-08-zustand.vercel.app/

Scripts

npm run dev — run development server

npm run build — build for production

npm run start — run production build
```
