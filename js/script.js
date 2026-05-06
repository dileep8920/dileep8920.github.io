// ========================================
// CUSTOM CURSOR GLOW
// ========================================
const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

// ========================================
// PARTICLE CANVAS BACKGROUND
// ========================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Mouse position for interaction
    const mouse = {
        x: null,
        y: null,
        radius: 150
    };

    function resizeCanvas() {
        // Only cover the hero section
        const heroSection = document.getElementById('home');
        if (heroSection) {
            canvas.width = window.innerWidth;
            canvas.height = heroSection.offsetHeight;
        }
    }

    // Initialize particles
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.vx = (Math.random() - 0.5) * 1; // subtle drift
            this.vy = (Math.random() - 0.5) * 1;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 255, 136, 0.4)'; // Primary color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Drift movement
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }
    }

    function init() {
        particles = [];
        resizeCanvas();
        // Adjust number of particles based on screen width
        let numberOfParticles = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                    + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0, 180, 216,' + opacityValue * 0.5 + ')'; // Secondary color
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
        }
        connect();
        animationId = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });

    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y - heroSection.getBoundingClientRect().top; // Adjust for scroll
        });
        
        heroSection.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
    }

    init();
    animate();
}

// Initialize particles when page loads
window.addEventListener('load', initParticles);


// ========================================
// NAVIGATION & MOBILE MENU
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});


// ========================================
// TYPING ANIMATION (Terminal Style)
// ========================================
const roles = [
    'Backend Developer',
    'SaaS Specialist',
    'Implementation Expert',
    'Automation Enthusiast'
];

let currentRoleIndex = 0;
const dynamicRoleElement = document.getElementById('dynamicRole');

function typeRole() {
    if(!dynamicRoleElement) return;
    
    const role = roles[currentRoleIndex];
    let charIndex = 0;
    
    dynamicRoleElement.textContent = '';
    
    function type() {
        if (charIndex < role.length) {
            dynamicRoleElement.textContent += role[charIndex];
            charIndex++;
            setTimeout(type, 80); // Typing speed
        } else {
            setTimeout(deleteRole, 3000); // Pause before deleting
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
            setTimeout(deleteChar, 40); // Deletion speed
        } else {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, 600); // Pause before typing next
        }
    }
    
    deleteChar();
}

window.addEventListener('load', typeRole);


// ========================================
// STAT COUNTER ANIMATION
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        const updateCount = () => {
            const count = +counter.innerText.replace('+', '').replace('%', '');
            const inc = target / speed;

            if (count < target) {
                let displayVal = Math.ceil(count + inc);
                // Keep the suffix
                if(counter.innerText.includes('+')) displayVal += '+';
                else if(counter.innerText.includes('%')) displayVal += '%';
                
                counter.innerText = displayVal;
                setTimeout(updateCount, 20);
            } else {
                let finalVal = target;
                if(counter.getAttribute('data-target') === '2') finalVal = '2+';
                else if(counter.getAttribute('data-target') === '75') finalVal = '75%';
                counter.innerText = finalVal;
            }
        };

        // Initialize observer to start animation when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counter.innerText = '0'; // reset
                updateCount();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}


// ========================================
// SKILL BAR ANIMATION
// ========================================
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.width = width;
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.2 });

    skillFills.forEach(fill => {
        fill.style.width = '0%'; // Ensure it starts at 0
        observer.observe(fill);
    });
}


// ========================================
// SCROLL REVEAL ANIMATIONS (AOS Alternative)
// ========================================
function revealElementsOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(el => {
        el.style.opacity = '0';
        
        // Handle transform based on AOS type
        const aosType = el.getAttribute('data-aos');
        if(aosType === 'fade-up') el.style.transform = 'translateY(30px)';
        if(aosType === 'fade-right') el.style.transform = 'translateX(-30px)';
        if(aosType === 'fade-left') el.style.transform = 'translateX(30px)';
        
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Handle delay
        const delay = el.getAttribute('data-aos-delay');
        if(delay) el.style.transitionDelay = delay + 'ms';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(el => observer.observe(el));
}


// Initialize all scroll-based animations
window.addEventListener('load', () => {
    revealElementsOnScroll();
    animateCounters();
    initSkillBars();
});


// ========================================
// SMOOTH SCROLL & ACTIVE NAV
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

function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust offset to trigger slightly earlier
            if (window.pageYOffset >= sectionTop - 250) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}
highlightCurrentSection();


// ========================================
// BACK TO TOP BUTTON
// ========================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const subjectInput = document.querySelector('input[name="subject"]');
const messageInput = document.querySelector('textarea[name="message"]');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    }
    
    if (!subjectInput.value.trim()) {
        showError('subjectError', 'Subject is required');
        isValid = false;
    }
    
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(id, message) {
    const el = document.getElementById(id);
    el.textContent = message;
    el.classList.add('show');
}

// Clear error on input
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        const errorEl = document.getElementById(input.name + 'Error');
        if(errorEl) {
            errorEl.classList.remove('show');
            errorEl.textContent = '';
        }
    });
});

// Handle form submission via AJAX to prevent redirect
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Always stop default submission
    
    if (!validateForm()) return;
    
    const actionUrl = contactForm.getAttribute('action');
    
    // Check if user still has the placeholder
    if (actionUrl.includes('YOUR_FORMSPREE_ID')) {
        const subject = encodeURIComponent(`Portfolio Contact: ${subjectInput.value}`);
        const body = encodeURIComponent(`Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`);
        window.location.href = `mailto:dileepkumary669@gmail.com?subject=${subject}&body=${body}`;
        
        formNote.textContent = 'Opening your email client to send the message...';
        formNote.classList.add('show', 'success');
        setTimeout(() => formNote.classList.remove('show', 'success'), 5000);
        contactForm.reset();
        return;
    }
    
    // Proceed with AJAX Formspree submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(contactForm);
        const response = await fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formNote.textContent = 'Thank you! Your message has been sent successfully.';
            formNote.className = 'form-note show success';
            contactForm.reset();
        } else {
            const data = await response.json();
            if (data && Object.hasOwn(data, 'errors')) {
                formNote.textContent = data.errors.map(error => error.message).join(', ');
            } else {
                formNote.textContent = 'Oops! There was a problem submitting your form.';
            }
            formNote.className = 'form-note show error';
        }
    } catch (error) {
        formNote.textContent = 'Oops! There was a problem submitting your form.';
        formNote.className = 'form-note show error';
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        setTimeout(() => formNote.classList.remove('show', 'success', 'error'), 5000);
    }
});


// ========================================
// UTILITIES
// ========================================

// Auto-update footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Console Easter Egg
console.log(
    '%cSystem Initialized. Welcome to Dileep\'s Terminal.%c\n\nRun %ccontact()%c to get in touch.',
    'color: #00ff88; font-size: 16px; font-weight: bold; background: #0a0a0f; padding: 10px;',
    'color: inherit;',
    'color: #00b4d8; font-family: monospace; font-weight: bold;',
    'color: inherit;'
);