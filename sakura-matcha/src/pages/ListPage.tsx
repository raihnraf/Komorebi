"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  BookOpen,
  UtensilsCrossed,
  Building,
  Briefcase,
  Plane,
  Star,
  Play,
  Plus,
  MoreVertical,
  X,
  ChevronRight,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useStudyListStore, StudyList } from "@/store/useStudyListStore";

const iconMap: Record<string, React.ElementType> = {
  utensils: UtensilsCrossed,
  building: Building,
  briefcase: Briefcase,
  plane: Plane,
  book: BookOpen,
};

export function ListPage() {
  const { lists, filter, updateFilter, toggleFavorite } =
    useStudyListStore();
  const [viewingList, setViewingList] = useState<StudyList | null>(null);

  const filteredLists = lists.filter((list) => {
    const matchesJlpt =
      !filter.jlptLevel ||
      list.category === "jlpt" ||
      list.title.includes(filter.jlptLevel);
    const matchesCategory =
      !filter.category || list.category === filter.category;
    const matchesSearch =
      !filter.searchQuery ||
      list.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      list.description.toLowerCase().includes(filter.searchQuery.toLowerCase());
    return matchesJlpt && matchesCategory && matchesSearch;
  });

  const totalItems = lists.reduce((acc, list) => acc + list.itemCount, 0);
  const totalCompleted = lists.reduce((acc, list) => acc + list.completedCount, 0);
  const overallProgress =
    totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1A1A1A] mb-2 uppercase">
          Study Lists
        </h1>
        <p className="text-surface-on-surface-variant font-medium">
          Browse and master curated Japanese vocabulary sets
        </p>
      </div>

      {/* Progress Overview */}
      <Card variant="neo" className="p-6 bg-primary-fixed">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black">Your Learning Journey</h2>
            <p className="text-sm font-medium opacity-80">
              {totalCompleted} of {totalItems} items mastered across all lists
            </p>
          </div>
          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="h-4 w-full bg-surface-container-high border-2 border-[#1A1A1A] overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-primary border-r-2 border-[#1A1A1A]"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A] w-5 h-5" />
          <input
            type="text"
            placeholder="Search lists..."
            value={filter.searchQuery}
            onChange={(e) => updateFilter({ searchQuery: e.target.value })}
            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-2 border-[#1A1A1A] rounded-xl font-bold focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="neo"
            onClick={() => updateFilter({ category: null })}
            className={`rounded-full px-4 py-2 text-sm ${
              !filter.category ? "bg-primary text-on-primary" : ""
            }`}
          >
            All
          </Button>
          <Button
            variant="neo"
            onClick={() => updateFilter({ category: "jlpt" })}
            className={`rounded-full px-4 py-2 text-sm ${
              filter.category === "jlpt" ? "bg-primary text-on-primary" : ""
            }`}
          >
            JLPT
          </Button>
          <Button
            variant="neo"
            onClick={() => updateFilter({ category: "topic" })}
            className={`rounded-full px-4 py-2 text-sm ${
              filter.category === "topic" ? "bg-primary text-on-primary" : ""
            }`}
          >
            Topics
          </Button>
        </div>
      </div>

      {/* Lists Grid - Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.map((list, index) => {
          const Icon = iconMap[list.icon] || BookOpen;
          const progress =
            list.itemCount > 0
              ? Math.round((list.completedCount / list.itemCount) * 100)
              : 0;

          return (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                variant="neo"
                className={`group cursor-pointer hover:-translate-y-2 hover:hard-shadow-lg transition-all duration-200 overflow-hidden ${list.color}`}
                onClick={() => setViewingList(list)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-surface-container-lowest border-2 border-[#1A1A1A] hard-shadow-sm rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge
                      variant={
                        list.category === "jlpt"
                          ? (list.title.includes("N5")
                              ? "N5"
                              : list.title.includes("N4")
                                ? "N4"
                                : list.title.includes("N3")
                                  ? "N3"
                                  : list.title.includes("N2")
                                    ? "N2"
                                    : "N1")
                          : "N5"
                      }
                    >
                      {list.category === "jlpt"
                        ? "JLPT"
                        : list.category === "topic"
                          ? "Topic"
                          : "Custom"}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-black text-xl mb-2">{list.title}</h3>
                  <p className="text-sm font-medium text-surface-on-surface-variant mb-4 line-clamp-2">
                    {list.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="font-bold">{list.itemCount} items</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-bold">{list.completedCount} done</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-high border-2 border-[#1A1A1A] overflow-hidden p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-primary border-r-2 border-[#1A1A1A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-surface-container-high border-t-2 border-[#1A1A1A] font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors">
                  <Play className="w-4 h-4" />
                  Start Learning
                </button>
              </Card>
            </motion.div>
          );
        })}

        {/* Create New List Card */}
        <Card
          variant="neo"
          className="group cursor-pointer hover:-translate-y-2 hover:hard-shadow-lg transition-all duration-200 border-dashed flex items-center justify-center min-h-[280px]"
        >
          <button className="flex flex-col items-center gap-4 p-8">
            <div className="w-16 h-16 rounded-full bg-surface-container border-2 border-[#1A1A1A] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-black uppercase text-sm">Create New List</span>
          </button>
        </Card>
      </div>

      {/* List Detail Modal */}
      <AnimatePresence>
        {viewingList && (
          <ListDetailModal
            list={viewingList}
            onClose={() => setViewingList(null)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// List Detail Modal Component
interface ListDetailModalProps {
  list: StudyList;
  onClose: () => void;
  onToggleFavorite: (itemId: string) => void;
}

function ListDetailModal({ list, onClose, onToggleFavorite }: ListDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"items" | "stats">("items");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card variant="neo" className="bg-surface-container-lowest">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b-2 border-[#1A1A1A] bg-surface-container">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-surface-container-lowest border-2 border-[#1A1A1A] hard-shadow-sm rounded-lg">
                {(() => {
                  const Icon = iconMap[list.icon] || BookOpen;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h2 className="text-2xl font-black">{list.title}</h2>
                <p className="text-sm font-medium text-surface-on-surface-variant">
                  {list.itemCount} items • {list.completedCount} completed
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b-2 border-[#1A1A1A]">
            <button
              onClick={() => setActiveTab("items")}
              className={`flex-1 py-3 font-black uppercase text-sm ${
                activeTab === "items"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest hover:bg-surface-container-high"
              }`}
            >
              Items
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 py-3 font-black uppercase text-sm ${
                activeTab === "stats"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest hover:bg-surface-container-high"
              }`}
            >
              Statistics
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {activeTab === "items" && list.items.length > 0 ? (
              <div className="space-y-3">
                {list.items.map((item) => (
                  <Card
                    key={item.id}
                    variant="neo"
                    className="p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-surface-container-lowest border-2 border-[#1A1A1A] flex items-center justify-center">
                        <span className="font-japanese text-3xl font-black">
                          {item.character}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg">{item.meanings.join(", ")}</h4>
                          <Badge variant={item.jlptLevel}>{item.jlptLevel}</Badge>
                        </div>
                        <p className="text-sm text-surface-on-surface-variant">
                          ON: {item.readings.onyomi.join(", ") || "—"} | KUN:{" "}
                          {item.readings.kunyomi.join(", ") || "—"}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          <span className="font-bold">
                            Mastery: {item.mastery}%
                          </span>
                          {item.lastReviewed && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.lastReviewed}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        className={`p-2 rounded-lg border-2 border-[#1A1A1A] transition-colors ${
                          item.isFavorite
                            ? "bg-secondary text-on-secondary"
                            : "bg-surface-container-lowest hover:bg-surface-container-high"
                        }`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            item.isFavorite ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : activeTab === "items" ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="font-bold text-lg text-surface-on-surface-variant">
                  No items in this list yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <Card variant="neo" className="p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-black">{list.completedCount}</p>
                  <p className="text-xs font-black uppercase text-surface-on-surface-variant">
                    Completed
                  </p>
                </Card>
                <Card variant="neo" className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-black">
                    {Math.round(list.itemCount * 0.5)}h
                  </p>
                  <p className="text-xs font-black uppercase text-surface-on-surface-variant">
                    Est. Time
                  </p>
                </Card>
                <Card variant="neo" className="p-6 text-center">
                  <Star className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-black">
                    {list.items.filter((i) => i.isFavorite).length}
                  </p>
                  <p className="text-xs font-black uppercase text-surface-on-surface-variant">
                    Favorites
                  </p>
                </Card>
                <Card variant="neo" className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-3xl font-black">
                    {list.itemCount > 0
                      ? Math.round((list.completedCount / list.itemCount) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-xs font-black uppercase text-surface-on-surface-variant">
                    Mastery
                  </p>
                </Card>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t-2 border-[#1A1A1A] flex gap-4">
            <Button variant="neo" className="flex-1 py-4 gap-2">
              <Play className="w-5 h-5" />
              Start Session
            </Button>
            <Button variant="outline" className="px-6">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
