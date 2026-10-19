import { InstagramReel } from "@/types/reels";

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateEn(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `منذ ${diffMonths} شهر`;
    }
    if (diffDays > 0) {
      return diffDays === 1 ? "منذ يوم" : diffDays === 2 ? "منذ يومين" : `منذ ${diffDays} أيام`;
    }
    if (diffHours > 0) {
      return diffHours === 1 ? "منذ ساعة" : diffHours === 2 ? "منذ ساعتين" : `منذ ${diffHours} ساعات`;
    }
    if (diffMins > 0) {
      return `منذ ${diffMins} دقيقة`;
    }
    return "الآن";
  } catch {
    return "";
  }
}

export function formatNumber(num?: number): string {
  if (num === undefined || num === null) return "0";
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toLocaleString();
}

export function exportReelsToCsv(reels: InstagramReel[]): void {
  const headers = ["رابط الفيديو (URL)", "تاريخ النشر (Date)", "الـ Caption", "المشاهدات (Views)", "الإعجابات (Likes)", "التعليقات (Comments)", "الحساب (Account)", "الهاشتاقات (Hashtags)"];
  
  const rows = reels.map((r) => [
    `"${r.url || ""}"`,
    `"${r.timestamp || ""}"`,
    `"${(r.caption || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    r.viewCount ?? 0,
    r.likeCount ?? 0,
    r.commentCount ?? 0,
    `"${r.ownerUsername || ""}"`,
    `"${(r.hashtags || []).join(", ")}"`,
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `instagram_reels_extracted_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportReelsToJson(reels: InstagramReel[]): void {
  const jsonContent = JSON.stringify(reels, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `instagram_reels_data_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function copyAllUrls(reels: InstagramReel[]): string {
  return reels.map((r) => r.url).join("\n");
}

export function copyAllCaptions(reels: InstagramReel[]): string {
  return reels
    .map((r, i) => `--- Reel #${i + 1} (${r.timestamp.slice(0, 10)}) ---\nURL: ${r.url}\nCaption:\n${r.caption}\n`)
    .join("\n\n");
}
