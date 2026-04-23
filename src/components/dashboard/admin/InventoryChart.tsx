/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Product {
  id: number;
  nama_barang: string;
  stok: number;
  [key: string]: any;
}

interface ChartItem {
  name: string;
  stok: number;
}

interface InventoryChartProps {
  loading: boolean;
  products: Product[];
  chartData: ChartItem[];
}

export default function InventoryChart({ loading, products, chartData }: InventoryChartProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Grafik Ketersediaan Stok (Top 10)</h3>
      {loading ? (
        <div className="h-80 flex items-center justify-center text-gray-400">Memuat grafik...</div>
      ) : products.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="stok" name="Jumlah Stok" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-400">Belum ada data barang untuk ditampilkan.</div>
      )}
    </div>
  );
}
