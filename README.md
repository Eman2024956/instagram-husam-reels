# 🎬 منصة استخراج وتحليل بيانات ريلز إنستغرام | Instagram Reels Extractor

> تطبيق ويب متكامل ومبني باستخدام **Next.js 16 (App Router)**، **React 19**، و **Tailwind CSS v4**، مخصص لاستخراج وتنظيم بيانات مقاطع الإنستغرام (Reels) بحسب **المواضيع والكلمات المفتاحية والحسابات** ضمن فترات زمنية محددة بدقة، مع واجهة عصرية فائقة النقاء بالوضع الفاتح (**Light Mode**).

[![Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel)](https://insta-husam-reels.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Eman2024956/instagram-husam-reels.git)
[![Security Score](https://img.shields.io/badge/Security%20Audit-90%25%20PASS-brightgreen?style=for-the-badge)](./UNIVERSAL_SECURITY_AUDIT_REPORT.md)

---

## 🌐 الرابط المباشر للمشروع (Production URL)
- **الرابط الأساسي على Vercel:** [https://insta-husam-reels.vercel.app](https://insta-husam-reels.vercel.app)
- **مستودع GitHub الرسمي:** [https://github.com/Eman2024956/instagram-husam-reels.git](https://github.com/Eman2024956/instagram-husam-reels.git)

---

## 🎯 المخرجات الأساسية الثلاثة للتطبيق

| المخرج | الوصف | المزايا |
|---|---|---|
| **🔗 رابط كل فيديو (Reel URL)** | رابط الفيديو المباشر القابل للمشاركة | زر نسخ سريع بنقرة واحدة + زر فتح مباشر في إنستغرام + عرض كود `#ShortCode` |
| **📅 تاريخ النشر (Publish Date)** | التوقيت الدقيق للنشر ميلادياً وعربياً | عرض التاريخ باللغة العربية والإنجليزية + حساب الوقت النسبي (منذ يومين، منذ 3 ساعات) + توقيت ISO |
| **📝 الـ Caption الخاص بالفيديو** | نص المنشور الكامل المصاحب للريل | تمييز الهاشتاقات `#` والإشارات `@` بألوان تفاعلية + فلترة فورية بالضغط على الهاشتاق + زر نسخ النص كاملاً |

---

## 🛡️ إعدادات وتأمين الـ API (API Security & Authentication)

تم تزويد المنصة بطبقة حماية وتحقق أمني صارمة تضمن عدم تسريب أي بيانات اعتماد، وحماية مسار الـ API من الاستخدام غير المصرح به:

### 1. مفاتيح الأمان في متغيرات البيئة (`.env.local` / Vercel):
```env
# رمز محرك كشط الإنستغرام (مخفي تماماً في السيرفر ولا يظهر للعميل أبداً)
APIFY_API_TOKEN=apify_api_your_token_here

# كلمة مرور أمان التطبيق للـ API (App Password)
APP_PASSWORD=your_secure_app_password_here

# مفتاح التوقيع الرقمي للمهام المشفرة (Job Signing Secret)
JOB_SIGNING_SECRET=your_job_signing_secret_here
```

### 2. طرق التوثيق المدعومة في مسار الـ API:
يدعم مسار `POST /api/scrape-reels` التوثيق عبر الترويسات الآتية:
* **Bearer Token:** `Authorization: Bearer your_secure_app_password_here`
* **Custom App Password Header:** `X-App-Password: your_secure_app_password_here` أو `X-API-Key: your_secure_app_password_here`
* **Job Signing Header:** `X-Job-Secret: your_job_signing_secret_here`

> عند إرسال مفتاح أمان خاطئ، يرفض الخادم الطلب فوراً برمز `401 Unauthorized` أو `403 Forbidden` مسجلاً محاولة الدخول غير المصرح بها في سجلات التدقيق الأمني.

### 3. ترويسات الأمان المشددة (Defensive HTTP Security Headers):
تم تفعيل الحماية المتقدمة داخل [next.config.ts](file:///Users/falahgatea/insta_reels/next.config.ts):
* **Content-Security-Policy (CSP):** تقييد مصادر السكربتات والوسائط لمنع هجمات XSS.
* **X-Frame-Options: `DENY`:** منع تضمين الموقع داخل iframes للحماية من هجمات Clickjacking.
* **X-Content-Type-Options: `nosniff`:** منع المتصفح من تخمين نوع الملفات (MIME Sniffing).
* **Strict-Transport-Security (HSTS):** فرض بروتوكول HTTPS المشفر.
* **Referrer-Policy: `strict-origin-when-cross-origin`:** حماية بيانات التوجيه.
* **Permissions-Policy:** تعطيل الوصول للكاميرا والمايكروفون والموقع الجغرافي.

---

## 🔒 سياسات واستبعاد الملفات الأمنية (Git & Vercel Ignore Policy)

### 1. قواعد `.gitignore` الصارمة:
تم تحصين ملف [.gitignore](file:///Users/falahgatea/insta_reels/.gitignore) لضمان عدم رفع أي ملفات سرية أو مفاتيح تشفير إلى GitHub:
```gitignore
# env and credential files
.env
*.env
.env*
.env.local
.env.development.local
.env.test.local
.env.production.local

# keys, certificates, keystores
*.pem
*.key
*.keystore
*.jks
*.p12
*.pfx
serviceAccountKey.json
firebase-adminsdk*.json

# vercel
.vercel

# security temp files
UNIVERSAL_SECURITY_AUDIT_REPORT.md.tmp
```

### 2. قواعد `.vercelignore` الخاصة بنشر السحاب:
يمنع ملف [.vercelignore](file:///Users/falahgatea/insta_reels/.vercelignore) رفع السكربتات المحلية وملفات التطوير والبيئة عند بناء التطبيق على سيرفرات Vercel:
```gitignore
# Version control
.git
.github
.gitignore

# Environment variables & secrets
.env
*.env
.env*
.env.local

# Private Keys & Keystores
*.pem
*.key
*.keystore
*.jks
serviceAccountKey.json

# Local scripts & audits
universal_security_audit.sh
*.sh
*.tmp
```

---

## 🛡️ أداة فحص الأمان الشاملة وتقرير التدقيق (Security Audit Suite)

تم تضمين سكربت الفحص الأمني الشامل [universal_security_audit.sh](file:///Users/falahgatea/insta_reels/universal_security_audit.sh) في جذر المشروع لفحص الكود ومسارات الـ API ومطابقة المعايير الدفاعية.

### تشغيل الفحص الأمني محلياً وعبر الرابط المباشر:
```bash
# منح صلاحية التنفيذ وتشغيل الفحص
chmod +x ./universal_security_audit.sh
./universal_security_audit.sh --project . --url https://insta-husam-reels.vercel.app
```

### ملخص نتيجة التدقيق الأمني (Security Scorecard):
```text
================================================================================
                       SECURITY AUDIT SCORECARD                                 
================================================================================
  Total Checks Executed : 10
  Passed Checks         : 9 (✅)
  Warning Checks        : 1 (⚠️)
  Failed Checks         : 0 (❌)
  Overall Security Score: 90% PASS
================================================================================
```
> التقرير التفصيلي الكامل محفوظ في جذر المشروع: [UNIVERSAL_SECURITY_AUDIT_REPORT.md](file:///Users/falahgatea/insta_reels/UNIVERSAL_SECURITY_AUDIT_REPORT.md)

---

## 💻 دليل أوامر cURL الآمنة (Secure cURL API Guide)

### 1. استعلام موثق بمفتاح الأمان (Authenticated Request with Bearer Token):
```bash
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_secure_app_password_here" \
  -d '{
    "subject": "coffee",
    "resultsLimit": 10
  }'
```

### 2. استعلام بمفتاح الأمان السري للمهام (Job Secret Header):
```bash
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -H "X-Job-Secret: your_job_signing_secret_here" \
  -d '{
    "subject": "apple",
    "resultsLimit": 5
  }'
```

### 3. استخراج بحسب موضوع الكلمات المفتاحية بالإنجليزية (English Keywords / Subject):
```bash
# البحث عن مواضيع الذكاء الاصطناعي (AI & Tech)
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "ai"
  }'

# البحث عن اللياقة البدنية والرياضة (Fitness & Running)
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "fitness"
  }'

# البحث عن السيارات والتكنولوجيا (Tesla & Cars)
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "tesla"
  }'
```

### 4. استخراج مباشر لحساب إنستغرام محدد ضمن فترة زمنية (Account & Date Range):
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

### 5. استعلام فوري بنمط المعاينة التجريبية بدون استهلاك الرصيد (`useDemo: true`):
```bash
curl -X POST "https://insta-husam-reels.vercel.app/api/scrape-reels" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "starbucks",
    "useDemo": true
  }'
```

### 6. نموذج استجابة الـ API الناجحة (Response Payload):
```json
{
  "success": true,
  "data": [
    {
      "id": "3499485766152435493",
      "shortCode": "DFe664kLps4",
      "url": "https://www.instagram.com/reel/DFe664kLps4/",
      "caption": "Crafted with passion: Single-origin espresso poured over velvety cold foam... ☕✨ #starbucks #coffee",
      "timestamp": "2026-10-11T11:45:00.000Z",
      "displayUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93...",
      "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      "duration": 28,
      "viewCount": 820000,
      "likeCount": 64000,
      "commentCount": 1450,
      "shareCount": 9800,
      "ownerUsername": "starbucks",
      "ownerFullName": "Starbucks Coffee",
      "hashtags": ["starbucks", "coffee", "espresso", "barista"]
    }
  ],
  "stats": {
    "total": 1,
    "startDate": "2026-10-11T11:45:00.000Z",
    "endDate": "2026-10-11T11:45:00.000Z",
    "totalLikes": 64000,
    "totalViews": 820000,
    "totalComments": 1450,
    "topHashtags": [{"tag": "coffee", "count": 1}]
  },
  "message": "تم العثور على 1 فيديو ريلز متعلق بموضوع: \"coffee\"."
}
```

---

## ✨ المميزات الرئيسية للتطبيق

1. **⏱️ فلترة زمنية دقيقة (Timeframe Range):**
   - تحديد تاريخ البداية (`من تاريخ`) وتاريخ النهاية (`إلى تاريخ`).
   - خيارات سريعة جاهزة: آخر 7 أيام، آخر 30 يوماً، آخر 3 أشهر، سنة 2026، وكل الفترات.
   - خيار استبعاد الريلز المثبتة (`Skip Pinned Posts`) لضمان صحة الفترات الزمنية.

2. **🔍 بحث ذكي بالمواضيع والكلمات الإنجليزية والعربية:**
   - خريطة ذكية تربط المواضيع بالحسابات الموثقة تلقائياً (`coffee`, `apple`, `ai`, `travel`, `fitness`, `tesla`).
   - ترتيب ديناميكي: الأحدث نشراً، الأكثر مشاهدة، الأكثر إعجاباً، الأكثر تعليقاً.
   - إمكانية التبديل بين **عرض البطاقات (Grid Cards)** و **عرض الجدول المباشر (Spreadsheet Table View)**.

3. **📊 لوحة إحصائيات بصرية (Live Stats):**
   - إجمالي عدد الريلز المستخرجة.
   - نطاق تاريخ النشر الفعلي ومجموع المشاهدات والإعجابات والتعليقات.
   - قائمة الهاشتاقات الأكثر استخداماً مع إمكانية التصفية بنقرة واحدة.

4. **📥 تصدير البيانات (Export Options):**
   - تصدير ملف **Excel / CSV** متكامل (يشمل الروابط، التواريخ، الكابشن، والتفاعل).
   - تصدير ملف **JSON** لكامل البيانات الوصفية.
   - نسخ جميع الروابط أو جميع نصوص الكابشن إلى الحافظة بنقرة واحدة.

---

## 🚀 التشغيل المحلي (Local Development)

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل خادم التطوير
npm run dev
# افتح المتصفح على: http://localhost:3000

# 3. بناء واختبار نسخة الإنتاج
npm run build
npm run start
```

---

## 📦 النشر على Vercel (Production Deployment)

```bash
# نشر مباشر لنسخة الإنتاج
vercel --prod
```

تأكد من إعداد متغيرات البيئة في لوحة تحكم Vercel:
`Vercel Project Dashboard` ➔ `Settings` ➔ `Environment Variables`

---

## 📂 هيكلية المشروع (Project Architecture)

```
insta_reels/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── scrape-reels/
│   │   │       └── route.ts         # مسار الـ API المحمي بالتوثيق وفلترة المواضيع
│   │   ├── globals.css              # إعدادات Tailwind وتدرجات الألوان الفاتحة
│   │   ├── layout.tsx               # الخطوط العربية والإنجليزية وبيانات SEO
│   │   └── page.tsx                 # الصفحة الرئيسية ومحرك الواجهة التفاعلي
│   ├── components/
│   │   ├── FilterSection.tsx        # حقول البحث السريع والمواضيع وفلاتر التاريخ
│   │   ├── Header.tsx               # الهيدر الفاخر وقائمة التصدير
│   │   ├── InstagramIcon.tsx        # أيقونة إنستغرام الرسمية بتقنية SVG
│   │   ├── ReelCard.tsx             # بطاقة الريل لإبراز الرابط والتاريخ والكابشن
│   │   ├── ReelModal.tsx            # نافذة العرض التفصيلي ومشغل الفيديو
│   │   ├── ReelTableView.tsx        # العرض الجدولي السريع للمحللين
│   │   ├── SearchAndSortBar.tsx     # شريط البحث والفرز والتبديل بين العرضين
│   │   └── StatsOverview.tsx        # لوحة مقاييس التفاعل والهاشتاقات
│   ├── data/
│   │   └── mockReels.ts             # بيانات معاينة واقعية إنجليزية وعربية
│   ├── types/
│   │   └── reels.ts                 # نماذج TypeScript الصارمة
│   └── utils/
│       └── helpers.ts               # دوال تنسيق التواريخ وتصدير CSV/JSON
├── .env.example                     # نموذج متغيرات البيئة
├── .env.local                       # المتغيرات المحلية المحمية (مستبعدة تماماً)
├── .gitignore                       # استبعاد ملفات الاعتماد والمفاتيح والأسرار
├── .vercelignore                    # استبعاد السكربتات المحلية وملفات التطوير عند النشر
├── next.config.ts                   # إعدادات الحماية المشددة وترويسات CSP و HSTS
├── universal_security_audit.sh      # سكربت فحص الأمان الشامل في جذر المشروع
├── UNIVERSAL_SECURITY_AUDIT_REPORT.md # تقرير التدقيق الأمني التلقائي في جذر المشروع
├── package.json
└── README.md
```

---

## 📄 الترخيص
هذا المشروع متاح للاستخدام الحر والتطوير تحت رخصة MIT.
