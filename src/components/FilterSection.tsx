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
} from "lucide-react";

interface FilterSectionProps {
  onSearch: (params: {
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
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-10-19");
  const [resultsLimit, setResultsLimit] = useState(20);
  const [skipPinnedPosts, setSkipPinnedPosts] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("all");

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
      id: "90d",
      label: "آخر 3 أشهر",
      getDates: () => {
        const end = new Date("2026-10-19");
        const start = new Date(end);
        start.setDate(end.getDate() - 90);
        return {
          start: start.toISOString().split("T")[0],
          end: end.toISOString().split("T")[0],
        };
      },
    },
    {
      id: "year",
      label: "سنة 2026",
      getDates: () => ({
        start: "2026-01-01",
        end: "2026-10-19",
      }),
    },
    {
      id: "all",
      label: "كل الفترات",
      getDates: () => ({
        start: "",
        end: "",
      }),
    },
  ];

  const handleApplyPreset = (preset: (typeof quickPresets)[0]) => {
    setActivePreset(preset.id);
    const { start, end } = preset.getDates();
    setStartDate(start);
    setEndDate(end);
  };

  const exampleAccounts = [
    { handle: "tech_innovate", name: "ابتكارات تقنية" },
    { handle: "growth_mastery", name: "تسويق ونمو" },
    { handle: "wanderlust_vibes", name: "سفر وطبيعة" },
    { handle: "specialty_brews", name: "قهوة مختصة" },
    { handle: "fitlife_coach", name: "صحة ولياقة" },
  ];

  const handleSubmit = (useDemo = false) => {
    onSearch({
      username,
      startDate,
      endDate,
      resultsLimit,
      skipPinnedPosts,
      useDemo,
    });
  };

  const handleReset = () => {
    setUsername("");
    setStartDate("");
    setEndDate("");
    setResultsLimit(20);
    setSkipPinnedPosts(true);
    setActivePreset("all");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-200/90 relative overflow-hidden transition-all">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-100/40 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 space-y-6">
        {/* Title & Quick Guidance */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold">
                معايير الاستخراج
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                تحديد الحساب والفترة الزمنية المستهدفة
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              أدخل اسم الحساب أو رابط الريل وحدد تاريخ البداية والنهاية لاستخراج الروابط والكابشن وتاريخ النشر
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Instagram Account / URL */}
          <div className="lg:col-span-5 space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-zinc-800">
              حساب إنستغرام أو رابط الريل (Instagram Profile / URL)
            </label>
            <div className="relative rounded-2xl shadow-sm">
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
                <AtSign className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="مثال: tech_innovate أو natgeo أو رابط ريل"
                className="w-full pr-10 pl-4 py-3 bg-zinc-50/60 hover:bg-zinc-50 focus:bg-white text-zinc-900 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              />
            </div>

            {/* Quick account pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-zinc-400 font-medium ml-1">
                نماذج سريعة:
              </span>
              {exampleAccounts.map((acc) => (
                <button
                  key={acc.handle}
                  type="button"
                  onClick={() => setUsername(acc.handle)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition border ${
                    username === acc.handle
                      ? "bg-rose-50 text-rose-700 border-rose-300 font-medium"
                      : "bg-zinc-100/70 text-zinc-600 border-zinc-200/60 hover:bg-zinc-200/50"
                  }`}
                >
                  @{acc.handle}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Selection (من تاريخ - إلى تاريخ) */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-semibold text-zinc-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-rose-500" />
                <span>الفترة الزمنية المحددة (نطاق تاريخ النشر)</span>
              </label>

              {/* Time Presets */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
                {quickPresets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className={`text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap transition border ${
                      activePreset === p.id
                        ? "bg-rose-500 text-white border-rose-500 font-semibold shadow-xs"
                        : "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200/60"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Start Date */}
              <div className="relative">
                <span className="absolute top-2 right-3 text-[10px] text-zinc-400 font-medium">
                  من تاريخ (Start Date)
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setActivePreset("custom");
                  }}
                  className="w-full pt-6 pb-2 px-3 bg-zinc-50/60 hover:bg-zinc-50 focus:bg-white text-zinc-800 border border-zinc-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              {/* End Date */}
              <div className="relative">
                <span className="absolute top-2 right-3 text-[10px] text-zinc-400 font-medium">
                  إلى تاريخ (End Date)
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setActivePreset("custom");
                  }}
                  className="w-full pt-6 pb-2 px-3 bg-zinc-50/60 hover:bg-zinc-50 focus:bg-white text-zinc-800 border border-zinc-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Advanced Options */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <span>خيارات إضافية (العدد الأقصى، تخطي المثبتة)</span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                  الحد الأقصى لعدد الريلز (Results Limit):
                </label>
                <select
                  value={resultsLimit}
                  onChange={(e) => setResultsLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                >
                  <option value={10}>10 ريلز (سريع جداً)</option>
                  <option value={20}>20 ريلز (موصى به)</option>
                  <option value={50}>50 ريلز (تحليل شامل)</option>
                  <option value={100}>100 ريلز (كبير)</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="relative flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={skipPinnedPosts}
                    onChange={(e) => setSkipPinnedPosts(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded border-zinc-300 focus:ring-rose-500"
                  />
                  <span className="text-xs font-medium text-zinc-700">
                    تخطي الريلز المثبتة (Skip Pinned Posts) لتاريخ نشر دقيق
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Buttons / CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Primary Action Button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSubmit(false)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white insta-gradient-bg shadow-md shadow-rose-500/20 hover:opacity-95 hover:shadow-lg hover:shadow-rose-500/30 active:scale-[0.98] transition disabled:opacity-60 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جارٍ استخراج وتصفية الريلز...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>بدء استخراج الريلز المباشر</span>
                </>
              )}
            </button>

            {/* Test / Demo Dataset Button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSubmit(true)}
              className="hidden md:flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 transition"
              title="تطبيق الفلترة على مجموعة البيانات المعاينة"
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
              <span>إعادة تعيين الحقول</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
