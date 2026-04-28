import { Package, Edit } from "lucide-react";

interface StatsCardsProps {
  loading: boolean;
  totalProducts: number;
  lowStockItems: number;
  totalStockValue: number;
}

export default function StatsCards({ loading, totalProducts, lowStockItems, totalStockValue }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
        <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
          <Package className="h-8 w-8 text-blue-500" />
        </div>
        <div>
          <p className="text-xs font-black text-gray-400 mb-1 uppercase tracking-widest">Total Produk</p>
          <p className="text-4xl font-black text-gray-900 tracking-tight">{loading ? '...' : totalProducts}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
        <div className="h-16 w-16 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
          <Edit className="h-8 w-8 text-orange-500" />
        </div>
        <div>
          <p className="text-xs font-black text-gray-400 mb-1 uppercase tracking-widest">Stok Menipis</p>
          <p className="text-4xl font-black text-orange-600 tracking-tight">{loading ? '...' : lowStockItems}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
        <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
          <div className="text-2xl font-black text-green-500 italic">Rp</div>
        </div>
        <div>
          <p className="text-xs font-black text-gray-400 mb-1 uppercase tracking-widest">Nilai Aset</p>
          <p className="text-3xl font-black text-gray-900 tracking-tight">
            {loading ? '...' : `Rp ${new Intl.NumberFormat('id-ID', { notation: "compact", maximumFractionDigits: 1 }).format(totalStockValue)}`}
          </p>
        </div>
      </div>
    </div>
  );
}
