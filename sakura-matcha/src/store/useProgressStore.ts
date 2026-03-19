import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import type { StudyProgress } from "@/types";

interface ProgressState {
  // Mastery tracking
  progress: Record<string, StudyProgress>;
  
  // Session tracking
  sessionKanjiCount: number;
  sessionStartTime: Date | null;
  
  // Streak tracking
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  
  // Actions
  updateProgress: (kanjiId: string, delta: number) => void;
  markAsMastered: (kanjiId: string) => void;
  incrementSessionCount: () => void;
  updateStreak: () => void;
  resetSession: () => void;
}

export const useProgressStore = create<ProgressState>()(
  devtools(
    persist(
      (set, get) => ({
        progress: {},
        sessionKanjiCount: 0,
        sessionStartTime: null,
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: null,
        
        updateProgress: (kanjiId: string, delta: number) => {
          set((state) => {
            const currentProgress = state.progress[kanjiId] || {
              kanjiId,
              mastery: 0,
              lastReviewed: null,
              timesStudied: 0,
              isMastered: false,
            };
            
            const newMastery = Math.min(100, currentProgress.mastery + delta);
            
            return {
              progress: {
                ...state.progress,
                [kanjiId]: {
                  ...currentProgress,
                  mastery: newMastery,
                  lastReviewed: new Date(),
                  timesStudied: currentProgress.timesStudied + 1,
                  isMastered: newMastery >= 100,
                },
              },
            };
          });
        },
        
        markAsMastered: (kanjiId: string) => {
          set((state) => {
            const currentProgress = state.progress[kanjiId] || {
              kanjiId,
              mastery: 0,
              lastReviewed: null,
              timesStudied: 0,
              isMastered: false,
            };
            
            return {
              progress: {
                ...state.progress,
                [kanjiId]: {
                  ...currentProgress,
                  mastery: 100,
                  lastReviewed: new Date(),
                  isMastered: true,
                },
              },
            };
          });
        },
        
        incrementSessionCount: () => {
          set((state) => ({
            sessionKanjiCount: state.sessionKanjiCount + 1,
          }));
        },
        
        updateStreak: () => {
          const today = new Date().toDateString();
          const { lastStudyDate, currentStreak, longestStreak } = get();
          
          if (lastStudyDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            const isNewDay = lastStudyDate !== yesterday.toDateString();
            
            set({
              lastStudyDate: today,
              currentStreak: isNewDay ? currentStreak + 1 : 1,
              longestStreak: Math.max(longestStreak, currentStreak + 1),
            });
          }
        },
        
        resetSession: () => {
          set({
            sessionKanjiCount: 0,
            sessionStartTime: null,
          });
        },
      }),
      { name: "sakura-progress-storage" },
    ),
  ),
);
