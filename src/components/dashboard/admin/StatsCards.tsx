import { Package, Edit } from "lucide-react";

interface StatsCardsProps {
  loading: boolean;
  totalProducts: number;
  lowStockItems: number;
  totalStockValue: number;
}

export default function StatsCards({ loading, totalProducts, lowStockItems, totalStockValue }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Package className="h-7 w-7 text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Jenis Barang</p>
          <p className="text-3xl font-bold text-gray-900">{loading ? '...' : totalProducts}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
          <Edit className="h-7 w-7 text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Barang Stok Menipis</p>
          <p className="text-3xl font-bold text-orange-600">{loading ? '...' : lowStockItems}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center shrink-0">
          <div className="text-xl font-bold text-green-500">Rp</div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Estimasi Nilai Aset Stok</p>
          <p className="text-2xl font-bold text-gray-900">{loading ? '...' : `Rp ${new Intl.NumberFormat('id-ID', { notation: "compact" }).format(totalStockValue)}`}</p>
        </div>
      </div>
    </div>
  );
}
