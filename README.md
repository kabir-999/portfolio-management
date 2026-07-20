# Kabir Mathur — Portfolio

A portfolio site framed as a navigable solar system: each section (internship,
projects, skills, journey, contact) is a planet orbiting a central sun
("About Me"). Built with React and Three.js (react-three-fiber), with a
MongoDB-backed contact form deployed as a Vercel serverless function.

## Live
[kabir-portfolio-management.vercel.app](https://kabir-portfolio-management.vercel.app/)

## Tech Stack
- **Frontend**: React, Three.js / @react-three/fiber / drei / postprocessing, GSAP
- **Contact form backend**: Vercel serverless function (`api/contact.js`) using Mongoose + Nodemailer
- **Local dev backend**: Express server (`backend/server.js`) mirroring the same contact-form logic, proxied from `localhost:5001`
- **Database**: MongoDB (contact form storage)
- **Deployment**: Vercel

## Project structure
- `src/App.js` — page content and the `profile` data object (all resume/portfolio copy lives here)
- `src/components/three/SolarSystem.js` — the 3D solar system scene (sun, planets, camera rig, asteroid belt)
- `src/components/SpaceBackdrop.js` — animated deep-space canvas layer behind each planet's content panel
- `src/components/SplashScreen.js` — the intro animation (meteor shower → impact → system formation)
- `api/contact.js` — production contact-form endpoint (Vercel serverless)
- `backend/` — local Express equivalent of `api/contact.js`, for `npm run server`

## Development

```bash
npm install
npm start          # CRA dev server on :3000
npm run server     # optional: local contact-form API on :5001 (needs backend/.env)
```

## Build

```bash
npm run build
```
