"use client";

import React, { useState } from "react";
import {
  Key,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileCode,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { InstagramReel } from "@/types/reels";
import {
  exportReelsToCsv,
  exportReelsToJson,
  copyAllUrls,
  copyAllCaptions,
} from "@/utils/helpers";

interface HeaderProps {
  reels: InstagramReel[];
}

export default function Header({
  reels,
}: HeaderProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (type: "urls" | "captions") => {
    const text = type === "urls" ? copyAllUrls(reels) : copyAllCaptions(reels);
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
    setShowExportMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-md shadow-rose-500/20 text-white">
              <InstagramIcon className="w-6 h-6" />
              <span className="absolute -bottom-1 -left-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-[family-name:var(--font-alexandria)]">
                  مستخرج بيانات <span className="insta-gradient-text">ريلز إنستغرام</span>
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  محرك مباشر نشط
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 hidden sm:block">
                استخراج روابط الفيديو، تاريخ النشر، ونصوص الـ Caption ضمن أي فترة زمنية
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={reels.length === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm hover:shadow transition disabled:opacity-50 disabled:pointer-events-none"
              >
                <Download className="w-4 h-4" />
                <span>تصدير البيانات ({reels.length})</span>
              </button>

              {showExportMenu && (
                <div
                  className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-zinc-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setShowExportMenu(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    خيارات التصدير والنسخ
                  </div>

                  <button
                    onClick={() => {
                      exportReelsToCsv(reels);
                      setShowExportMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition text-right"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <div className="flex flex-col text-right">
                      <span className="font-medium">ملف إكسل / CSV</span>
                      <span className="text-[10px] text-zinc-400">
                        يشمل الروابط، التواريخ، ونصوص الكابشن
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      exportReelsToJson(reels);
                      setShowExportMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition text-right"
                  >
                    <FileCode className="w-4 h-4 text-amber-600" />
                    <div className="flex flex-col text-right">
                      <span className="font-medium">ملف JSON كامل</span>
                      <span className="text-[10px] text-zinc-400">
                        كافة البيانات الوصفية للمطورين
                      </span>
                    </div>
                  </button>

                  <div className="h-px bg-zinc-100 my-1"></div>

                  <button
                    onClick={() => handleCopy("urls")}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-zinc-700 hover:bg-zinc-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Copy className="w-4 h-4 text-indigo-600" />
                      <span>نسخ كافة الروابط فقط</span>
                    </div>
                    {copiedType === "urls" && (
                      <Check className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>

                  <button
                    onClick={() => handleCopy("captions")}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-zinc-700 hover:bg-zinc-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Copy className="w-4 h-4 text-rose-600" />
                      <span>نسخ كافة الكابشنز</span>
                    </div>
                    {copiedType === "captions" && (
                      <Check className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
