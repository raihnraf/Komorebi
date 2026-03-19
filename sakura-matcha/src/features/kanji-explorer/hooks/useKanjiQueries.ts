/**
 * Kanji Query Hooks
 * TanStack Query hooks for kanji data fetching
 */

import { useQuery, useQueries } from "@tanstack/react-query";
import {
  fetchKanjiList,
  fetchKanjiDetail,
  searchKanji,
  getKanjiByLevel,
  getRandomKanji,
} from "../services/kanjiService";
import type { JLPTLevel } from "@/types";

/**
 * Hook to fetch kanji list with filters
 */
export function useKanjiList(options?: {
  levels?: JLPTLevel[];
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ["kanji", "list", options].filter(Boolean),
    queryFn: () => fetchKanjiList(options),
  });
}

/**
 * Hook to fetch single kanji detail
 */
export function useKanjiDetail(id: string) {
  return useQuery({
    queryKey: ["kanji", "detail", id],
    queryFn: () => fetchKanjiDetail(id),
    enabled: !!id,
  });
}

/**
 * Hook to search kanji
 */
export function useKanjiSearch(query: string) {
  return useQuery({
    queryKey: ["kanji", "search", query],
    queryFn: () => searchKanji(query),
    enabled: query.length > 0,
  });
}

/**
 * Hook to get kanji by JLPT level
 */
export function useKanjiByLevel(level: JLPTLevel) {
  return useQuery({
    queryKey: ["kanji", "level", level],
    queryFn: () => getKanjiByLevel(level),
  });
}

/**
 * Hook to get random kanji (Word of the Day)
 */
export function useRandomKanji() {
  return useQuery({
    queryKey: ["kanji", "random"],
    queryFn: getRandomKanji,
  });
}

/**
 * Hook to fetch multiple kanji details at once
 */
export function useKanjiDetails(ids: string[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["kanji", "detail", id],
      queryFn: () => fetchKanjiDetail(id),
    })),
  });
}
