/***********************
  THEME TOGGLE (SAVED)
************************/
const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
  if (theme === "light") document.body.classList.add("light");
  else document.body.classList.remove("light");
}

(function loadTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);
})();

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  const nextTheme = isLight ? "dark" : "light";
  applyTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});


/***********************
  MOBILE MENU
************************/
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});


/***********************
  ACTIVE SECTION HIGHLIGHT
************************/
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const offset = sec.offsetTop - 170;
    const height = sec.offsetHeight;
    if (window.scrollY >= offset && window.scrollY < offset + height) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) link.classList.add("active");
  });
});


/***********************
  ABOUT PANEL
************************/
const aboutBtn = document.getElementById("aboutBtn");
const aboutPanel = document.getElementById("aboutPanel");

aboutBtn.addEventListener("click", () => {
  aboutPanel.classList.toggle("show");
});


/***********************
  TYPING EFFECT
************************/
const typingText = document.getElementById("typingText");
const roles = [
  "AI Development",
  "Cybersecurity Engineering",
  "SOC Analyst Workflows",
  "Security Automation with Python"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingText.textContent = currentRole.slice(0, charIndex++);
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typingText.textContent = currentRole.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 45 : 70;
  setTimeout(typeLoop, speed);
}
typeLoop();


/***********************
  PROJECT FILTER + MODAL
************************/
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", (event) => {
    filterButtons.forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      const category = card.getAttribute("data-category");
      card.style.display = (filter === "all" || filter === category) ? "block" : "none";
    });
  });
});

// Modal Elements
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalGithub = document.getElementById("modalGithub");
const modalDemo = document.getElementById("modalDemo");

projectCards.forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalTech.textContent = card.dataset.tech;

    modalGithub.href = card.dataset.github;

    // Demo optional
    if (card.dataset.demo && card.dataset.demo.trim() !== "") {
      modalDemo.style.display = "inline-flex";
      modalDemo.href = card.dataset.demo;
    } else {
      modalDemo.style.display = "none";
    }

    modalOverlay.classList.add("show");
  });
});

modalClose.addEventListener("click", () => modalOverlay.classList.remove("show"));
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove("show");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modalOverlay.classList.remove("show");
});


/***********************
  SCROLL TO TOP BUTTON
************************/
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 550) scrollTopBtn.classList.add("show");
  else scrollTopBtn.classList.remove("show");
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/***********************
  SECTION FADE-IN ON SCROLL
************************/
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));


/***********************
  SKILL BARS ANIMATION (ON LOAD)
************************/
window.addEventListener("load", () => {
  document.querySelectorAll(".bar > div").forEach(el => {
    el.style.width = el.getAttribute("data-width");
  });
});


/***********************
  CONTACT FORM (EmailJS)
************************/
/*
  ✅ SETUP REQUIRED:
  1) Create account: https://www.emailjs.com/
  2) Create Email Service
  3) Create Email Template
  4) Replace below values
*/
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

// Initialize EmailJS only if keys are updated
try {
  if (PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(PUBLIC_KEY);
  }
} catch (e) {}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "Sending...";

  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm);
    formStatus.textContent = "Message sent successfully!";
    contactForm.reset();
  } catch (err) {
    formStatus.textContent = "Failed to send. Please try again.";
  }
});


/***********************
  LIGHTWEIGHT PARTICLES
************************/
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    });
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(148,163,184,0.7)";
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();
