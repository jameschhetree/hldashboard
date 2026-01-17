import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import VideoBackground from "@/components/VideoBackground";

export const metadata: Metadata = {
  title: "Artist Dashboard",
  description: "Unified analytics dashboard for music artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <VideoBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
