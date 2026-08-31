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
    'Data & Kaggle Enthusiast'
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
    title: "Decent Work & Economic Growth (SDG 8.3)",
    category: "Web Application / Machine Learning",
    tags: ["Python", "Streamlit", "Pandas", "Matplotlib", "Machine Learning"],
    overview: "Aplikasi web analitik interaktif yang dibangun untuk memetakan, menganalisis, dan menyajikan data pertumbuhan ekonomi nasional guna mendukung SDG ke-8: Pekerjaan Layak dan Pertumbuhan Ekonomi (khususnya Target 8.3).",
    challenge: "Menyajikan data ekonomi bervolume tinggi agar dapat dipahami secara instan oleh tim riset dan pembuat keputusan tanpa harus membaca tabel data mentah secara manual.",
    solution: "Mengembangkan visualisasi interaktif berbasis Streamlit dengan grafik tren pertumbuhan otomatis, pendeteksi anomali data, serta fitur penyusunan laporan analisis secara instan.",
    features: [
      "Membantu proses pembacaan data lebih cepat daripada membaca manual",
      "Mendukung penyusunan laporan hasil analisis secara instan",
      "Berkoordinasi dengan tim terkait proses pembuatan website Streamlit",
      "Pembersihan data otomatis dan visualisasi tren SDG 8.3"
    ],
    demoUrl: "https://kelompokml.streamlit.app/",
    githubUrl: "#"
  },
  "2": {
    title: "Koleksi Analisis Data & Input Data",
    category: "Data Analysis / Kaggle",
    tags: ["Python", "Pandas", "NumPy", "EDA", "Data Cleaning"],
    overview: "Kumpulan notebook analisis eksplorasi data (EDA) dan penginputan data mentah dari berbagai dataset publik Kaggle, dengan fokus pada pembersihan data (data cleaning) dan akurasi entri.",
    challenge: "Mengatasi inkonsistensi entri data, nilai kosong (missing values), dan format data yang tidak beraturan dari dataset mentah.",
    solution: "Menerapkan metode imputasi data yang tepat, otomatisasi deteksi duplikat menggunakan Python Pandas, serta menyusun dokumentasi pencatatan yang terstruktur.",
    features: [
      "Pembersihan data (Data Cleaning) & Imputasi missing values",
      "Analisis statistik deskriptif dan visualisasi korelasi",
      "Pencatatan dan pengelolaan metadata dataset secara akurat",
      "Dapat digunakan kembali (reusable) sebagai template pengolahan data"
    ],
    demoUrl: "#",
    githubUrl: "#"
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

  // CV Download Button listener to trigger print modal
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  const cvModal = document.getElementById('cvModal');
  const cvModalCloseBtn = document.getElementById('cvModalCloseBtn');
  const printCvBtn = document.getElementById('printCvBtn');

  if (downloadCvBtn && cvModal) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cvModal.classList.add('active');
      cvModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      showToast('📄 Membuka Pratinjau CV Resmi Rahmat Fitrah.', 'success');
    });

    if (cvModalCloseBtn) {
      cvModalCloseBtn.addEventListener('click', () => {
        cvModal.classList.remove('active');
        cvModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    }

    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        cvModal.classList.remove('active');
        cvModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });

    // Add Escape key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cvModal.classList.contains('active')) {
        cvModal.classList.remove('active');
        cvModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
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
