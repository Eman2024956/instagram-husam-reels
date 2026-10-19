import { NextRequest, NextResponse } from "next/server";
import { InstagramReel, ScrapeApiResponse, ScrapeStats } from "@/types/reels";
import { SAMPLE_REELS } from "@/data/mockReels";

function calculateStats(reels: InstagramReel[]): ScrapeStats {
  if (reels.length === 0) {
    return {
      total: 0,
      startDate: null,
      endDate: null,
      totalLikes: 0,
      totalViews: 0,
      totalComments: 0,
      topHashtags: [],
    };
  }

  const hashtagCounts: Record<string, number> = {};
  let totalLikes = 0;
  let totalViews = 0;
  let totalComments = 0;
  let minDate = reels[0].timestamp;
  let maxDate = reels[0].timestamp;

  reels.forEach((reel) => {
    totalLikes += reel.likeCount || 0;
    totalViews += reel.viewCount || 0;
    totalComments += reel.commentCount || 0;

    if (reel.timestamp < minDate) minDate = reel.timestamp;
    if (reel.timestamp > maxDate) maxDate = reel.timestamp;

    if (reel.hashtags && Array.isArray(reel.hashtags)) {
      reel.hashtags.forEach((tag) => {
        const cleaned = tag.replace("#", "").trim();
        if (cleaned) {
          hashtagCounts[cleaned] = (hashtagCounts[cleaned] || 0) + 1;
        }
      });
    }
  });

  const sortedHashtags = Object.entries(hashtagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));

  return {
    total: reels.length,
    startDate: minDate,
    endDate: maxDate,
    totalLikes,
    totalViews,
    totalComments,
    topHashtags: sortedHashtags,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      username,
      startDate,
      endDate,
      resultsLimit = 20,
      skipPinnedPosts = false,
      apiToken: userToken,
      useDemo = false,
    } = body;

    const token = userToken?.trim() || process.env.APIFY_API_TOKEN?.trim();

    // If client requested demo mode or if no token is configured
    if (useDemo || !token) {
      let filtered = [...SAMPLE_REELS];

      // Filter by start date if provided
      if (startDate) {
        const start = new Date(startDate).getTime();
        filtered = filtered.filter((reel) => {
          const t = new Date(reel.timestamp).getTime();
          return t >= start;
        });
      }

      // Filter by end date if provided
      if (endDate) {
        // Set to end of day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        const endTime = end.getTime();
        filtered = filtered.filter((reel) => {
          const t = new Date(reel.timestamp).getTime();
          return t <= endTime;
        });
      }

      // Filter by username/handle if specified
      if (username && username.trim() !== "") {
        const cleanUser = username.replace("@", "").toLowerCase().trim();
        const userMatches = filtered.filter(
          (reel) =>
            reel.ownerUsername?.toLowerCase().includes(cleanUser) ||
            reel.caption.toLowerCase().includes(cleanUser)
        );
        if (userMatches.length > 0) {
          filtered = userMatches;
        }
      }

      const limited = filtered.slice(0, Number(resultsLimit) || 20);
      const stats = calculateStats(limited);

      const response: ScrapeApiResponse = {
        success: true,
        data: limited,
        stats,
        message: "تم تطبيق الفلترة واستخراج البيانات بنجاح.",
      };

      return NextResponse.json(response);
    }

    // Process usernames: support comma or space separated or array
    let targetUsernames: string[] = [];
    if (Array.isArray(username)) {
      targetUsernames = username.map((u) => String(u).trim()).filter(Boolean);
    } else if (typeof username === "string" && username.trim()) {
      targetUsernames = username
        .split(/[\n,]+/)
        .map((u) => u.trim())
        .filter(Boolean);
    }

    if (targetUsernames.length === 0) {
      targetUsernames = ["instagram"];
    }

    // Prepare scraper payload
    const scraperInput: Record<string, unknown> = {
      username: targetUsernames,
      resultsLimit: Math.min(Number(resultsLimit) || 20, 100),
      skipPinnedPosts: Boolean(skipPinnedPosts),
    };

    if (startDate) {
      scraperInput.onlyPostsNewerThan = startDate;
    }

    // Call upstream scraping engine
    const upstreamEndpoint = `https://api.apify.com/v2/acts/apify~instagram-reel-scraper/run-sync-get-dataset-items?token=${token}&timeout=120`;

    const upstreamRes = await fetch(upstreamEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scraperInput),
    });

    if (!upstreamRes.ok) {
      const errorText = await upstreamRes.text();
      let errorMsg = `تعذر استخراج مقاطع الريلز من إنستغرام (كود: ${upstreamRes.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error && errorJson.error.message) {
          errorMsg = errorJson.error.message;
        }
      } catch {
        if (errorText) errorMsg += `: ${errorText.substring(0, 200)}`;
      }

      return NextResponse.json(
        {
          success: false,
          data: [],
          error: errorMsg,
          details: `Status ${upstreamRes.status}: يرجى التحقق من اسم الحساب أو صحة الروابط وإعادة المحاولة.`,
        },
        { status: upstreamRes.status }
      );
    }

    const rawData = await upstreamRes.json();

    if (!Array.isArray(rawData)) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          error: "تنسيق الاستجابة غير متوقع أثناء معالجة مقاطع الريلز.",
        },
        { status: 500 }
      );
    }

    // Map and sanitize the scraped dataset items into InstagramReel interface
    interface RawItem {
      id?: string | number;
      shortCode?: string;
      url?: string;
      caption?: string;
      text?: string;
      timestamp?: string;
      takenAt?: string;
      publishedAt?: string;
      displayUrl?: string;
      thumbnailUrl?: string;
      videoUrl?: string;
      duration?: number;
      videoDuration?: number;
      viewCount?: number;
      viewsCount?: number;
      playCount?: number;
      likeCount?: number;
      likesCount?: number;
      commentCount?: number;
      commentsCount?: number;
      shareCount?: number;
      sharesCount?: number;
      ownerId?: string;
      ownerUsername?: string;
      ownerFullName?: string;
      hashtags?: string[];
      mentions?: string[];
      isPinned?: boolean;
      error?: string;
      errorDescription?: string;
    }

    const validItems = (rawData as RawItem[]).filter(
      (item) => !item.error && (item.shortCode || item.url || item.id)
    );

    let parsedReels: InstagramReel[] = validItems.map((item, index) => {
      const shortCode = item.shortCode || (item.url ? item.url.split("/reel/")[1]?.replace(/\//g, "") : "") || `reel_${index}`;
      const url = item.url || `https://www.instagram.com/reel/${shortCode}/`;
      const caption = item.caption || item.text || "";
      const timestamp = item.timestamp || item.takenAt || item.publishedAt || new Date().toISOString();

      // Extract hashtags if missing
      let hashtags = item.hashtags || [];
      if ((!hashtags || hashtags.length === 0) && caption) {
        const matches = caption.match(/#[a-zA-Z0-9_\u0600-\u06FF]+/g);
        if (matches) {
          hashtags = matches.map((m: string) => m.replace("#", ""));
        }
      }

      return {
        id: String(item.id || shortCode || index),
        shortCode,
        url,
        caption,
        timestamp,
        displayUrl: item.displayUrl || item.thumbnailUrl,
        videoUrl: item.videoUrl,
        duration: item.duration || item.videoDuration,
        viewCount: item.viewCount ?? item.viewsCount ?? 0,
        playCount: item.playCount ?? 0,
        likeCount: item.likeCount ?? item.likesCount ?? 0,
        commentCount: item.commentCount ?? item.commentsCount ?? 0,
        shareCount: item.shareCount ?? item.sharesCount ?? 0,
        ownerId: item.ownerId,
        ownerUsername: item.ownerUsername,
        ownerFullName: item.ownerFullName,
        hashtags,
        mentions: item.mentions || [],
        isPinned: item.isPinned || false,
      };
    });

    // Check if account was private or empty
    const firstError = (rawData as RawItem[]).find((item) => item.error);
    let resultMessage = `تم استخراج ${parsedReels.length} فيديو ريلز بنجاح.`;
    if (parsedReels.length === 0 && firstError) {
      resultMessage = "الحساب المطلوب إما حساب خاص (Private Account) أو لا يحتوي على مقاطع ريلز عامة منشورة.";
    }

    // Date range filtering (Strict enforcement of end date and start date)
    if (startDate) {
      const startTime = new Date(startDate).getTime();
      parsedReels = parsedReels.filter(
        (reel) => new Date(reel.timestamp).getTime() >= startTime
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      const endTime = end.getTime();
      parsedReels = parsedReels.filter(
        (reel) => new Date(reel.timestamp).getTime() <= endTime
      );
    }

    const stats = calculateStats(parsedReels);

    return NextResponse.json({
      success: true,
      data: parsedReels,
      stats,
      message: resultMessage,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error scraping reels:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        error: error.message || "حدث خطأ غير متوقع أثناء معالجة الطلب.",
      },
      { status: 500 }
    );
  }
}
