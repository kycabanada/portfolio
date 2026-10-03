# Kristine Cabanada — Portfolio

Personal portfolio built with React, TypeScript, Vite and Tailwind CSS.
No backend or database: all content lives in `src/data`.

## Run it on your laptop

You need [Node.js](https://nodejs.org) (LTS version) installed.

```
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

## Edit your content

| What | File |
|---|---|
| Name, intro, links, photo, status badge, education, leadership | `src/data/profile.ts` |
| Your photo | `public/kristine.jpg` |
| Projects | `src/data/projects.ts` |
| Skills and certifications | `src/data/skills.ts` |
| Résumé PDF | `public/Kristine-Cabanada-Resume.pdf` |
| Colors and fonts | `src/index.css` |

Things still to fill in:

1. `liveUrl`, `codeUrl` and `image` for each project in `src/data/projects.ts`.
   Put screenshots in `public/screenshots/` and reference them as `/screenshots/agos.png`.
2. `WEB3FORMS_ACCESS_KEY` in `src/data/profile.ts` so the contact form emails you directly
   (free key from https://web3forms.com). Until then, the form opens the visitor's email app.

## Push to GitHub

Create an empty public repository named `portfolio` on GitHub, then run in this folder:

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/kycabanada/portfolio.git
git push -u origin main
```

## Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. Add New → Project → pick the `portfolio` repository.
3. Leave the settings as they are (Vercel detects Vite) and click Deploy.

Every later `git push` redeploys the site automatically.
