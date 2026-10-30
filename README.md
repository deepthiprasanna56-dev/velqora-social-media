# Velqora

A responsive, front-end social experience built with React, Vite, Tailwind CSS, and reusable components. The interface adapts from 320px mobile screens through desktop layouts.

## Features

- Home feed with stories, post creation, image/video previews, likes, comments, share, and save interactions
- Explore page with people and post search, suggested accounts, and trending moments
- Profile page with editable display name and bio, follower counts, and a post gallery
- Notifications, conversations, and responsive side navigation
- Sign-in and registration forms with browser validation and a remember-me demo
- Static sample content; no server or database is required

Authentication and messaging use local front-end interactions for demonstration. Post content and chat state resets when you reload the page. Remember Me stores only the demo email in local storage.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Deploy

The project is configured for Vercel and Netlify static hosting. Connect the repository and use `npm run build` with `dist` as the publish directory. Both hosting providers can deploy directly from GitHub after the repository has been pushed.
