"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, User, Mail, Lock, Phone, MapPin, Camera } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
        <div className="p-10 text-center border-b border-gray-50 bg-linear-to-b from-white to-gray-50/50">
          <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Gabung KlikBelanja</h2>
          <p className="text-gray-500 font-medium">Buat akun untuk mulai berbelanja dengan harga terbaik.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="w-28 h-28 rounded-3xl border-4 border-dashed border-gray-100 flex items-center justify-center bg-gray-50 overflow-hidden relative transition-all group-hover:border-primary/30 cursor-pointer">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-gray-400 group-hover:text-primary transition-colors">
                    <Camera className="h-8 w-8" />
                    <span className="text-[10px] font-black uppercase tracking-wider">Foto</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-xs font-black uppercase tracking-widest">Ubah</span>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input name="name" type="text" required className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium" placeholder="Nama Anda" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input name="email" type="email" required className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium" placeholder="name@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">No Telepon</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input name="telepon" type="tel" className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium" placeholder="08xxxxxxxxxx" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Kata Sandi</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input name="password" type="password" required minLength={8} className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium" placeholder="Minimal 8 karakter" />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Lengkap</label>
              <div className="relative group">
                <div className="absolute top-4 left-4 pointer-events-none transition-colors group-focus-within:text-primary">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea name="alamat" rows={3} className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium" placeholder="Jl. Contoh No. 123, Kota..." />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mendaftar Sebagai</label>
              <div className="relative">
                <select name="role" className="block w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer">
                  <option value="user">User (Pembeli)</option>
                  <option value="admin">Admin (Penjual)</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                  <Package className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-5 px-4 bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-xl shadow-primary/20 font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-4"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Mendaftarkan Akun...</span>
              </div>
            ) : "Daftar Akun Sekarang"}
          </button>
        </form>
        
        <div className="px-10 py-8 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm font-bold text-gray-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
