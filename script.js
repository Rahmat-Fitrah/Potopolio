/**
 * PORTFOLIO INTERACTIVE LOGIC & ANIMATIONS
 * Author: Rahmat Fitrah
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark / Light Mode)
  initThemeToggle();

  // 2. Typing Effect in Hero Title
  initTypingEffect();

  // 3. Navbar Sticky & ScrollSpy Active Link
  initNavbar();

  // 4. Scroll Reveal Animations (Intersection Observer)
  initScrollReveal();

  // 5. Statistics Counter Animation
  initStatsCounter();

  // 6. Skill Category Filter
  initSkillsFilter();

  // 7. Project Category Filter
  initProjectsFilter();

  // 8. Project Detail Modal
  initProjectModal();

  // 9. Contact Form Validation & Toast Notification
  initContactForm();

  // 10. Back to Top Button & Footer Year
  initBackToTop();
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    showToast(`Beralih ke tema ${newTheme === 'dark' ? 'Gelap 🌙' : 'Terang ☀️'}`, 'success');
  });
}

/* ==========================================================================
   2. Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'Mahasiswa Teknik Informatika',
    'Streamlit & AI',
    'Data & Kaggle Enthusiast',
    'Public Speaker & Tech Learner'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 2000;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   3. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Navbar scroll background change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile Hamburger Toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   4. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, we don't need to observe it again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   5. Stats Counter Animation
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const statsContainer = document.querySelector('.hero-stats-container');
  if (!statsContainer) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * target);

            counter.textContent = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.5 });

  counterObserver.observe(statsContainer);
}

/* ==========================================================================
   6. Skill Filter
   ========================================================================== */
function initSkillsFilter() {
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Projects Filter
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filter === 'all' || cardCategory === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   8. Project Detail Modal
   ========================================================================== */
const projectData = {
  "1": {
    title: "CloudPulse - Platform Analitik SaaS Real-Time",
    category: "Web Application / SaaS",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Chart.js"],
    overview: "CloudPulse adalah platform manajemen analitik untuk bisnis digital yang menyatukan log traffic, metrik performa server, dan konversi penjualan dalam satu dasbor terpadu.",
    challenge: "Menghadirkan visualisasi data bervolume tinggi dengan rendering grafik 60fps tanpa membebani browser pengguna serta latensi update real-time di bawah 100ms.",
    solution: "Mengimplementasikan WebSocket stream efisien dan client-side virtualization untuk tabel log besar, dikombinasikan dengan arsitektur serverless di Vercel.",
    features: [
      "Dashboard dinamis dengan widget kustom yang bisa digeser (Drag & Drop)",
      "Ekspor laporan otomatis harian/mingguan dalam format PDF & CSV",
      "Sistem Role & Permission manajemen tim berbasis RBAC",
      "Notifikasi instan via Webhook Discord & Slack"
    ],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  "2": {
    title: "LuxeWear - Toko Fashion Online Interaktif",
    category: "E-Commerce",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "Midtrans Payment", "Redux Toolkit"],
    overview: "Situs belanja busana modern dengan pengalaman interaktif, pencarian instan dengan filter multi-kategori, dan alur checkout mulus.",
    challenge: "Integrasi pembayaran Payment Gateway lokal yang aman dan pembaruan stok produk secara realtime guna mencegah over-ordering ketika flash sale.",
    solution: "Menggunakan sistem transaksi database atomic MongoDB dengan locking serta webhook verifikasi enkripsi ganda untuk konfirmasi bayar otomatis.",
    features: [
      "Pencarian cerdas & filter harga, ukuran, serta warna produk",
      "Sistem keranjang belanja lokal & cloud terintegrasi",
      "Payment Gateway (QRIS, VA Bank, E-Wallet, Kartu Kredit)",
      "Panel dashboard admin untuk mengelola pesanan & stok"
    ],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  "3": {
    title: "TaskFlow - Manajemen Kolaborasi Tim Real-Time",
    category: "Productivity / SaaS",
    tags: ["Vue.js 3", "Express.js", "Socket.io", "Redis", "Docker"],
    overview: "Aplikasi manajemen proyek bergaya Kanban untuk tim pengembang yang mendukung kolaborasi langsung dan chat kontekstual.",
    challenge: "Memastikan sinkronisasi status kartu tugas antar anggota tim yang sedang membuka halaman bersamaan tanpa konflik state.",
    solution: "Pemanfaatan Socket.io dengan Redis Pub/Sub adapter untuk mendistribusikan event kolaborasi dengan latensi minimal.",
    features: [
      "Papan Kanban interaktif dengan drag-and-drop halus",
      "Thread komentar dan attachment berkas pada setiap tugas",
      "Integrasi kalender sprint dan grafik burndown tim",
      "Dukungan mode gelap dan kustomisasi tema workspace"
    ],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  "4": {
    title: "FitPulse - Aplikasi Pelacak Kebugaran & Nutrisi",
    category: "Mobile / UI/UX Design",
    tags: ["React Native", "Figma", "Firebase Auth", "Firestore", "Lottie Animations"],
    overview: "Desain dan prototipe aplikasi mobile komprehensif untuk pelacakan kebugaran, pola makan, dan konsistensi hidrasi.",
    challenge: "Membuat antarmuka visual yang menyenangkan dan memotivasi pengguna untuk mempertahankan kebiasaan sehat harian.",
    solution: "Penerapan gamifikasi dengan badge pencapaian, animasi mikro Lottie yang memikat, dan grafik tren kemajuan mingguan.",
    features: [
      "Pencatat asupan kalori & nutrisi harian dengan database makanan",
      "Panduan latihan harian dengan video demonstrasi",
      "Statistik grafik progres berat badan dan indeks massa tubuh (BMI)",
      "Pengingat minum air otomatis dengan push notification"
    ],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com"
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      const data = projectData[projId];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="modal-project-header">
          <div class="status-pill">${data.category}</div>
          <h2 class="modal-project-title">${data.title}</h2>
          <div class="project-tags">
            ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>

        <h4 class="modal-section-title"><i class="fa-solid fa-circle-info"></i> Ringkasan Proyek</h4>
        <p>${data.overview}</p>

        <h4 class="modal-section-title"><i class="fa-solid fa-bullseye"></i> Tantangan & Solusi</h4>
        <p><strong>Tantangan:</strong> ${data.challenge}</p>
        <p style="margin-top: 0.5rem;"><strong>Solusi:</strong> ${data.solution}</p>

        <h4 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Fitur Kunci</h4>
        <ul class="service-features" style="border: none; padding-top: 0.2rem;">
          ${data.features.map(f => `<li><i class="fa-solid fa-check text-green"></i> ${f}</li>`).join('')}
        </ul>

        <div class="modal-actions">
          <a href="${data.demoUrl}" target="_blank" class="btn btn-primary">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Live Demo</span>
          </a>
          <a href="${data.githubUrl}" target="_blank" class="btn btn-outline">
            <i class="fa-brands fa-github"></i>
            <span>Lihat Repositori</span>
          </a>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. Contact Form & Toast Notifications
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Field references
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Reset error texts
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';

    let isValid = true;

    // Validation checks
    if (!nameInput.value.trim()) {
      document.getElementById('nameError').textContent = 'Mohon masukkan nama lengkap Anda.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      document.getElementById('emailError').textContent = 'Mohon masukkan alamat email Anda.';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Format email tidak valid (contoh: user@domain.com).';
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      document.getElementById('subjectError').textContent = 'Mohon cantumkan subjek pesan.';
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      document.getElementById('messageError').textContent = 'Pesan tidak boleh kosong.';
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      document.getElementById('messageError').textContent = 'Pesan minimal berisi 10 karakter.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      form.reset();

      showToast('🎉 Terima kasih! Pesan Anda telah berhasil terkirim. Saya akan segera merespons.', 'success');
    }, 1200);
  });

  // CV Download Button listener
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('📄 Berkas CV sedang disiapkan untuk pengunduhan.', 'success');
    });
  }
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   10. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
