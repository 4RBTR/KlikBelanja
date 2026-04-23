"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, User, Mail, Lock, Phone, MapPin, Camera } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/proxy/auth/register", {
        method: "POST",
        body: formData, // the proxy will forward this directly
      });
      
      const data = await res.json();

      if (res.ok && data.status) {
        setSuccess("Pendaftaran berhasil! Silakan masuk.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message?.email?.[0] || data.message || "Gagal mendaftar. Silakan coba lagi.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 pt-8 pb-4 text-center border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Akun Baru</h2>
          <p className="text-sm text-gray-500 mt-1">Lengkapi data Anda untuk mulai belanja di KlikBelanja</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm text-center border border-green-100">
              {success}
            </div>
          )}

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden relative group cursor-pointer">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">Upload</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input name="name" type="text" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" placeholder="Nama Anda" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input name="email" type="email" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" placeholder="contoh@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No Telepon</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input name="telepon" type="tel" className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" placeholder="08xxxxxxxxxx" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input name="password" type="password" required minLength={8} className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" placeholder="Minimal 8 karakter" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea name="alamat" rows={3} className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm" placeholder="Alamat lengkap pengiriman" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mendaftar Sebagai</label>
              <select name="role" className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg">
                <option value="user">User (Pembeli)</option>
                <option value="admin">Admin (Penjual)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-colors mt-6"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
