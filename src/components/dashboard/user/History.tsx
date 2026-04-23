/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileText, CheckCircle, X } from "lucide-react";

interface InvoiceDetail {
  barang_id?: number;
  nama_barang?: string;
  harga?: number;
  qty?: number;
  subtotal?: number;
  [key: string]: unknown;
}

interface HistoryItem {
  id_transaksi?: number;
  id?: number;
  tgl_transaksi?: string;
  created_at?: string;
  nama_user?: string;
  total?: number;
  detail?: InvoiceDetail[];
  [key: string]: unknown;
}

interface HistoryProps {
  loading: boolean;
  history: HistoryItem[];
  getInvoiceTotal: (inv: HistoryItem) => number;
  onSelectInvoice: (inv: HistoryItem) => void;
  onGoToCatalog: () => void;
  selectedInvoice: HistoryItem | null;
  onCloseModal: () => void;
  productMap: Map<number, { harga: number; nama_barang: string; [key: string]: any }>;
  sessionUser?: { name?: string | null; email?: string | null; role?: string | null; [key: string]: any };
}

export default function History({
  loading,
  history,
  getInvoiceTotal,
  onSelectInvoice,
  onGoToCatalog,
  selectedInvoice,
  onCloseModal,
  productMap,
  sessionUser
}: HistoryProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Pembelian</h2>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Memuat invoice...</div>
      ) : history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {history.map((inv, idx) => (
            <div 
              key={idx} 
              onClick={() => onSelectInvoice(inv)}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-extrabold text-gray-900 text-lg tracking-tight">INV-{inv.id_transaksi || inv.id || '000'}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500">{inv.tgl_transaksi || (inv.created_at ? new Date(inv.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-')}</p>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-200 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Berhasil
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mt-2">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Total Belanja</p>
                <p className="text-xl font-black text-primary">Rp {new Intl.NumberFormat('id-ID').format(getInvoiceTotal(inv))}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 border-dashed">
          <FileText className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Transaksi</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">Anda belum pernah melakukan pembelian. Yuk mulai belanja sekarang!</p>
          <button onClick={onGoToCatalog} className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all">
            Mulai Belanja
          </button>
        </div>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-60 animate-in fade-in duration-200 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-white">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur sticky top-0">
              <h3 className="font-black text-gray-900 flex items-center gap-2 text-xl tracking-tight">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                Invoice <span className="text-primary">INV-{selectedInvoice.id_transaksi || selectedInvoice.id || '000'}</span>
              </h3>
              <button onClick={onCloseModal} className="text-gray-400 hover:text-gray-800 bg-white hover:bg-gray-100 rounded-full p-2 transition-all shadow-sm border border-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <div className="mb-6 flex justify-between bg-primary/5 p-5 rounded-2xl border border-primary/10">
                <div>
                  <p className="text-gray-500 mb-1 text-[10px] font-bold uppercase tracking-widest">Diterbitkan oleh</p>
                  <p className="font-bold text-gray-900">KlikBelanja Official</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 mb-1 text-[10px] font-bold uppercase tracking-widest">Tanggal</p>
                  <p className="font-bold text-gray-900">{selectedInvoice.tgl_transaksi || '-'}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Diberikan kepada</p>
                <p className="font-black text-gray-900 text-lg">{selectedInvoice.nama_user || sessionUser?.name}</p>
              </div>

              <div>
                <p className="text-gray-900 font-bold mb-3">Detail Produk</p>
                <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-5 py-4 font-bold text-gray-700">Produk</th>
                        <th className="px-5 py-4 font-bold text-gray-700 text-center">Qty</th>
                        <th className="px-5 py-4 font-bold text-gray-700 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(selectedInvoice.detail || []).length > 0 ? (
                        selectedInvoice.detail?.map((item: InvoiceDetail, i: number) => {
                          let harga = item.harga || 0;
                          let name = item.nama_barang;
                          
                          if ((harga === 0 || !name) && item.barang_id) {
                            const p = productMap.get(item.barang_id);
                            if (p) {
                              harga = p.harga;
                              if (!name) name = p.nama_barang;
                            }
                          }

                          const subtotal = item.subtotal || (harga * (item.qty || 0));

                          return (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="px-5 py-4">
                                <p className="font-bold text-gray-900">{name || `Barang ID: ${item.barang_id}`}</p>
                                {harga > 0 && <p className="text-xs font-medium text-gray-500 mt-1">Rp {new Intl.NumberFormat('id-ID').format(harga)} / item</p>}
                              </td>
                              <td className="px-5 py-4 text-center font-bold text-gray-700">{item.qty}</td>
                              <td className="px-5 py-4 text-right font-black text-gray-900">Rp {new Intl.NumberFormat('id-ID').format(subtotal)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-5 py-10 text-center text-gray-500 bg-gray-50/50">Detail produk tidak direkam oleh sistem.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 shrink-0 rounded-b-3xl -mt-px">
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Status Pembayaran</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 font-bold text-sm">
                  <CheckCircle className="h-4 w-4" /> LUNAS
                </div>
              </div>
              <div className="text-center sm:text-right w-full sm:w-auto border-t border-gray-800 sm:border-0 pt-4 sm:pt-0">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Tagihan</p>
                <span className="text-3xl font-black text-white">
                  Rp {new Intl.NumberFormat('id-ID').format(getInvoiceTotal(selectedInvoice))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
