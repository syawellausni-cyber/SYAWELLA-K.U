/* 
=========================================
Logika Interaktif Portofolio Modern
Klien: Syawella Khairatul Usni
Spesialisasi: Software Engineer
=========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Pengalih Tema (Dark/Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Cek preferensi tema yang tersimpan di localStorage
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Simpan preferensi pengguna
    if (body.classList.contains('light-theme')) {
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });

  // ==========================================
  // 2. Header Mengecil saat Scroll (Scrolled Navbar)
  // ==========================================
  const header = document.querySelector('.header');
  
  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Jalankan sekali saat load pertama kali

  // ==========================================
  // 3. Efek Teks Mengetik Otomatis (Typing Effect)
  // ==========================================
  const typeTarget = document.getElementById('typing-text');
  const words = [
    'Software Engineer.',
    'Frontend Specialist.',
    'Problem Solver.',
    'Tech Enthusiast.'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const typeEffect = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Menghapus karakter
      typeTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Lebih cepat saat menghapus
    } else {
      // Mengetik karakter
      typeTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Kecepatan mengetik normal
    }

    // Mengontrol transisi antar kata
    if (!isDeleting && charIndex === currentWord.length) {
      // Selesai mengetik satu kata penuh, jeda sebelum menghapus
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Selesai menghapus, lanjut ke kata berikutnya
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Jeda singkat sebelum mengetik kata baru
    }

    setTimeout(typeEffect, typingSpeed);
  };

  // Mulai efek mengetik jika elemen target ada
  if (typeTarget) {
    typeEffect();
  }

  // ==========================================
  // 4. Animasi Scroll (Scroll Reveal & Skill Bars)
  // ==========================================
  const revealElements = document.querySelectorAll('.fade-in-up');
  const skillBars = document.querySelectorAll('.skill-bar-inner');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        revealObserver.unobserve(entry.target); // Hanya animasikan sekali
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Observer khusus untuk bar progres keahlian
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetPct = bar.getAttribute('data-percent');
        bar.style.width = targetPct + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  // ==========================================
  // 5. Filter Galeri Proyek (Project Filtering)
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Hapus kelas aktif dari semua tombol
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Tambahkan kelas aktif pada tombol yang diklik
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          // Tampilkan dengan efek transisi halus
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Sembunyikan dengan efek transisi halus
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 6. Penanganan & Validasi Formulir Kontak
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Mengambil nilai input
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      // Validasi sederhana
      if (!name || !email || !subject || !message) {
        showStatus('Harap lengkapi semua bidang formulir.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showStatus('Format email tidak valid. Harap periksa kembali.', 'error');
        return;
      }

      // Animasi Loading pada tombol kirim
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24" style="animation: spin 1s linear infinite; margin-right: 8px; display: inline;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style="opacity: 0.75;"></path>
        </svg>
        Mengirim...
      `;

      // Simulasikan pengiriman API dengan timeout (1.5 detik)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Tampilkan pesan sukses
        showStatus('Terima kasih! Pesan Anda telah berhasil terkirim. Syawella akan segera menghubungi Anda.', 'success');
        
        // Reset formulir
        contactForm.reset();
      }, 1500);
    });
  }

  // Fungsi Pembantu: Validasi Format Email
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Fungsi Pembantu: Tampilkan Notifikasi Status Form
  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status'; // Reset class
    formStatus.classList.add(type);
    
    // Gulir halus ke arah status jika tidak terlihat
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Sembunyikan pesan sukses setelah 8 detik
    if (type === 'success') {
      setTimeout(() => {
        formStatus.style.opacity = '0';
        setTimeout(() => {
          formStatus.style.display = 'none';
          formStatus.style.opacity = '1';
        }, 500);
      }, 8000);
    }
  }

  // Tambahkan gaya CSS keyframe berputar untuk spinner secara dinamis jika belum ada
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});
