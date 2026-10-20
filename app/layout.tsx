import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SoundProvider } from "@/Components/SoundProvider";

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kalandhar — MERN & Next.js Developer",
  description:
    "Portfolio of Kalandhar, a MERN stack and Next.js developer building fast, immersive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}>
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}
