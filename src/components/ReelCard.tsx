"use client";

import React, { useState } from "react";
import {
  Link2,
  Calendar,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  Play,
  Share2,
  FileText,
  Sparkles,
} from "lucide-react";
import { InstagramReel } from "@/types/reels";
import { formatDate, getRelativeTime, formatNumber } from "@/utils/helpers";

interface ReelCardProps {
  reel: InstagramReel;
  onOpenDetails: (reel: InstagramReel) => void;
  onSelectHashtag?: (tag: string) => void;
}

export default function ReelCard({
  reel,
  onOpenDetails,
  onSelectHashtag,
}: ReelCardProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(reel.url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyCaption = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(reel.caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  // Format caption to make #hashtags and @mentions interactive and stylish
  const renderFormattedCaption = (text: string) => {
    if (!text) return <span className="text-zinc-400 italic">لا يوجد كابشن للفيديو</span>;

    const words = text.split(/(\s+)/);
    return words.map((word, i) => {
      if (word.startsWith("#") && word.length > 1) {
        const cleanTag = word.replace("#", "").replace(/[.,!?;:]+$/, "");
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectHashtag?.(cleanTag);
            }}
            className="text-rose-600 hover:text-rose-700 hover:underline font-medium inline-block dir-ltr"
          >
            {word}
          </button>
        );
      }
      if (word.startsWith("@") && word.length > 1) {
        return (
          <span key={i} className="text-indigo-600 font-medium inline-block dir-ltr">
            {word}
          </span>
        );
      }
      return <span key={i}>{word}</span>;
    });
  };

  const isLongCaption = reel.caption && reel.caption.length > 140;

  return (
    <div className="group bg-white rounded-3xl border border-zinc-200/80 shadow-xs hover:shadow-xl hover:shadow-rose-500/5 card-hover-lift flex flex-col justify-between overflow-hidden relative">
      <div>
        {/* Card Header & Media Preview */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-100">
          {reel.displayUrl ? (
            /* Using standard img with referrerPolicy to guarantee Instagram CDN display */
            <img
              src={reel.displayUrl}
              alt={reel.caption.slice(0, 50) || "Instagram Reel"}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-400">
              <Play className="w-10 h-10 mb-2 opacity-50" />
              <span className="text-xs">معاينة ريلز</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent"></div>

          {/* Quick Play Trigger button overlay */}
          <button
            onClick={() => onOpenDetails(reel)}
            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-zinc-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg hover:bg-white"
            title="مشاهدة التفاصيل وتشغيل الفيديو"
          >
            <Play className="w-5 h-5 fill-zinc-900 mr-0.5" />
          </button>

          {/* Top badges: Shortcode & Author */}
          <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
              <span>@{reel.ownerUsername || "instagram"}</span>
            </div>

            {reel.duration && (
              <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                {reel.duration}s
              </span>
            )}
          </div>

          {/* Bottom Overlay Info: Likes & Views */}
          <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                <Eye className="w-3.5 h-3.5" />
                {formatNumber(reel.viewCount)}
              </span>
              <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                {formatNumber(reel.likeCount)}
              </span>
              <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                <MessageCircle className="w-3.5 h-3.5" />
                {formatNumber(reel.commentCount)}
              </span>
            </div>
          </div>
        </div>

        {/* Card Core Content: The 3 Core Requirements */}
        <div className="p-5 space-y-4">
          {/* Requirement 1: Published Date (تاريخ النشر) */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-zinc-50 border border-zinc-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-medium">
                  تاريخ النشر (Published Date)
                </span>
                <span className="text-xs font-semibold text-zinc-800">
                  {formatDate(reel.timestamp)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full font-medium">
              <Clock className="w-3 h-3" />
              <span>{getRelativeTime(reel.timestamp)}</span>
            </div>
          </div>

          {/* Requirement 2: Reel Caption (الـ Caption الخاص بالفيديو) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                <span>الـ Caption الخاص بالفيديو:</span>
              </div>

              {/* Copy Caption Button */}
              <button
                type="button"
                onClick={handleCopyCaption}
                className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-rose-600 transition p-1 rounded-lg hover:bg-rose-50"
                title="نسخ نص الكابشن"
              >
                {copiedCaption ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">تم نسخ الكابشن</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ الكابشن</span>
                  </>
                )}
              </button>
            </div>

            <div
              className={`text-xs text-zinc-700 leading-relaxed font-normal bg-zinc-50/50 p-3 rounded-2xl border border-zinc-100/80 transition-all ${
                !isCaptionExpanded && isLongCaption ? "line-clamp-3" : ""
              }`}
            >
              {renderFormattedCaption(reel.caption)}
            </div>

            {isLongCaption && (
              <button
                type="button"
                onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
                className="text-[11px] font-medium text-rose-600 hover:text-rose-700 transition"
              >
                {isCaptionExpanded ? "عرض أقل ▲" : "قراءة الكابشن كاملاً ▼"}
              </button>
            )}
          </div>

          {/* Requirement 3: Video URL (رابط كل فيديو) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-zinc-500 flex items-center gap-1">
                <Link2 className="w-3 h-3 text-zinc-400" />
                رابط الفيديو المباشر:
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {reel.shortCode ? `#${reel.shortCode}` : ""}
              </span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs font-mono text-zinc-600 truncate flex-1 dir-ltr text-left">
                {reel.url}
              </span>

              {/* Copy URL Button */}
              <button
                type="button"
                onClick={handleCopyUrl}
                className={`p-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                  copiedUrl
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200 shadow-2xs"
                }`}
                title="نسخ رابط الريل"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px]">منسوخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[10px]">نسخ</span>
                  </>
                )}
              </button>

              {/* Open in Instagram in new tab */}
              <a
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-white text-zinc-700 hover:text-rose-600 hover:bg-rose-50 border border-zinc-200 shadow-2xs transition"
                title="فتح الريل مباشرة على إنستغرام"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Detail Button */}
      <div className="px-5 pb-5 pt-1">
        <button
          type="button"
          onClick={() => onOpenDetails(reel)}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 hover:text-zinc-900 transition flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>عرض التفاصيل الكاملة وتحميل الفيديو</span>
        </button>
      </div>
    </div>
  );
}
