"use client";

import { motion } from "motion/react";
import { Search, TrendingUp, BookOpen, UtensilsCrossed, Building, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRandomKanji } from "@/features/kanji-explorer/hooks/useKanjiQueries";
import { useProgressStore } from "@/store/useProgressStore";
import { Link } from "react-router-dom";

const exploreLists = [
  {
    title: "Food & Dining",
    icon: UtensilsCrossed,
    items: 24,
    color: "bg-jlpt-n5/20",
  },
  {
    title: "City Life",
    icon: Building,
    items: 48,
    color: "bg-jlpt-n4/20",
  },
  {
    title: "Business JP",
    icon: Briefcase,
    items: 32,
    color: "bg-jlpt-n1/20",
  },
];

export function HomePage() {
  const { data: wordOfTheDay } = useRandomKanji();
  const { sessionKanjiCount } = useProgressStore();
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-[#1A1A1A] mb-4"
        >
          お帰りなさい! <br />
          <span className="text-primary italic">Welcome back, Scholar.</span>
        </motion.h1>
        <p className="text-xl font-medium text-surface-on-surface-variant max-w-2xl leading-relaxed">
          Ready to master more Japanese today? Your progress is blooming like a spring cherry blossom.
        </p>
      </section>
      
      {/* Search & Filter */}
      <section className="space-y-8">
        <div className="relative max-w-3xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1A1A1A] w-6 h-6" />
          <input
            type="text"
            placeholder="Search for Kanji, Vocabulary, or Grammar..."
            className="w-full pl-16 pr-6 py-6 bg-surface-container-lowest border-2 border-[#1A1A1A] rounded-xl text-xl font-bold hard-shadow focus:outline-none focus:border-primary focus:bg-secondary-container transition-all placeholder:text-[#1A1A1A]/40"
          />
        </div>
        
        {/* JLPT Filter Buttons */}
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-black uppercase tracking-widest text-sm mr-2">Filter by Level:</span>
          {(["N5", "N4", "N3", "N2", "N1"] as const).map((level) => (
            <Button
              key={level}
              variant="neo"
              className="px-6 py-2 rounded-full font-black"
            >
              {level}
            </Button>
          ))}
        </div>
      </section>
      
      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Word of the Day */}
        <Card variant="neo" className="md:col-span-4 p-8 relative flex flex-col justify-between group">
          <div className="absolute top-4 right-4">
            {wordOfTheDay && <Badge variant={wordOfTheDay.jlptLevel}>JLPT {wordOfTheDay.jlptLevel}</Badge>}
          </div>
          <div>
            <h3 className="font-black uppercase text-sm tracking-widest mb-8 text-surface-on-surface-variant">
              Word of the Day
            </h3>
            <div className="flex flex-col items-center">
              {wordOfTheDay && (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-8xl md:text-9xl font-black font-japanese mb-4"
                  >
                    {wordOfTheDay.character}
                  </motion.span>
                  <span className="text-2xl font-bold font-japanese text-primary">
                    {wordOfTheDay.kunyomi[0]?.split("・")[0]}
                  </span>
                  <span className="text-xl font-medium mt-2">
                    {wordOfTheDay.meanings[0]}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t-2 border-[#1A1A1A]/10">
            <p className="text-sm italic text-surface-on-surface-variant">
              "Always keep your dreams in sight."
            </p>
          </div>
        </Card>
        
        {/* Learning Progress */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Session */}
          <Card className="bg-primary border-2 border-[#1A1A1A] hard-shadow-lg p-8 text-on-primary">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-black uppercase text-sm tracking-widest">Current Session</h3>
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-4xl font-black mb-2 tracking-tighter">{sessionKanjiCount} Kanji</p>
            <p className="font-medium opacity-90 mb-8">Mastered this week</p>
            <Link to="/learn">
              <Button className="w-full py-4 bg-surface-container-lowest text-primary border-2 border-[#1A1A1A] rounded-xl font-black hard-shadow-sm active-press">
                Continue Journey
              </Button>
            </Link>
          </Card>
          
          {/* Quick Review */}
          <Card className="bg-jlpt-n2 border-2 border-[#1A1A1A] hard-shadow-lg p-8 text-[#1A1A1A]">
            <h3 className="font-black uppercase text-sm tracking-widest mb-6">Quick Review</h3>
            <div className="space-y-4">
              <Link
                to="/review"
                className="flex items-center justify-between p-3 bg-white/40 border-2 border-[#1A1A1A] rounded-lg font-bold hover:bg-white/60 transition-colors"
              >
                <span>Verb Conjugations</span>
                <BookOpen className="w-5 h-5" />
              </Link>
              <Link
                to="/review"
                className="flex items-center justify-between p-3 bg-white/40 border-2 border-[#1A1A1A] rounded-lg font-bold hover:bg-white/60 transition-colors"
              >
                <span>Keigo Basics</span>
                <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          </Card>
        </div>
        
        {/* Explore Lists - NEW SECTION */}
        <div className="md:col-span-12 bg-surface-container-lowest border-2 border-[#1A1A1A] rounded-xl p-8 hard-shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black uppercase text-sm tracking-widest">Explore Lists</h3>
            <Link to="/lists" className="text-primary font-black text-sm underline underline-offset-4 decoration-2">
              View All
            </Link>
          </div>
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-2">
            {exploreLists.map((list) => {
              return (
                <Link
                  key={list.title}
                  to="/lists"
                  className={`min-w-[200px] p-6 ${list.color} border-2 border-[#1A1A1A] rounded-xl hard-shadow-sm hover:-translate-y-1 transition-transform`}
                >
                  <list.icon className="text-3xl mb-4 block" />
                  <h4 className="font-black text-lg mb-1">{list.title}</h4>
                  <p className="text-xs font-bold opacity-70">{list.items} Items</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
