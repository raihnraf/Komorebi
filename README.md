# Sakura & Matcha 🌸🍵

> A modern Japanese learning platform with neo-brutalist design

A high-performance portfolio project built with React, Vite, and Tailwind CSS. Features a beautiful neo-brutalist UI inspired by Japanese aesthetics.

## 🚀 Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand (client state) + TanStack Query v5 (server state)
- **Animations:** Motion (formerly Framer Motion)
- **Icons:** Lucide React
- **Routing:** React Router v7
- **Deployment:** Vercel-ready

## 📁 Project Structure

```
sakura-matcha/
├── src/
│   ├── components/
│   │   ├── ui/              # Base UI components (Button, Card, Badge)
│   │   ├── layout/          # Layout components (TopBar, BottomNav)
│   │   └── shared/          # Shared components
│   ├── features/
│   │   ├── kanji-explorer/  # Kanji learning feature
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   ├── study-list/      # Study list management
│   │   ├── search/          # Search functionality
│   │   ├── progress/        # Progress tracking
│   │   └── review/          # Review system
│   ├── pages/               # Page components
│   ├── store/               # Zustand stores
│   ├── lib/                 # Utilities and config
│   ├── types/               # TypeScript types
│   └── data/                # Mock data
├── public/
├── index.html
└── package.json
```

## 🎯 Features

### Implemented
- ✅ Home/Dashboard with bento grid layout
- ✅ Word of the Day widget
- ✅ Kanji Explorer with JLPT level filtering
- ✅ Neo-brutalist design system
- ✅ Responsive navigation (TopBar + BottomNav)
- ✅ State management with Zustand
- ✅ Data fetching with TanStack Query
- ✅ Smooth animations with Motion

### Coming Soon
- 🔄 Study List management
- 🔄 Review system with spaced repetition
- 🔄 User progress tracking
- 🔄 Dark mode
- 🔄 Search functionality
- 🔄 Kanji detail pages

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd sakura-matcha
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open in browser:
```
http://localhost:5173
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Design Tokens

### Colors

The design uses a custom color palette inspired by Japanese aesthetics:

- **Primary (Matcha Green):** `#145129` - Main brand color
- **Secondary (Sakura Pink):** `#78555E` - Accent color
- **Tertiary (Purple):** `#533F60` - Secondary accent
- **JLPT Levels:**
  - N5: Sky Blue `#87CEEB`
  - N4: Sunny Yellow `#FDFD96`
  - N3: Matcha Green `#B2F2BB`
  - N2: Sakura Pink `#FFD1DC`
  - N1: Lavender Purple `#CDB4DB`

### Typography

- **Headline/Body:** Plus Jakarta Sans
- **Japanese:** Noto Sans JP

### Shadows

Neo-brutalist hard shadows:
- `hard-shadow`: 4px 4px 0px 0px rgba(26, 26, 26, 1)
- `hard-shadow-sm`: 2px 2px 0px 0px rgba(26, 26, 1)
- `hard-shadow-lg`: 8px 8px 0px 0px rgba(26, 26, 26, 1)

## 📊 State Management

### Client State (Zustand)

- `useAppStore` - Theme, sidebar, UI state
- `useProgressStore` - Learning progress, streaks, session stats
- `useFilterStore` - Search and filter state

### Server State (TanStack Query)

- `useKanjiList` - Fetch kanji with filters
- `useKanjiDetail` - Fetch single kanji
- `useKanjiSearch` - Search kanji
- `useRandomKanji` - Word of the day

## 🚀 Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings

Build settings:
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## 📱 Responsive Design

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

The app features:
- Bottom navigation bar on mobile
- Top navigation bar on desktop
- Responsive grid layouts
- Touch-friendly interactions

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Spaced repetition algorithm (SM-2)
- [ ] Progress syncing (backend + database)
- [ ] Audio pronunciation
- [ ] Writing practice with canvas
- [ ] Quiz modes
- [ ] CMS integration (Sanity/Contentful)
- [ ] Social features
- [ ] Custom study lists

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ for learning Japanese

---

**Sakura & Matcha** - 桜と抹茶 🌸🍵
