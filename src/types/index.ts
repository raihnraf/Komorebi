/**
 * Global Types for Sakura & Matcha
 */

// JLPT Levels
export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

// Kanji Types
export interface Kanji {
  id: string;
  character: string;
  jlptLevel: JLPTLevel;
  strokes: number;
  onyomi: string[];
  kunyomi: string[];
  meanings: string[];
  examples: KanjiExample[];
  radical: Radical;
}

export interface KanjiExample {
  japanese: string;
  romaji: string;
  english: string;
}

export interface Radical {
  character: string;
  name: string;
  number: number;
}

// Vocabulary Types
export interface Vocabulary {
  id: string;
  term: string;
  reading: string;
  meaning: string;
  jlptLevel: JLPTLevel;
  partOfSpeech: string;
  examples?: string[];
}

// Progress Types
export interface StudyProgress {
  kanjiId: string;
  mastery: number; // 0-100
  lastReviewed: Date | null;
  timesStudied: number;
  isMastered: boolean;
}

export interface UserProgress {
  totalKanji: number;
  masteredKanji: number;
  currentStreak: number;
  longestStreak: number;
  weeklyProgress: WeeklyProgress[];
  sessionStats: SessionStats;
}

export interface WeeklyProgress {
  day: string;
  count: number;
}

export interface SessionStats {
  kanjiStudied: number;
  accuracy: number;
  timeSpent: number; // in seconds
}

// Study List Types
export interface StudyListItem {
  id: string;
  type: "kanji" | "vocabulary";
  itemId: string;
  addedAt: Date;
  isMastered: boolean;
  masteredAt?: Date;
}

// Filter Types
export interface FilterState {
  jlptLevels: JLPTLevel[];
  searchQuery: string;
  sortBy: "level" | "strokes" | "mastery";
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
