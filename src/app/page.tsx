import Link from "next/link";
import { ShoppingBag, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-green-50 to-emerald-100 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Belanja Nyaman, <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-600">Harga Teman</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                KlikBelanja hadir untuk memenuhi semua kebutuhan harian Anda. Temukan berbagai macam produk berkualitas dengan harga terbaik hanya dalam genggaman.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {session ? (
                  <Link 
                    href={session?.user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Masuk ke Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/register"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      Daftar Sekarang
                    </Link>
                    <Link 
                      href="/login"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-primary border-2 border-primary rounded-xl font-bold text-lg transition-all"
                    >
                      Masuk
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 flex items-center justify-center">
                  <ShoppingBag className="h-32 w-32 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih KlikBelanja?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Kami berkomitmen memberikan pengalaman berbelanja online terbaik untuk Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Produk Lengkap</h3>
              <p className="text-gray-600">Temukan ribuan barang dari berbagai kategori yang siap diantar langsung ke rumah Anda.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aman & Terpercaya</h3>
              <p className="text-gray-600">Sistem pembayaran yang dijamin aman dengan berbagai metode transaksi pilihan.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proses Cepat</h3>
              <p className="text-gray-600">Checkout cepat tanpa ribet dan barang segera diproses di hari yang sama.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-white text-2xl font-bold">
            <ShoppingBag className="h-6 w-6 text-primary" />
            KlikBelanja
          </div>
          <p>© 2026 KlikBelanja. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
