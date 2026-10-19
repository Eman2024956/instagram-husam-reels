"use client";

import React, { useState } from "react";
import {
  Calendar,
  Search,
  SlidersHorizontal,
  Sparkles,
  Play,
  RotateCcw,
  AtSign,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  Hash,
} from "lucide-react";

interface FilterSectionProps {
  onSearch: (params: {
    subject?: string;
    username: string;
    startDate: string;
    endDate: string;
    resultsLimit: number;
    skipPinnedPosts: boolean;
    useDemo: boolean;
  }) => void;
  isLoading: boolean;
}

export default function FilterSection({
  onSearch,
  isLoading,
}: FilterSectionProps) {
  const [subject, setSubject] = useState("");
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resultsLimit, setResultsLimit] = useState(20);
  const [skipPinnedPosts, setSkipPinnedPosts] = useState(true);
  const [showDateFilter, setShowDateFilter] = useState(false);

  const subjectSuggestions = [
    { label: "🤖 AI & Tech (ذكاء اصطناعي)", query: "ai" },
    { label: "🍎 Apple & iPhone", query: "apple" },
    { label: "☕ Coffee & Barista (قهوة)", query: "coffee" },
    { label: "🦁 NatGeo & Wildlife (طبيعة)", query: "natgeo" },
    { label: "⚡ Tesla & Cars (سيارات)", query: "tesla" },
    { label: "🏃 Nike Fitness (لياقة)", query: "fitness" },
    { label: "🏡 Real Estate (عقارات)", query: "عقارات" },
    { label: "📈 Marketing (تسويق)", query: "marketing" },
    { label: "🍕 Cooking & Food (طبخ)", query: "pizza" },
    { label: "🎮 Gaming (ألعاب)", query: "gaming" },
  ];

  const quickPresets = [
    {
      id: "7d",
      label: "آخر 7 أيام",
      getDates: () => {
        const end = new Date("2026-10-19");
        const start = new Date(end);
        start.setDate(end.getDate() - 7);
        return {
          start: start.toISOString().split("T")[0],
          end: end.toISOString().split("T")[0],
        };
      },
    },
    {
      id: "30d",
      label: "آخر 30 يوماً",
      getDates: () => {
        const end = new Date("2026-10-19");
        const start = new Date(end);
        start.setDate(end.getDate() - 30);
        return {
          start: start.toISOString().split("T")[0],
          end: end.toISOString().split("T")[0],
        };
      },
    },
    {
      id: "all",
      label: "بدون تقييد زمني (الكل)",
      getDates: () => ({
        start: "",
        end: "",
      }),
    },
  ];

  const handleApplyPreset = (preset: (typeof quickPresets)[0]) => {
    const { start, end } = preset.getDates();
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = (useDemo = false) => {
    onSearch({
      subject,
      username,
      startDate,
      endDate,
      resultsLimit,
      skipPinnedPosts,
      useDemo,
    });
  };

  const handleReset = () => {
    setSubject("");
    setUsername("");
    setStartDate("");
    setEndDate("");
    setResultsLimit(20);
    setSkipPinnedPosts(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-200/90 relative overflow-hidden transition-all">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-100/40 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold">
                بحث بالموضوع (Subject Search)
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                استخراج الريلز حسب الموضوع أو المجال المطلوب
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              ابحث مباشرة بأي موضوع أو فكرة (مثل: قهوة، عقارات، سيارات، ذكاء اصطناعي) دون التقيد بتواريخ محددة
            </p>
          </div>
        </div>

        {/* Primary Subject Input */}
        <div className="space-y-3">
          <label className="block text-xs sm:text-sm font-bold text-zinc-900 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-rose-500" />
            <span>موضوع أو فكرة الريلز (Subject / Topic / Keyword):</span>
          </label>

          <div className="relative rounded-2xl shadow-sm">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-zinc-400">
              <Search className="w-5 h-5 text-rose-500" />
            </div>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="اكتب موضوع البحث هنا... (مثال: قهوة مختصة، ذكاء اصطناعي، سيارات، عقارات، لياقة، طبخ)"
              className="w-full pr-12 pl-4 py-3.5 bg-zinc-50/80 hover:bg-zinc-50 focus:bg-white text-zinc-900 border-2 border-zinc-200 focus:border-rose-500 rounded-2xl text-sm sm:text-base font-medium focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(false);
              }}
            />
          </div>

          {/* Quick Subject Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-zinc-400 font-semibold ml-1">
              اقتراحات مواضيع سريعة:
            </span>
            {subjectSuggestions.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setSubject(item.query);
                  onSearch({
                    subject: item.query,
                    username,
                    startDate,
                    endDate,
                    resultsLimit,
                    skipPinnedPosts,
                    useDemo: false,
                  });
                }}
                className={`text-xs px-3 py-1.5 rounded-xl transition border font-medium ${
                  subject === item.query
                    ? "bg-rose-500 text-white border-rose-500 shadow-xs"
                    : "bg-zinc-100/70 text-zinc-700 border-zinc-200/60 hover:bg-zinc-200/60 hover:border-zinc-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible Optional Filters (Username & Date Range) */}
        <div className="pt-2 border-t border-zinc-100">
          <button
            type="button"
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition py-1"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <span>فلترة إضافية اختيارية (تحديد حساب معين، أو حصر زمني بالتاريخ)</span>
            {showDateFilter ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showDateFilter && (
            <div className="mt-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Specific Account (Optional) */}
                <div className="md:col-span-5 space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-700">
                    حساب معين (اختياري - اتركه فارغاً للبحث العام):
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
                      <AtSign className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="مثال: natgeo أو tech_innovate"
                      className="w-full pr-9 pl-3 py-2 bg-white text-zinc-800 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>
                </div>

                {/* Optional Date Range */}
                <div className="md:col-span-7 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-zinc-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      <span>فترة زمنية محددة (اختياري):</span>
                    </label>

                    {/* Quick presets */}
                    <div className="flex items-center gap-1">
                      {quickPresets.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleApplyPreset(p)}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="من تاريخ"
                      className="w-full px-3 py-2 bg-white text-zinc-800 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      placeholder="إلى تاريخ"
                      className="w-full px-3 py-2 bg-white text-zinc-800 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced options: Results limit & skip pinned */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-200/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600 font-medium">الحد الأقصى للنتائج:</span>
                  <select
                    value={resultsLimit}
                    onChange={(e) => setResultsLimit(Number(e.target.value))}
                    className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-xs"
                  >
                    <option value={10}>10 ريلز</option>
                    <option value={20}>20 ريلز</option>
                    <option value={50}>50 ريلز</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-zinc-700">
                  <input
                    type="checkbox"
                    checked={skipPinnedPosts}
                    onChange={(e) => setSkipPinnedPosts(e.target.checked)}
                    className="w-3.5 h-3.5 text-rose-600 rounded"
                  />
                  <span>استبعاد الريلز المثبتة</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Buttons / CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Primary Action Button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSubmit(false)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-2xl text-sm font-semibold text-white insta-gradient-bg shadow-md shadow-rose-500/20 hover:opacity-95 hover:shadow-lg hover:shadow-rose-500/30 active:scale-[0.98] transition disabled:opacity-60 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جارٍ البحث واستخراج الريلز...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>
                    {subject ? `استخراج ريلز عن: "${subject}"` : "استخراج الريلز حسب الموضوع"}
                  </span>
                </>
              )}
            </button>

            {/* Test / Demo Dataset Button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSubmit(true)}
              className="hidden md:flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 transition"
              title="استعراض فوري للبيانات"
            >
              <Layers className="w-4 h-4 text-zinc-500" />
              <span>استعراض عينة فورية</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-zinc-800 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تعيين</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
