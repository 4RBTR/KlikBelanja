"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Package, Camera, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/proxy/auth/register", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();

      if (res.ok && data.status) {
        toast.success("Pendaftaran berhasil! Silakan masuk.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(data.message?.email?.[0] || data.message || "Gagal mendaftar. Silakan coba lagi.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
            alt="Shopping Bags" 
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/40 to-gray-900/90" />
        </div>
        <div className="relative z-10 flex flex-col justify-end p-16 text-white h-full max-w-2xl">
          <div className="w-16 h-1 border-t-4 border-primary mb-6" />
          <h1 className="text-5xl font-black mb-6 leading-tight tracking-tight">
            Mulai perjalanan bisnis Anda bersama kami.
          </h1>
          <p className="text-lg text-gray-300 font-medium leading-relaxed">
            Bergabunglah dengan ribuan pembeli dan penjual lainnya. Nikmati platform e-commerce yang dirancang untuk mendukung setiap transaksi Anda.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col py-8 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-y-auto">
        <div className="w-full max-w-xl mx-auto flex flex-col min-h-full justify-center py-6">
          
          <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors w-fit mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">KlikBelanja</span>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
              Buat Akun Baru ✨
            </h2>
            <p className="text-gray-500 text-base font-medium">
              Sudah punya akun? <Link href="/login" className="text-primary font-bold hover:underline">Masuk di sini</Link>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-4xl border-4 border-white shadow-xl flex items-center justify-center bg-[#F4F6F8] overflow-hidden relative transition-all group-hover:scale-105 cursor-pointer">
                  {imagePreview ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-gray-400 group-hover:text-primary transition-colors">
                      <Camera className="h-6 w-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Ubah</span>
                  </div>
                  <input 
                    type="file" 
                    name="foto_profil" 
                    accept="image/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-3">Foto Profil (Opsional)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Nama Lengkap
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="block w-full px-4 py-3.5 bg-[#F4F6F8] border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none"
                  placeholder="Nama Anda"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Alamat Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full px-4 py-3.5 bg-[#F4F6F8] border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  No Telepon
                </label>
                <input
                  name="telepon"
                  type="tel"
                  className="block w-full px-4 py-3.5 bg-[#F4F6F8] border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none"
                  placeholder="08xxxxxxxxxx"
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
                    minLength={8}
                    className="block w-full pl-4 pr-12 py-3.5 bg-[#F4F6F8] border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none"
                    placeholder="Min. 8 karakter"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Alamat Lengkap
                </label>
                <textarea 
                  name="alamat" 
                  rows={2} 
                  className="block w-full px-4 py-3.5 bg-[#F4F6F8] border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none resize-none" 
                  placeholder="Jl. Contoh No. 123, Kota..." 
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Mendaftar Sebagai
                </label>
                <div className="relative">
                  <select 
                    name="role" 
                    className="block w-full px-4 py-3.5 bg-[#F4F6F8] border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white transition-all text-sm font-bold text-gray-900 appearance-none cursor-pointer outline-none"
                  >
                    <option value="user">User (Pembeli)</option>
                    <option value="admin">Admin (Penjual)</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-lg shadow-primary/25 font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-6"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Mendaftarkan...</span>
                </div>
              ) : "Daftar Akun Sekarang"}
            </button>
          </form>
          
          <div className="mt-10 text-center space-y-2">
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
