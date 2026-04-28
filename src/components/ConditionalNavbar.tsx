"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
      <Navbar />
    </Suspense>
  );
}
