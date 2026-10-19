import type { Metadata } from "next";
import { Alexandria, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "مستخرج بيانات ريلز إنستغرام | Instagram Reels Scraper & Analyzer",
  description: "أداة متقدمة لاستخراج روابط فيديوهات ريلز إنستغرام وتواريخ نشرها ونصوص الكابشن ضمن فترة زمنية محددة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${plusJakartaSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#fafafc] text-slate-800 antialiased font-[family-name:var(--font-alexandria)]">
        {children}
      </body>
    </html>
  );
}
