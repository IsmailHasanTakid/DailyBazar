import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Marquie from "@/components/Marquie";
import NavLinks from "@/components/NavLinks";
import { Suspense } from "react";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "market-prices",
  description: "বাজার দর",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased bg-white`}
    >
      <body className="min-h-full flex flex-col">
        <div className="w-full max-w-[1200px] mx-auto">
          <Suspense fallback={<div className="h-20" />}>
            <Header />
          </Suspense>
          <NavLinks />
          <Marquie />
          {children}
        </div>
      </body>
    </html>
  );
}