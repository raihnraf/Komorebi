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

export function BottomNavBar() {
  const location = useLocation();
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white dark:bg-[#1A1A1A] border-t-2 border-[#1A1A1A] shadow-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center p-2 transition-all duration-200",
              isActive
                ? "bg-jlpt-n3 text-[#1A1A1A] rounded-xl px-3 border-2 border-[#1A1A1A] hard-shadow-sm"
                : "text-[#1A1A1A] dark:text-gray-400 hover:bg-jlpt-n2"
            )}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Icon className="w-5 h-5" />
              <span className="font-headline text-[10px] font-bold uppercase mt-1">
                {item.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
