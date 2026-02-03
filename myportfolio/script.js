// ===========================
// Navigation Functionality
// ===========================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNavOnScroll);

// ===========================
// Smooth Scrolling
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll to Top Button
// ===========================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Counter Animation for Stats
// ===========================

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
    
    statsAnimated = true;
};

// ===========================
// Skill Bar Animation
// ===========================

const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const animateSkills = () => {
    if (skillsAnimated) return;
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
    
    skillsAnimated = true;
};

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

// Fade in animation for elements
const fadeElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Stats animation observer
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
}

// Skills animation observer
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, observerOptions);
    
    skillsObserver.observe(skillsSection);
}

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // Optional: Send email using a service like EmailJS
    // emailjs.send('service_id', 'template_id', formData)
    //     .then(() => {
    //         alert('Message sent successfully!');
    //         contactForm.reset();
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         alert('Failed to send message. Please try again.');
    //     });
});

// ===========================
// Typing Effect for Hero Section
// ===========================

const typingText = document.querySelector('.hero-subtitle');
const originalText = typingText.textContent;
const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
    typingText.textContent = currentRole.substring(0, charIndex);
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ===========================
// Cursor Effect (Optional)
// ===========================

const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

// Add cursor styles dynamically
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor, .cursor-follower {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
    }
    
    .cursor {
        width: 10px;
        height: 10px;
        background: var(--primary-color);
    }
    
    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid var(--primary-color);
        opacity: 0.5;
    }
    
    @media (max-width: 768px) {
        .cursor, .cursor-follower {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.transform = `translate(${cursorX - 5}px, ${cursorY - 5}px)`;
    cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale cursor on hover
const clickableElements = document.querySelectorAll('a, button, input, textarea');

clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursorFollower.style.transform += ' scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    });
});

// ===========================
// Parallax Effect for Hero Background
// ===========================

const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// Dynamic Year in Footer
// ===========================

const yearElement = document.querySelector('.footer-content p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// ===========================
// Preloader (Optional)
// ===========================

window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid var(--bg-secondary);
            border-top-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    // Remove preloader after page loads
    setTimeout(() => {
        if (document.querySelector('.preloader')) {
            document.querySelector('.preloader').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.preloader')?.remove();
            }, 500);
        }
    }, 1000);
});

// ===========================
// Console Message
// ===========================

console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #6b7280;');
console.log('%chttps://github.com/yourusername', 'font-size: 14px; color: #6366f1;');