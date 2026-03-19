/**
 * Progress Service
 * API service for user progress tracking
 */

import { httpClient } from "./httpClient";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { UserProgress, StudyProgress } from "@/types";

/**
 * Progress Service API
 */
export const progressService = {
  /**
   * Get user progress
   */
  async getUserProgress(): Promise<UserProgress> {
    return httpClient.get<UserProgress>(API_ENDPOINTS.PROGRESS.USER);
  },

  /**
   * Get progress for specific kanji
   */
  async getKanjiProgress(kanjiId: string): Promise<StudyProgress> {
    return httpClient.get<StudyProgress>(API_ENDPOINTS.PROGRESS.KANJI(kanjiId));
  },

  /**
   * Update progress for a kanji
   */
  async updateKanjiProgress(
    kanjiId: string,
    data: {
      mastery: number;
      timesStudied: number;
    }
  ): Promise<StudyProgress> {
    return httpClient.post<StudyProgress>(
      API_ENDPOINTS.PROGRESS.UPDATE,
      {
        kanjiId,
        ...data,
      }
    );
  },

  /**
   * Get user statistics
   */
  async getStats(): Promise<{
    totalStudied: number;
    averageAccuracy: number;
    studyStreak: number;
  }> {
    return httpClient.get(API_ENDPOINTS.PROGRESS.STATS);
  },
};
