import type { Metadata, Viewport } from "next";
import { Playfair_Display, Dancing_Script, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "진규형과 아이들 연말모임",
  description: "2025년 12월 13일 연말모임 초대장",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${playfair.variable} ${dancingScript.variable} ${notoSansKR.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
