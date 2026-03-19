"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Lightbulb, Info, SkipForward, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useReviewSessionStore, MOCK_REVIEW_ITEMS_FOR_TEST } from "@/store/useReviewSessionStore";

export function ReviewPage() {
  const {
    session,
    currentItem,
    userAnswer,
    showHint,
    isCorrect,
    startSession,
    setUserAnswer,
    submitAnswer,
    skipItem,
    toggleHint,
    resetSession,
  } = useReviewSessionStore();

  // Start session on mount
  useEffect(() => {
    if (!session.isActive && MOCK_REVIEW_ITEMS_FOR_TEST.length > 0) {
      startSession(MOCK_REVIEW_ITEMS_FOR_TEST);
    }
  }, [session.isActive, startSession]);

  const progressPercentage =
    session.items.length > 0
      ? (session.completedCount / session.items.length) * 100
      : 0;

  const accuracy =
    session.completedCount > 0
      ? Math.round((session.correctCount / session.completedCount) * 100)
      : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderMasteryBars = (progress: number) => {
    const filledBars = Math.ceil((progress / 100) * 5);
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((bar) => (
          <div
            key={bar}
            className={`w-3 h-8 border-2 border-[#1A1A1A] ${
              bar <= filledBars
                ? "bg-on-tertiary-fixed"
                : "bg-surface-container-lowest"
            }`}
          />
        ))}
      </div>
    );
  };

  if (!session.isActive || !currentItem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card variant="neo" className="p-12 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Review?</h2>
          <p className="text-surface-on-surface-variant mb-8">
            Start your daily spaced repetition session
          </p>
          <Button
            variant="neo"
            onClick={() =>
              startSession([
                {
                  id: "1",
                  kanjiId: "kanji-1",
                  character: "進",
                  readings: { onyomi: ["シン"], kunyomi: ["すす.む"] },
                  meanings: ["advance", "proceed"],
                  jlptLevel: "N3",
                  radicals: [{ character: "辶", meaning: "walk" }],
                  masteryLevel: "Guru II",
                  masteryProgress: 60,
                },
              ])
            }
            className="px-12 py-6 text-lg"
          >
            Start Session
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Session Header & Progress */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center px-4 py-1 bg-primary-fixed border-2 border-[#1A1A1A] rounded-full hard-shadow-sm">
            <span className="text-xs font-black uppercase tracking-widest text-on-surface">
              Active Session
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter">Daily Review</h2>
          <p className="text-surface-on-surface-variant font-medium">
            Spaced Repetition: Batch 04
          </p>
        </div>

        <div className="w-full md:w-72 space-y-3">
          <div className="flex justify-between items-end font-bold">
            <span className="text-sm">Session Progress</span>
            <span className="text-xl">
              {session.completedCount}/{session.items.length}{" "}
              <span className="text-surface-on-surface-variant text-sm font-medium">
                items
              </span>
            </span>
          </div>
          <div className="h-6 w-full bg-surface-container-high border-2 border-[#1A1A1A] hard-shadow-sm overflow-hidden p-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-primary-fixed border-r-2 border-[#1A1A1A]"
            />
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
        {/* Main Content: Kanji Card */}
        <Card
          variant="neo"
          className="md:col-span-8 p-8 flex flex-col items-center justify-center min-h-[400px] relative bg-primary-fixed"
        >
          <div className="absolute top-4 left-4">
            <Badge variant={currentItem.jlptLevel}>JLPT {currentItem.jlptLevel}</Badge>
          </div>

          <div className="text-center space-y-6">
            <motion.span
              key={currentItem.character}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="font-japanese text-9xl md:text-[12rem] font-black text-[#1A1A1A] leading-none select-none"
            >
              {currentItem.character}
            </motion.span>

            <div className="flex gap-2 justify-center">
              <span className="px-4 py-1 bg-on-primary-fixed text-primary-fixed font-bold border-2 border-[#1A1A1A]">
                Level 14
              </span>
              <span className="px-4 py-1 bg-surface-container-lowest text-on-surface font-bold border-2 border-[#1A1A1A]">
                Kanji
              </span>
            </div>
          </div>
        </Card>

        {/* Interaction Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Input Box */}
          <Card variant="neo" className="p-6 flex flex-col gap-4">
            <label className="font-black uppercase tracking-wider text-xs text-surface-on-surface-variant">
              Your Answer
            </label>
            <input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
              className="w-full bg-surface-container-low border-2 border-[#1A1A1A] p-4 font-bold text-xl focus:outline-none focus:ring-0"
              placeholder="Reading or Meaning..."
              type="text"
              disabled={isCorrect !== null}
            />
            <Button
              onClick={submitAnswer}
              disabled={!userAnswer.trim() || isCorrect !== null}
              className="w-full py-4 text-lg gap-2"
              variant="neo"
            >
              Check <ArrowRight className="w-5 h-5" />
            </Button>

            {/* Feedback */}
            <AnimatePresence>
              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 border-2 border-[#1A1A1A] font-black text-center ${
                    isCorrect
                      ? "bg-primary-fixed text-on-primary-fixed-variant"
                      : "bg-error text-on-error"
                  }`}
                >
                  {isCorrect ? "Correct! 正解!" : "Incorrect. 不正解"}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Radical / Component Info */}
          <Card variant="neo" className="p-6 bg-secondary-container">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-sm uppercase tracking-widest">
                Components
              </h3>
              <Info className="w-5 h-5" />
            </div>

            {currentItem.radicals && currentItem.radicals.length > 0 ? (
              <>
                <div className="flex gap-3">
                  {currentItem.radicals.map((radical, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest border-2 border-[#1A1A1A] hard-shadow-sm"
                    >
                      <span className="font-japanese text-2xl">
                        {radical.character}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium leading-relaxed">
                  The radical{" "}
                  <span className="font-japanese font-bold">
                    {currentItem.radicals[0]?.character}
                  </span>{" "}
                  ({currentItem.radicals[0]?.meaning}) suggests the meaning of
                  this kanji.
                </p>
              </>
            ) : (
              <p className="text-sm font-medium text-surface-on-surface-variant">
                No radical information available
              </p>
            )}
          </Card>
        </div>

        {/* Bottom Bento Row */}
        {/* Hint Box */}
        <Card
          variant="neo"
          className="md:col-span-4 p-6 flex items-start gap-4 hover:bg-surface-container-high transition-colors cursor-pointer group"
          onClick={toggleHint}
        >
          <div className="p-3 bg-surface-container-lowest border-2 border-[#1A1A1A] group-hover:scale-110 transition-transform">
            <Lightbulb className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-black text-sm uppercase mb-1">Struggling?</h4>
            <p className="text-sm font-medium text-surface-on-surface-variant">
              Show mnemonics or stroke order animation.
            </p>
          </div>
        </Card>

        {/* Mastery Level */}
        <Card variant="neo" className="md:col-span-4 p-6 bg-tertiary-fixed flex items-center justify-between">
          <div>
            <h4 className="font-black text-sm uppercase mb-1">
              Current Mastery
            </h4>
            <p className="text-2xl font-black">{currentItem.masteryLevel}</p>
          </div>
          {renderMasteryBars(currentItem.masteryProgress)}
        </Card>

        {/* Quick Action */}
        <Card
          variant="neo"
          className="md:col-span-4 p-6 bg-secondary-fixed flex items-center justify-center"
        >
          <Button
            onClick={skipItem}
            variant="neo"
            className="gap-2 font-black text-sm uppercase tracking-widest"
          >
            Skip Item <SkipForward className="w-5 h-5" />
          </Button>
        </Card>
      </div>

      {/* Session Statistics Preview */}
      <Card variant="neo" className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-1">
          <p className="text-xs font-black text-surface-on-surface-variant uppercase tracking-widest">
            Accuracy
          </p>
          <p className="text-3xl font-black">{accuracy}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-surface-on-surface-variant uppercase tracking-widest">
            Avg Time
          </p>
          <p className="text-3xl font-black">
            {session.averageTimePerItem.toFixed(1)}s
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-surface-on-surface-variant uppercase tracking-widest">
            Completed
          </p>
          <p className="text-3xl font-black">{session.completedCount}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-surface-on-surface-variant uppercase tracking-widest">
            Est. End
          </p>
          <p className="text-3xl font-black">
            ~{formatTime(session.totalTimeSeconds)}
          </p>
        </div>
      </Card>

      {/* Hint Panel (Collapsible) */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card variant="neo" className="p-6 bg-surface-container-low">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-black uppercase">Hints</h4>
                <Button
                  onClick={toggleHint}
                  variant="ghost"
                  size="sm"
                  className="p-2"
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-black uppercase text-surface-on-surface-variant mb-2">
                    Onyomi Reading
                  </p>
                  <p className="font-japanese font-bold text-lg">
                    {currentItem.readings.onyomi.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-surface-on-surface-variant mb-2">
                    Kunyomi Reading
                  </p>
                  <p className="font-japanese font-bold text-lg">
                    {currentItem.readings.kunyomi.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-surface-on-surface-variant mb-2">
                    Mnemonic
                  </p>
                  <p className="font-medium">
                    The radical {currentItem.radicals?.[0]?.character} (
                    {currentItem.radicals?.[0]?.meaning}) helps you remember:{" "}
                    {currentItem.meanings[0]}.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End Session Button */}
      {session.completedCount > 0 && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={resetSession}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            End Session
          </Button>
        </div>
      )}
    </div>
  );
}
