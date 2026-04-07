import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const BASE_URL = "https://skillz-presentation.vercel.app";

export const metadata: Metadata = {
  title: "מחנה אימונים SKILLZ קפריסין 2026",
  description: "כדורסל בליגה אחרת | 1-9 ביולי 2026 | לימסול, קפריסין",
  openGraph: {
    title: "מחנה אימונים SKILLZ קפריסין 2026",
    description: "כדורסל בליגה אחרת | 1-9 ביולי 2026 | לימסול, קפריסין",
    type: "website",
    locale: "he_IL",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/images/camp_2024.jpg`,
        width: 1200,
        height: 630,
        alt: "מחנה אימונים SKILLZ קפריסין 2026",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full bg-[#0a0a0a] text-white font-heebo antialiased">
        {children}
      </body>
    </html>
  );
}
