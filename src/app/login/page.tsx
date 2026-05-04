"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Package, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop" 
            alt="Shopping Experience" 
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/40 to-gray-900/90" />
        </div>
        <div className="relative z-10 flex flex-col justify-end p-16 text-white h-full max-w-2xl">
          <div className="w-16 h-1 border-t-4 border-primary mb-6" />
          <h1 className="text-5xl font-black mb-6 leading-tight tracking-tight">
            Kemudahan layanan belanja dalam genggaman Anda.
          </h1>
          <p className="text-lg text-gray-300 font-medium leading-relaxed">
            Temukan jutaan produk, nikmati penawaran eksklusif, dan rasakan pengalaman berbelanja yang lebih cepat, aman, dan modern.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col py-8 px-6 sm:px-12 lg:px-20 xl:px-32 relative overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col h-full justify-center">
          
          <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors w-fit mb-10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">KlikBelanja</span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-3 flex items-center gap-3">
              Selamat Datang! <span className="animate-wave inline-block origin-bottom-right">👋</span>
            </h2>
            <p className="text-gray-500 text-base font-medium">
              Silakan masuk ke akun Anda atau <Link href="/register" className="text-primary font-bold hover:underline">daftar baru</Link>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Alamat Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="block w-full px-5 py-4 bg-[#F4F6F8] border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-5 pr-12 py-4 bg-[#F4F6F8] border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer transition-colors" 
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-bold text-gray-600 cursor-pointer">
                  Ingat saya
                </label>
              </div>
              <a href="#" className="text-sm font-bold text-primary hover:text-primary-hover hover:underline transition-all">
                Lupa kata sandi?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-lg shadow-primary/25 font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-4"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memproses...</span>
                </div>
              ) : "Masuk Sekarang"}
            </button>
          </form>
          
          <div className="mt-16 text-center space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Dilindungi oleh enkripsi aman.
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Syarat & Ketentuan • Privasi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
