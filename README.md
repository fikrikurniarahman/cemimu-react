# Cemimu — Hay Day Food Order

Project React + Vite + Tailwind CSS + Framer Motion.

## Cara menjalankan di VS Code

1. Buka folder ini di VS Code (`File → Open Folder`).
2. Buka Terminal (`` Ctrl+` ``), lalu jalankan:
   ```bash
   npm install
   npm run dev
   ```
3. Buka link yang muncul di terminal (biasanya `http://localhost:5173`).

## Foto Produk

Emoji sudah dihapus — sekarang murni pakai foto. Kalau produk belum ada foto, kartu menampilkan
ikon placeholder (bukan emoji).

Ada 2 cara mengisi foto produk:

**Cara 1 — lewat Panel Admin (paling gampang):** buka `Ctrl+Shift+A` → masukkan PIN → Tambah/Edit
produk → upload foto lewat form. Otomatis tersimpan sebagai base64 di `localStorage`, maks 1.5MB
per foto, tanpa perlu sentuh kode.

**Cara 2 — lewat kode:**
1. Taruh file gambarnya di folder `public/images/foods/` (misal `bread.png`).
2. Buka `src/data/foods.js`, isi field `image` pada produk terkait dengan path-nya, contoh:
   ```js
   { id: 1, name: 'Bread', level: 3, price: 250, machine: 'Bakery', image: '/images/foods/bread.png' }
   ```
3. Simpan file, refresh browser.

⚠️ **Penting**: field `image` di `src/data/foods.js` ini hanya data default. Kalau produk sudah
tersimpan di `localStorage` (misalnya pernah ditambah/diedit lewat Panel Admin), perubahan di file
ini tidak langsung muncul. Untuk memaksa pakai data terbaru dari kode: buka Panel Admin → tombol
**"Reset ke data default"**.

## Yang perlu kamu ganti

- **Nomor WhatsApp admin**: edit `WA_ADMIN_NUMBER` di `src/data/foods.js`.
- **Data menu default**: edit array `DEFAULT_FOODS` di file yang sama (nama, emoji, level buka, harga, mesin).
- **Warna & font tema**: edit `tailwind.config.js` (bagian `theme.extend.colors` dan `fontFamily`).

## Panel Admin (kelola produk) — tersembunyi

Tidak ada tombol admin yang terlihat di halaman. Cara membukanya:

1. Tekan **`Ctrl+Shift+A`** (Windows/Linux) atau **`Cmd+Shift+A`** (Mac) di mana saja pada halaman.
2. Masukkan PIN (default: **`2468`** — ganti di `src/components/AdminGate.jsx`, konstanta `ADMIN_PIN`).
3. Panel admin terbuka: **Tambah** produk lewat form, **Edit** lewat tombol di tiap baris, **Hapus**
   dengan konfirmasi, atau **Reset ke data default**.

⚠️ PIN ini disimpan di kode front-end (bukan di server), jadi sifatnya "kunci pintu" ringan untuk
mencegah orang iseng — bukan keamanan tingkat produksi. Kalau butuh proteksi yang lebih serius
(login sungguhan, banyak admin, dsb), tahap berikutnya adalah menyambungkan ke backend — bilang
saja kalau mau dibuatkan.

## Struktur folder

```
cemimu-react/
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css
│  ├─ data/
│  │  └─ foods.js
│  └─ components/
│     ├─ Header.jsx
│     ├─ Hero.jsx
│     ├─ FilterBar.jsx
│     ├─ FoodGrid.jsx
│     ├─ FoodCard.jsx
│     ├─ CartBar.jsx
│     └─ SummaryModal.jsx
```

## Build untuk produksi

```bash
npm run build
```
Hasilnya ada di folder `dist/`, tinggal upload ke hosting statis (Netlify, Vercel, GitHub Pages, dll).

## Yang Baru: Logo, Stok Habis, Kategori, Foto Asli & Minimal Order

- **Logo**: dipasang di header (favicon juga pakai logo yang sama), file ada di `public/images/logo.jpg`.
- **251 produk dengan foto asli**, dikelompokkan ke **37 kategori mesin** (Bakery, BBQ Grill, Loom,
  Jeweler, dst) — semua foto disalin dari asset yang kamu kirim ke `public/images/foods/<kategori>/`.
  Setiap kategori tampil sebagai **judul section** di halaman utama, menampilkan **semua produk**
  di kategori itu (bukan dibatasi jumlahnya).
- **Stok Habis**: tiap produk punya status stok. Di Panel Admin, klik badge **"Ada" / "Habis"** di
  kolom Stok untuk toggle cepat (atau lewat form Edit, ada checkbox "Stok tersedia"). Produk yang
  habis otomatis ditandai badge merah "STOK HABIS" di kartu produk dan tombol +/- nya dinonaktifkan.
- **Minimal order jadi 5 pcs** (sebelumnya 10) — tombol qty +/- sekarang naik/turun per 5, dan saat
  klik "Kirim ke WA Admin", kalau total belum sampai 5 pcs tombolnya nonaktif dengan peringatan.

### Catatan data & harga produk

Nama, level unlock, dan harga 251 produk ini **dibuat otomatis** dari nama file foto (bukan data
resmi dari game/toko manapun) — jadi kemungkinan ada yang kurang pas dan perlu kamu sesuaikan
manual lewat Panel Admin (Edit) atau langsung di `src/data/foods.js`. Urutan kategori diatur di
`src/data/categoryOrder.js` — geser urutan array `CATEGORY_ORDER` kalau mau ubah urutan tampil.
