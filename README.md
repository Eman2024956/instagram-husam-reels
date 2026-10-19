# 🎬 منصة استخراج وتحليل بيانات ريلز إنستغرام | Instagram Reels Extractor

> تطبيق ويب متكامل ومبني باستخدام **Next.js 16 (App Router)**، **React 19**، و **Tailwind CSS v4**، مخصص لاستخراج وتنظيم بيانات مقاطع الإنستغرام (Reels) ضمن فترات زمنية محددة بدقة، مع واجهة عصرية فائقة النقاء بالوضع الفاتح (**Light Mode**).

[![Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://insta-husam-reels.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Eman2024956/instagram-husam-reels.git)

---

## 🌐 الرابط المباشر للمشروع (Production URL)
- **الرابط الأساسي:** [https://insta-husam-reels.vercel.app](https://insta-husam-reels.vercel.app)
- **رابط النشر على Vercel:** [https://insta-husam-reels-qawtohlqg-ai4books-projects.vercel.app](https://insta-husam-reels-qawtohlqg-ai4books-projects.vercel.app)

---

## 🎯 المخرجات الأساسية الثلاثة للتطبيق

| المخرج | الوصف | المزايا |
|---|---|---|
| **🔗 رابط كل فيديو (Reel URL)** | رابط الفيديو المباشر القابل للمشاركة | زر نسخ سريع بنقرة واحدة + زر فتح مباشر في إنستغرام + عرض كود `#ShortCode` |
| **📅 تاريخ النشر (Publish Date)** | التوقيت الدقيق للنشر ميلادياً وعربياً | عرض التاريخ باللغة العربية والإنجليزية + حساب الوقت النسبي (منذ يومين، منذ 3 ساعات) + توقيت ISO |
| **📝 الـ Caption الخاص بالفيديو** | نص المنشور الكامل المصاحب للريل | تمييز الهاشتاقات `#` والإشارات `@` بألوان تفاعلية + فلترة فورية بالضغط على الهاشتاق + زر نسخ النص كاملاً |

---

## ✨ المميزات الرئيسية

1. **⏱️ فلترة زمنية دقيقة (Timeframe Range):**
   - تحديد تاريخ البداية (`من تاريخ`) وتاريخ النهاية (`إلى تاريخ`).
   - خيارات سريعة جاهزة: آخر 7 أيام، آخر 30 يوماً، آخر 3 أشهر، سنة 2026، وكل الفترات.
   - خيار استبعاد الريلز المثبتة (`Skip Pinned Posts`) لضمان صحة الفترات الزمنية.

2. **🔍 بحث وفرز حي (Instant Search & Sort):**
   - بحث فوري في نصوص الكابشن أو الروابط أو أسماء الحسابات.
   - ترتيب ديناميكي: الأحدث نشراً، الأقدم نشراً، الأكثر مشاهدة، الأكثر إعجاباً، الأكثر تعليقاً.
   - إمكانية التبديل بين **عرض البطاقات (Grid Cards)** و **عرض الجدول المباشر (Spreadsheet Table View)**.

3. **📊 لوحة إحصائيات بصرية (Live Stats):**
   - إجمالي عدد الريلز المستخرجة.
   - نطاق تاريخ النشر الفعلي.
   - إجمالي المشاهدات والتفاعل (المشاهدات، الإعجابات، التعليقات).
   - أكثر الهاشتاقات المتكررة مع إمكانية الفلترة بالنقر عليها.

4. **📥 تصدير البيانات (Export Options):**
   - تصدير ملف **Excel / CSV** متكامل (يشمل الروابط، التواريخ، الكابشن، والتفاعل).
   - تصدير ملف **JSON** لكامل البيانات الوصفية.
   - نسخ جميع الروابط أو جميع نصوص الكابشن إلى الحافظة دفعة واحدة.

5. **🎨 تصميم Light Mode فاخر:**
   - لوحة ألوان دافئة ونقية مع لمسات تدرجات إنستغرام الحيوية.
   - خط **Alexandria** العربي الفاخر مع خط **Plus Jakarta Sans** الإنجليزي.
   - مؤثرات حركية خفيفة (Micro-interactions) ونوافذ معاينة منبثقة مع مشغل فيديو.

---

## ⚙️ إعداد متغيرات البيئة (Environment Variables)

قم بإنشاء ملف `.env.local` في جذر المشروع أو أضف هذه المتغيرات في لوحة تحكم Vercel Settings:

```env
# Upstream Scraper Engine Token
APIFY_API_TOKEN=your_apify_api_token_here

# Application Credentials & Signing
APP_PASSWORD=your_app_password_here
JOB_SIGNING_SECRET=your_job_signing_secret_here
```

> **ملاحظة أمنية:** الواجهة الأمامية نظيفة تماماً ولا تطلب أو تعرض أي بيانات سرية؛ تتم جميع طلبات الاستخراج عبر مسار الخادم الداخلي `/api/scrape-reels`.

---

## 🚀 التشغيل المحلي (Local Development)

### 1. تثبيت الحزم:
```bash
npm install
```

### 2. تشغيل خادم التطوير:
```bash
npm run dev
```
افتح المتصفح على: `http://localhost:3000`

### 3. بناء واختبار نسخة الإنتاج:
```bash
npm run build
npm run start
```

---

## 📦 النشر على Vercel (Deployment)

تم تجهيز المشروع ومتوافق 100% مع منصة Vercel:

```bash
# تسجيل الدخول وتحديث النشر المباشر
vercel --prod
```

تأكد من مطابقة متغيرات البيئة في:
`Vercel Project Dashboard` ➔ `Settings` ➔ `Environment Variables`

---

## 💻 دليل أوامر cURL لاستخراج البيانات (cURL API Guide)

يوفر التطبيق مسار API مباشر وسريع لاستخراج بيانات مقاطع الريلز برمجياً:

### 1. استخراج مباشر لحساب ضمن فترة زمنية محددة (Live Range):
```bash
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "natgeo",
    "startDate": "2026-09-01",
    "endDate": "2026-10-19",
    "resultsLimit": 10,
    "skipPinnedPosts": true
  }'
```

### 2. استخراج سريع لعدد محدد من الريلز (مثلاً 5 ريلز):
```bash
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "apple",
    "resultsLimit": 5
  }'
```

### 3. استعلام عبر الخادم المحلي أثناء التطوير (Local Host):
```bash
curl -X POST "http://localhost:3000/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "tech_innovate",
    "resultsLimit": 10
  }'
```

### 4. استعراض عينة تجريبية فورية بدون استهلاك الرصيد (`useDemo: true`):
```bash
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "wanderlust_vibes",
    "useDemo": true
  }'
```

### 5. نموذج استجابة الـ API المستخرجة (Response Payload):
```json
{
  "success": true,
  "data": [
    {
      "id": "4010760174779391973",
      "shortCode": "DepFSEJAl_l",
      "url": "https://www.instagram.com/reel/DepFSEJAl_l/",
      "caption": "Filmed over 4 years across 32 countries... #Rolex #PerpetualPlanet",
      "timestamp": "2026-10-18T16:20:52.000Z",
      "displayUrl": "https://...",
      "videoUrl": "https://...",
      "viewCount": 699401,
      "likeCount": 25995,
      "commentCount": 132,
      "ownerUsername": "natgeo",
      "hashtags": ["Rolex", "PerpetualPlanet"]
    }
  ],
  "stats": {
    "total": 1,
    "startDate": "2026-10-18T16:20:52.000Z",
    "endDate": "2026-10-18T16:20:52.000Z",
    "totalLikes": 25995,
    "totalViews": 699401,
    "totalComments": 132,
    "topHashtags": [{"tag": "Rolex", "count": 1}]
  },
  "message": "تم استخراج 1 فيديو ريلز بنجاح."
}
```

> **ملاحظة حول الحسابات الخاصة:** إذا كان الحساب المستعلم عنه خاصاً (Private) أو لا يملك ريلز منشورة، سيعود العداد بـ 0 مع رسالة توضيحية مباشرة:  
> `"الحساب المطلوب إما حساب خاص (Private Account) أو لا يحتوي على مقاطع ريلز عامة منشورة."`


---

## 📂 هيكلية المشروع (Project Structure)

```
insta_reels/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── scrape-reels/
│   │   │       └── route.ts         # مسار معالجة الاستخراج والفلترة الزمنية
│   │   ├── globals.css              # إعدادات Tailwind وتدرجات الألوان الفاتحة
│   │   ├── layout.tsx               # الخطوط العربية والإنجليزية وبيانات SEO
│   │   └── page.tsx                 # الصفحة الرئيسية ومحرك الواجهة التفاعلي
│   ├── components/
│   │   ├── FilterSection.tsx        # حقول الحساب وفلاتر التاريخ والخيارات
│   │   ├── Header.tsx               # الهيدر الفاخر وقائمة التصدير
│   │   ├── InstagramIcon.tsx        # أيقونة إنستغرام الرسمية بتقنية SVG
│   │   ├── ReelCard.tsx             # بطاقة الريل لإبراز الرابط والتاريخ والكابشن
│   │   ├── ReelModal.tsx            # نافذة العرض التفصيلي ومشغل الفيديو
│   │   ├── ReelTableView.tsx        # العرض الجدولي السريع للمحللين
│   │   ├── SearchAndSortBar.tsx     # شريط البحث والفرز والتبديل بين العرضين
│   │   └── StatsOverview.tsx        # لوحة مقاييس التفاعل والهاشتاقات
│   ├── data/
│   │   └── mockReels.ts             # بيانات معاينة واقعية للاستعراض السريع
│   ├── types/
│   │   └── reels.ts                 # نماذج TypeScript الصارمة
│   └── utils/
│       └── helpers.ts               # دوال تنسيق التواريخ وتصدير CSV/JSON
├── .env.example                     # نموذج متغيرات البيئة
├── .env.local                       # المتغيرات المحلية المحمية (مستبعدة من Git)
├── package.json
└── README.md
```

---

## 📄 الترخيص
هذا المشروع متاح للاستخدام الحر والتطوير تحت رخصة MIT.
