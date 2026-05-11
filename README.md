# Scribe

A minimalist, high-performance typing test built with **Next.js 15** and **TypeScript**. Test and improve your typing speed with a beautiful on-screen keyboard, multiple themes, time and word-count modes, and a live WPM performance chart.

## Features

- ⌨️ Interactive on-screen keyboard with haptic & sound feedback
- 🎨 6 themes: Classic, Mint, Royal, Dolch, Sand, Scarlet
- ⏱️ Time mode (15 / 30 / 60 / 120 seconds)
- 📝 Word count mode (10 / 25 / 50 / 100 words)
- 📊 Live WPM + accuracy chart on results screen
- 🔁 Quick restart with Tab → Enter

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) — performance graph
- [Tabler Icons](https://tabler.io/icons)
- [shadcn/ui](https://ui.shadcn.com/) (base-nova style)
- [web-haptics](https://github.com/nicholasgasior/web-haptics)

## Project Structure

```
scribe/
├── app/
│   ├── globals.css       # Global styles + Tailwind
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Main app page
├── components/
│   ├── layout/
│   │   ├── SettingsBar.tsx
│   │   ├── StatsScreen.tsx
│   │   └── TypingArea.tsx
│   └── ui/
│       ├── button.tsx
│       └── keyboard.tsx
├── hooks/
│   └── useTypingTest.ts
├── lib/
│   ├── utils.ts
│   └── words.ts
└── public/
    ├── images/
    └── sounds/
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
