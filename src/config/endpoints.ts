/**
 * API Endpoints Configuration
 * Centralized API endpoint definitions
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const API_ENDPOINTS = {
  // Kanji Endpoints
  KANJI: {
    LIST: `${API_BASE_URL}/kanji`,
    BY_ID: (id: string) => `${API_BASE_URL}/kanji/${id}`,
    BY_LEVEL: (level: string) => `${API_BASE_URL}/kanji/jlpt/${level}`,
    SEARCH: `${API_BASE_URL}/kanji/search`,
    RANDOM: `${API_BASE_URL}/kanji/random`,
  },

  // Vocabulary Endpoints
  VOCABULARY: {
    LIST: `${API_BASE_URL}/vocabulary`,
    BY_ID: (id: string) => `${API_BASE_URL}/vocabulary/${id}`,
    BY_LEVEL: (level: string) => `${API_BASE_URL}/vocabulary/jlpt/${level}`,
    SEARCH: `${API_BASE_URL}/vocabulary/search`,
  },

  // Progress Endpoints
  PROGRESS: {
    USER: `${API_BASE_URL}/progress/user`,
    KANJI: (kanjiId: string) => `${API_BASE_URL}/progress/kanji/${kanjiId}`,
    UPDATE: `${API_BASE_URL}/progress/update`,
    STATS: `${API_BASE_URL}/progress/stats`,
  },

  // Study List Endpoints
  STUDY_LISTS: {
    LIST: `${API_BASE_URL}/study-lists`,
    BY_ID: (id: string) => `${API_BASE_URL}/study-lists/${id}`,
    CREATE: `${API_BASE_URL}/study-lists`,
    UPDATE: (id: string) => `${API_BASE_URL}/study-lists/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/study-lists/${id}`,
    ADD_ITEM: (id: string) => `${API_BASE_URL}/study-lists/${id}/items`,
    REMOVE_ITEM: (id: string, itemId: string) =>
      `${API_BASE_URL}/study-lists/${id}/items/${itemId}`,
  },

  // Review Endpoints
  REVIEW: {
    START: `${API_BASE_URL}/review/start`,
    SUBMIT: `${API_BASE_URL}/review/submit`,
    HISTORY: `${API_BASE_URL}/review/history`,
    DUE: `${API_BASE_URL}/review/due`,
  },

  // Auth Endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
  },

  // User Endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    SETTINGS: `${API_BASE_URL}/user/settings`,
    STATS: `${API_BASE_URL}/user/stats`,
  },
} as const;

// Export base URL for custom endpoints
export { API_BASE_URL };
