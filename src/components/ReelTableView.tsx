"use client";

import React, { useState } from "react";
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Play,
} from "lucide-react";
import { InstagramReel } from "@/types/reels";
import { formatDate, getRelativeTime, formatNumber } from "@/utils/helpers";

interface ReelTableViewProps {
  reels: InstagramReel[];
  onOpenDetails: (reel: InstagramReel) => void;
  onSelectHashtag?: (tag: string) => void;
}

export default function ReelTableView({
  reels,
  onOpenDetails,
  onSelectHashtag,
}: ReelTableViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyUrl = (reel: InstagramReel) => {
    navigator.clipboard.writeText(reel.url);
    setCopiedId(`url_${reel.id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCaption = (reel: InstagramReel) => {
    navigator.clipboard.writeText(reel.caption);
    setCopiedId(`cap_${reel.id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead className="bg-zinc-50 border-b border-zinc-200/80 text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">الفيديو</th>
              <th className="py-3.5 px-4">تاريخ النشر</th>
              <th className="py-3.5 px-4 min-w-[280px]">الـ Caption</th>
              <th className="py-3.5 px-4 min-w-[180px]">رابط الريل (URL)</th>
              <th className="py-3.5 px-4">التفاعل (Views/Likes)</th>
              <th className="py-3.5 px-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-800">
            {reels.map((reel) => (
              <tr
                key={reel.id}
                className="hover:bg-zinc-50/80 transition cursor-pointer"
                onClick={() => onOpenDetails(reel)}
              >
                {/* Thumbnail & Author */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 rounded-xl overflow-hidden bg-zinc-100 relative shrink-0">
                      {reel.displayUrl ? (
                        <img
                          src={reel.displayUrl}
                          alt="Reel thumbnail"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-400">
                          <Play className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-900">
                        @{reel.ownerUsername || "instagram"}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        #{reel.shortCode}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Published Date */}
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-900">
                      {formatDate(reel.timestamp)}
                    </span>
                    <span className="text-[10px] text-purple-600 font-medium">
                      {getRelativeTime(reel.timestamp)}
                    </span>
                  </div>
                </td>

                {/* Caption */}
                <td className="py-3 px-4">
                  <div className="max-w-md line-clamp-2 text-zinc-700 leading-relaxed font-normal">
                    {reel.caption || (
                      <span className="text-zinc-400 italic">بدون كابشن</span>
                    )}
                  </div>
                  {reel.hashtags && reel.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {reel.hashtags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectHashtag?.(tag);
                          }}
                          className="text-[10px] text-rose-600 hover:underline"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </td>

                {/* Reel URL */}
                <td className="py-3 px-4">
                  <div
                    className="flex items-center gap-1.5 dir-ltr"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-rose-600 hover:text-rose-700 font-mono truncate max-w-[150px] underline"
                      title={reel.url}
                    >
                      {reel.url}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(reel)}
                      className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition"
                      title="نسخ الرابط"
                    >
                      {copiedId === `url_${reel.id}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>

                {/* Metrics */}
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-3 text-zinc-600">
                    <span className="flex items-center gap-1" title="المشاهدات">
                      <Eye className="w-3.5 h-3.5 text-amber-500" />
                      <span>{formatNumber(reel.viewCount)}</span>
                    </span>
                    <span className="flex items-center gap-1" title="الإعجابات">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>{formatNumber(reel.likeCount)}</span>
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-center">
                  <div
                    className="flex items-center justify-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => handleCopyCaption(reel)}
                      className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition"
                      title="نسخ الكابشن"
                    >
                      {copiedId === `cap_${reel.id}` ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-600 hover:bg-rose-50 hover:text-rose-600 transition"
                      title="فتح في إنستغرام"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
