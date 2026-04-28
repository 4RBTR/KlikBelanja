/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LogOut, X, Package, ShoppingCart } from "lucide-react";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (id: any) => void;
  items: SidebarItem[];
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
  title?: string;
  subtitle?: string;
  logoIcon?: ReactNode;
}

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  items,
  user,
  title = "KlikBelanja",
  subtitle,
  logoIcon = <ShoppingCart className="h-6 w-6 text-primary" />
}: SidebarProps) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-2xl font-black text-gray-900 tracking-tight">
            <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span>KlikBelanja</span>
              {subtitle && <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">{subtitle}</span>}
            </div>
          </div>
          <button className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-6 py-4 flex-1 overflow-y-auto space-y-8">
          <div>
            <div className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em] px-4">Menu Navigasi</div>
            <nav className="space-y-1.5">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); onClose(); }}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                    activeTab === item.id 
                      ? "bg-primary text-white shadow-xl shadow-primary/30 translate-x-1" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
                  }`}
                >
                  <div className={`transition-transform duration-300 ${activeTab === item.id ? "scale-110" : "group-hover:scale-110"}`}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-4">
            <div className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em] px-4">Bantuan</div>
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-4xl p-6 border border-green-100 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="font-bold text-gray-900 text-sm mb-1">Butuh Bantuan?</div>
                <div className="text-xs text-gray-500 mb-4">Hubungi kami jika ada kendala belanja.</div>
                <button className="w-full py-2 bg-white text-primary text-[10px] font-black uppercase tracking-wider rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all">
                  Hubungi CS
                </button>
              </div>
              <Package className="absolute -bottom-4 -right-4 h-20 w-20 text-primary/10 -rotate-12 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        <div className="p-6 mt-auto">
          <div className="bg-gray-50 rounded-4xl p-5 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary font-black text-xl border border-gray-100">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-gray-900 truncate tracking-tight">{user.name}</div>
                <div className="text-[10px] font-bold text-gray-400 truncate uppercase tracking-wider">{user.role || 'Customer'}</div>
              </div>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-100/50 transition-all font-bold text-xs uppercase tracking-widest group"
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
