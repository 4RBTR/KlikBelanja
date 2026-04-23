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
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
            {logoIcon}
            {title} {subtitle && <span className="text-xs font-normal text-gray-400">{subtitle}</span>}
          </div>
          <button className="lg:hidden text-gray-400" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Menu Utama</div>
          <nav className="space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? "bg-primary text-white shadow-md shadow-primary/20" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">{user.name}</div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium border border-red-100"
          >
            <LogOut className="h-4 w-4" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
