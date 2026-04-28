import Image from "next/image";
import { X, Upload, Package } from "lucide-react";
import { RefObject } from "react";

interface Product {
  id: number;
  nama_barang: string;
  deskripsi: string;
  harga: number;
  stok: number;
  image: string | null;
}

interface ProductModalProps {
  show: boolean;
  onClose: () => void;
  editingProduct: Product | null;
  formRef: RefObject<HTMLFormElement | null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  previewImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductModal({
  show,
  onClose,
  editingProduct,
  formRef,
  onSubmit,
  isSubmitting,
  previewImage,
  handleImageChange
}: ProductModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-60 animate-in fade-in duration-300 backdrop-blur-md">
      <div className="bg-white rounded-[3rem] shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-linear-to-b from-white to-gray-50/50">
          <div>
            <h3 className="font-black text-gray-900 text-2xl tracking-tight">
              {editingProduct ? 'Perbarui Produk' : 'Tambah Produk Baru'}
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Lengkapi informasi detail barang</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full p-3 transition-all hover:rotate-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          <form ref={formRef} id="productForm" onSubmit={onSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nama Barang Utama</label>
              <input 
                name="nama_barang"
                type="text" 
                defaultValue={editingProduct?.nama_barang || ''}
                required
                className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all text-sm font-bold shadow-inner"
                placeholder="Misal: iPhone 15 Pro Max 256GB"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Deskripsi Naratif</label>
              <textarea 
                name="deskripsi"
                defaultValue={editingProduct?.deskripsi || ''}
                required
                rows={4}
                className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all text-sm font-medium shadow-inner resize-none leading-relaxed"
                placeholder="Tuliskan spesifikasi, kondisi, dan kelengkapan produk secara detail..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Harga (IDR)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                    <span className="text-gray-400 font-black text-xs uppercase">Rp</span>
                  </div>
                  <input 
                    name="harga"
                    type="number" 
                    defaultValue={editingProduct?.harga || ''}
                    required
                    min="0"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all text-sm font-black shadow-inner"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Kuantitas Stok</label>
                <input 
                  name="stok"
                  type="number" 
                  defaultValue={editingProduct?.stok || ''}
                  required
                  min="0"
                  className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all text-sm font-black shadow-inner"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Visual Produk</label>
              <div className="mt-1 flex justify-center p-8 border-4 border-gray-50 border-dashed rounded-4xl relative hover:bg-gray-50/50 hover:border-primary/20 transition-all group cursor-pointer bg-gray-50/20">
                <div className="space-y-4 text-center z-10 w-full flex flex-col items-center">
                  {previewImage ? (
                    <div className="relative w-40 h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white group-hover:scale-105 transition-transform">
                      <Image src={previewImage} alt="Preview" fill sizes="160px" className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-20 w-20 rounded-4xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-primary/5">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-black text-gray-700">{previewImage ? 'Klik untuk mengganti foto' : 'Klik atau seret foto ke sini'}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Format PNG/JPG • Maks 2MB</span>
                  </div>
                </div>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" name="image" />
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-10 bg-white flex flex-col sm:flex-row justify-end gap-4 shrink-0 border-t border-gray-50">
          <button 
            type="button" 
            onClick={onClose}
            className="px-10 py-4 text-gray-400 font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 rounded-2xl transition-all"
            disabled={isSubmitting}
          >
            Batalkan
          </button>
          <button 
            type="submit" 
            form="productForm"
            disabled={isSubmitting}
            className="px-12 py-4 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-hover disabled:opacity-50 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:-translate-y-0.5 active:scale-95"
          >
            {isSubmitting ? (
              <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            ) : <Package className="h-4 w-4" />}
            {isSubmitting ? 'Menyimpan Data...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
