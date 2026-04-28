import { useState } from "react";
import Image from "next/image";
import { Store, ShoppingCart, CheckCircle, Package, Info, X } from "lucide-react";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
          {products.map((product, index) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1 relative">
              <div 
                className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden m-2 rounded-xl cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {product.image ? (
                    <Image 
                      src={product.image.startsWith('http') ? product.image : `${baseUrlImage}${product.image}`}
                      alt={product.nama_barang} 
                      fill 
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      priority={index === 0}
                    />
                ) : (
                  <Package className="h-16 w-16 text-gray-300" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 p-2 rounded-full shadow-lg">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                </div>
                {product.stok < 5 && product.stok > 0 && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                    Sisa {product.stok}
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col pt-2">
                <h3 
                  className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 flex-1 cursor-pointer group-hover:text-primary transition-colors"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.nama_barang}
                </h3>
                <p className="text-lg font-extrabold text-primary mb-3">
                  Rp {new Intl.NumberFormat('id-ID').format(product.harga)}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
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
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {products.length === 0 && loading === false ? "Barang Tidak Ditemukan" : "Toko Masih Kosong"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {products.length === 0 && loading === false 
              ? "Maaf, barang yang Anda cari tidak tersedia. Coba kata kunci lain." 
              : "Admin belum menambahkan satupun barang ke dalam toko. Silakan kembali lagi nanti."}
          </p>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto bg-gray-50">
              {selectedProduct.image ? (
                <Image 
                  src={selectedProduct.image.startsWith('http') ? selectedProduct.image : `${baseUrlImage}${selectedProduct.image}`}
                  alt={selectedProduct.nama_barang} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-gray-200" />
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8 relative flex flex-col">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-green-50 text-primary text-[10px] font-bold rounded-full mb-4">
                  PRODUK PILIHAN
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{selectedProduct.nama_barang}</h3>
                <div className="text-3xl font-black text-primary mb-6">
                  Rp {new Intl.NumberFormat('id-ID').format(selectedProduct.harga)}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Deskripsi Produk</h4>
                    <p className="text-gray-600 leading-relaxed max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {selectedProduct.deskripsi || "Tidak ada deskripsi untuk produk ini."}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-gray-400">Stok Tersedia:</span>
                    <span className={`${selectedProduct.stok > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {selectedProduct.stok} unit
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  onAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className={`w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                  selectedProduct.stok <= 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-xl'
                }`}
                disabled={selectedProduct.stok <= 0}
              >
                <ShoppingCart className="h-5 w-5" />
                {selectedProduct.stok <= 0 ? 'Stok Habis' : 'Masukkan Keranjang'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
