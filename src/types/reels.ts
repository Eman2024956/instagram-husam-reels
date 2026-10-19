export interface InstagramReel {
  id: string;
  shortCode?: string;
  type?: string;
  url: string;
  caption: string;
  timestamp: string; // ISO 8601 string
  displayUrl?: string;
  videoUrl?: string;
  duration?: number;
  viewCount?: number;
  playCount?: number;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  ownerId?: string;
  ownerUsername?: string;
  ownerFullName?: string;
  hashtags?: string[];
  mentions?: string[];
  isPinned?: boolean;
}

export interface ScrapeFilterOptions {
  username: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  resultsLimit: number;
  skipPinnedPosts: boolean;
  useDemo?: boolean;
}

export interface ScrapeStats {
  total: number;
  startDate: string | null;
  endDate: string | null;
  totalLikes: number;
  totalViews: number;
  totalComments: number;
  topHashtags: { tag: string; count: number }[];
}

export interface ScrapeApiResponse {
  success: boolean;
  data: InstagramReel[];
  stats?: ScrapeStats;
  message?: string;
  error?: string;
  details?: string;
}
