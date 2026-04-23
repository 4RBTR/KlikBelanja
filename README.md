# 🛍️ KlikBelanja - E-Commerce Platform (Enterprise Edition)

KlikBelanja adalah platform e-commerce modern yang dibangun dengan **Next.js 15** dan **Tailwind CSS**. Aplikasi ini dirancang dengan standar profesional menggunakan arsitektur modular, visualisasi data analitik, dan sistem navigasi sidebar yang responsif.

## ✨ Fitur Utama

### 👨‍💼 Admin Dashboard
- **Analytics Overview**: Visualisasi stok barang menggunakan grafik interaktif (**Recharts**).
- **Inventory Management**: Kelola produk (Tambah, Edit, Hapus) dengan dukungan upload gambar.
- **Stock Indicators**: Notifikasi visual untuk barang dengan stok rendah (< 10).
- **Asset Estimation**: Perhitungan otomatis total nilai aset stok yang tersedia.

### 👤 User Dashboard
- **Product Mall**: Katalog belanja dengan desain kartu produk premium.
- **Advanced Shopping Cart**: Sistem keranjang belanja persisten dengan fitur pilih barang (checkbox) untuk checkout.
- **Smart Invoicing**: Sistem rincian belanja otomatis yang dapat memulihkan data harga dari katalog (mengatasi limitasi API).
- **Transaction History**: Riwayat pembelian lengkap dengan modal detail invoice yang rapi.

### 🔐 Security & Architecture
- **Next-Auth Integration**: Sistem autentikasi aman dengan pembedaan Role (Admin & User).
- **API Proxy Layer**: Melindungi endpoint backend asli dan menangani CORS secara otomatis melalui server-side proxy.
- **Responsive Sidebar Layout**: Navigasi sidebar yang optimal untuk desktop dan mobile.

## 🚀 Teknologi yang Digunakan
- **Framework**: [Next.js 15+](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Context API
- **Authentication**: Next-Auth v4
- **HTTP Client**: Axios

## 🛠️ Instalasi Lokal

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/klik-belanja.git
   cd klik-belanja
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Buat file `.env.local` di root folder:
   ```env
   NEXTAUTH_SECRET="klikbelanja-super-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## ☁️ Deployment ke Vercel

Proyek ini sudah dioptimalkan untuk dideploy ke [Vercel](https://vercel.com).

### Langkah-langkah:
1. Hubungkan repository GitHub Anda ke Vercel.
2. Pada bagian **Environment Variables**, tambahkan:
   - `NEXTAUTH_SECRET`: (Kunci rahasia bebas, contoh: `klikbelanja-secret-2026`)
   - `NEXTAUTH_URL`: URL aplikasi Anda (contoh: `https://klik-belanja.vercel.app`)
3. Klik **Deploy**.
4. **PENTING**: Pastikan domain Vercel Anda sudah didaftarkan di backend jika diperlukan (CORS), namun karena menggunakan Proxy API Route, biasanya tidak ada masalah.

---
*Dibuat untuk tugas produktif sekolah dengan fokus pada UI/UX dan Clean Code.*
