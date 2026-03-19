import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ReviewItem {
  id: string;
  kanjiId: string;
  character: string;
  readings: { onyomi: string[]; kunyomi: string[] };
  meanings: string[];
  jlptLevel: "N5" | "N4" | "N3" | "N2" | "N1";
  radicals?: { character: string; meaning: string }[];
  masteryLevel: "Apprentice" | "Guru I" | "Guru II" | "Master" | "Enlightened";
  masteryProgress: number;
}

export interface ReviewSession {
  isActive: boolean;
  items: ReviewItem[];
  currentIndex: number;
  completedCount: number;
  correctCount: number;
  incorrectCount: number;
  startTime: Date | null;
  estimatedEndTime: Date | null;
  totalTimeSeconds: number;
  averageTimePerItem: number;
}

interface ReviewSessionState {
  session: ReviewSession;
  currentItem: ReviewItem | null;
  userAnswer: string;
  showHint: boolean;
  isCorrect: boolean | null;

  // Actions
  startSession: (items: ReviewItem[]) => void;
  endSession: () => void;
  setCurrentItem: (index: number) => void;
  setUserAnswer: (answer: string) => void;
  submitAnswer: () => void;
  skipItem: () => void;
  toggleHint: () => void;
  resetSession: () => void;
}

// Mock data for initial testing - will be moved to API in production
export const MOCK_REVIEW_ITEMS_FOR_TEST: ReviewItem[] = [
  {
    id: "1",
    kanjiId: "kanji-1",
    character: "進",
    readings: {
      onyomi: ["シン"],
      kunyomi: ["すす.む", "すす.める"],
    },
    meanings: ["advance", "proceed", "progress"],
    jlptLevel: "N3",
    radicals: [
      { character: "辶", meaning: "walk" },
      { character: "隹", meaning: "bird" },
    ],
    masteryLevel: "Guru II",
    masteryProgress: 60,
  },
  {
    id: "2",
    kanjiId: "kanji-2",
    character: "学",
    readings: {
      onyomi: ["ガク"],
      kunyomi: ["まな.ぶ"],
    },
    meanings: ["study", "learning", "science"],
    jlptLevel: "N5",
    radicals: [
      { character: "子", meaning: "child" },
    ],
    masteryLevel: "Master",
    masteryProgress: 80,
  },
  {
    id: "3",
    kanjiId: "kanji-3",
    character: "食",
    readings: {
      onyomi: ["ショク", "ジキ"],
      kunyomi: ["た.べる", "く.う"],
    },
    meanings: ["eat", "food"],
    jlptLevel: "N5",
    radicals: [
      { character: "食", meaning: "food" },
    ],
    masteryLevel: "Guru I",
    masteryProgress: 40,
  },
];

const INITIAL_SESSION: ReviewSession = {
  isActive: false,
  items: [],
  currentIndex: 0,
  completedCount: 0,
  correctCount: 0,
  incorrectCount: 0,
  startTime: null,
  estimatedEndTime: null,
  totalTimeSeconds: 0,
  averageTimePerItem: 0,
};

export const useReviewSessionStore = create<ReviewSessionState>()(
  devtools((set, get) => ({
    session: INITIAL_SESSION,
    currentItem: null,
    userAnswer: "",
    showHint: false,
    isCorrect: null,

    startSession: (items: ReviewItem[]) => {
      const now = new Date();
      const estimatedEnd = new Date(now.getTime() + 14 * 60 * 1000); // 14 minutes

      set({
        session: {
          ...INITIAL_SESSION,
          isActive: true,
          items,
          startTime: now,
          estimatedEndTime: estimatedEnd,
        },
        currentItem: items[0] || null,
        userAnswer: "",
        showHint: false,
        isCorrect: null,
      });
    },

    endSession: () => {
      set({
        session: INITIAL_SESSION,
        currentItem: null,
        userAnswer: "",
        showHint: false,
        isCorrect: null,
      });
    },

    setCurrentItem: (index: number) => {
      const { session } = get();
      if (index >= 0 && index < session.items.length) {
        set({
          currentItem: session.items[index],
          session: {
            ...session,
            currentIndex: index,
          },
          userAnswer: "",
          showHint: false,
          isCorrect: null,
        });
      }
    },

    setUserAnswer: (answer: string) => {
      set({ userAnswer: answer });
    },

    submitAnswer: () => {
      const { session, currentItem, userAnswer } = get();
      if (!currentItem || !userAnswer.trim()) return;

      // Simple check - in real app, would use more sophisticated matching
      const correctReadings = [
        ...currentItem.readings.onyomi,
        ...currentItem.readings.kunyomi,
      ];
      const correctMeanings = currentItem.meanings;

      const isCorrect =
        correctReadings.some(r => userAnswer.toLowerCase().includes(r.toLowerCase())) ||
        correctMeanings.some(m => userAnswer.toLowerCase().includes(m.toLowerCase()));

      const newCompletedCount = session.completedCount + 1;
      const newCorrectCount = isCorrect ? session.correctCount + 1 : session.correctCount;
      const newIncorrectCount = isCorrect ? session.incorrectCount : session.incorrectCount + 1;

      // Calculate average time
      const totalTime = session.totalTimeSeconds + 2.4; // Mock 2.4s per answer
      const avgTime = totalTime / newCompletedCount;

      // Move to next item or end session
      const nextIndex = session.currentIndex + 1;
      const hasMoreItems = nextIndex < session.items.length;

      set({
        isCorrect,
        session: {
          ...session,
          completedCount: newCompletedCount,
          correctCount: newCorrectCount,
          incorrectCount: newIncorrectCount,
          totalTimeSeconds: totalTime,
          averageTimePerItem: avgTime,
          currentIndex: hasMoreItems ? nextIndex : session.currentIndex,
        },
        userAnswer: "",
        showHint: false,
      });

      // Load next item after delay
      if (hasMoreItems) {
        setTimeout(() => {
          const { session: updatedSession } = get();
          set({
            currentItem: updatedSession.items[updatedSession.currentIndex],
            isCorrect: null,
          });
        }, 1000);
      }
    },

    skipItem: () => {
      const { session } = get();
      const nextIndex = session.currentIndex + 1;
      const hasMoreItems = nextIndex < session.items.length;

      if (hasMoreItems) {
        set({
          session: {
            ...session,
            currentIndex: nextIndex,
          },
          currentItem: session.items[nextIndex],
          userAnswer: "",
          showHint: false,
          isCorrect: null,
        });
      }
    },

    toggleHint: () => {
      set((state) => ({ showHint: !state.showHint }));
    },

    resetSession: () => {
      set({
        session: INITIAL_SESSION,
        currentItem: null,
        userAnswer: "",
        showHint: false,
        isCorrect: null,
      });
    },
  })),
);
