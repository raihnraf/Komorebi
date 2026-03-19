/**
 * React Query Hooks
 * Custom hooks that integrate service layer with React Query
 */

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { kanjiService, progressService, studyListService } from "./api";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Kanji, JLPTLevel, UserProgress, StudyProgress, StudyListItem } from "@/types";

/**
 * Query Keys
 * Centralized query key factory for better cache management
 */
export const queryKeys = {
  // Kanji queries
  kanji: {
    all: ["kanji"] as const,
    lists: () => ["kanji", "list"] as const,
    list: (filters?: { jlptLevel?: JLPTLevel; search?: string }) =>
      ["kanji", "list", filters] as const,
    details: () => ["kanji", "detail"] as const,
    detail: (id: string) => ["kanji", "detail", id] as const,
    byLevel: (level: JLPTLevel) => ["kanji", "level", level] as const,
    search: (query: string) => ["kanji", "search", query] as const,
    random: () => ["kanji", "random"] as const,
  },

  // Progress queries
  progress: {
    all: ["progress"] as const,
    user: () => ["progress", "user"] as const,
    kanji: (kanjiId: string) => ["progress", "kanji", kanjiId] as const,
    stats: () => ["progress", "stats"] as const,
  },

  // Study list queries
  studyLists: {
    all: ["studyLists"] as const,
    lists: () => ["studyLists", "list"] as const,
    detail: (id: string) => ["studyLists", "detail", id] as const,
  },
} as const;

/**
 * Kanji Hooks
 */
export const useKanjiList = (params?: {
  jlptLevel?: JLPTLevel;
  page?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.kanji.list(params),
    queryFn: () => kanjiService.getList(params),
  });
};

export const useKanji = (id: string, options?: Omit<UseQueryOptions<Kanji>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: queryKeys.kanji.detail(id),
    queryFn: () => kanjiService.getById(id),
    enabled: !!id && (options?.enabled ?? true),
  });
};

export const useKanjiByLevel = (level: JLPTLevel) => {
  return useQuery({
    queryKey: queryKeys.kanji.byLevel(level),
    queryFn: () => kanjiService.getByLevel(level),
  });
};

export const useKanjiSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.kanji.search(query),
    queryFn: () => kanjiService.search(query),
    enabled: query.length > 0,
  });
};

export const useRandomKanji = (count?: number) => {
  return useQuery({
    queryKey: queryKeys.kanji.random(),
    queryFn: () => kanjiService.getRandom(count),
    refetchOnWindowFocus: false,
  });
};

/**
 * Progress Hooks
 */
export const useUserProgress = () => {
  return useQuery({
    queryKey: queryKeys.progress.user(),
    queryFn: () => progressService.getUserProgress(),
  });
};

export const useKanjiProgress = (kanjiId: string) => {
  return useQuery({
    queryKey: queryKeys.progress.kanji(kanjiId),
    queryFn: () => progressService.getKanjiProgress(kanjiId),
    enabled: !!kanjiId,
  });
};

export const useProgressStats = () => {
  return useQuery({
    queryKey: queryKeys.progress.stats(),
    queryFn: () => progressService.getStats(),
  });
};

/**
 * Progress Mutations
 */
export const useUpdateKanjiProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ kanjiId, data }: { kanjiId: string; data: { mastery: number; timesStudied: number } }) =>
      progressService.updateKanjiProgress(kanjiId, data),
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.kanji(variables.kanjiId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.user() });
    },
  });
};

/**
 * Study List Hooks
 */
export const useStudyLists = () => {
  return useQuery({
    queryKey: queryKeys.studyLists.lists(),
    queryFn: () => studyListService.getAll(),
  });
};

export const useStudyList = (id: string) => {
  return useQuery({
    queryKey: queryKeys.studyLists.detail(id),
    queryFn: () => studyListService.getById(id),
    enabled: !!id,
  });
};

/**
 * Study List Mutations
 */
export const useCreateStudyList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      description?: string;
      items: Array<{ itemId: string; type: "kanji" | "vocabulary" }>;
    }) => studyListService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyLists.lists() });
    },
  });
};

export const useUpdateStudyList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; description?: string } }) =>
      studyListService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyLists.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.studyLists.lists() });
    },
  });
};

export const useDeleteStudyList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studyListService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyLists.lists() });
    },
  });
};

export const useAddStudyListItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, item }: { id: string; item: { itemId: string; type: "kanji" | "vocabulary" } }) =>
      studyListService.addItem(id, item),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyLists.detail(variables.id) });
    },
  });
};

export const useRemoveStudyListItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, itemId }: { id: string; itemId: string }) =>
      studyListService.removeItem(id, itemId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.studyLists.detail(variables.id) });
    },
  });
};
