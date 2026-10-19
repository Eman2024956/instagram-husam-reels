"use client";

import React, { useState } from "react";
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Clock,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Code,
  FileText,
  Play,
  Film,
} from "lucide-react";
import { InstagramReel } from "@/types/reels";
import { formatDate, formatDateEn, getRelativeTime, formatNumber } from "@/utils/helpers";

interface ReelModalProps {
  reel: InstagramReel | null;
  onClose: () => void;
  onSelectHashtag?: (tag: string) => void;
}

export default function ReelModal({
  reel,
  onClose,
  onSelectHashtag,
}: ReelModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "json">("details");

  if (!reel) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                تفاصيل فيديو الريلز
              </h3>
              <span className="text-xs text-zinc-400 font-mono">
                ID: {reel.id}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-200/60 p-1 rounded-xl text-xs">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  activeTab === "details"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                المعلومات الرئيسية
              </button>
              <button
                onClick={() => setActiveTab("json")}
                className={`px-3 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
                  activeTab === "json"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>بيانات JSON</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200/50 transition"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {activeTab === "details" ? (
          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[75vh] overflow-y-auto">
            {/* Left/Right Column: Video Preview / Media */}
            <div className="md:col-span-5 bg-zinc-950 p-6 flex flex-col items-center justify-center relative">
              {reel.videoUrl ? (
                <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/10">
                  <video
                    src={reel.videoUrl}
                    controls
                    autoPlay={false}
                    className="w-full max-h-[460px] object-contain rounded-2xl bg-black"
                  />
                </div>
              ) : reel.displayUrl ? (
                <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 relative group">
                  <img
                    src={reel.displayUrl}
                    alt="Reel Cover"
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[460px] object-contain mx-auto rounded-2xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white text-zinc-900 font-semibold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Play className="w-3.5 h-3.5 fill-zinc-900" />
                      <span>تشغيل على إنستغرام</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 flex flex-col items-center justify-center text-zinc-500">
                  <Film className="w-12 h-12 mb-2 opacity-40" />
                  <span className="text-xs">لا تتوفر معاينة فيديو مباشرة</span>
                </div>
              )}

              {/* Engagement Badges under media */}
              <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center text-white">
                <div className="bg-white/10 rounded-xl p-2">
                  <Eye className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                  <span className="text-xs font-bold block">
                    {formatNumber(reel.viewCount)}
                  </span>
                  <span className="text-[10px] text-zinc-400">مشاهدة</span>
                </div>

                <div className="bg-white/10 rounded-xl p-2">
                  <Heart className="w-4 h-4 mx-auto text-rose-500 fill-rose-500 mb-1" />
                  <span className="text-xs font-bold block">
                    {formatNumber(reel.likeCount)}
                  </span>
                  <span className="text-[10px] text-zinc-400">إعجاب</span>
                </div>

                <div className="bg-white/10 rounded-xl p-2">
                  <MessageCircle className="w-4 h-4 mx-auto text-sky-400 mb-1" />
                  <span className="text-xs font-bold block">
                    {formatNumber(reel.commentCount)}
                  </span>
                  <span className="text-[10px] text-zinc-400">تعليق</span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Extracted Information */}
            <div className="md:col-span-7 p-6 space-y-5">
              {/* Profile & Author */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-zinc-800 text-sm">
                      {(reel.ownerUsername || "I").charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">
                      {reel.ownerFullName || `@${reel.ownerUsername || "instagram"}`}
                    </h4>
                    <span className="text-xs text-zinc-500">
                      @{reel.ownerUsername || "instagram"}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://instagram.com/${reel.ownerUsername || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
                >
                  <span>زيارة الحساب</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Requirement 1: Reel URL Box */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800">
                    🔗 رابط الفيديو (Reel URL):
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(reel.url, "url")}
                      className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-zinc-200 shadow-2xs"
                    >
                      {copiedField === "url" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الرابط</span>
                        </>
                      )}
                    </button>
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-zinc-200 shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>فتح في إنستغرام</span>
                    </a>
                  </div>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-zinc-200 text-xs font-mono text-zinc-700 break-all dir-ltr text-left select-all">
                  {reel.url}
                </div>
              </div>

              {/* Requirement 2: Published Date Box */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800">
                    📅 تاريخ النشر (Published Date):
                  </span>
                  <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200/80 px-2.5 py-0.5 rounded-full font-medium">
                    {getRelativeTime(reel.timestamp)}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">
                      التاريخ بالعربية:
                    </span>
                    <span className="font-semibold text-zinc-800">
                      {formatDate(reel.timestamp)}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">
                      التاريخ والوقت ISO:
                    </span>
                    <span className="font-mono text-zinc-700 text-[11px] block truncate" title={reel.timestamp}>
                      {reel.timestamp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Requirement 3: Caption Box */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-rose-500" />
                    الـ Caption الكامل الخاص بالفيديو:
                  </span>
                  <button
                    onClick={() => handleCopy(reel.caption, "caption")}
                    className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-zinc-200 shadow-2xs"
                  >
                    {copiedField === "caption" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">تم نسخ الكابشن</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الكابشن</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 bg-white rounded-xl border border-zinc-200 text-xs text-zinc-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-text">
                  {reel.caption || "لا يوجد كابشن مسجل لهذا الريل."}
                </div>

                {/* Extracted Hashtags */}
                {reel.hashtags && reel.hashtags.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-zinc-500 block mb-1.5">
                      الهاشتاقات المستخرجة:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {reel.hashtags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            onSelectHashtag?.(tag);
                            onClose();
                          }}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition font-medium"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* JSON Tab */
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-500">
                البيانات الكاملة للريل بصيغة JSON
              </span>
              <button
                onClick={() => handleCopy(JSON.stringify(reel, null, 2), "json")}
                className="text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
              >
                {copiedField === "json" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ كود JSON</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-zinc-950 text-emerald-400 font-mono text-xs rounded-2xl overflow-x-auto max-h-[60vh] dir-ltr text-left">
              {JSON.stringify(reel, null, 2)}
            </pre>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            تم استخراج البيانات بنجاح • محرك ريلز إنستغرام
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 shadow-2xs transition"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
}
