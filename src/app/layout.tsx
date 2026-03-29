import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { CyberpunkBackground } from "@/components/layout/CyberpunkBackground";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import { Header } from "@/components/layout/Header";
import { AccessibilityBar } from "@/components/ui/AccessibilityBar";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://app-be48400b-4f16-4b12-a577-5f823963167e.ingress.apprun.sakura.ne.jp";

export const metadata: Metadata = {
  title: "転生年表 | Tensei Chronicle",
  description: "もしも別の時代、別の場所、別の性別で生まれていたら——あなたのIFの人生をシミュレーション",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "転生年表 | Tensei Chronicle",
    description: "もしも別の時代に生まれていたら——あなたのIFの人生をシミュレーション",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "転生年表 | Tensei Chronicle",
    description: "もしも別の時代に生まれていたら——あなたのIFの人生をシミュレーション",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistMono.variable} min-h-screen bg-black font-mono text-white antialiased`}>
        <CyberpunkBackground />
        <ScanlineOverlay />
        <div className="relative z-10">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-black focus:p-4 focus:text-neon-cyan">
            メインコンテンツへスキップ
          </a>
          <Header />
          <main id="main-content" role="main">{children}</main>
        </div>
        <AccessibilityBar />
      </body>
    </html>
  );
}
