"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import StatsOverview from "@/components/StatsOverview";
import SearchAndSortBar from "@/components/SearchAndSortBar";
import ReelCard from "@/components/ReelCard";
import ReelTableView from "@/components/ReelTableView";
import ReelModal from "@/components/ReelModal";
import { InstagramReel, ScrapeStats } from "@/types/reels";
import {
  Sparkles,
  AlertCircle,
  Film,
  Calendar,
  FileText,
  Link2,
} from "lucide-react";

export default function Home() {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [stats, setStats] = useState<ScrapeStats | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [activeHashtag, setActiveHashtag] = useState<string | undefined>();

  // Modals
  const [selectedReel, setSelectedReel] = useState<InstagramReel | null>(null);

  // Load initial sample reels on first mount (loads all diverse subjects)
  useEffect(() => {
    fetchScrapeData({
      subject: "",
      username: "",
      startDate: "",
      endDate: "",
      resultsLimit: 20,
      skipPinnedPosts: true,
      useDemo: true,
    });
  }, []);

  const fetchScrapeData = async (params: {
    subject?: string;
    username: string;
    startDate: string;
    endDate: string;
    resultsLimit: number;
    skipPinnedPosts: boolean;
    useDemo: boolean;
  }) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/scrape-reels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "حدث خطأ أثناء استخراج البيانات.");
        if (json.details) {
          setMessage(json.details);
        }
      } else {
        setReels(json.data || []);
        setStats(json.stats);
        setSearchQuery("");
        setActiveHashtag(undefined);
        if (json.message) {
          setMessage(json.message);
        }
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || "تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter & Sort Pipeline
  const filteredAndSortedReels = useMemo(() => {
    let result = [...reels];

    // Filter by search query (caption, username, URL, shortcode)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (reel) =>
          reel.caption.toLowerCase().includes(q) ||
          reel.url.toLowerCase().includes(q) ||
          reel.ownerUsername?.toLowerCase().includes(q) ||
          reel.shortCode?.toLowerCase().includes(q)
      );
    }

    // Filter by active hashtag
    if (activeHashtag) {
      const tagLower = activeHashtag.toLowerCase();
      result = result.filter((reel) =>
        reel.hashtags?.some((t) => t.toLowerCase() === tagLower)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case "oldest":
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case "most_views":
          return (b.viewCount || 0) - (a.viewCount || 0);
        case "most_likes":
          return (b.likeCount || 0) - (a.likeCount || 0);
        case "most_comments":
          return (b.commentCount || 0) - (a.commentCount || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [reels, searchQuery, activeHashtag, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-zinc-900 selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <Header reels={filteredAndSortedReels} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section & Extraction Goals */}
        <div className="relative rounded-3xl bg-white border border-zinc-200/90 p-6 sm:p-10 shadow-xs overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-100/40 via-rose-100/30 to-amber-100/20 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>نظام جمع وتحليل ريلز إنستغرام بالموضوع | Subject-Based Reel Engine</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              استخراج ريلز إنستغرام <br className="hidden sm:block" />
              <span className="insta-gradient-text">حسب موضوع البحث أو المجال المطلوب</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              ابحث مباشرة بأي موضوع أو فكرة (مثل: ذكاء اصطناعي، قهوة مختصة، عقارات، سيارات، لياقة، تسويق) لاستخراج رابط كل فيديو وتاريخ النشر والـ Caption فورياً دون اشتراط تاريخ أو وقت محدد.
            </p>

            {/* The 3 Core Requirements Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70">
                <div className="w-9 h-9 rounded-xl bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-400 block font-medium">المخرج الأول</span>
                  <span className="text-xs font-bold text-zinc-800">رابط كل فيديو (Reel URL)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70">
                <div className="w-9 h-9 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-400 block font-medium">المخرج الثاني</span>
                  <span className="text-xs font-bold text-zinc-800">تاريخ النشر (Date)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70">
                <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-400 block font-medium">المخرج الثالث</span>
                  <span className="text-xs font-bold text-zinc-800">الـ Caption الخاص بالفيديو</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Parameters Section */}
        <FilterSection
          onSearch={fetchScrapeData}
          isLoading={isLoading}
        />

        {/* Feedback / Notification Banners */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-bold block">{error}</span>
              {message && <p className="text-xs text-rose-700">{message}</p>}
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <StatsOverview
          stats={stats}
          onSelectHashtag={(tag) => {
            setActiveHashtag(tag === activeHashtag ? undefined : tag);
          }}
          activeHashtag={activeHashtag}
        />

        {/* Search, Sort & Results Bar */}
        <SearchAndSortBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalFiltered={filteredAndSortedReels.length}
          totalOriginal={reels.length}
          activeHashtag={activeHashtag}
          onClearHashtag={() => setActiveHashtag(undefined)}
        />

        {/* Results Presentation (Grid or Table View) */}
        {filteredAndSortedReels.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200/80 space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <Film className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="text-base font-bold text-zinc-800">
              لم يتم العثور على مقاطع ريلز تطابق المعايير المحددة
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
              جرب توسيع نطاق التاريخ، أو مسح نص البحث، أو تجربة حساب آخر.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveHashtag(undefined);
                  fetchScrapeData({
                    username: "",
                    startDate: "",
                    endDate: "",
                    resultsLimit: 20,
                    skipPinnedPosts: false,
                    useDemo: true,
                  });
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition"
              >
                إعادة ضبط الفلاتر واستعراض الكل
              </button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* Cards Section */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedReels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                onOpenDetails={setSelectedReel}
                onSelectHashtag={(tag) => setActiveHashtag(tag)}
              />
            ))}
          </div>
        ) : (
          /* Table / Compact List View */
          <ReelTableView
            reels={filteredAndSortedReels}
            onOpenDetails={setSelectedReel}
            onSelectHashtag={(tag) => setActiveHashtag(tag)}
          />
        )}
      </main>

      {/* Detail Modal */}
      <ReelModal
        reel={selectedReel}
        onClose={() => setSelectedReel(null)}
        onSelectHashtag={(tag) => {
          setActiveHashtag(tag);
          setSelectedReel(null);
        }}
      />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-zinc-200 py-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800">
              منصة استخراج بيانات ريلز إنستغرام
            </span>
            <span>•</span>
            <span>استخراج الروابط وتواريخ النشر والـ Caption</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span>إصدار الإنتاج v1.0.0</span>
            <span>•</span>
            <span>جميع الحقوق محفوظة © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
