# Modern Developer Portfolio Website

Website portofolio profesional dan interaktif siap pakai yang dibangun menggunakan standar web modern (HTML5 Semantik, CSS3 Glassmorphism & Dual Theme, serta Vanilla JavaScript ES6+).

---

## 🌟 Fitur Utama

- **Dual Mode (Dark & Light Theme)**: Transisi mulus antara tema gelap dan terang dengan penyimpanan preferensi otomatis di `localStorage`.
- **Glassmorphism & Neon Glow**: Desain visual premium dengan efek frosted glass (`backdrop-filter`) dan gradasi bercahaya.
- **Micro-Interactions & Animasi**:
  - *Typing animation* dinamis pada teks hero.
  - *Stats Counter* yang berjalan otomatis saat discroll.
  - *Scroll-reveal animation* menggunakan modern `IntersectionObserver`.
- **Showcase Proyek Interaktif**:
  - Filter kategori proyek (Web App, E-Commerce, Mobile / UI).
  - Modal Popup detail studi kasus lengkap dengan tantangan, solusi, fitur kunci, dan link repositori/demo.
- **Tech Stack & Filter Keahlian**: Tab kategori (Frontend, Backend, Tools & DevOps) dengan progress bar keahlian.
- **Pengalaman & Pendidikan (Timeline)**: Garis waktu riwayat kerja dan edukasi yang terstruktur rapi.
- **Formulir Kontak Responsif**: Dilengkapi validasi form instan, efek *loading button*, dan *toast notification*.
- **100% Responsif & Mobile-Friendly**: Optimal diakses melalui smartphone, tablet, maupun layar desktop.

---

## 📂 Struktur Berkas

```
d:/portfolio/
├── index.html        # Struktur semantik HTML5 & seluruh section
├── style.css         # Desain sistem, CSS variable tokens, glassmorphism, responsive styles
├── script.js         # Logika interaktif: tema, filter, modal, form validation, dan animasi
└── README.md         # Dokumentasi & panduan penggunaan
```

---

## 🚀 Cara Menjalankan

1. Buka folder `d:/portfolio/` di file explorer Anda.
2. Klik ganda pada file [`index.html`](file:///d:/portfolio/index.html) untuk membukanya di browser apa pun (Google Chrome, Microsoft Edge, Firefox, dll).
3. Anda juga dapat menggunakan ekstensi **Live Server** di VS Code atau editor pilihan Anda untuk fitur live-reload otomatis.

---

## ✏️ Cara Menyesuaikan Konten

- **Mengubah Nama & Bio**: Buka [`index.html`](file:///d:/portfolio/index.html) dan cari tag `<h1 class="hero-title">` serta bagian `<section id="about">`.
- **Menambah / Mengedit Proyek**: Buka [`index.html`](file:///d:/portfolio/index.html) pada bagian `<section id="projects">` dan sesuaikan data studi kasus di objek `projectData` pada [`script.js`](file:///d:/portfolio/script.js).
- **Mengubah Tautan Kontak & Sosial Media**: Ubah URL di bagian `<div class="hero-socials">` dan `<section id="contact">` di [`index.html`](file:///d:/portfolio/index.html).
