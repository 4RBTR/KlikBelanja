import Image from "next/image";
import { Package, Plus, Edit, Trash2 } from "lucide-react";

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
}

export default function ProductTable({ loading, products, baseUrlImage, onEdit, onAdd }: ProductTableProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-10rem)]">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white sticky top-0 z-10 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Katalog Barang Toko</h2>
            <p className="text-sm text-gray-500 mt-1">Kelola daftar produk, harga, dan ketersediaan stok.</p>
          </div>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-hover transition-colors text-sm font-bold shadow-lg shadow-primary/20 shrink-0"
          >
            <Plus className="h-5 w-5" />
            Tambah Barang
          </button>
        </div>

        <div className="flex-1 overflow-auto p-0">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Memuat data barang...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-md">
                <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 font-semibold w-24">Gambar</th>
                  <th className="p-4 font-semibold">Info Produk</th>
                  <th className="p-4 font-semibold">Harga</th>
                  <th className="p-4 font-semibold text-center w-24">Stok</th>
                  <th className="p-4 font-semibold text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4">
                        <div className="h-16 w-16 relative bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                          {product.image ? (
                            <Image src={product.image.startsWith('http') ? product.image : `${baseUrlImage}${product.image}`} alt={product.nama_barang} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                              <Package className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900 text-base mb-1">{product.nama_barang}</div>
                        <div className="text-sm text-gray-500 line-clamp-1 max-w-sm">{product.deskripsi}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-gray-900">Rp {new Intl.NumberFormat('id-ID').format(product.harga)}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${product.stok > 10 ? 'bg-green-100 text-green-700' : product.stok > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stok}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => onEdit(product)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors" title="Hapus">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-16 text-center">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Belum ada barang</h3>
                      <p className="text-gray-500">Mulai tambahkan barang pertama Anda untuk dijual.</p>
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
