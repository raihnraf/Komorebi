"use client";

import { ReactNode } from "react";
import { TopAppBar } from "./TopAppBar";
import { BottomNavBar } from "./BottomNavBar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface font-body text-surface-on-surface pb-24 md:pb-0">
      <TopAppBar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
}
