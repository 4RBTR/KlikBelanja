import Image from "next/image";
import { Store, ShoppingCart, CheckCircle, Package } from "lucide-react";

interface Product {
  id: number;
  nama_barang: string;
  harga: number;
  image: string | null;
  stok: number;
  deskripsi: string;
}

interface CatalogProps {
  loading: boolean;
  products: Product[];
  baseUrlImage: string;
  addedItem: number | null;
  onAddToCart: (product: Product) => void;
}

export default function Catalog({ loading, products, baseUrlImage, addedItem, onAddToCart }: CatalogProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Temukan Barang Impianmu</h2>
          <p className="text-gray-500 mt-1">Belanja aman dan nyaman dengan produk pilihan terbaik.</p>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1,2,3,4,5,6,7,8,9,10].map(i => (
            <div key={i} className="animate-pulse bg-white rounded-2xl h-[320px] shadow-sm border border-gray-100 p-3">
              <div className="bg-gray-100 h-40 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-100 rounded w-1/2 mb-4"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden m-2 rounded-xl">
                {product.image ? (
                  <Image 
                    src={product.image.startsWith('http') ? product.image : `${baseUrlImage}${product.image}`}
                    alt={product.nama_barang} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <Package className="h-16 w-16 text-gray-300" />
                )}
                {product.stok < 5 && product.stok > 0 && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                    Sisa {product.stok}
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col pt-2">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 flex-1 group-hover:text-primary transition-colors">{product.nama_barang}</h3>
                <p className="text-lg font-extrabold text-primary mb-3">
                  Rp {new Intl.NumberFormat('id-ID').format(product.harga)}
                </p>
                <button 
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    addedItem === product.id 
                      ? 'bg-green-100 text-green-700' 
                      : product.stok <= 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary-hover hover:shadow-md'
                  }`}
                  disabled={product.stok <= 0}
                >
                  {addedItem === product.id ? (
                    <><CheckCircle className="h-4 w-4" /> Berhasil!</>
                  ) : product.stok <= 0 ? (
                    'Stok Habis'
                  ) : (
                    <><ShoppingCart className="h-4 w-4" /> Masukkan Keranjang</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 border-dashed">
          <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Toko Masih Kosong</h3>
          <p className="text-gray-500 max-w-md mx-auto">Admin belum menambahkan satupun barang ke dalam toko. Silakan kembali lagi nanti.</p>
        </div>
      )}
    </div>
  );
}
