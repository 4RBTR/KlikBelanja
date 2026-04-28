/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import Image from "next/image";
import { Package, Plus, Edit, Trash2, Search, Filter } from "lucide-react";

interface Product {
  id: number;
  nama_barang: string;
  deskripsi: string;
  harga: number;
  stok: number;
  image: string | null;
}

interface ProductTableProps {
  loading: boolean;
  products: Product[];
  baseUrlImage: string;
  onEdit: (product: Product) => void;
  onAdd: () => void;
  initialSearch?: string;
}

export default function ProductTable({ loading, products, baseUrlImage, onEdit, onAdd, initialSearch = "" }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const filteredProducts = products.filter(p => 
    p.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
        <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white sticky top-0 z-20 shrink-0">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Katalog Produk</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total {products.length} Barang Tersedia</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Cari nama atau deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium shadow-inner"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none p-3.5 bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100">
                <Filter className="h-5 w-5" />
              </button>
              <button 
                onClick={onAdd}
                className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-primary text-white px-8 py-3.5 rounded-2xl hover:bg-primary-hover transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95"
              >
                <Plus className="h-5 w-5" />
                Tambah Baru
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-0 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="text-sm font-bold text-gray-400">Sinkronisasi Data...</div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
                <tr className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] border-b border-gray-100">
                  <th className="p-6 w-24">Produk</th>
                  <th className="p-6">Detail Informasi</th>
                  <th className="p-6">Harga Satuan</th>
                  <th className="p-6 text-center w-32">Status Stok</th>
                  <th className="p-6 text-center w-32">Manajemen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-blue-50/20 transition-all group">
                      <td className="p-6">
                        <div className="h-16 w-16 relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group-hover:scale-105 transition-transform">
                          {product.image ? (
                            <Image 
                              src={product.image.startsWith('http') ? product.image : `${baseUrlImage}${product.image}`} 
                              alt={product.nama_barang} 
                              fill 
                              sizes="64px"
                              className="object-cover" 
                              priority={index === 0}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                              <Package className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="font-black text-gray-900 text-base mb-1 tracking-tight">{product.nama_barang}</div>
                        <div className="text-xs font-medium text-gray-400 line-clamp-1 max-w-sm italic opacity-70">
                          {product.deskripsi || "Tanpa deskripsi produk"}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">IDR</span>
                          <span className="font-black text-gray-900 text-lg">
                            {new Intl.NumberFormat('id-ID').format(product.harga)}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            product.stok > 10 
                              ? 'bg-green-50 text-green-600 border border-green-100' 
                              : product.stok > 0 
                                ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                                : 'bg-red-50 text-red-600 border border-red-100'
                          }`}>
                            {product.stok > 10 ? 'Aman' : product.stok > 0 ? 'Menipis' : 'Habis'}
                          </span>
                          <span className="text-xs font-bold text-gray-400">{product.stok} unit</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-3 justify-center">
                          <button 
                            onClick={() => onEdit(product)} 
                            className="p-3 text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white rounded-2xl transition-all shadow-sm group-hover:scale-110" 
                            title="Edit Data"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            className="p-3 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm group-hover:scale-110" 
                            title="Hapus Produk"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-32 text-center">
                      <div className="bg-gray-50 inline-flex p-8 rounded-[3rem] mb-6 border border-dashed border-gray-200">
                        <Package className="h-20 w-20 text-gray-200" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-2">Produk Tidak Ditemukan</h3>
                      <p className="text-gray-400 font-bold max-w-xs mx-auto">
                        Coba kata kunci lain atau tambahkan produk baru ke dalam katalog.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
