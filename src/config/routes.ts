/**
 * Application Routes Configuration
 * Centralized route definitions
 */

export const APP_ROUTES = {
  // Main Routes
  HOME: "/learn",
  LEARN: "/learn",
  KANJI: "/kanji",
  LISTS: "/lists",
  REVIEW: "/review",
  PROFILE: "/profile",

  // Kanji Explorer Routes
  KANJI_EXPLORER: "/kanji",
  KANJI_DETAIL: (id: string) => `/kanji/${id}`,

  // Study List Routes
  STUDY_LISTS: "/lists",
  STUDY_LIST_DETAIL: (id: string) => `/lists/${id}`,

  // Review Routes
  REVIEW_SESSION: "/review",
  REVIEW_HISTORY: "/review/history",

  // Profile Routes
  PROFILE_SETTINGS: "/profile/settings",
  PROFILE_STATS: "/profile/stats",
} as const;

// Route Groups for Navigation
export const ROUTE_GROUPS = {
  MAIN: [
    { path: APP_ROUTES.LEARN, label: "Learn", icon: "BookOpen" },
    { path: APP_ROUTES.KANJI, label: "Kanji Explorer", icon: "Search" },
    { path: APP_ROUTES.LISTS, label: "Study Lists", icon: "List" },
    { path: APP_ROUTES.REVIEW, label: "Review", icon: "Brain" },
  ],
  SECONDARY: [
    { path: APP_ROUTES.PROFILE, label: "Profile", icon: "User" },
  ],
} as const;

// Public Routes (no auth required)
export const PUBLIC_ROUTES = [APP_ROUTES.HOME] as const;

// Protected Routes (auth required)
export const PROTECTED_ROUTES = [
  APP_ROUTES.LEARN,
  APP_ROUTES.KANJI,
  APP_ROUTES.LISTS,
  APP_ROUTES.REVIEW,
  APP_ROUTES.PROFILE,
] as const;
