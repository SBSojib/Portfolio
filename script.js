// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .hero-content, .company-card, .skill-category, .education-card, .contact-box').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Theme and Design Switcher Logic
const themeBtns = document.querySelectorAll('.theme-btn');
const designBtns = document.querySelectorAll('.design-btn');
const themeStyleLink = document.getElementById('theme-style');
const designStyleLink = document.getElementById('design-style');

// Check for saved preferences
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
const savedDesign = localStorage.getItem('portfolio-design') || 'split';

setTheme(savedTheme);
setDesign(savedDesign);

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        setTheme(theme);
    });
});

designBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const design = btn.getAttribute('data-design');
        setDesign(design);
    });
});

function setTheme(theme) {
    themeStyleLink.href = `theme-${theme}.css`;
    
    themeBtns.forEach(btn => {
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    localStorage.setItem('portfolio-theme', theme);
}

function setDesign(design) {
    designStyleLink.href = `design-${design}.css`;
    
    designBtns.forEach(btn => {
        if (btn.getAttribute('data-design') === design) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    localStorage.setItem('portfolio-design', design);
}
