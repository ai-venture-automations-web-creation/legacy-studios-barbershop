/* ========================================
   Legacy Studios Barbershop - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  let overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  document.body.appendChild(overlay);

  const toggleMenu = () => {
    const isActive = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    overlay.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  const closeMenu = () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Intersection Observer for animations ---
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animations for sibling elements
          const parent = entry.target.parentElement;
          const siblings = parent.querySelectorAll('.fade-in, .slide-up');
          let delay = 0;

          if (siblings.length > 1) {
            const siblingIndex = Array.from(siblings).indexOf(entry.target);
            delay = siblingIndex * 100;
          }

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // --- Active nav link highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + sectionId) {
            a.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

});
