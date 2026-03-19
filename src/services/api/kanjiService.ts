/**
 * Kanji Service
 * API service for kanji-related operations
 */

import { httpClient } from "./httpClient";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { Kanji, JLPTLevel, PaginatedResponse } from "@/types";

/**
 * Kanji Service API
 */
export const kanjiService = {
  /**
   * Get list of kanji with optional filtering
   */
  async getList(params?: {
    jlptLevel?: JLPTLevel;
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<PaginatedResponse<Kanji>> {
    return httpClient.get<PaginatedResponse<Kanji>>(API_ENDPOINTS.KANJI.LIST, {
      // Add query parameters if needed
    });
  },

  /**
   * Get kanji by ID
   */
  async getById(id: string): Promise<Kanji> {
    return httpClient.get<Kanji>(API_ENDPOINTS.KANJI.BY_ID(id));
  },

  /**
   * Get kanji by JLPT level
   */
  async getByLevel(level: JLPTLevel): Promise<Kanji[]> {
    return httpClient.get<Kanji[]>(API_ENDPOINTS.KANJI.BY_LEVEL(level));
  },

  /**
   * Search kanji
   */
  async search(query: string): Promise<Kanji[]> {
    return httpClient.get<Kanji[]>(API_ENDPOINTS.KANJI.SEARCH, {
      // Add search parameters
    });
  },

  /**
   * Get random kanji
   */
  async getRandom(count?: number): Promise<Kanji[]> {
    return httpClient.get<Kanji[]>(API_ENDPOINTS.KANJI.RANDOM);
  },
};
