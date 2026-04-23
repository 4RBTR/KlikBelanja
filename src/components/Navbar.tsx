"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search, ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { data: session } = useSession();
  const { cartItems } = useCart();
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <Package className="h-8 w-8" />
              KlikBelanja
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Cari di KlikBelanja"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {(!session || session?.user?.role === "user") && (
              <Link href={session ? "/dashboard/user" : "/login"} className="text-gray-500 hover:text-primary transition-colors relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>
            )}
            
            {session ? (
              <div className="flex items-center gap-3">
                <Link 
                  href={session.user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"} 
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:block">{session.user.name}</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-primary bg-white border border-primary rounded-md hover:bg-gray-50 transition-colors">
                  Masuk
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition-colors">
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
