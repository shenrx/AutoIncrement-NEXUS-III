/**
 * 🔁 Auto Incrementer untuk Kontrak Ethereum
 *
 * Script ini secara otomatis melakukan pemanggilan fungsi `increment()` 
 * pada smart contract, dengan batasan jumlah, jeda waktu, dan pengecekan jumlah maksimum.
 *
 * 👤 Dibuat oleh: shenrx
 * 📅 Tanggal: Juli 2025
 * 📜 Lisensi: MIT (lihat file LICENSE)
 *
 * 📌 Cara Menjalankan:
 * 1. Buat file .env berisi:
 *    RPC_URL=<url RPC kamu>
 *    PRIVATE_KEY=<private key dompet kamu>
 *
 * 2. Jalankan dengan: `node auto-increment.js`
 */


require("dotenv").config();
const { ethers } = require("ethers");
const { exec } = require("child_process");
const path = require("path");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "0xB6b278561334d4b83eD9c5248789D120ecE4aE54"; // CA Increment Nexus III - silahkan ganti dengan CA yang kamu buat di https://remix.ethereum.org/ atau biarkan saja
const abi = [
  "function increment() public",
  "function getCount() public view returns (uint256)",
  "event CountIncremented(uint256 newCount)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

// Konfigurasi
const LIMIT = 20;
const DELAY = 3000;
const MAX_COUNT = 2000;
const MAX_RETRIES = 3;

// Fungsi untuk memainkan suara
function playSound(type = "done") {
  const soundFile = path.join(__dirname, `${type}.wav`);
  const isWin = process.platform === "win32";

  if (isWin) {
    exec(`powershell -c (New-Object Media.SoundPlayer '${soundFile}').PlaySync();`);
  } else {
    exec(`afplay '${soundFile}'`); // macOS
    // Untuk Linux: ganti dengan `aplay` atau `paplay`
  }
}

async function autoIncrement(limit, delay, maxCount) {
  for (let i = 0; i < limit; i++) {
    const before = await contract.getCount();
    console.log(`🔢 Sebelum increment ke-${i + 1}: ${before.toString()}`);

    if (before.gte(maxCount)) {
      console.log(`🛑 Dihentikan otomatis karena count sudah mencapai ${before.toString()}`);
      playSound("done");
      break;
    }

    let success = false;
    let retries = 0;

    while (!success && retries < MAX_RETRIES) {
      try {
        const start = Date.now();
        const tx = await contract.increment();
        console.log(`🚀 Tx ${i + 1} dikirim: ${tx.hash}`);
        await tx.wait();
        const end = Date.now();

        const after = await contract.getCount();
        console.log(`📈 Setelah increment ke-${i + 1}: ${after.toString()}`);
        console.log(`⏱️ Waktu eksekusi: ${(end - start) / 1000}s\n`);

        success = true;
      } catch (err) {
        retries++;
        console.error(`⚠️ Gagal increment ke-${i + 1}, percobaan ke-${retries}`);
        playSound("retry");
        await new Promise(res => setTimeout(res, 2000));
      }
    }

    if (!success) {
      console.log(`❌ Gagal total pada increment ke-${i + 1}, lanjut ke berikutnya...\n`);
    }

    await new Promise(res => setTimeout(res, delay));
  }

  console.log("🎉 Semua proses selesai!");
  playSound("done");
}

autoIncrement(LIMIT, DELAY, MAX_COUNT);
