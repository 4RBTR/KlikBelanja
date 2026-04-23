"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LayoutDashboard, Package, Menu } from "lucide-react";

// Components
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/admin/StatsCards";
import InventoryChart from "@/components/dashboard/admin/InventoryChart";
import ProductTable from "@/components/dashboard/admin/ProductTable";
import ProductModal from "@/components/dashboard/admin/ProductModal";

interface Product {
  id: number;
  nama_barang: string;
  deskripsi: string;
  harga: number;
  stok: number;
  image: string | null;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"dashboard" | "products">("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const baseUrlImage = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://learn.smktelkom-mlg.sch.id/toko/";

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/proxy/admin/getbarang");
      if (res.data.data) setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role?.toLowerCase() !== "admin") {
      router.push("/");
    } else if (status === "authenticated") {
      setTimeout(() => {
        fetchData();
      }, 0);
    }
  }, [status, session, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setPreviewImage(null);
    setShowProductModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setPreviewImage(product.image ? (product.image.startsWith('http') ? product.image : `${baseUrlImage}${product.image}`) : null);
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const apiUrl = editingProduct 
      ? `/api/proxy/admin/updatebarang/${editingProduct.id}`
      : `/api/proxy/admin/insertbarang`;

    try {
      const res = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status) {
        alert(`Barang berhasil ${editingProduct ? 'diperbarui' : 'ditambahkan'}!`);
        setShowProductModal(false);
        fetchData();
      } else {
        alert("Gagal menyimpan barang: " + res.data.message);
      }
    } catch (error: unknown) {
      console.error("Error saving product:", error);
      if (axios.isAxiosError(error)) {
        alert("Terjadi kesalahan sistem: " + (error.response?.data?.message?.[0] || error.message));
      } else {
        alert("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const chartData = useMemo(() => {
    return products.slice(0, 10).map(p => ({
      name: p.nama_barang.length > 15 ? p.nama_barang.substring(0, 15) + '...' : p.nama_barang,
      stok: p.stok,
      harga: p.harga
    }));
  }, [products]);

  const totalProducts = products.length;
  const totalStockValue = products.reduce((sum, p) => sum + (p.harga * p.stok), 0);
  const lowStockItems = products.filter(p => p.stok < 10).length;

  if (status === "loading" || (status === "authenticated" && session?.user?.role?.toLowerCase() !== "admin")) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard Analytics", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "products", label: "Manajemen Barang", icon: <Package className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        items={sidebarItems} 
        user={session?.user || {}} 
        subtitle="Admin"
        logoIcon={<Package className="h-6 w-6 text-primary" />}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-8 justify-between shrink-0">
          <button className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 lg:flex-none"></div>
          <div className="text-sm font-medium text-gray-600">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Analytics</h1>
                <p className="text-gray-500">Ringkasan performa dan ketersediaan barang toko Anda.</p>
              </div>

              <StatsCards 
                loading={loading} 
                totalProducts={totalProducts} 
                lowStockItems={lowStockItems} 
                totalStockValue={totalStockValue} 
              />

              <InventoryChart 
                loading={loading} 
                products={products} 
                chartData={chartData} 
              />
            </div>
          )}

          {activeTab === "products" && (
            <ProductTable 
              loading={loading} 
              products={products} 
              baseUrlImage={baseUrlImage} 
              onEdit={openEditModal} 
              onAdd={openAddModal} 
            />
          )}
        </div>
      </main>

      <ProductModal 
        show={showProductModal} 
        onClose={() => setShowProductModal(false)} 
        editingProduct={editingProduct} 
        formRef={formRef} 
        onSubmit={handleProductSubmit} 
        isSubmitting={isSubmitting} 
        previewImage={previewImage} 
        handleImageChange={handleImageChange} 
      />
    </div>
  );
}
