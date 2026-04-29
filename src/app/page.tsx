/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ShoppingBag, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-green-50/50 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-primary rounded-full text-sm font-semibold border border-green-100">
                <Zap className="h-4 w-4" />
                <span>Promo Spesial Ramadhan 2026</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Belanja <span className="text-primary">Nyaman</span>,<br />
                Harga <span className="relative">
                  Teman
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Platform e-commerce terpercaya untuk semua kebutuhan harian Anda. Kualitas premium, pengiriman instan, dan layanan pelanggan 24/7.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {session ? (
                  <Link 
                    href={session?.user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1"
                  >
                    Masuk ke Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/register"
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1"
                    >
                      Mulai Belanja
                    </Link>
                    <Link 
                      href="/login"
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-100 rounded-2xl font-bold text-lg transition-all hover:border-primary/20"
                    >
                      Masuk
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-bold text-gray-900">50k+</div>
                  <div className="text-sm text-gray-500">Produk Aktif</div>
                </div>
                <div className="w-px h-10 bg-gray-100" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">100k+</div>
                  <div className="text-sm text-gray-500">Pelanggan Puas</div>
                </div>
              </div>
            </div>

            <div className="relative animate-in zoom-in duration-1000 delay-200">
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
                  alt="E-commerce shopping" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-xl text-white">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Flash Sale Hari Ini!</div>
                      <div className="text-sm text-gray-500">Diskon hingga 70% untuk gadget & hobi</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Element 1 */}
              <div className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-xl border border-gray-100 animate-bounce delay-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-gray-900 leading-tight">Terjamin<br/>Aman</div>
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
