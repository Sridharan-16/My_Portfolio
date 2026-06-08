// ========================
// TIME DISPLAY
// ========================
function showTime() {
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('currentTime').innerHTML = currentTime;
}

// Update time every second
setInterval(showTime, 1000);
showTime();

// ========================
// NAVIGATION
// ========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    if (hamburger) {
      hamburger.classList.remove('active');
    }
  });
});

// ========================
// ACTIVE NAV LINK
// ========================
function updateActiveLink() {
  const sections = document.querySelectorAll('section');
  const navLinksArray = Array.from(navLinks);

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ========================
// SCROLL ANIMATIONS
// ========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = entry.target.getAttribute('data-animation');
      entry.target.style.opacity = '1';
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('[data-animation]').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ========================
// SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================
// HEADER SCROLL EFFECT
// ========================
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    header.style.boxShadow = '0 2px 30px rgba(102, 252, 241, 0.2)';
  } else {
    header.style.boxShadow = '0 2px 20px rgba(102, 252, 241, 0.1)';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================
// PARALLAX EFFECT
// ========================
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const scrollPosition = window.pageYOffset;
    heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
});

// ========================
// COUNTER ANIMATION
// ========================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const stats = entry.target.querySelectorAll('.stat h3');
      stats.forEach((stat, index) => {
        if (stat.textContent.includes('+')) {
          animateCounter(stat, 50);
        } else if (stat.textContent === '%') {
          animateCounter(stat, 100);
        }
      });
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
  statsObserver.observe(aboutStats);
}

// ========================
// FORM VALIDATION (if needed)
// ========================
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
  });
}

// ========================
// TYPING EFFECT
// ========================
function typeEffect(element, text, speed = 50) {
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// ========================
// LOAD EVENT
// ========================
window.addEventListener('load', () => {
  // Add any initial animations or effects here
  console.log('Portfolio loaded successfully');
});

// ========================
// PRELOAD IMAGES
// ========================
function preloadImages(imageArray) {
  imageArray.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Add your image sources here
const imagesToPreload = [
  'img/WhatsApp Image 2025-06-16 at 19.42.44_5f5d40bd.jpg'
];

preloadImages(imagesToPreload);

// ========================
// MOBILE MENU RESPONSIVE
// ========================
function handleResize() {
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
    if (hamburger) {
      hamburger.classList.remove('active');
    }
  }
}

window.addEventListener('resize', handleResize);
