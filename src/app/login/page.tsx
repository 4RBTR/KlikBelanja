"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Lock, Mail } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau password salah");
      setLoading(false);
    } else {
      // Ambil session untuk mengecek role
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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 pt-8 pb-6 text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 text-3xl font-bold text-primary mb-2">
            <Package className="h-8 w-8" />
            KlikBelanja
          </Link>
          <h2 className="text-xl font-semibold text-gray-800">Selamat Datang Kembali</h2>
          <p className="text-sm text-gray-500 mt-1">Masuk untuk melanjutkan belanja</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="contoh@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Ingat saya</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-hover">Lupa password?</a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-colors"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link href="/register" className="font-medium text-primary hover:text-primary-hover">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
