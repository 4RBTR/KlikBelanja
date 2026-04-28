import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";
import { CartProvider } from "@/context/CartContext";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KlikBelanja - Toko Online Terpercaya",
  description: "Belanja mudah dan aman di KlikBelanja.",
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <AuthProvider>
          <CartProvider>
            <ConditionalNavbar />
            <main className="flex-1">{children}</main>
          </CartProvider>
        </AuthProvider>
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
