"use client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { queryClient } from "@/lib/query-client";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { KanjiPage } from "@/pages/KanjiPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ReviewPage } from "@/pages/ReviewPage";
import { ListPage } from "@/pages/ListPage";

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/learn" replace />} />
              <Route path="/learn" element={<HomePage />} />
              <Route path="/kanji" element={<KanjiPage />} />
              <Route path="/lists" element={<ListPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
