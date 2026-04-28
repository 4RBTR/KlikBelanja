import Image from "next/image";
import { ShoppingCart, Trash2, CreditCard, CheckCircle, Package } from "lucide-react";

interface CartItem {
  id: number;
  nama_barang: string;
  harga: number;
  qty: number;
  image: string | null;
}

interface CartProps {
  cartItems: CartItem[];
  checkedItems: number[];
  onToggleCheck: (id: number) => void;
  onToggleCheckAll: () => void;
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  loading: boolean;
  baseUrlImage: string;
  onGoToCatalog: () => void;
}

export default function Cart({
  cartItems,
  checkedItems,
  onToggleCheck,
  onToggleCheckAll,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  loading,
  baseUrlImage,
  onGoToCatalog
}: CartProps) {
  const itemsToCheckout = cartItems.filter(item => checkedItems.includes(item.id));
  const totalBill = itemsToCheckout.reduce((sum, item) => sum + (item.harga * item.qty), 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Keranjang Belanja</h2>
          {cartItems.length > 0 && (
            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-600 hover:text-primary transition-colors bg-gray-50 px-3 py-1.5 rounded-lg">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                checked={checkedItems.length === cartItems.length && cartItems.length > 0}
                onChange={onToggleCheckAll}
              />
              Pilih Semua
            </label>
          )}
        </div>
        
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all bg-white group">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer mt-2 sm:mt-0"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => onToggleCheck(item.id)}
                />
                <div className="h-20 w-20 bg-gray-50 rounded-xl overflow-hidden relative shrink-0 flex items-center justify-center border border-gray-100">
                  {item.image ? (
                    <Image src={item.image.startsWith('http') ? item.image : `${baseUrlImage}${item.image}`} alt={item.nama_barang} fill sizes="80px" className="object-cover" />
                  ) : (
                    <Package className="h-8 w-8 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{item.nama_barang}</h3>
                  <p className="text-sm font-bold text-primary mb-3">Rp {new Intl.NumberFormat('id-ID').format(item.harga)}</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                  <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1">
                    <button onClick={() => onUpdateQuantity(item.id, item.qty - 1)} className="h-8 w-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors font-bold">-</button>
                    <span className="w-10 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.qty + 1)} className="h-8 w-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors font-bold">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <ShoppingCart className="h-20 w-20 text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Keranjang Anda Kosong</h3>
            <p className="text-gray-500 mb-8">Wah, keranjang belanjamu masih kosong nih. Yuk mulai cari barang impianmu!</p>
            <button onClick={onGoToCatalog} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all">
              Mulai Belanja Sekarang
            </button>
          </div>
        )}
      </div>
      
      <div className="w-full lg:w-[350px]">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-4">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Belanja</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span className="text-sm">Total Harga ({itemsToCheckout.length} barang)</span>
              <span className="font-semibold text-gray-800">Rp {new Intl.NumberFormat('id-ID').format(totalBill)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="text-sm">Diskon</span>
              <span className="font-semibold text-gray-800">-</span>
            </div>
            
            <div className="border-t border-dashed border-gray-200 pt-4 mt-2"></div>
            
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">Total Tagihan</span>
              <span className="text-2xl font-black text-primary">Rp {new Intl.NumberFormat('id-ID').format(totalBill)}</span>
            </div>
          </div>
          
          <button 
            onClick={onCheckout}
            disabled={loading || itemsToCheckout.length === 0}
            className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/30"
          >
            <CreditCard className="h-5 w-5" />
            {loading ? "Memproses..." : `Bayar Sekarang`}
          </button>
          <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
            <CheckCircle className="h-3 w-3" /> Transaksi aman & terenkripsi
          </p>
        </div>
      </div>
    </div>
  );
}
