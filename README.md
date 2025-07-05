# AutoIncrement-NEXUS-III
# 🔁 Ethereum Smart Contract Auto-Incrementer
👨‍💻 Dibuat oleh
Nama: shenrx
GitHub: @shenrx
📄 Lisensi
Proyek ini menggunakan lisensi MIT

Skrip otomatisasi yang memanggil fungsi `increment()` pada smart contract Ethereum secara berulang dan bisa digunakan selain NEXUS III, dengan mekanisme retry, jeda waktu antar transaksi, dan batas maksimum jumlah.

## 🚀 Fitur

- Menggunakan `ethers.js` dan `dotenv` untuk koneksi blockchain
- Retry otomatis saat transaksi gagal
- Notifikasi suara untuk status eksekusi (`done.wav`, `retry.wav`)
- Konfigurasi limit, delay, dan max count

## 🛠️ Cara Penggunaan

1. Clone repositori ini:
    ```bash
   git clone https://github.com/shenrx/auto-incrementer.git
   cd auto-incrementer
2. Install dependensi:
    ```bash
   npm install
3. Buat file .env:
    ```ENV
    RPC_URL=https://nexus-testnet.g.alchemy.com/public
    PRIVATE_KEY=0x...

4. Jalankan skrip:
    ```bash
      node auto-increment.js

## 🔧 Konfigurasi
Atur parameter berikut dalam file auto-increment.js sesuai kebutuhan:
    const LIMIT = 20; //batas harian
    const DELAY = 3000; // 3 detik = 3000 ms
    const MAX_COUNT = 2000; // buat sesuai keinginan



