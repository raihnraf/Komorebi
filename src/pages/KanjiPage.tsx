"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useKanjiList } from "@/features/kanji-explorer/hooks/useKanjiQueries";
import { useFilterStore } from "@/store/useFilterStore";
import { BookOpen } from "lucide-react";

export function KanjiPage() {
  const { activeLevels } = useFilterStore();
  const { data, isLoading, error } = useKanjiList({
    levels: activeLevels.length > 0 ? activeLevels : undefined,
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-bold text-lg">Loading kanji...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="font-bold text-lg text-error mb-4">Error loading kanji</p>
          <Button variant="primary">Try Again</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1A1A1A] mb-2 uppercase">
          Kanji Explorer
        </h1>
        <p className="text-surface-on-surface-variant font-medium">
          Master Japanese characters one stroke at a time
        </p>
      </div>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="neo" className="rounded-full px-6 py-2 font-black">
          All Levels
        </Button>
        {(["N5", "N4", "N3", "N2", "N1"] as const).map((level) => (
          <Button
            key={level}
            variant="neo"
            className={`rounded-full px-6 py-2 font-black`}
            style={{ backgroundColor: `var(--color-jlpt-${level.toLowerCase()})` }}
          >
            {level}
          </Button>
        ))}
      </div>
      
      {/* Kanji Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data.map((kanji, index) => (
          <motion.div
            key={kanji.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Card
              variant="neo"
              className="group cursor-pointer hover:-translate-y-2 hover:hard-shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                {/* JLPT Badge */}
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={kanji.jlptLevel}>JLPT {kanji.jlptLevel}</Badge>
                </div>
                
                {/* Kanji Character */}
                <div className="text-center py-6">
                  <div className="font-japanese text-6xl font-black mb-2 text-[#1A1A1A]">
                    {kanji.character}
                  </div>
                  <div className="text-surface-on-surface-variant font-bold text-sm tracking-wide uppercase">
                    {kanji.meanings.join(", ")}
                  </div>
                </div>
                
                {/* Readings */}
                <div className="mt-4 pt-4 border-t border-outline-variant/30 space-y-2">
                  {kanji.onyomi.length > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="font-bold opacity-60">ON:</span>
                      <span className="font-japanese font-bold">
                        {kanji.onyomi.join(", ")}
                      </span>
                    </div>
                  )}
                  {kanji.kunyomi.length > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="font-bold opacity-60">KUN:</span>
                      <span className="font-japanese font-bold">
                        {kanji.kunyomi.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Button */}
              <button className="w-full py-4 bg-surface-container-high border-t-2 border-[#1A1A1A] font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-jlpt-n3 transition-colors">
                <BookOpen className="w-4 h-4" />
                Study
              </button>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Load More */}
      {data?.hasMore && (
        <div className="mt-12 w-full bg-jlpt-n3 border-4 border-[#1A1A1A] p-10 hard-shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none mb-4">
              Want More?
            </h2>
            <p className="text-[#1A1A1A] font-bold">
              Load additional kanji to expand your knowledge.
            </p>
          </div>
          <Button variant="neo" className="bg-surface-container-lowest px-12 py-4 font-black uppercase tracking-widest hard-shadow-sm active-press">
            Load More
          </Button>
        </div>
      )}
      
      {!data?.hasMore && (data?.data.length ?? 0) > 0 && (
        <div className="mt-12 text-center">
          <p className="font-bold text-lg text-surface-on-surface-variant">
            You've reached the end! 🎉
          </p>
        </div>
      )}
    </div>
  );
}
