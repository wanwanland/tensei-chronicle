import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { CyberpunkBackground } from "@/components/layout/CyberpunkBackground";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "転生年表 | Tensei Chronicle",
  description: "もしも別の時代、別の場所、別の性別で生まれていたら——あなたのIFの人生をシミュレーション",
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
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
