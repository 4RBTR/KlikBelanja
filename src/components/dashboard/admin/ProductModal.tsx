import Image from "next/image";
import { X, Upload } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-60 animate-in fade-in duration-200 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur">
          <h3 className="font-bold text-gray-900 text-lg">
            {editingProduct ? 'Edit Informasi Barang' : 'Tambah Barang Baru'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form ref={formRef} id="productForm" onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Barang</label>
              <input 
                name="nama_barang"
                type="text" 
                defaultValue={editingProduct?.nama_barang || ''}
                required
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                placeholder="Contoh: Kopi Bubuk Arabica 200g"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Lengkap</label>
              <textarea 
                name="deskripsi"
                defaultValue={editingProduct?.deskripsi || ''}
                required
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white resize-none"
                placeholder="Jelaskan detail, varian, dan keunggulan barang"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Harga (Rp)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">Rp</span>
                  </div>
                  <input 
                    name="harga"
                    type="number" 
                    defaultValue={editingProduct?.harga || ''}
                    required
                    min="0"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stok Tersedia</label>
                <input 
                  name="stok"
                  type="number" 
                  defaultValue={editingProduct?.stok || ''}
                  required
                  min="0"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Foto Barang</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-2xl relative hover:bg-gray-50 hover:border-primary/50 transition-colors group cursor-pointer bg-white">
                <div className="space-y-2 text-center z-10 w-full">
                  {previewImage ? (
                    <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <Image src={previewImage} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                  )}
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary-hover focus-within:outline-none">
                      <span>{previewImage ? 'Ganti foto barang' : 'Pilih foto barang dari komputer'}</span>
                      <input name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">Direkomendasikan format PNG/JPG rasio 1:1, maks. 2MB</p>
                </div>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" name="image" />
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button 
            type="submit" 
            form="productForm"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover disabled:opacity-50 transition-all shadow-lg shadow-primary/30 flex items-center gap-2"
          >
            {isSubmitting && <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>}
            {isSubmitting ? 'Menyimpan...' : 'Simpan Barang'}
          </button>
        </div>
      </div>
    </div>
  );
}
