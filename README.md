# Quranic.fm

A purely simple distraction-free web application for listening to the Quran. 

## Features

- **Beautiful Dual Themes**: Seamlessly transition between an airy, vibrant "Sunset Hills" light mode and a grounded, earthy "Starry Night" dark mode.
- **Dynamic Visualizer**: Features a sleek, responsive Sacred Geometry mandala that pulses and smoothly rotates with the audio playback.
- **Premium UI / UX**: Employs frosted glassmorphism overlays, subtle micro-animations, and high-contrast readable typography (Outfit / Inter fonts).
- **Zustand State Management**: Lightweight, fast global state handles the audio context, track progress, looping states, and reciter/chapter selection without prop-drilling.
- **Live Quran API**: Integrates directly with the `api.quran.com/api/v4` to dynamically fetch 114 Surahs, multiple Qaris, and high-quality audio URLs.

## Tech Stack
- React 18
- Vite
- Zustand (Global State)
- Lucide React (Icons)
- Vanilla CSS Variables (Theming / Design System)

## Getting Started

1. Clone the repository
2. Run `npm install` inside the `quranic-fm` directory.
3. Run `npm run dev` to start the local development server. see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
