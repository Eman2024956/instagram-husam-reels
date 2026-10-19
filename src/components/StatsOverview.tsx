"use client";

import React from "react";
import { Film, Calendar, Eye, Heart, MessageCircle, Hash } from "lucide-react";
import { ScrapeStats } from "@/types/reels";
import { formatNumber, formatDate } from "@/utils/helpers";

interface StatsOverviewProps {
  stats?: ScrapeStats;
  onSelectHashtag?: (hashtag: string) => void;
  activeHashtag?: string;
}

export default function StatsOverview({
  stats,
  onSelectHashtag,
  activeHashtag,
}: StatsOverviewProps) {
  if (!stats || stats.total === 0) return null;

  return (
    <div className="space-y-4">
      {/* 4 Primary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Reels */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">
              إجمالي الريلز المستخرجة
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              {stats.total}
            </span>
            <span className="text-xs text-zinc-400">فيديو ريلز</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500">
            تم استخراج الروابط وتواريخ النشر والكابشن
          </div>
        </div>

        {/* Card 2: Date Span */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">
              نطاق فترة النشر الفعلي
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold text-zinc-800 truncate" title={stats.startDate || ""}>
              {stats.startDate ? formatDate(stats.startDate).split("-")[0] : "غير محدد"}
            </div>
            <div className="text-[11px] text-zinc-400">
              إلى {stats.endDate ? formatDate(stats.endDate).split("-")[0] : "الآن"}
            </div>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium">
            ضمن الفترة الزمنية المحددة
          </div>
        </div>

        {/* Card 3: Total Views */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">
              إجمالي المشاهدات
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              {formatNumber(stats.totalViews)}
            </span>
            <span className="text-xs text-zinc-400">مشاهدة</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500 flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>{formatNumber(stats.totalLikes)} إعجاب</span>
            <span className="text-zinc-300">•</span>
            <MessageCircle className="w-3 h-3 text-blue-500" />
            <span>{formatNumber(stats.totalComments)}</span>
          </div>
        </div>

        {/* Card 4: Top Hashtags */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">
              أبرز الهاشتاقات في الكابشن
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Hash className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1 max-h-16 overflow-y-auto">
            {stats.topHashtags.length > 0 ? (
              stats.topHashtags.slice(0, 5).map((item) => (
                <button
                  key={item.tag}
                  onClick={() => onSelectHashtag?.(item.tag)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition ${
                    activeHashtag === item.tag
                      ? "bg-rose-500 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  #{item.tag} ({item.count})
                </button>
              ))
            ) : (
              <span className="text-xs text-zinc-400">لا توجد هاشتاقات مسجلة</span>
            )}
          </div>
          <div className="mt-2 text-[10px] text-zinc-400">
            انقر على الهاشتاق للفلترة الفورية
          </div>
        </div>
      </div>
    </div>
  );
}
