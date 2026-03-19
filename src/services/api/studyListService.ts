/**
 * Study List Service
 * API service for study list management
 */

import { httpClient } from "./httpClient";
import { API_ENDPOINTS } from "@/config/endpoints";
import type { StudyListItem } from "@/types";

/**
 * Study List Service API
 */
export const studyListService = {
  /**
   * Get all study lists
   */
  async getAll(): Promise<StudyListItem[]> {
    return httpClient.get<StudyListItem[]>(API_ENDPOINTS.STUDY_LISTS.LIST);
  },

  /**
   * Get study list by ID
   */
  async getById(id: string): Promise<StudyListItem> {
    return httpClient.get<StudyListItem>(API_ENDPOINTS.STUDY_LISTS.BY_ID(id));
  },

  /**
   * Create new study list
   */
  async create(data: {
    name: string;
    description?: string;
    items: Array<{ itemId: string; type: "kanji" | "vocabulary" }>;
  }): Promise<StudyListItem> {
    return httpClient.post<StudyListItem>(API_ENDPOINTS.STUDY_LISTS.CREATE, data);
  },

  /**
   * Update study list
   */
  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
    }
  ): Promise<StudyListItem> {
    return httpClient.put<StudyListItem>(API_ENDPOINTS.STUDY_LISTS.UPDATE(id), data);
  },

  /**
   * Delete study list
   */
  async delete(id: string): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.STUDY_LISTS.DELETE(id));
  },

  /**
   * Add item to study list
   */
  async addItem(
    id: string,
    item: { itemId: string; type: "kanji" | "vocabulary" }
  ): Promise<StudyListItem> {
    return httpClient.post<StudyListItem>(
      API_ENDPOINTS.STUDY_LISTS.ADD_ITEM(id),
      item
    );
  },

  /**
   * Remove item from study list
   */
  async removeItem(id: string, itemId: string): Promise<void> {
    return httpClient.delete<void>(
      API_ENDPOINTS.STUDY_LISTS.REMOVE_ITEM(id, itemId)
    );
  },
};
