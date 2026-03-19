import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface StudyListItem {
  id: string;
  character: string;
  readings: { onyomi: string[]; kunyomi: string[] };
  meanings: string[];
  jlptLevel: "N5" | "N4" | "N3" | "N2" | "N1";
  category: "kanji" | "vocabulary" | "grammar";
  mastery: number;
  isFavorite: boolean;
  lastReviewed: string | null;
}

export interface StudyList {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  itemCount: number;
  completedCount: number;
  items: StudyListItem[];
  category: "jlpt" | "topic" | "custom";
}

interface StudyListState {
  lists: StudyList[];
  selectedList: StudyList | null;
  filter: {
    jlptLevel: string | null;
    category: string | null;
    searchQuery: string;
  };
  isCreatingList: boolean;

  // Actions
  setLists: (lists: StudyList[]) => void;
  selectList: (list: StudyList | null) => void;
  updateFilter: (filter: Partial<StudyListState["filter"]>) => void;
  toggleFavorite: (itemId: string) => void;
  createList: (list: StudyList) => void;
  deleteList: (listId: string) => void;
  resetFilters: () => void;
}

// Mock data for study lists
export const MOCK_STUDY_LISTS: StudyList[] = [
  {
    id: "list-1",
    title: "Food & Dining",
    description: "Essential vocabulary for restaurants and cooking",
    icon: "utensils",
    color: "bg-jlpt-n5/20",
    itemCount: 24,
    completedCount: 18,
    category: "topic",
    items: [
      {
        id: "item-1",
        character: "食",
        readings: { onyomi: ["ショク", "ジキ"], kunyomi: ["た.べる", "く.う"] },
        meanings: ["eat", "food"],
        jlptLevel: "N5",
        category: "kanji",
        mastery: 75,
        isFavorite: true,
        lastReviewed: "2026-03-18",
      },
      {
        id: "item-2",
        character: "飲",
        readings: { onyomi: ["イン"], kunyomi: ["の.む"] },
        meanings: ["drink"],
        jlptLevel: "N5",
        category: "kanji",
        mastery: 60,
        isFavorite: false,
        lastReviewed: "2026-03-17",
      },
      {
        id: "item-3",
        character: "料理",
        readings: { onyomi: [], kunyomi: ["りょうり"] },
        meanings: ["cooking", "cuisine"],
        jlptLevel: "N5",
        category: "vocabulary",
        mastery: 90,
        isFavorite: true,
        lastReviewed: "2026-03-19",
      },
    ],
  },
  {
    id: "list-2",
    title: "City Life",
    description: "Kanji and words for navigating urban Japan",
    icon: "building",
    color: "bg-jlpt-n4/20",
    itemCount: 48,
    completedCount: 32,
    category: "topic",
    items: [
      {
        id: "item-4",
        character: "駅",
        readings: { onyomi: ["エキ"], kunyomi: [] },
        meanings: ["station"],
        jlptLevel: "N4",
        category: "kanji",
        mastery: 45,
        isFavorite: false,
        lastReviewed: "2026-03-16",
      },
      {
        id: "item-5",
        character: "道",
        readings: { onyomi: ["ドウ", "トウ"], kunyomi: ["みち"] },
        meanings: ["road", "path", "way"],
        jlptLevel: "N4",
        category: "kanji",
        mastery: 80,
        isFavorite: true,
        lastReviewed: "2026-03-18",
      },
    ],
  },
  {
    id: "list-3",
    title: "Business Japanese",
    description: "Formal language for professional settings",
    icon: "briefcase",
    color: "bg-jlpt-n1/20",
    itemCount: 32,
    completedCount: 12,
    category: "topic",
    items: [
      {
        id: "item-6",
        character: "会",
        readings: { onyomi: ["カイ", "エ"], kunyomi: ["あ.う"] },
        meanings: ["meeting", "meet", "party"],
        jlptLevel: "N3",
        category: "kanji",
        mastery: 30,
        isFavorite: false,
        lastReviewed: null,
      },
      {
        id: "item-7",
        character: "仕事",
        readings: { onyomi: [], kunyomi: ["しごと"] },
        meanings: ["work", "job", "business"],
        jlptLevel: "N4",
        category: "vocabulary",
        mastery: 55,
        isFavorite: true,
        lastReviewed: "2026-03-15",
      },
    ],
  },
  {
    id: "list-4",
    title: "JLPT N5 Kanji",
    description: "All 103 kanji required for JLPT N5",
    icon: "book",
    color: "bg-jlpt-n5/20",
    itemCount: 103,
    completedCount: 87,
    category: "jlpt",
    items: [],
  },
  {
    id: "list-5",
    title: "JLPT N4 Kanji",
    description: "All 326 kanji required for JLPT N4",
    icon: "book",
    color: "bg-jlpt-n4/20",
    itemCount: 326,
    completedCount: 156,
    category: "jlpt",
    items: [],
  },
  {
    id: "list-6",
    title: "Travel Essentials",
    description: "Must-know phrases for traveling in Japan",
    icon: "plane",
    color: "bg-jlpt-n3/20",
    itemCount: 56,
    completedCount: 42,
    category: "topic",
    items: [],
  },
];

export const useStudyListStore = create<StudyListState>()(
  devtools((set) => ({
    lists: MOCK_STUDY_LISTS,
    selectedList: null,
    filter: {
      jlptLevel: null,
      category: null,
      searchQuery: "",
    },
    isCreatingList: false,

    setLists: (lists) => {
      set({ lists });
    },

    selectList: (list) => {
      set({ selectedList: list });
    },

    updateFilter: (filter) => {
      set((state) => ({
        filter: { ...state.filter, ...filter },
      }));
    },

    toggleFavorite: (itemId: string) => {
      set((state) => ({
        lists: state.lists.map((list) => ({
          ...list,
          items: list.items.map((item) =>
            item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
          ),
        })),
      }));
    },

    createList: (list) => {
      set((state) => ({
        lists: [...state.lists, list],
      }));
    },

    deleteList: (listId: string) => {
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== listId),
        selectedList: state.selectedList?.id === listId ? null : state.selectedList,
      }));
    },

    resetFilters: () => {
      set({
        filter: {
          jlptLevel: null,
          category: null,
          searchQuery: "",
        },
      });
    },
  })),
);
