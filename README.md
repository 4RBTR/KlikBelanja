# 🛍️ KlikBelanja - Modern Enterprise E-Commerce Platform

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel)](https://klik-belanja.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**KlikBelanja** adalah platform e-commerce modern berstandar enterprise yang dirancang untuk memberikan pengalaman belanja yang mulus dan sistem manajemen inventaris yang kuat. Dibangun dengan teknologi web terbaru, aplikasi ini mengedepankan performa, keamanan, dan desain antarmuka yang intuitif.

🔗 **Live Demo:** [https://klik-belanja.vercel.app](https://klik-belanja.vercel.app)

---

## 🚀 Fitur Utama

### 🛠️ Dashboard Administrator (Control Center)
*   **Analitik Real-Time:** Visualisasi pergerakan stok dan estimasi aset menggunakan grafik interaktif dari **Recharts**.
*   **Manajemen Inventaris:** Sistem CRUD (Create, Read, Update, Delete) produk yang komprehensif dengan dukungan upload gambar.
*   **Smart Inventory Alerts:** Notifikasi otomatis untuk produk dengan stok menipis (di bawah 10 unit).
*   **Estimasi Aset Digital:** Perhitungan otomatis nilai total stok barang untuk laporan finansial cepat.

### 🛒 Pengalaman Pelanggan (User Experience)
*   **Premium Product Mall:** Katalog produk dengan layout kartu modern, filter kategori, dan pencarian cepat.
*   **Persistent Shopping Cart:** Keranjang belanja cerdas yang tersimpan di sesi, memungkinkan pengguna memilih barang spesifik untuk di-checkout.
*   **Dynamic Invoice System:** Pembuatan invoice otomatis dengan sistem pemulihan data harga untuk memastikan akurasi meskipun terjadi perubahan pada API eksternal.
*   **Riwayat Transaksi:** Lacak semua pembelian sebelumnya dengan tampilan modal invoice yang profesional dan siap cetak.

### 🛡️ Keamanan & Arsitektur
*   **Role-Based Access Control (RBAC):** Proteksi rute yang ketat memisahkan akses antara Admin dan User menggunakan **Next-Auth**.
*   **API Proxy Layer:** Implementasi server-side proxy untuk menangani masalah CORS dan menyembunyikan endpoint backend asli demi keamanan data.
*   **Modular Component Design:** Struktur kode yang bersih dan terorganisir di dalam folder `src/components`, `src/context`, dan `src/types`.

---

## 💻 Teknologi yang Digunakan

| Teknologi | Deskripsi |
| :--- | :--- |
| **Next.js 15 (App Router)** | Framework React terbaru untuk performa SSR/SSG yang optimal. |
| **React 19** | Library UI modern dengan dukungan Server Components. |
| **Tailwind CSS 4.0** | Framework CSS utility-first untuk desain UI yang responsif dan elegan. |
| **Next-Auth.js v4** | Solusi autentikasi lengkap untuk manajemen sesi dan role. |
| **Recharts** | Library grafik yang dapat dikomposisi untuk visualisasi data admin. |
| **Lucide React** | Set ikon vektor yang konsisten dan ringan. |
| **Axios** | HTTP Client untuk komunikasi data yang handal dengan backend. |
| **Context API** | Manajemen state global untuk keranjang belanja dan preferensi pengguna. |

---

## 🛠️ Panduan Instalasi Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di mesin lokal Anda:

1.  **Clone Repository**
    ```bash
    git clone https://github.com/username/klik-belanja.git
    cd klik-belanja
    ```

2.  **Instal Dependensi**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables**
    Buat file `.env.local` di root direktori dan tambahkan konfigurasi berikut:
    ```env
    NEXTAUTH_SECRET="your-super-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Jalankan Mode Pengembangan**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## 🌐 Deployment

Proyek ini siap untuk dideploy ke **Vercel** dengan langkah mudah:

1.  Push kode ke GitHub/GitLab/Bitbucket.
2.  Import proyek di dashboard Vercel.
3.  Tambahkan Environment Variables (`NEXTAUTH_SECRET` & `NEXTAUTH_URL`) di pengaturan Vercel.
4.  Klik **Deploy**.

---

*Dikembangkan dengan ❤️ sebagai solusi e-commerce modern yang mengutamakan skalabilitas dan pengalaman pengguna.*

