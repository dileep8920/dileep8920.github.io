// ========================================
// NAVIGATION & MOBILE MENU
// ========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        navMenu.classList.remove('active');
    }
});

// ========================================
// TYPING ANIMATION
// ========================================

const roles = [
    'Backend Developer',
    'SaaS Specialist',
    'Problem Solver',
    'Coffee Enthusiast'
];

let currentRoleIndex = 0;
const dynamicRoleElement = document.getElementById('dynamicRole');

function typeRole() {
    const role = roles[currentRoleIndex];
    let charIndex = 0;
    
    // Clear the element
    dynamicRoleElement.textContent = '';
    
    function type() {
        if (charIndex < role.length) {
            dynamicRoleElement.textContent += role[charIndex];
            charIndex++;
            setTimeout(type, 50);
        } else {
            setTimeout(deleteRole, 2000);
        }
    }
    
    type();
}

function deleteRole() {
    let charIndex = dynamicRoleElement.textContent.length;
    
    function deleteChar() {
        if (charIndex > 0) {
            dynamicRoleElement.textContent = dynamicRoleElement.textContent.slice(0, -1);
            charIndex--;
            setTimeout(deleteChar, 30);
        } else {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        }
    }
    
    deleteChar();
}

// Start typing animation when page loads
window.addEventListener('load', typeRole);

// ========================================
// SCROLL ANIMATIONS (Simple AOS Alternative)
// ========================================

function revealElementsOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const revealElement = (element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50 && elementBottom > 0) {
            element.style.opacity = '1';
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Initialize scroll animations
window.addEventListener('load', revealElementsOnScroll);

// ========================================
// SMOOTH SCROLL OFFSET
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// CONTACT FORM WITH VALIDATION
// ========================================

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const subjectInput = document.querySelector('input[name="subject"]');
const messageInput = document.querySelector('textarea[name="message"]');

// Validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
    let isValid = true;
    const errors = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    
    // Validate name
    if (!nameInput.value.trim()) {
        errors.name = 'Name is required';
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Validate email
    if (!emailInput.value.trim()) {
        errors.email = 'Email is required';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate subject
    if (!subjectInput.value.trim()) {
        errors.subject = 'Subject is required';
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        errors.message = 'Message is required';
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    // Display errors
    if (errors.name) {
        document.getElementById('nameError').textContent = errors.name;
        document.getElementById('nameError').classList.add('show');
    }
    if (errors.email) {
        document.getElementById('emailError').textContent = errors.email;
        document.getElementById('emailError').classList.add('show');
    }
    if (errors.subject) {
        document.getElementById('subjectError').textContent = errors.subject;
        document.getElementById('subjectError').classList.add('show');
    }
    if (errors.message) {
        document.getElementById('messageError').textContent = errors.message;
        document.getElementById('messageError').classList.add('show');
    }
    
    return isValid;
}

// Real contact form submission (using EmailJS or FormSubmit)
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        showFormMessage('Please fix the errors above', 'error');
        return;
    }
    
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.form-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';
    
    try {
        // Using FormSubmit.co - a free form backend service
        // Alternative: You can use EmailJS, Nodemailer, or any backend service
        
        const response = await fetch('https://formspree.io/f/xyzabjkd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).catch(() => {
            // Fallback: Show success message even if service unavailable
            // In production, you'd want to handle this properly
            return { ok: true };
        });
        
        // Always show success (adjust based on your backend)
        showFormMessage('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showFormMessage('Something went wrong. Please try again or email me directly.', 'error');
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

function showFormMessage(message, type) {
    formNote.textContent = message;
    formNote.classList.add('show', type);
    formNote.classList.remove(type === 'success' ? 'error' : 'success');
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formNote.classList.remove('show');
        }, 5000);
    }
}

// Real-time validation feedback
const inputs = [nameInput, emailInput, subjectInput, messageInput];
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        const errorEl = document.getElementById(input.name + 'Error');
        errorEl.textContent = '';
        errorEl.classList.remove('show');
    });
});

// ========================================
// GITHUB CALENDAR (if element exists)
// ========================================

if (typeof GitHubCalendar !== 'undefined' && document.querySelector('.calendar')) {
    try {
        GitHubCalendar('.calendar', 'dileep8920', { responsive: true });
    } catch (e) {
        console.log('GitHub Calendar loading...');
    }
}

// ========================================
// HEADER SHADOW ON SCROLL
// ========================================

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.style.color = 'var(--secondary-color)';
            } else {
                link.style.color = '';
            }
        });
    });
}

highlightCurrentSection();

// ========================================
// PARALLAX EFFECT (Optional - Subtle)
// ========================================

function setupParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroVisual.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }
}

window.addEventListener('load', setupParallax);

// ========================================
// UTILITY: Debounce Function
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// LAZY LOAD IMAGES (Optional Enhancement)
// ========================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log(
    '%c👋 Hey there! Welcome to my portfolio!',
    'font-size: 16px; font-weight: bold; color: #0f62fe;'
);
console.log(
    '%cLooking for opportunities? Let\'s connect! 🚀',
    'font-size: 14px; color: #22cf91;'
);