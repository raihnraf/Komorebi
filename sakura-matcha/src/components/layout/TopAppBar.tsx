"use client";

import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { BookOpen, GraduationCap, List, History } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/review", label: "Review", icon: History },
  { href: "/kanji", label: "Kanji", icon: GraduationCap },
  { href: "/lists", label: "Lists", icon: List },
];

export function TopAppBar() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#1A1A1A] border-b-2 border-[#1A1A1A] hard-shadow">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/learn" className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#1A1A1A] dark:text-white uppercase font-headline tracking-tight">
            Sakura & Matcha
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 font-bold transition-all duration-200 px-2 py-1",
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-[#1A1A1A] dark:text-gray-400 hover:bg-jlpt-n3 hover:text-[#1A1A1A]"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* User Profile Button */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <BookOpen className="w-6 h-6 text-primary dark:text-jlpt-n3" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
