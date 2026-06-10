/* ===== MARKAN — Interactive Scripts ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Page Loader ---------- */
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 600);
  });
  // Fallback in case 'load' already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader.classList.add('loaded'), 600);
  }

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 60;

  function handleNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > scrollThreshold);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---------- Mobile Navigation ---------- */
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Hero Spark Particles ---------- */
  const sparksContainer = document.getElementById('heroSparks');
  const sparkCount = 30;

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.top = `${40 + Math.random() * 50}%`;
    spark.style.setProperty('--dur', `${1.5 + Math.random() * 3}s`);
    spark.style.setProperty('--dx', `${(Math.random() - 0.5) * 150}px`);
    spark.style.setProperty('--dy', `${-80 - Math.random() * 200}px`);
    spark.style.animationDelay = `${Math.random() * 4}s`;
    spark.style.width = `${2 + Math.random() * 3}px`;
    spark.style.height = spark.style.width;
    sparksContainer.appendChild(spark);
  }

  /* ---------- Counter Animation ---------- */
  const counters = [
    { id: 'statYears',     target: 15 },
    { id: 'statProducts',  target: 200 },
    { id: 'statClients',   target: 500 },
    { id: 'statCountries', target: 25 },
  ];

  let counterAnimated = false;

  function animateCounters() {
    if (counterAnimated) return;
    counterAnimated = true;

    counters.forEach(({ id, target }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const duration = 2000;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = easeOutQuart(frame / totalFrames);
        el.textContent = Math.round(target * progress);
        if (frame >= totalFrames) {
          el.textContent = target;
          clearInterval(timer);
        }
      }, frameDuration);
    });
  }

  function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  // Trigger counters when hero stats are visible
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
  }

  /* ---------- Scroll Reveal Animations ---------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-children');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Active Nav Link Highlight ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  function highlightNav() {
    const scrollY = window.scrollY + navbar.offsetHeight + 20;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      navAnchors.forEach(a => {
        if (a.getAttribute('href') === `#${id}`) {
          if (scrollY >= top && scrollY < bottom) {
            a.style.color = '#fff';
          } else {
            a.style.color = '';
          }
        }
      });
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- Back to Top ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalHTML = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate form submission
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Message Sent!
      `;
      submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
      submitBtn.style.boxShadow = '0 4px 20px rgba(76,175,80,.4)';
      submitBtn.style.opacity = '1';

      // Reset after delay
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        submitBtn.style.boxShadow = '';
      }, 3000);
    }, 1500);
  });

  /* ---------- Product Card Tilt Effect ---------- */
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---------- Parallax-like subtle effect on hero image ---------- */
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

});

/* ---------- Inline spin animation for loading button ---------- */
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spin {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);
