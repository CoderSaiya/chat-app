import type { Metadata } from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
})
export const metadata: Metadata = {
  title: "ChatApp - Chat mọi nơi",
  description: "Ứng dụng chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
        suppressHydrationWarning
      >
        {children}
      </body>
      </html>
  );
}
