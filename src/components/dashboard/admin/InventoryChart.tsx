/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

import { useEffect, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 h-[500px] flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Ketersediaan Stok</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Analisis Top 10 Barang</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs font-bold text-gray-500">Stok Aktif</span>
        </div>
      </div>

      {loading ? (
        <div className="h-80 flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="text-sm font-bold text-gray-400 animate-pulse">Menghitung Data...</div>
        </div>
      ) : products.length > 0 ? (
        <div className="h-80 w-full min-h-[320px]">
          <ResponsiveContainer key={products.length} width="100%" height={320} minWidth={0} minHeight={0} debounce={100}>
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00AA5B" stopOpacity={1} />
                  <stop offset="100%" stopColor="#00AA5B" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc', radius: 10 }}
                contentStyle={{ 
                  borderRadius: '1.5rem', 
                  border: '1px solid #f1f5f9', 
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)',
                  padding: '1rem',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Bar 
                dataKey="stok" 
                name="Jumlah Stok" 
                fill="url(#barGradient)" 
                radius={[12, 12, 0, 0]} 
                barSize={32} 
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex flex-col items-center justify-center text-gray-400 gap-2 bg-gray-50 rounded-4xl border border-dashed border-gray-200">
          <Package className="h-12 w-12 text-gray-200" />
          <p className="text-sm font-bold">Belum ada data barang.</p>
        </div>
      )}
    </div>
  );
}
