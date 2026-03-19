/**
 * Application Constants
 * Centralized configuration values
 */

export const APP_NAME = "Sakura & Matcha" as const;
export const APP_VERSION = "1.0.0" as const;

// JLPT Levels
export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;

// Mastery Thresholds
export const MASTERY_LEVELS = {
  BEGINNER: 0,
  LEARNING: 25,
  INTERMEDIATE: 50,
  ADVANCED: 75,
  MASTERED: 100,
} as const;

// Study Session Settings
export const STUDY_SETTINGS = {
  SESSION_DURATION: 30, // minutes
  CARDS_PER_SESSION: 20,
  REVIEW_INTERVAL_DAYS: 1, // Spaced repetition
  MASTERY_THRESHOLD: 90, // percentage
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  USER_PROGRESS: "sakura_matcha_progress",
  STUDY_LISTS: "sakura_matcha_study_lists",
  SETTINGS: "sakura_matcha_settings",
  AUTH_TOKEN: "sakura_matcha_auth_token",
} as const;
