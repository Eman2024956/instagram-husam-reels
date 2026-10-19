"use client";

import React from "react";
import {
  Search,
  ArrowUpDown,
  LayoutGrid,
  List,
  X,
  Filter,
} from "lucide-react";

interface SearchAndSortBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  totalFiltered: number;
  totalOriginal: number;
  activeHashtag?: string;
  onClearHashtag?: () => void;
}

export default function SearchAndSortBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalFiltered,
  totalOriginal,
  activeHashtag,
  onClearHashtag,
}: SearchAndSortBarProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-4 h-4 text-zinc-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث في نصوص الـ Caption أو الروابط أو الكلمات المفتاحية..."
            className="w-full pr-10 pl-9 py-2.5 bg-zinc-50 hover:bg-zinc-100/60 focus:bg-white text-zinc-900 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and View Mode */}
        <div className="flex items-center gap-2">
          {/* Sort Selector */}
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="pr-8 pl-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer"
            >
              <option value="newest">الأحدث نشراً (Newest First)</option>
              <option value="oldest">الأقدم نشراً (Oldest First)</option>
              <option value="most_views">الأكثر مشاهدة (Most Views)</option>
              <option value="most_likes">الأكثر إعجاباً (Most Likes)</option>
              <option value="most_comments">الأكثر تعليقاً (Most Comments)</option>
            </select>
          </div>

          {/* Grid vs Table View Toggle */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200/60">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-white text-zinc-900 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
              title="عرض البطاقات (Grid)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "table"
                  ? "bg-white text-zinc-900 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
              title="عرض الجدول المباشر (List/Table)"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results and Active Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 text-xs">
        <div className="flex items-center gap-2 text-zinc-500">
          <span>
            يتم عرض{" "}
            <strong className="text-zinc-900 font-semibold">
              {totalFiltered}
            </strong>{" "}
            من أصل {totalOriginal} فيديو ريلز
          </span>
          {totalFiltered < totalOriginal && (
            <span className="text-amber-600 font-medium">
              (تم تطبيق الفلترة)
            </span>
          )}
        </div>

        {/* Active Hashtag Filter Chip */}
        {activeHashtag && (
          <div className="flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200/80 px-2.5 py-1 rounded-lg">
            <Filter className="w-3 h-3 text-rose-500" />
            <span>هاشتاق: #{activeHashtag}</span>
            <button
              onClick={onClearHashtag}
              className="text-rose-500 hover:text-rose-800 transition"
              title="إزالة فلتر الهاشتاق"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
