# 🔢 Konversi Huruf ke Biner dengan Mesin Turing

Aplikasi web interaktif yang mensimulasikan **Mesin Turing** untuk mengkonversi huruf (A-Z dan a-z) ke kode biner 8-bit. Dilengkapi dengan visualisasi langkah demi langkah yang detail dan animasi menarik.

<p align="center">
  <img src="asset/logoumrah.png" alt="Logo Aplikasi Mesin Turing">
</p>

## ✨ Fitur Utama

- 🎯 **Konversi Real-time**: Konversi huruf A-Z dan a-z ke biner 8-bit
- 📊 **Visualisasi Interaktif**: Lihat proses Mesin Turing secara step-by-step
- 🎬 **Animasi Tape**: Visualisasi input tape dan output tape dengan animasi smooth
- 📋 **Tabel Langkah**: Detail setiap transisi state dalam format tabel
- 🔄 **Navigasi Step**: Tombol prev/next untuk menelusuri setiap langkah
- 🎨 **UI Modern**: Desain responsif dengan animasi yang smooth
- ⚡ **Real Turing Machine Logic**: Implementasi algoritma Mesin Turing yang akurat

## 🖼️ Screenshot

### Halaman Home
Antarmuka utama untuk melakukan konversi huruf ke biner dengan visualisasi lengkap.

### Visualisasi Tape
Melihat proses konversi secara real-time dengan tape head yang bergerak.

### Tabel Langkah
Detail setiap transisi state Mesin Turing dalam format tabel yang mudah dibaca.

## 🚀 Cara Menjalankan

### Prasyarat
- Python 3.x terinstall di sistem Anda
- Browser modern (Chrome, Firefox, Edge, Safari)

### Langkah-langkah

1. **Clone atau Download Repository**
   ```bash
   git clone <repository-url>
   cd <folder-project>
   ```

2. **Jalankan Server**
   ```bash
   python server.py
   ```

3. **Buka Browser**
   - Akses `http://localhost:8000`
   - Atau `http://127.0.0.1:8000`

4. **Mulai Konversi**
   - Pilih huruf dari dropdown (A-Z atau a-z)
   - Klik tombol "Konversi"
   - Lihat visualisasi langkah demi langkah
   - Navigasi dengan tombol Prev/Next

## 📁 Struktur File

```
project/
│
├── index.html          # Halaman utama aplikasi
├── style.css           # Styling dan animasi
├── script.js           # Logika Mesin Turing dan interaksi UI
├── server.py           # HTTP server lokal
├── asset/
│   └── logoumrah.png   # Logo aplikasi
└── README.md           # Dokumentasi ini
```

## 🔧 Cara Kerja Mesin Turing

### State Diagram

Mesin Turing menggunakan beberapa state untuk konversi:

- **q0**: Inisialisasi dan perhitungan bit
- **q_move_to_target**: Gerak ke posisi target di tape
- **q_write_bit**: Menulis bit (0 atau 1) ke output tape
- **q_next_bit**: Persiapan untuk bit berikutnya
- **q_return_home**: Kembali ke posisi awal
- **q_accept**: State akhir (konversi berhasil)

### Algoritma

1. **Input**: Membaca huruf dari input
2. **Konversi ASCII**: Mendapatkan nilai ASCII huruf
3. **Perhitungan Biner**: 
   - Dimulai dari bit paling signifikan (bit 7)
   - Hitung apakah `ASCII ≥ 2^bit`
   - Jika ya, tulis `1` dan kurangi ASCII
   - Jika tidak, tulis `0`
4. **Iterasi**: Ulangi untuk bit 6, 5, 4, 3, 2, 1, 0
5. **Output**: Hasil biner 8-bit

### Contoh Konversi

**Input: 'A' (ASCII: 65)**

```
Step 1: 65 ≥ 128 (2^7)? NO → bit[0] = 0, sisa = 65
Step 2: 65 ≥ 64  (2^6)? YES → bit[1] = 1, sisa = 1
Step 3: 1  ≥ 32  (2^5)? NO → bit[2] = 0, sisa = 1
Step 4: 1  ≥ 16  (2^4)? NO → bit[3] = 0, sisa = 1
Step 5: 1  ≥ 8   (2^3)? NO → bit[4] = 0, sisa = 1
Step 6: 1  ≥ 4   (2^2)? NO → bit[5] = 0, sisa = 1
Step 7: 1  ≥ 2   (2^1)? NO → bit[6] = 0, sisa = 1
Step 8: 1  ≥ 1   (2^0)? YES → bit[7] = 1, sisa = 0

Result: 01000001
```

## 🎮 Panduan Penggunaan

### 1. Memilih Huruf
- Klik dropdown "Pilih huruf"
- Pilih huruf yang ingin dikonversi (A-Z atau a-z)

### 2. Melakukan Konversi
- Klik tombol "Konversi" 
- Tunggu proses konversi selesai
- Lihat notifikasi sukses

### 3. Melihat Visualisasi
- **Input Tape**: Menampilkan huruf input
- **Output Tape**: Menampilkan proses penulisan bit
- **Tape Head (▼)**: Menunjukkan posisi saat ini
- **State Display**: Menampilkan state Mesin Turing saat ini
- **Action**: Deskripsi aksi yang sedang dilakukan

### 4. Navigasi Step
- **Sebelumnya**: Kembali ke step sebelumnya
- **Selanjutnya**: Maju ke step berikutnya
- **Step Info**: Menampilkan step saat ini / total step

### 5. Melihat Hasil
- **Huruf Input**: Huruf yang dikonversi
- **Kode ASCII**: Nilai ASCII desimal
- **Biner (8-bit)**: Hasil konversi biner

### 6. Menghapus Data
- Klik tombol "Hapus Semua"
- Konfirmasi penghapusan
- Semua data akan direset

## 🎨 Fitur UI/UX

- ✅ **Toast Notifications**: Feedback real-time untuk setiap aksi
- ✅ **Loading States**: Indikator loading saat proses konversi
- ✅ **Smooth Animations**: Transisi yang halus dan menarik
- ✅ **Responsive Design**: Tampilan optimal di berbagai ukuran layar
- ✅ **Color-coded States**: Warna berbeda untuk setiap jenis aksi
- ✅ **Highlight Current Step**: Step aktif ditandai dengan highlight
- ✅ **SweetAlert2 Modals**: Dialog konfirmasi yang elegant

## 🎯 Teknologi yang Digunakan

- **HTML5**: Struktur halaman
- **CSS3**: Styling dan animasi
- **JavaScript (ES6+)**: Logika aplikasi dan Mesin Turing
- **Python**: HTTP server lokal
- **SweetAlert2**: Modal dialog yang cantik
- **Flaticon Icons**: Icon set yang modern

## 📝 Validasi

Aplikasi ini memvalidasi hasil konversi dengan cara:

1. Membandingkan hasil dengan JavaScript native `toString(2)`
2. Menampilkan status ✓ (valid) atau ✗ (invalid)
3. Menampilkan expected result jika ada perbedaan

## 🐛 Troubleshooting

### Server tidak bisa dijalankan
```bash
# Pastikan Python terinstall
python --version

# Atau gunakan python3
python3 server.py
```

### Port 8000 sudah digunakan
Edit file `server.py` dan ubah nilai `PORT`:
```python
PORT = 8080  # Ganti dengan port lain
```

### Browser tidak bisa akses
- Pastikan firewall tidak memblokir port
- Coba akses dengan `http://127.0.0.1:8000`
- Gunakan browser mode incognito

## 🔮 Pengembangan Selanjutnya

- [ ] Diagram State Mesin Turing
- [ ] Export hasil ke PDF/Image
- [ ] Mode dark/light theme
- [ ] Dukungan karakter Unicode
- [ ] Animasi yang lebih kompleks
- [ ] Tutorial interaktif

## 👥 Kontributor

Proyek ini dibuat untuk keperluan pembelajaran Teori Komputasi - Mesin Turing.

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi.

## 📞 Kontak

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**⭐ Jangan lupa beri star jika project ini membantu Anda!**