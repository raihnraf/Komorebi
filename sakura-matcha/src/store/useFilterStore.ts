import { create } from "zustand";
import type { JLPTLevel } from "@/types";

interface FilterState {
  activeLevels: JLPTLevel[];
  searchQuery: string;
  sortBy: "level" | "strokes" | "mastery";
  
  setLevels: (levels: JLPTLevel[]) => void;
  toggleLevel: (level: JLPTLevel) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: "level" | "strokes" | "mastery") => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeLevels: [],
  searchQuery: "",
  sortBy: "level",
  
  setLevels: (levels) => set({ activeLevels: levels }),
  
  toggleLevel: (level) =>
    set((state) => ({
      activeLevels: state.activeLevels.includes(level)
        ? state.activeLevels.filter((l) => l !== level)
        : [...state.activeLevels, level],
    })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  resetFilters: () =>
    set({
      activeLevels: [],
      searchQuery: "",
      sortBy: "level",
    }),
}));
