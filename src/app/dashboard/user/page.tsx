/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import axios from "axios";
import { ShoppingCart, FileText, Store, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Components
import Sidebar from "@/components/dashboard/Sidebar";
import Catalog from "@/components/dashboard/user/Catalog";
import Cart from "@/components/dashboard/user/Cart";
import History from "@/components/dashboard/user/History";

interface Product {
  id: number;
  nama_barang: string;
  harga: number;
  image: string | null;
  stok: number;
  deskripsi: string;
}

interface InvoiceDetail {
  barang_id?: number;
  nama_barang?: string;
  harga?: number;
  qty?: number;
  subtotal?: number;
  [key: string]: unknown;
}

interface HistoryItem {
  id_transaksi?: number;
  id?: number;
  tgl_transaksi?: string;
  created_at?: string;
  nama_user?: string;
  total?: number;
  detail?: InvoiceDetail[];
  [key: string]: unknown;
}

function UserDashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { cartItems, updateQuantity, removeFromCart, addToCart } = useCart();
  
  const [activeTab, setActiveTab] = useState<"catalog" | "bill" | "invoice">("catalog");
  const [products, setProducts] = useState<Product[]>([]);
  
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(p => 
      p.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<HistoryItem | null>(null);
  const [addedItem, setAddedItem] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const baseUrlImage = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://learn.smktelkom-mlg.sch.id/toko/";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role?.toLowerCase() === "admin") {
      router.push("/dashboard/admin");
    }
  }, [status, session, router]);

  const productMap = useMemo(() => {
    const map = new Map<number, Product>();
    products.forEach(p => map.set(p.id, p));
    return map;
  }, [products]);

  // Fetch Data Effect
  useEffect(() => {
    let isMounted = true;
    
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/proxy/user/getbarang");
        if (isMounted && res.data?.data) {
          const fetchedProducts = Array.isArray(res.data.data) ? res.data.data : [];
          setProducts(fetchedProducts);
        }
      } catch (error: unknown) {
        if (!(error as Error & { __handled?: boolean })?.__handled) {
          console.error("Error fetching catalog:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/proxy/user/history_trans");
        if (isMounted && res.data?.data) {
          const fetchedHistory = Array.isArray(res.data.data) ? res.data.data : [];
          setHistory(fetchedHistory);
        }
      } catch (error: unknown) {
        if (!(error as Error & { __handled?: boolean })?.__handled) {
          console.error("Error fetching history:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (status === "authenticated") {
      if (activeTab === "catalog" && products.length === 0) {
        fetchCatalog();
      } else if (activeTab === "invoice") {
        fetchHistory();
      } else if (activeTab === "bill") {
        setLoading(false);
      }
    }
    
    return () => { isMounted = false; };
  }, [activeTab, products.length, status]);

  // Sync Cart effect only runs when switching to bill tab
  useEffect(() => {
    if (activeTab === "bill") {
      setCheckedItems(cartItems.map(i => i.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const handleCheckout = async () => {
    const itemsToCheckout = cartItems.filter(item => checkedItems.includes(item.id));
    if (itemsToCheckout.length === 0) {
      toast.error("Pilih setidaknya satu barang untuk checkout");
      return;
    }
    
    try {
      setLoading(true);
      const payload = {
        pesan: itemsToCheckout.map(item => ({
          barang_id: item.id,
          qty: item.qty
        }))
      };

      const res = await api.post("/api/proxy/user/transaksi", payload);
      if (res.data.status) {
        toast.success("Transaksi Berhasil!");
        itemsToCheckout.forEach(item => removeFromCart(item.id));
        setActiveTab("invoice");
      } else {
        toast.error("Gagal memproses transaksi: " + res.data.message);
      }
    } catch (error: unknown) {
      console.error("Checkout error", error);
      if (axios.isAxiosError(error)) {
        toast.error("Terjadi kesalahan sistem: " + (error.response?.data?.message?.[0] || error.message));
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setLoading(false);
    }
  };

  const getInvoiceTotal = (inv: HistoryItem) => {
    if (inv.total && inv.total > 0) return inv.total;
    return (inv.detail || []).reduce((acc: number, item: InvoiceDetail) => {
      const subtotal = item.subtotal || 0;
      if (subtotal > 0) return acc + subtotal;
      let harga = item.harga || 0;
      if (harga === 0 && item.barang_id) {
        const productData = productMap.get(item.barang_id);
        if (productData) harga = productData.harga;
      }
      return acc + (harga * (item.qty || 0));
    }, 0);
  };

  if (status === "loading" || (status === "authenticated" && session?.user?.role?.toLowerCase() === "admin")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
        <p className="text-sm font-bold text-gray-400 animate-pulse">
          {session?.user?.role?.toLowerCase() === "admin" ? "Mengalihkan ke Dashboard Admin..." : "Memuat Dashboard..."}
        </p>
      </div>
    );
  }

  const sidebarItems = [
    { id: "catalog", label: "Katalog Produk", icon: <Store className="h-5 w-5" /> },
    { id: "bill", label: "Keranjang", icon: <ShoppingCart className="h-5 w-5" /> },
    { id: "invoice", label: "Riwayat Pembelian", icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab} 
        onTabChange={(id) => setActiveTab(id)} 
        items={sidebarItems} 
        user={session?.user || {}} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#F8FAFC]">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-8 justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
              {activeTab === 'catalog' ? 'Mall KlikBelanja' : activeTab === 'bill' ? 'Keranjang Anda' : 'Invoice & Tagihan'}
            </h1>
          </div>
          <div className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full">
            Customer Dashboard
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeTab === "catalog" && (
            <Catalog 
              loading={loading} 
              products={filteredProducts} 
              baseUrlImage={baseUrlImage} 
              addedItem={addedItem} 
              onAddToCart={handleAddToCart} 
            />
          )}

          {activeTab === "bill" && (
            <Cart 
              cartItems={cartItems} 
              checkedItems={checkedItems} 
              onToggleCheck={(id) => setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])} 
              onToggleCheckAll={() => setCheckedItems(checkedItems.length === cartItems.length ? [] : cartItems.map(i => i.id))} 
              onUpdateQuantity={updateQuantity} 
              onRemove={removeFromCart} 
              onCheckout={handleCheckout} 
              loading={loading} 
              baseUrlImage={baseUrlImage} 
              onGoToCatalog={() => setActiveTab("catalog")} 
            />
          )}

          {activeTab === "invoice" && (
            <History 
              loading={loading} 
              history={history} 
              getInvoiceTotal={getInvoiceTotal} 
              onSelectInvoice={setSelectedInvoice} 
              onGoToCatalog={() => setActiveTab("catalog")} 
              selectedInvoice={selectedInvoice} 
              onCloseModal={() => setSelectedInvoice(null)} 
              productMap={productMap} 
              sessionUser={session?.user || {}} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
      <UserDashboardContent />
    </Suspense>
  );
}
