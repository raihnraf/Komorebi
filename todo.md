# Sakura & Matcha - Project Implementation Plan

> **A Japanese learning platform built with React + Vite, featuring a neo-brutalist design system.**
> 
> *Research-backed implementation using 2025/2026 best practices*

---

## 📋 Table of Contents

1. [Project Setup](#1-project-setup)
2. [Design System & Configuration](#2-design-system--configuration)
3. [Core Infrastructure](#3-core-infrastructure)
4. [Feature Modules](#4-feature-modules)
5. [Pages Implementation](#5-pages-implementation)
6. [Data Layer](#6-data-layer)
7. [Polish & Optimization](#7-polish--optimization)
8. [Deployment](#8-deployment)

---

## 1. Project Setup

### 1.1 Initialize Project
- [ ] Create Vite + React + TypeScript project
  ```bash
  npm create vite@latest
  # Select: React → TypeScript
  ```
- [ ] Configure ESLint with type-aware rules
  - Use `tseslint.configs.recommendedTypeChecked`
  - Add `eslint-plugin-react-x` and `eslint-plugin-react-dom`
  - Configure `parserOptions` with tsconfig paths
- [ ] Set up Prettier with ESLint integration
- [ ] Initialize Git repository with `.gitignore`

### 1.2 Install Core Dependencies
```bash
# Core Framework
npm install react react-dom react-router-dom

# Styling
npm install tailwindcss @tailwindcss/vite postcss autoprefixer
npm install clsx tailwind-merge

# State Management (Research-validated: Zustand for client state)
npm install zustand

# Data Fetching (Research-validated: TanStack Query v5 for server state)
npm install @tanstack/react-query

# Animations (Research-validated: Framer Motion → now "Motion")
npm install motion

# Icons
npm install lucide-react

# Utilities
npm install @redux-devtools/extension  # For Zustand devtools
```

### 1.3 Install Dev Dependencies
```bash
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D vite-plugin-imagemin
npm install -D prettier prettier-plugin-tailwindcss
npm install -D husky lint-staged  # Optional: for pre-commit hooks
```

---

## 2. Design System & Configuration

### 2.1 Vite Configuration
**File:** `vite.config.ts`

- [ ] Configure path aliases (`@/*` → `./src/*`)
- [ ] Add Tailwind CSS plugin
- [ ] Add React plugin
- [ ] Configure image optimization plugin

```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    imagemin({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### 2.2 TypeScript Configuration
**File:** `tsconfig.json`

- [ ] Configure path aliases
- [ ] Enable strict mode
- [ ] Configure module resolution

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2.3 Tailwind Configuration
**File:** `tailwind.config.ts`

- [ ] Configure color palette (from design reference)
  - Primary: `#145129`, `#2F6A3F`, `#B2F2BB`
  - Secondary: `#78555E`, `#FFD1DC`
  - Tertiary: `#533F60`, `#CDB4DB`
  - Surface colors: `#F9F9F9`, `#EEEEEE`, `#FFFFFF`
  - JLPT levels: N5-Blue `#87CEEB`, N4-Yellow `#FDFD96`, N3-Green `#B2F2BB`, N2-Pink `#FFD1DC`, N1-Purple `#CDB4DB`
- [ ] Configure fonts
  - Headline/Body/Label: `Plus Jakarta Sans`
  - Japanese: `Noto Sans JP`
- [ ] Add custom shadows (neo-brutalist)
  - `hard-shadow`: `4px 4px 0px 0px rgba(26,26,26,1)`
  - `hard-shadow-sm`: `2px 2px 0px 0px rgba(26,26,26,1)`
- [ ] Configure dark mode (class-based)
- [ ] Add custom animations

### 2.4 Global Styles
**File:** `src/index.css`

- [ ] Add Tailwind directives
- [ ] Define CSS custom properties
- [ ] Add neo-brutalist utility classes
- [ ] Configure Material Symbols font

```css
@import "tailwindcss";

@layer utilities {
  .hard-shadow {
    box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
  }
  
  .hard-shadow-sm {
    box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1);
  }
  
  .active-press:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1);
  }
}
```

### 2.5 shadcn/ui Setup
- [ ] Initialize shadcn/ui
  ```bash
  npx shadcn@latest init
  ```
- [ ] Configure `components.json`:
  ```json
  {
    "style": "default",
    "tailwind": {
      "config": "tailwind.config.ts",
      "css": "src/index.css",
      "baseColor": "zinc",
      "cssVariables": true
    },
    "rsc": false,
    "aliases": {
      "utils": "@/lib/utils",
      "components": "@/components/ui"
    }
  }
  ```
- [ ] Install base components:
  - [ ] `button`
  - [ ] `card`
  - [ ] `badge`
  - [ ] `input`
  - [ ] `tabs`
  - [ ] `dialog`
  - [ ] `progress`
  - [ ] `scroll-area`

### 2.6 Design Tokens
**File:** `src/lib/design-tokens.ts`

- [ ] Export color definitions
- [ ] Export typography scale
- [ ] Export spacing system
- [ ] Export shadow definitions
- [ ] Export JLPT level configurations

---

## 3. Core Infrastructure

### 3.1 Project Structure (Feature-Based Architecture)
```
src/
├── assets/              # Images, fonts, static files
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components (TopBar, BottomNav)
│   └── shared/          # Shared components (Loading, Error)
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── kanji-explorer/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── study-list/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── search/
│   │   ├── components/
│   │   └── hooks/
│   ├── progress/
│   │   ├── components/
│   │   └── hooks/
│   └── review/
│       ├── components/
│       └── hooks/
├── hooks/               # Global hooks
├── lib/
│   ├── utils.ts         # cn() utility
│   ├── design-tokens.ts
│   └── query-client.ts
├── pages/               # Page components
├── store/               # Zustand stores
│   ├── useAppStore.ts
│   ├── useProgressStore.ts
│   └── useFilterStore.ts
├── types/               # Global types
│   └── index.ts
├── utils/               # Helper functions
├── App.tsx
├── main.tsx
└── index.css
```

### 3.2 Routing Setup
**File:** `src/App.tsx`

- [ ] Configure React Router with lazy loading
- [ ] Define routes:
  - [ ] `/` → HomePage
  - [ ] `/learn` → LearnPage
  - [ ] `/kanji` → KanjiPage
  - [ ] `/kanji/:id` → KanjiDetailPage
  - [ ] `/review` → ReviewPage
  - [ ] `/lists` → StudyListPage
  - [ ] `/profile` → ProfilePage
- [ ] Create layout wrapper with navigation
- [ ] Add loading states for lazy routes

### 3.3 State Management (Zustand)
**Research-validated pattern: Zustand for client state, TanStack Query for server state**

#### App Store
**File:** `src/store/useAppStore.ts`

- [ ] Create store with TypeScript
- [ ] Add devtools middleware
- [ ] Add persist middleware for theme preference
- [ ] Define UI state (theme, sidebar open, modals)

```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'

interface AppState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        sidebarOpen: false,
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      }),
      { name: 'sakura-app-storage' },
    ),
  ),
)
```

#### Progress Store
**File:** `src/store/useProgressStore.ts`

- [ ] Track kanji mastery progress
- [ ] Track study session stats
- [ ] Track weekly progress
- [ ] Persist to localStorage

#### Filter Store
**File:** `src/store/useFilterStore.ts`

- [ ] Track active JLPT level filters
- [ ] Track search query
- [ ] Track sort preferences

### 3.4 Data Layer (TanStack Query v5)
**Research-validated pattern: TanStack Query for server state management**

#### Query Client Setup
**File:** `src/lib/query-client.ts`

- [ ] Create QueryClient instance
- [ ] Configure default options
- [ ] Set up error handling

```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

#### Provider Setup
**File:** `src/main.tsx`

- [ ] Wrap app with QueryClientProvider
- [ ] Wrap app with RouterProvider

#### Query Hooks
**File:** `src/features/kanji-explorer/hooks/useKanji.ts`

- [ ] `useKanjiList` - Fetch all kanji with filters
- [ ] `useKanjiDetail` - Fetch single kanji
- [ ] `useKanjiSearch` - Search kanji
- [ ] `useVocabularyList` - Fetch vocabulary

#### Mutation Hooks
**File:** `src/features/study-list/hooks/useStudyList.ts`

- [ ] `useAddToStudyList` - Add kanji to list
- [ ] `useRemoveFromStudyList` - Remove from list
- [ ] `useMarkKanjiMastered` - Mark as mastered
- [ ] Use `queryClient.invalidateQueries` on success

### 3.5 TypeScript Types
**File:** `src/types/index.ts`

- [ ] Define `JLPTLevel` type: `'N5' | 'N4' | 'N3' | 'N2' | 'N1'`
- [ ] Define `Kanji` interface:
  ```typescript
  interface Kanji {
    id: string
    character: string
    jlptLevel: JLPTLevel
    strokes: number
    onyomi: string[]
    kunyomi: string[]
    meanings: string[]
    examples: KanjiExample[]
    radical: Radical
  }
  ```
- [ ] Define `KanjiExample` interface
- [ ] Define `Radical` interface
- [ ] Define `Vocabulary` interface
- [ ] Define `StudyProgress` interface
- [ ] Define `UserProgress` interface

---

## 4. Feature Modules

### 4.1 Kanji Explorer Feature
**Location:** `src/features/kanji-explorer/`

#### Components
- [ ] `KanjiCard.tsx` - Grid card with hover animation
  - Use `motion.div` with `whileHover` and `layout` props
  - Display JLPT badge, kanji character, meanings
- [ ] `KanjiGrid.tsx` - Responsive grid layout
  - Use CSS Grid with responsive breakpoints
  - Add stagger animation with `LayoutGroup`
- [ ] `KanjiDetail.tsx` - Full detail view
  - Bento grid layout
  - Progressive disclosure of information
- [ ] `KanjiHeader.tsx` - Large character display
- [ ] `ReadingSection.tsx` - Onyomi/Kunyomi sections
- [ ] `MeaningSection.tsx` - English meanings
- [ ] `ExampleSentences.tsx` - Usage examples with furigana
- [ ] `RadicalInfo.tsx` - Radical breakdown
- [ ] `ProgressMeter.tsx` - Mastery progress bar

#### Hooks
- [ ] `useKanjiSearch.ts` - Search with debounce
- [ ] `useKanjiFilter.ts` - JLPT level filtering
- [ ] `useKanjiMastery.ts` - Track mastery state

#### Services
- [ ] `kanjiService.ts` - Mock data fetching functions

### 4.2 Study List Feature
**Location:** `src/features/study-list/`

#### Components
- [ ] `StudyListHeader.tsx` - Stats display with bento layout
- [ ] `StudyListGrid.tsx` - Card grid
- [ ] `StudyCard.tsx` - Individual item card
  - Normal and mastered states
  - Grayscale effect for mastered items
- [ ] `JLPTFilterTabs.tsx` - Level filter tabs
- [ ] `MarkMasteredButton.tsx` - Action button
- [ ] `RemoveItemButton.tsx` - Delete action
- [ ] `ListStats.tsx` - Progress statistics

#### Hooks
- [ ] `useStudyList.ts` - List management with mutations
- [ ] `useListFilter.ts` - Filter by JLPT level

### 4.3 Search & Filter Feature
**Location:** `src/features/search/`

#### Components
- [ ] `SearchBar.tsx` - Main search input with icon
  - Debounced input
  - Clear button
- [ ] `FilterChips.tsx` - JLPT level filter chips
- [ ] `SearchResults.tsx` - Results display
- [ ] `ResultsHeader.tsx` - Match count and active filters

#### Hooks
- [ ] `useSearch.ts` - Search logic with TanStack Query
- [ ] `useDebounce.ts` - Generic debounce hook (500ms delay)

### 4.4 Progress Tracking Feature
**Location:** `src/features/progress/`

#### Components
- [ ] `ProgressDashboard.tsx` - Overview stats
- [ ] `SessionTracker.tsx` - Current session progress
- [ ] `WeeklyProgress.tsx` - Weekly stats visualization
- [ ] `MasteryBadge.tsx` - Achievement display

#### Hooks
- [ ] `useProgressTracking.ts` - Track learning progress
- [ ] `useStreakCounter.ts` - Daily streak tracking

### 4.5 Review Feature
**Location:** `src/features/review/`

#### Components
- [ ] `ReviewQueue.tsx` - Items to review
- [ ] `Flashcard.tsx` - Review card with flip animation
- [ ] `ReviewProgress.tsx` - Session progress indicator
- [ ] `ReviewComplete.tsx` - Session summary

#### Hooks
- [ ] `useReviewSession.ts` - Manage review session state

### 4.6 Navigation Feature
**Location:** `src/features/navigation/`

#### Components
- [ ] `TopAppBar.tsx` - Desktop navigation
  - Logo
  - Nav links with active state
  - User profile button
- [ ] `BottomNavBar.tsx` - Mobile navigation
  - 5 nav items with icons
  - Active state styling
  - Neo-brutalist shadows
- [ ] `NavButton.tsx` - Individual nav item
- [ ] `Logo.tsx` - Brand logo component

---

## 5. Pages Implementation

### 5.1 Home/Dashboard Page
**File:** `src/pages/HomePage.tsx`

- [ ] Hero section with welcome message
- [ ] Search bar with filters
- [ ] Word of the Day widget (bento card)
- [ ] Learning Progress bento (session stats)
- [ ] Quick Review section
- [ ] Explore Lists section
- [ ] Responsive bento grid layout
- [ ] Motion animations for cards

### 5.2 Kanji Explorer Page
**File:** `src/pages/KanjiPage.tsx`

- [ ] Page header with title
- [ ] Filter controls (JLPT level buttons)
- [ ] Kanji grid (responsive: 1→2→3→4 columns)
- [ ] Load more section
- [ ] Mobile bottom nav integration

### 5.3 Kanji Detail Page
**File:** `src/pages/KanjiDetailPage.tsx`

- [ ] Large kanji display (Block A - 2x2 grid)
- [ ] JLPT level & stroke count (Block B)
- [ ] Readings section (Block C)
- [ ] Meanings section (Block D)
- [ ] Example sentences (Block E - full width)
- [ ] Radical breakdown section
- [ ] Progress mastery meter
- [ ] Save to list FAB (Floating Action Button)
- [ ] Layout animations between sections

### 5.4 Study List Page
**File:** `src/pages/StudyListPage.tsx`

- [ ] Bento header with stats (2 columns)
- [ ] JLPT filter tabs (horizontal scroll on mobile)
- [ ] Cards grid with mastered state
- [ ] Delete/Mark mastered actions
- [ ] Empty state when no items

### 5.5 Search Results Page
**File:** `src/pages/SearchResultsPage.tsx`

- [ ] Results header with match count
- [ ] Active filters display
- [ ] Filter chips for quick removal
- [ ] Results grid
- [ ] Load more / End of results section

### 5.6 Review Page
**File:** `src/pages/ReviewPage.tsx`

- [ ] Review queue display
- [ ] Flashcard interface with flip animation
- [ ] Progress indicator
- [ ] Session summary on completion

### 5.7 Profile Page (Future)
**File:** `src/pages/ProfilePage.tsx`

- [ ] User stats overview
- [ ] Achievement badges
- [ ] Settings section
- [ ] Learning preferences

---

## 6. Data Layer

### 6.1 Mock Data Structure
**Location:** `src/data/`

- [ ] Create `kanji.json` with 50+ entries across all JLPT levels
- [ ] Create `vocabulary.json` with word list
- [ ] Create `sentences.json` with example sentences

### 6.2 Data Format
**File:** `src/data/kanji.json`

```json
{
  "kanji": [
    {
      "id": "学",
      "character": "学",
      "jlptLevel": "N3",
      "strokes": 8,
      "onyomi": ["ガク"],
      "kunyomi": ["まな・ぶ"],
      "meanings": ["study", "learning", "science"],
      "examples": [
        {
          "japanese": "私は大学で学んでいます。",
          "romaji": "Watashi wa daigaku de manande imasu.",
          "english": "I am studying at a university."
        }
      ],
      "radical": {
        "character": "子",
        "name": "Child",
        "number": 39
      }
    }
  ]
}
```

### 6.3 API Service Layer
**File:** `src/services/api.ts`

- [ ] Create mock fetch functions with delay simulation
- [ ] Implement error handling
- [ ] Prepare for real API integration (future CMS)
- [ ] Use TanStack Query for caching

---

## 7. Polish & Optimization

### 7.1 Animations (Motion/Framer Motion)
**Research-validated: Use Motion (formerly Framer Motion) for React animations**

- [ ] Page transitions with `AnimatePresence` and `mode="wait"`
- [ ] Card hover effects with `whileHover={{ scale: 1.02 }}`
- [ ] Button press animations with `whileTap={{ scale: 0.98 }}`
- [ ] Layout animations with `layout` prop
- [ ] Stagger animations for grid items using `LayoutGroup`
- [ ] Progress bar animations with spring physics
- [ ] Shared layout animations (e.g., active tab underline)

**Best Practices:**
- Use spring animations for natural feel: `type: "spring", stiffness: 300, damping: 20`
- Keep animations under 300ms for perceived performance
- Use `ease-out` easing for enter animations
- Use `layout` prop for automatic layout shift animations

### 7.2 Responsive Design
- [ ] Mobile-first approach (base styles for mobile)
- [ ] Tablet breakpoint: `md:` (768px)
- [ ] Desktop breakpoint: `lg:` (1024px)
- [ ] Large desktop: `xl:` (1280px)
- [ ] Touch-friendly interactions (min 44px touch targets)
- [ ] Responsive typography with clamp()

### 7.3 Performance Optimization
- [ ] Code splitting with `React.lazy()` for routes
- [ ] Image optimization with `vite-plugin-imagemin`
- [ ] Lazy load images below fold
- [ ] Virtual scrolling for large lists (if needed)
- [ ] Memoize expensive components with `React.memo()`
- [ ] Use `useMemo` for computed values
- [ ] Debounce search input (500ms)

### 7.4 Accessibility
- [ ] ARIA labels on all interactive elements
- [ ] Keyboard navigation support (Tab, Enter, Escape)
- [ ] Focus indicators (visible focus rings)
- [ ] Screen reader support (semantic HTML)
- [ ] Color contrast compliance (WCAG AA)
- [ ] Skip to content link
- [ ] Reduced motion support (`prefers-reduced-motion`)

### 7.5 Dark Mode
- [ ] Toggle component in profile/settings
- [ ] Persist preference with Zustand
- [ ] Test all components in dark mode
- [ ] Ensure proper contrast ratios
- [ ] Update surface colors for dark theme

---

## 8. Deployment

### 8.1 Vercel Setup
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - Framework Preset: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Set up environment variables (if needed)

### 8.2 Pre-deployment Checklist
- [ ] Run production build: `npm run build`
- [ ] Test all routes manually
- [ ] Check for console errors
- [ ] Verify responsive design on real devices
- [ ] Test animations performance
- [ ] Run Lighthouse audit (target: 90+ all categories)
- [ ] Check bundle size with `npm run build -- --analyze`

### 8.3 CI/CD
- [ ] Set up GitHub Actions workflow:
  - [ ] Lint check: `npm run lint`
  - [ ] Type check: `npm run type-check`
  - [ ] Build verification: `npm run build`
  - [ ] Automated deployments on main branch

### 8.4 Monitoring
- [ ] Add Vercel Analytics
- [ ] Monitor Core Web Vitals:
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1
- [ ] Optional: Set up error tracking (Sentry)

---

## 📝 Additional Considerations

### Future Enhancements (Post-MVP)
- [ ] User authentication (Clerk, Auth0, or custom)
- [ ] Spaced repetition algorithm (SM-2 or custom)
- [ ] Progress syncing across devices (backend + database)
- [ ] Social features (share achievements)
- [ ] Custom study lists creation
- [ ] Audio pronunciation (Web Speech API or pre-recorded)
- [ ] Writing practice (HTML5 Canvas with stroke detection)
- [ ] Quiz modes (multiple choice, matching)
- [ ] CMS integration (Sanity, Contentful for content updates without redeploy)

### Best Practices to Follow
✅ **Research-validated patterns:**
- Feature-based architecture for scalability
- Zustand + TanStack Query for state management (2025 standard)
- Motion (Framer Motion) for animations
- shadcn/ui for component base (copy-paste, not dependency)
- TypeScript strict mode
- Component composition over inheritance
- Custom hooks for logic reuse
- Proper error boundaries
- Loading states for all async operations
- Empty states for empty data

### Tech Stack Summary (Research-Validated)
| Category | Tool | Why |
|----------|------|-----|
| **Build Tool** | Vite | Instant HMR, optimized builds |
| **Framework** | React 18+ | Component model, hooks |
| **Language** | TypeScript | Type safety, DX |
| **Styling** | Tailwind CSS | Utility-first, performance |
| **UI Components** | shadcn/ui | Own your code, customizable |
| **Icons** | Lucide React | Tree-shakable, consistent |
| **Client State** | Zustand | Lightweight, simple API |
| **Server State** | TanStack Query v5 | Caching, background refetch |
| **Animations** | Motion | GPU-accelerated, gestures |
| **Routing** | React Router v6+ | Standard, lazy loading |
| **Deployment** | Vercel | Free tier, edge network |

---

## 🎯 Priority Order

### Phase 1: Foundation (Days 1-3)
1. ✅ Project setup with Vite + TypeScript
2. ✅ Tailwind CSS configuration with design tokens
3. ✅ shadcn/ui installation and base components
4. ✅ Folder structure setup
5. ✅ Routing configuration
6. ✅ Zustand stores setup
7. ✅ TanStack Query setup

### Phase 2: Core Features (Days 4-10)
1. ✅ Navigation components (TopBar, BottomNav)
2. ✅ Kanji Explorer feature
3. ✅ Study List feature
4. ✅ Search functionality
5. ✅ Data layer with mock data
6. ✅ Type definitions

### Phase 3: Pages & Polish (Days 11-17)
1. ✅ All page implementations
2. ✅ Motion animations throughout
3. ✅ Responsive design refinements
4. ✅ Dark mode implementation
5. ✅ Accessibility improvements

### Phase 4: Launch (Days 18-21)
1. ✅ Performance optimization
2. ✅ Testing on multiple devices
3. ✅ Lighthouse audit fixes
4. ✅ Deployment to Vercel
5. ✅ Documentation

---

## 📚 Resources

### Official Documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion (Framer Motion)](https://motion.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel Deployment](https://vercel.com/docs)

### Best Practices References
- Feature-based architecture: GitHub - naserrasoulii/feature-based-react
- State management 2025: Zustand + TanStack Query pattern
- shadcn/ui best practices: Treat as source code, not dependency
- Animation performance: Use spring animations, keep under 300ms

---

**Last Updated:** March 19, 2026  
**Project:** Sakura & Matcha - Japanese Learning Platform  
**Stack:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Zustand + TanStack Query + Motion



DESIGN REFERENCES:
review page:
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sakura &amp; Matcha - Review Session</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Noto+Sans+JP:wght@400;500;700;900&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "secondary-fixed-dim": "#e7bbc6",
              "on-tertiary-fixed": "#251432",
              "on-primary-fixed-variant": "#135129",
              "primary-fixed": "#b2f2bb",
              "on-background": "#1a1c1c",
              "on-tertiary": "#ffffff",
              "primary-fixed-dim": "#96d5a0",
              "on-secondary": "#ffffff",
              "on-primary": "#ffffff",
              "surface-container": "#eeeeee",
              "surface-container-lowest": "#ffffff",
              "on-primary-fixed": "#00210b",
              "error": "#ba1a1a",
              "on-surface": "#1a1c1c",
              "surface-bright": "#f9f9f9",
              "surface-container-highest": "#e2e2e2",
              "surface-container-low": "#f3f3f3",
              "on-tertiary-container": "#ead0f8",
              "surface-tint": "#2f6a3f",
              "surface": "#f9f9f9",
              "on-secondary-fixed": "#2d141c",
              "on-secondary-fixed-variant": "#5e3e47",
              "on-error": "#ffffff",
              "inverse-on-surface": "#f0f1f1",
              "background": "#f9f9f9",
              "surface-container-high": "#e8e8e8",
              "secondary-fixed": "#ffd9e2",
              "on-error-container": "#93000a",
              "primary-container": "#2f6a3f",
              "inverse-primary": "#96d5a0",
              "secondary-container": "#ffd1dc",
              "tertiary-fixed": "#f3daff",
              "surface-dim": "#dadada",
              "on-surface-variant": "#414940",
              "inverse-surface": "#2f3131",
              "outline": "#717970",
              "on-tertiary-fixed-variant": "#533f60",
              "on-primary-container": "#a8e8b2",
              "error-container": "#ffdad6",
              "on-secondary-container": "#7a5761",
              "tertiary-container": "#6b5779",
              "primary": "#145129",
              "surface-variant": "#e2e2e2",
              "tertiary-fixed-dim": "#d7bde5",
              "secondary": "#78555e",
              "tertiary": "#533f60",
              "outline-variant": "#c0c9be"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Plus Jakarta Sans"],
              "label": ["Plus Jakarta Sans"],
              "jp": ["Noto Sans JP"]
            },
            borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-shadow-sm {
            box-shadow: 2px 2px 0px 0px #1A1A1A;
        }
        .neo-shadow-active:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
    </style>
</head>
<body class="bg-surface-dim font-body text-on-surface min-h-screen">
<!-- TopAppBar -->
<header class="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-[#f9f9f9] dark:bg-zinc-900 border-b-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
<div class="flex items-center gap-8">
<h1 class="text-2xl font-black text-[#1A1A1A] dark:text-white tracking-tighter">Sakura &amp; Matcha</h1>
<nav class="hidden md:flex gap-6">
<a class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#1A1A1A] opacity-70 hover:opacity-100 hover:bg-[#f3f3f3] transition-all duration-100" href="#">Learn</a>
<a class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#1A1A1A] opacity-70 hover:opacity-100 hover:bg-[#f3f3f3] transition-all duration-100" href="#">Kanji</a>
<a class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#145129] border-b-4 border-[#B2F2BB] pb-1" href="#">Review</a>
<a class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#1A1A1A] opacity-70 hover:opacity-100 hover:bg-[#f3f3f3] transition-all duration-100" href="#">Lists</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden sm:block">
<span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
<input class="pl-10 pr-4 py-2 bg-surface-container-lowest border-2 border-[#1A1A1A] focus:ring-0 focus:outline-none w-48 lg:w-64" placeholder="Search..." type="text"/>
</div>
<button class="material-symbols-outlined text-primary text-3xl hover:translate-x-[2px] hover:translate-y-[2px] transition-transform duration-75">account_circle</button>
</div>
</header>
<main class="max-w-7xl mx-auto p-6 md:p-12">
<!-- Session Header & Progress -->
<div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
<div class="space-y-2">
<div class="inline-flex items-center px-4 py-1 bg-primary-fixed border-2 border-[#1A1A1A] rounded-full neo-shadow-sm">
<span class="text-xs font-black uppercase tracking-widest text-on-surface">Active Session</span>
</div>
<h2 class="text-4xl font-black tracking-tighter">Daily Review</h2>
<p class="text-on-surface-variant font-medium">Spaced Repetition: Batch 04</p>
</div>
<div class="w-full md:w-72 space-y-3">
<div class="flex justify-between items-end font-bold">
<span class="text-sm">Session Progress</span>
<span class="text-xl">12/50 <span class="text-on-surface-variant text-sm font-medium">items</span></span>
</div>
<div class="h-6 w-full bg-surface-container-high border-2 border-[#1A1A1A] neo-shadow-sm overflow-hidden p-1">
<div class="h-full bg-primary-fixed border-r-2 border-[#1A1A1A]" style="width: 24%;"></div>
</div>
</div>
</div>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
<!-- Main Content: Kanji Card -->
<div class="md:col-span-8 bg-primary-fixed border-2 border-[#1A1A1A] neo-shadow p-8 flex flex-col items-center justify-center min-h-[400px] relative">
<div class="absolute top-4 left-4">
<span class="px-3 py-1 bg-surface-container-lowest border-2 border-[#1A1A1A] font-bold text-xs uppercase tracking-tighter">JLPT N3</span>
</div>
<div class="text-center space-y-6">
<span class="font-jp text-9xl md:text-[12rem] font-black text-[#1A1A1A] leading-none select-none">進</span>
<div class="flex gap-2 justify-center">
<span class="px-4 py-1 bg-on-primary-fixed text-primary-fixed font-bold border-2 border-[#1A1A1A]">Level 14</span>
<span class="px-4 py-1 bg-surface-container-lowest text-on-surface font-bold border-2 border-[#1A1A1A]">Kanji</span>
</div>
</div>
</div>
<!-- Interaction Column -->
<div class="md:col-span-4 flex flex-col gap-6">
<!-- Input Box -->
<div class="bg-surface-container-lowest border-2 border-[#1A1A1A] neo-shadow p-6 flex flex-col gap-4">
<label class="font-black uppercase tracking-wider text-xs text-on-surface-variant">Your Answer</label>
<input class="w-full bg-surface-container-low border-2 border-[#1A1A1A] p-4 font-bold text-xl focus:outline-none focus:ring-0" placeholder="Reading or Meaning..." type="text"/>
<button class="w-full bg-primary text-on-primary font-black py-4 border-2 border-[#1A1A1A] neo-shadow-sm neo-shadow-active text-lg flex items-center justify-center gap-2">
                        Check <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<!-- Radical / Stroke Info -->
<div class="bg-secondary-container border-2 border-[#1A1A1A] neo-shadow p-6">
<div class="flex justify-between items-center mb-4">
<h3 class="font-black text-sm uppercase tracking-widest">Components</h3>
<span class="material-symbols-outlined text-[#1A1A1A]">info</span>
</div>
<div class="flex gap-3">
<div class="w-12 h-12 flex items-center justify-center bg-surface-container-lowest border-2 border-[#1A1A1A] neo-shadow-sm">
<span class="font-jp text-2xl">辶</span>
</div>
<div class="w-12 h-12 flex items-center justify-center bg-surface-container-lowest border-2 border-[#1A1A1A] neo-shadow-sm">
<span class="font-jp text-2xl">隹</span>
</div>
</div>
<p class="mt-4 text-sm font-medium leading-relaxed">
                        The radical <span class="font-jp font-bold">辶</span> (walk) combined with <span class="font-jp font-bold">隹</span> (bird) suggests a bird moving forward.
                    </p>
</div>
</div>
<!-- Bottom Bento Row -->
<!-- Hint Box -->
<div class="md:col-span-4 bg-surface-container-low border-2 border-[#1A1A1A] neo-shadow p-6 flex items-start gap-4 hover:bg-surface-container-high transition-colors cursor-pointer group">
<div class="p-3 bg-surface-container-lowest border-2 border-[#1A1A1A] group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl">lightbulb</span>
</div>
<div>
<h4 class="font-black text-sm uppercase mb-1">Struggling?</h4>
<p class="text-sm font-medium text-on-surface-variant">Show mnemonics or stroke order animation.</p>
</div>
</div>
<!-- Mastery Level -->
<div class="md:col-span-4 bg-tertiary-fixed border-2 border-[#1A1A1A] neo-shadow p-6 flex items-center justify-between">
<div>
<h4 class="font-black text-sm uppercase mb-1">Current Mastery</h4>
<p class="text-2xl font-black">Guru II</p>
</div>
<div class="flex gap-1">
<div class="w-3 h-8 bg-on-tertiary-fixed border-2 border-[#1A1A1A]"></div>
<div class="w-3 h-8 bg-on-tertiary-fixed border-2 border-[#1A1A1A]"></div>
<div class="w-3 h-8 bg-on-tertiary-fixed border-2 border-[#1A1A1A]"></div>
<div class="w-3 h-8 bg-surface-container-lowest border-2 border-[#1A1A1A]"></div>
<div class="w-3 h-8 bg-surface-container-lowest border-2 border-[#1A1A1A]"></div>
</div>
</div>
<!-- Quick Action -->
<div class="md:col-span-4 bg-secondary-fixed border-2 border-[#1A1A1A] neo-shadow p-6 flex items-center justify-center">
<button class="flex items-center gap-3 font-black text-sm uppercase tracking-widest text-on-surface hover:translate-x-1 transition-transform">
                    Skip Item <span class="material-symbols-outlined">double_arrow</span>
</button>
</div>
</div>
<!-- Session Statistics Preview -->
<div class="mt-12 p-8 bg-surface-container border-2 border-[#1A1A1A] neo-shadow grid grid-cols-2 md:grid-cols-4 gap-8">
<div class="space-y-1">
<p class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Accuracy</p>
<p class="text-3xl font-black">94%</p>
</div>
<div class="space-y-1">
<p class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Avg Time</p>
<p class="text-3xl font-black">2.4s</p>
</div>
<div class="space-y-1">
<p class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Streaks</p>
<p class="text-3xl font-black">12</p>
</div>
<div class="space-y-1">
<p class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Estimated End</p>
<p class="text-3xl font-black">~14m</p>
</div>
</div>
</main>
<!-- SideNavBar (Hidden on desktop as per Shell Visibility Rule for deep task focus, but kept for logic adherence) -->
<nav class="hidden lg:flex flex-col w-64 fixed left-0 top-0 h-full p-6 bg-[#f9f9f9] dark:bg-zinc-900 border-r-2 border-[#1A1A1A] shadow-[4px_0px_0px_0px_rgba(26,26,26,1)] z-40 transition-transform duration-75">
<div class="mb-10 pt-20">
<h3 class="text-xl font-black text-[#1A1A1A] mb-1">Sensei Dashboard</h3>
<p class="text-sm font-bold text-primary">JLPT N3 Progress</p>
</div>
<div class="flex flex-col gap-4">
<a class="flex items-center gap-4 p-4 font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1A1A1A] hover:bg-[#f3f3f3] hover:translate-x-[2px] hover:translate-y-[2px]" href="#">
<span class="material-symbols-outlined">school</span> Learn
            </a>
<a class="flex items-center gap-4 p-4 font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1A1A1A] hover:bg-[#f3f3f3] hover:translate-x-[2px] hover:translate-y-[2px]" href="#">
<span class="material-symbols-outlined">handwriting_recognition</span> Kanji
            </a>
<a class="flex items-center gap-4 p-4 font-['Plus_Jakarta_Sans'] text-sm font-bold bg-[#B2F2BB] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]" href="#">
<span class="material-symbols-outlined">rebase_edit</span> Review
            </a>
<a class="flex items-center gap-4 p-4 font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1A1A1A] hover:bg-[#f3f3f3] hover:translate-x-[2px] hover:translate-y-[2px]" href="#">
<span class="material-symbols-outlined">format_list_bulleted</span> Lists
            </a>
</div>
<div class="mt-auto flex items-center gap-4 p-4 bg-surface-container-low border-2 border-black">
<div class="w-10 h-10 bg-secondary-fixed border-2 border-black flex items-center justify-center overflow-hidden">
<img alt="User avatar" data-alt="User profile avatar icon placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBcBFj2RqSWJqhzzGYs43Tojiu7JMCxrQXMEzyxp_zr-Afi0E-5xxbMkOCfl16tNSSTTiploVb4iFFARVITi0JXmLqxNsxJtRFtwd0cNhc5BvrzG7hdwv4ALceclgx10Aqu19HaOe_uuAomV04Wf0jE4JX6y2qJUOIOfHhVRmtkFw1vkX642E_co3nVwzJoOr6xo2etoPrEFaRXbc8Eblaw3c78Xh0pwMlga2niZg9NU5eqA1RoO1dNOF-m8c4SzOJaEvMuy15ZwK0"/>
</div>
<div class="overflow-hidden">
<p class="font-black text-xs truncate">TARO_STUDENT</p>
<p class="text-[10px] uppercase font-bold text-on-surface-variant">Gold Member</p>
</div>
</div>
</nav>
</body></html>


list page:

<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sakura &amp; Matcha - Review Session</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Noto+Sans+JP:wght@400;500;700;900&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "secondary-fixed-dim": "#e7bbc6",
              "on-tertiary-fixed": "#251432",
              "on-primary-fixed-variant": "#135129",
              "primary-fixed": "#b2f2bb",
              "on-background": "#1a1c1c",
              "on-tertiary": "#ffffff",
              "primary-fixed-dim": "#96d5a0",
              "on-secondary": "#ffffff",
              "on-primary": "#ffffff",
              "surface-container": "#eeeeee",
              "surface-container-lowest": "#ffffff",
              "on-primary-fixed": "#00210b",
              "error": "#ba1a1a",
              "on-surface": "#1a1c1c",
              "surface-bright": "#f9f9f9",
              "surface-container-highest": "#e2e2e2",
              "surface-container-low": "#f3f3f3",
              "on-tertiary-container": "#ead0f8",
              "surface-tint": "#2f6a3f",
              "surface": "#f9f9f9",
              "on-secondary-fixed": "#2d141c",
              "on-secondary-fixed-variant": "#5e3e47",
              "on-error": "#ffffff",
              "inverse-on-surface": "#f0f1f1",
              "background": "#f9f9f9",
              "surface-container-high": "#e8e8e8",
              "secondary-fixed": "#ffd9e2",
              "on-error-container": "#93000a",
              "primary-container": "#2f6a3f",
              "inverse-primary": "#96d5a0",
              "secondary-container": "#ffd1dc",
              "tertiary-fixed": "#f3daff",
              "surface-dim": "#dadada",
              "on-surface-variant": "#414940",
              "inverse-surface": "#2f3131",
              "outline": "#717970",
              "on-tertiary-fixed-variant": "#533f60",
              "on-primary-container": "#a8e8b2",
              "error-container": "#ffdad6",
              "on-secondary-container": "#7a5761",
              "tertiary-container": "#6b5779",
              "primary": "#145129",
              "surface-variant": "#e2e2e2",
              "tertiary-fixed-dim": "#d7bde5",
              "secondary": "#78555e",
              "tertiary": "#533f60",
              "outline-variant": "#c0c9be"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Plus Jakarta Sans"],
              "label": ["Plus Jakarta Sans"],
              "jp": ["Noto Sans JP"]
            },
            borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-shadow-sm {
            box-shadow: 2px 2px 0px 0px #1A1A1A;
        }
        .neo-shadow-active:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
    </style>
</head>
<body class="bg-surface-dim font-body text-on-surface min-h-screen">
<!-- TopAppBar -->
<header class="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-[#f9f9f9] dark:bg-zinc-900 border-b-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
<div class="flex items-center gap-8">
<h1 class="text-2xl font-black text-[#1A1A1A] dark:text-white tracking-tighter">Sakura &amp; Matcha</h1>
<nav class="hidden md:flex gap-6">
<a class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#1A1A1A] opacity-70 hover:opacity-100 hover:bg-[#f3f3f3] transition-all duration-100" href="#">Learn</a>
<a class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#1A1A1A] opacity-70 hover:opacity-100 hover:bg-[#f3f3f3] transition-all duration-100" href="#">Kanji</a>
<a class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#145129] border-b-4 border-[#B2F2BB] pb-1" href="#">Review</a>
<a class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#1A1A1A] opacity-70 hover:opacity-100 hover:bg-[#f3f3f3] transition-all duration-100" href="#">Lists</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden sm:block">
<span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
<input class="pl-10 pr-4 py-2 bg-surface-container-lowest border-2 border-[#1A1A1A] focus:ring-0 focus:outline-none w-48 lg:w-64" placeholder="Search..." type="text"/>
</div>
<button class="material-symbols-outlined text-primary text-3xl hover:translate-x-[2px] hover:translate-y-[2px] transition-transform duration-75">account_circle</button>
</div>
</header>
<main class="max-w-7xl mx-auto p-6 md:p-12">
<!-- Session Header & Progress -->
<div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
<div class="space-y-2">
<div class="inline-flex items-center px-4 py-1 bg-primary-fixed border-2 border-[#1A1A1A] rounded-full neo-shadow-sm">
<span class="text-xs font-black uppercase tracking-widest text-on-surface">Active Session</span>
</div>
<h2 class="text-4xl font-black tracking-tighter">Daily Review</h2>
<p class="text-on-surface-variant font-medium">Spaced Repetition: Batch 04</p>
</div>
<div class="w-full md:w-72 space-y-3">
<div class="flex justify-between items-end font-bold">
<span class="text-sm">Session Progress</span>
<span class="text-xl">12/50 <span class="text-on-surface-variant text-sm font-medium">items</span></span>
</div>
<div class="h-6 w-full bg-surface-container-high border-2 border-[#1A1A1A] neo-shadow-sm overflow-hidden p-1">
<div class="h-full bg-primary-fixed border-r-2 border-[#1A1A1A]" style="width: 24%;"></div>
</div>
</div>
</div>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
<!-- Main Content: Kanji Card -->
<div class="md:col-span-8 bg-primary-fixed border-2 border-[#1A1A1A] neo-shadow p-8 flex flex-col items-center justify-center min-h-[400px] relative">
<div class="absolute top-4 left-4">
<span class="px-3 py-1 bg-surface-container-lowest border-2 border-[#1A1A1A] font-bold text-xs uppercase tracking-tighter">JLPT N3</span>
</div>
<div class="text-center space-y-6">
<span class="font-jp text-9xl md:text-[12rem] font-black text-[#1A1A1A] leading-none select-none">進</span>
<div class="flex gap-2 justify-center">
<span class="px-4 py-1 bg-on-primary-fixed text-primary-fixed font-bold border-2 border-[#1A1A1A]">Level 14</span>
<span class="px-4 py-1 bg-surface-container-lowest text-on-surface font-bold border-2 border-[#1A1A1A]">Kanji</span>
</div>
</div>
</div>
<!-- Interaction Column -->
<div class="md:col-span-4 flex flex-col gap-6">
<!-- Input Box -->
<div class="bg-surface-container-lowest border-2 border-[#1A1A1A] neo-shadow p-6 flex flex-col gap-4">
<label class="font-black uppercase tracking-wider text-xs text-on-surface-variant">Your Answer</label>
<input class="w-full bg-surface-container-low border-2 border-[#1A1A1A] p-4 font-bold text-xl focus:outline-none focus:ring-0" placeholder="Reading or Meaning..." type="text"/>
<button class="w-full bg-primary text-on-primary font-black py-4 border-2 border-[#1A1A1A] neo-shadow-sm neo-shadow-active text-lg flex items-center justify-center gap-2">
                        Check <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<!-- Radical / Stroke Info -->
<div class="bg-secondary-container border-2 border-[#1A1A1A] neo-shadow p-6">
<div class="flex justify-between items-center mb-4">
<h3 class="font-black text-sm uppercase tracking-widest">Components</h3>
<span class="material-symbols-outlined text-[#1A1A1A]">info</span>
</div>
<div class="flex gap-3">
<div class="w-12 h-12 flex items-center justify-center bg-surface-container-lowest border-2 border-[#1A1A1A] neo-shadow-sm">
<span class="font-jp text-2xl">辶</span>
</div>
<div class="w-12 h-12 flex items-center justify-center bg-surface-container-lowest border-2 border-[#1A1A1A] neo-shadow-sm">
<span class="font-jp text-2xl">隹</span>
</div>
</div>
<p class="mt-4 text-sm font-medium leading-relaxed">
                        The radical <span class="font-jp font-bold">辶</span> (walk) combined with <span class="font-jp font-bold">隹</span> (bird) suggests a bird moving forward.
                    </p>
</div>
</div>
<!-- Bottom Bento Row -->
<!-- Hint Box -->
<div class="md:col-span-4 bg-surface-container-low border-2 border-[#1A1A1A] neo-shadow p-6 flex items-start gap-4 hover:bg-surface-container-high transition-colors cursor-pointer group">
<div class="p-3 bg-surface-container-lowest border-2 border-[#1A1A1A] group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl">lightbulb</span>
</div>
<div>
<h4 class="font-black text-sm uppercase mb-1">Struggling?</h4>
<p class="text-sm font-medium text-on-surface-variant">Show mnemonics or stroke order animation.</p>
</div>
</div>
<!-- Mastery Level -->
<div class="md:col-span-4 bg-tertiary-fixed border-2 border-[#1A1A1A] neo-shadow p-6 flex items-center justify-between">
<div>
<h4 class="font-black text-sm uppercase mb-1">Current Mastery</h4>
<p class="text-2xl font-black">Guru II</p>
</div>
<div class="flex gap-1">
<div class="w-3 h-8 bg-on-tertiary-fixed border-2 border-[#1A1A1A]"></div>
<div class="w-3 h-8 bg-on-tertiary-fixed border-2 border-[#1A1A1A]"></div>
<div class="w-3 h-8 bg-on-tertiary-fixed border-2 border-[#1A1A1A]"></div>
<div class="w-3 h-8 bg-surface-container-lowest border-2 border-[#1A1A1A]"></div>
<div class="w-3 h-8 bg-surface-container-lowest border-2 border-[#1A1A1A]"></div>
</div>
</div>
<!-- Quick Action -->
<div class="md:col-span-4 bg-secondary-fixed border-2 border-[#1A1A1A] neo-shadow p-6 flex items-center justify-center">
<button class="flex items-center gap-3 font-black text-sm uppercase tracking-widest text-on-surface hover:translate-x-1 transition-transform">
                    Skip Item <span class="material-symbols-outlined">double_arrow</span>
</button>
</div>
</div>
<!-- Session Statistics Preview -->
<div class="mt-12 p-8 bg-surface-container border-2 border-[#1A1A1A] neo-shadow grid grid-cols-2 md:grid-cols-4 gap-8">
<div class="space-y-1">
<p class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Accuracy</p>
<p class="text-3xl font-black">94%</p>
</div>
<div class="space-y-1">
<p class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Avg Time</p>
<p class="text-3xl font-black">2.4s</p>
</div>
<div class="space-y-1">
<p class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Streaks</p>
<p class="text-3xl font-black">12</p>
</div>
<div class="space-y-1">
<p class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Estimated End</p>
<p class="text-3xl font-black">~14m</p>
</div>
</div>
</main>
<!-- SideNavBar (Hidden on desktop as per Shell Visibility Rule for deep task focus, but kept for logic adherence) -->
<nav class="hidden lg:flex flex-col w-64 fixed left-0 top-0 h-full p-6 bg-[#f9f9f9] dark:bg-zinc-900 border-r-2 border-[#1A1A1A] shadow-[4px_0px_0px_0px_rgba(26,26,26,1)] z-40 transition-transform duration-75">
<div class="mb-10 pt-20">
<h3 class="text-xl font-black text-[#1A1A1A] mb-1">Sensei Dashboard</h3>
<p class="text-sm font-bold text-primary">JLPT N3 Progress</p>
</div>
<div class="flex flex-col gap-4">
<a class="flex items-center gap-4 p-4 font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1A1A1A] hover:bg-[#f3f3f3] hover:translate-x-[2px] hover:translate-y-[2px]" href="#">
<span class="material-symbols-outlined">school</span> Learn
            </a>
<a class="flex items-center gap-4 p-4 font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1A1A1A] hover:bg-[#f3f3f3] hover:translate-x-[2px] hover:translate-y-[2px]" href="#">
<span class="material-symbols-outlined">handwriting_recognition</span> Kanji
            </a>
<a class="flex items-center gap-4 p-4 font-['Plus_Jakarta_Sans'] text-sm font-bold bg-[#B2F2BB] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]" href="#">
<span class="material-symbols-outlined">rebase_edit</span> Review
            </a>
<a class="flex items-center gap-4 p-4 font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#1A1A1A] hover:bg-[#f3f3f3] hover:translate-x-[2px] hover:translate-y-[2px]" href="#">
<span class="material-symbols-outlined">format_list_bulleted</span> Lists
            </a>
</div>
<div class="mt-auto flex items-center gap-4 p-4 bg-surface-container-low border-2 border-black">
<div class="w-10 h-10 bg-secondary-fixed border-2 border-black flex items-center justify-center overflow-hidden">
<img alt="User avatar" data-alt="User profile avatar icon placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBcBFj2RqSWJqhzzGYs43Tojiu7JMCxrQXMEzyxp_zr-Afi0E-5xxbMkOCfl16tNSSTTiploVb4iFFARVITi0JXmLqxNsxJtRFtwd0cNhc5BvrzG7hdwv4ALceclgx10Aqu19HaOe_uuAomV04Wf0jE4JX6y2qJUOIOfHhVRmtkFw1vkX642E_co3nVwzJoOr6xo2etoPrEFaRXbc8Eblaw3c78Xh0pwMlga2niZg9NU5eqA1RoO1dNOF-m8c4SzOJaEvMuy15ZwK0"/>
</div>
<div class="overflow-hidden">
<p class="font-black text-xs truncate">TARO_STUDENT</p>
<p class="text-[10px] uppercase font-bold text-on-surface-variant">Gold Member</p>
</div>
</div>
</nav>
</body></html>