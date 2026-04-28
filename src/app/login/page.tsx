"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
    } else {
      toast.success("Berhasil masuk! Mengalihkan...");
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();
      
      if (sessionData?.user?.role?.toLowerCase() === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
      router.refresh();
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
        <div className="p-10 text-center">
          <div className="inline-flex p-4 bg-green-50 rounded-2xl mb-6 shadow-sm">
            <Package className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Selamat Datang</h2>
          <p className="text-gray-500 font-medium">Masuk untuk melanjutkan pengalaman belanja terbaik Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Alamat Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Kata Sandi</label>
                <a href="#" className="text-[10px] font-black text-primary uppercase tracking-wider hover:underline">Lupa Password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center px-1">
            <input 
              id="remember-me" 
              name="remember-me" 
              type="checkbox" 
              className="h-5 w-5 text-primary focus:ring-primary border-gray-200 rounded-lg cursor-pointer" 
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm font-bold text-gray-600 cursor-pointer">Ingat Saya</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-4 bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-xl shadow-primary/20 font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memproses...</span>
              </div>
            ) : "Masuk Sekarang"}
          </button>
        </form>
        
        <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm font-bold text-gray-500">
            Belum punya akun?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Daftar Gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
