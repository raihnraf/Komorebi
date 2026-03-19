/**
 * Kanji Service
 * Mock API functions for kanji data
 */

import type { Kanji, JLPTLevel } from "@/types";
import { kanjiData } from "@/data/kanji.json";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all kanji with optional filters
 */
export async function fetchKanjiList(options?: {
  level?: JLPTLevel[];
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: Kanji[]; total: number; hasMore: boolean }> {
  await delay(500); // Simulate API delay

  let filtered = [...kanjiData];

  // Filter by JLPT level
  if (options?.level && options.level.length > 0) {
    filtered = filtered.filter((k) => options.level!.includes(k.jlptLevel));
  }

  // Filter by search query
  if (options?.search) {
    const query = options.search.toLowerCase();
    filtered = filtered.filter(
      (k) =>
        k.character.includes(query) ||
        k.meanings.some((m) => m.toLowerCase().includes(query)) ||
        k.onyomi.some((o) => o.includes(query)) ||
        k.kunyomi.some((k) => k.includes(query)),
    );
  }

  const total = filtered.length;
  const page = options?.page || 1;
  const pageSize = options?.pageSize || 20;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: filtered.slice(start, end),
    total,
    hasMore: end < total,
  };
}

/**
 * Fetch single kanji by ID
 */
export async function fetchKanjiDetail(id: string): Promise<Kanji> {
  await delay(300);

  const kanji = kanjiData.find((k) => k.id === id);

  if (!kanji) {
    throw new Error(`Kanji "${id}" not found`);
  }

  return kanji;
}

/**
 * Search kanji
 */
export async function searchKanji(query: string): Promise<Kanji[]> {
  await delay(400);

  const searchQuery = query.toLowerCase();

  return kanjiData.filter(
    (k) =>
      k.character.includes(searchQuery) ||
      k.meanings.some((m) => m.toLowerCase().includes(searchQuery)) ||
      k.onyomi.some((o) => o.toLowerCase().includes(searchQuery)) ||
      k.kunyomi.some((k) => k.toLowerCase().includes(searchQuery)),
  );
}

/**
 * Get kanji by JLPT level
 */
export async function getKanjiByLevel(level: JLPTLevel): Promise<Kanji[]> {
  await delay(300);

  return kanjiData.filter((k) => k.jlptLevel === level);
}

/**
 * Get random kanji (for "Word of the Day")
 */
export async function getRandomKanji(): Promise<Kanji> {
  await delay(200);

  const randomIndex = Math.floor(Math.random() * kanjiData.length);
  return kanjiData[randomIndex];
}

/**
 * Get stroke count range
 */
export async function getKanjiByStrokeRange(
  min: number,
  max: number,
): Promise<Kanji[]> {
  await delay(300);

  return kanjiData.filter((k) => k.strokes >= min && k.strokes <= max);
}
