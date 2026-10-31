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
    'Lead Implementation',
    'Backend Developer',
    'SaaS Specialist',
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
                if(counter.getAttribute('data-target') === '3') finalVal = '3+';
                else if(counter.getAttribute('data-target') === '2') finalVal = '2+';
                else if(counter.getAttribute('data-target') === '75') finalVal = '75%';
                else if(counter.innerText.includes('+')) finalVal = target + '+';
                else if(counter.innerText.includes('%')) finalVal = target + '%';
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
// ENTERPRISE PROJECT DETAILS MODAL ENGINE
// ========================================
const projectModalData = {
    gtm: {
        title: "GTM Configuration & Automation Tool",
        badge: "Enterprise Automation",
        icon: "bx bx-purchase-tag-alt",
        tabs: {
            overview: `
                <div class="modal-card">
                    <h4 class="modal-card-title"><i class='bx bx-info-circle'></i> Project Overview</h4>
                    <p class="modal-card-text">
                        Developed an end-to-end automation solution to simplify and accelerate Google Tag Manager (GTM) implementations for colleges and educational institutions. Previously, configuring GTM containers for educational portals required extensive manual coordination, client meetings, and manual creation of tags, triggers, and variables.
                    </p>
                </div>

                <div class="problem-solution-grid">
                    <div class="problem-card">
                        <h4><i class='bx bx-error-circle'></i> The Problem</h4>
                        <p>Implementing GTM tags, triggers, and custom variables required approximately <strong>3–5 hours</strong> of cross-team coordination, meetings, manual portal configuration, and internal efforts, with high susceptibility to human error across institutions.</p>
                    </div>
                    <div class="solution-card">
                        <h4><i class='bx bx-check-circle'></i> The Automated Solution</h4>
                        <p>Engineered an automated configuration pipeline that programmatically provisions tags, sets up complex event triggers, and maps variables via standardized JSON schemas, shrinking implementation time to just <strong>2–5 minutes</strong>.</p>
                    </div>
                </div>

                <div class="modal-card">
                    <h4 class="modal-card-title"><i class='bx bx-star'></i> Key Features & Capabilities</h4>
                    <div class="modal-features-grid">
                        <div class="modal-feature-item">
                            <i class='bx bx-check-shield'></i>
                            <div>
                                <div class="modal-feature-title">Automated Tag Provisioning</div>
                                <p class="modal-feature-desc">Automated generation and deployment of Google Tag Manager tags including GA4 configurations and event trackers.</p>
                            </div>
                        </div>
                        <div class="modal-feature-item">
                            <i class='bx bx-target-lock'></i>
                            <div>
                                <div class="modal-feature-title">Automated Trigger Creation</div>
                                <p class="modal-feature-desc">Dynamic rule generation for page views, button clicks, form submissions, and conversion funnels.</p>
                            </div>
                        </div>
                        <div class="modal-feature-item">
                            <i class='bx bx-code-curly'></i>
                            <div>
                                <div class="modal-feature-title">Dynamic Variable Configuration</div>
                                <p class="modal-feature-desc">Standardized extraction and binding of DataLayer variables, college metadata, and tracking parameters.</p>
                            </div>
                        </div>
                        <div class="modal-feature-item">
                            <i class='bx bx-buildings'></i>
                            <div>
                                <div class="modal-feature-title">Multi-College Scalability</div>
                                <p class="modal-feature-desc">Modular architecture enabling concurrent container setups for multiple college clients without manual configuration work.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            architecture: `
                <div class="arch-workflow-container">
                    <h4 class="modal-card-title" style="margin-bottom: 1.25rem;"><i class='bx bx-git-repo-forked'></i> GTM Automation Pipeline Architecture</h4>
                    <div class="arch-steps-flow">
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bx-file-blank'></i></div>
                            <div class="arch-node-title">1. Config Input</div>
                            <div class="arch-node-desc">Container ID & institution tracking parameters</div>
                        </div>
                        <div class="arch-arrow"><i class='bx bx-chevron-right'></i></div>
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bx-cog'></i></div>
                            <div class="arch-node-title">2. Schema Engine</div>
                            <div class="arch-node-desc">Standardized JSON schema builder & validator</div>
                        </div>
                        <div class="arch-arrow"><i class='bx bx-chevron-right'></i></div>
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bx-layer-plus'></i></div>
                            <div class="arch-node-title">3. Auto Generator</div>
                            <div class="arch-node-desc">Programmatic Tag, Trigger & Variable synthesis</div>
                        </div>
                        <div class="arch-arrow"><i class='bx bx-chevron-right'></i></div>
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bxl-google'></i></div>
                            <div class="arch-node-title">4. GTM API Sync</div>
                            <div class="arch-node-desc">Container workspace sync & instant versioning</div>
                        </div>
                    </div>

                    <div class="arch-details-list">
                        <div class="arch-detail-item">
                            <div class="arch-detail-header"><i class='bx bx-terminal'></i> Tag Generation</div>
                            <p class="arch-detail-desc">Constructs Google Analytics: GA4 Configuration tags and custom educational conversion tags without manual console clicks.</p>
                        </div>
                        <div class="arch-detail-item">
                            <div class="arch-detail-header"><i class='bx bx-bolt-circle'></i> Trigger Rules</div>
                            <p class="arch-detail-desc">Auto-binds firing rules: All Pages, Admission Form Submissions, Prospect Inquiries, and Brochure Downloads.</p>
                        </div>
                        <div class="arch-detail-item">
                            <div class="arch-detail-header"><i class='bx bx-data'></i> Variable Mapping</div>
                            <p class="arch-detail-desc">Maps user variables, campaign UTM parameters, institutional portal IDs, and DataLayer objects programmatically.</p>
                        </div>
                    </div>
                </div>
            `,
            impact: `
                <div class="impact-stats-grid">
                    <div class="impact-stat-box">
                        <span class="stat-box-num">3-5h → 2-5m</span>
                        <div class="stat-box-title">Implementation Effort</div>
                        <div class="stat-box-sub">Over 98% reduction in hands-on time</div>
                    </div>
                    <div class="impact-stat-box">
                        <span class="stat-box-num">100%</span>
                        <div class="stat-box-title">Configuration Accuracy</div>
                        <div class="stat-box-sub">Zero manual syntax or mapping errors</div>
                    </div>
                    <div class="impact-stat-box">
                        <span class="stat-box-num">Multi-Client</span>
                        <div class="stat-box-title">High Scalability</div>
                        <div class="stat-box-sub">Handles high concurrent client onboarding</div>
                    </div>
                </div>

                <div class="modal-card">
                    <h4 class="modal-card-title"><i class='bx bx-user-check'></i> My Role & Contributions</h4>
                    <p class="modal-card-text">
                        As <strong>Lead Implementation</strong>, I spearheaded the concept, technical architecture, and deployment of this automation tool for Meritto's higher education clients. Standardized the configuration templates, engineered the automated generation scripts, eliminated repetitive internal meetings, and ensured flawless analytics tracking for multiple institutions.
                    </p>
                </div>

                <div class="modal-card" style="margin-top: 1rem;">
                    <h4 class="modal-card-title"><i class='bx bx-layer'></i> Verified Technologies & Integrations</h4>
                    <div class="verified-tech-cloud">
                        <span class="verified-pill"><i class='bx bx-purchase-tag-alt'></i> Google Tag Manager Container API</span>
                        <span class="verified-pill"><i class='bx bxl-google'></i> GA4 (Google Analytics 4)</span>
                        <span class="verified-pill"><i class='bx bxl-javascript'></i> JavaScript (ES6+)</span>
                        <span class="verified-pill"><i class='bx bx-code-curly'></i> JSON Schema Automation</span>
                        <span class="verified-pill"><i class='bx bx-data'></i> DataLayer Architecture</span>
                        <span class="verified-pill"><i class='bx bx-check-shield'></i> Tag & Trigger Automation Engine</span>
                    </div>
                </div>
            `
        }
    },
    telephony: {
        title: "Telephony Integration & Management Tool",
        badge: "Cloud CTI & Telephony Gateway",
        icon: "bx bx-phone-call",
        tabs: {
            overview: `
                <div class="modal-card">
                    <h4 class="modal-card-title"><i class='bx bx-info-circle'></i> Project Overview</h4>
                    <p class="modal-card-text">
                        Enterprise telephony integration architecture and automation tool developed at Meritto, connecting Meritto CRM with <strong>20+ leading cloud telephony providers</strong> for <strong>300+ educational institutions</strong>. Built to streamline admissions communications, provide Click-to-Call, synchronize real-time call logs, and automate CRM disposition.
                    </p>
                </div>

                <div class="problem-solution-grid">
                    <div class="problem-card">
                        <h4><i class='bx bx-error-circle'></i> The Problem</h4>
                        <p>300+ colleges utilized disparate cloud telephony vendors (Exotel, Knowlarity/Gupshup, Tata Tele, Mcube, etc.), each with incompatible API payloads, webhook schemas, and callback formats. This created severe logging delays, lost counselor attribution, and heavy manual troubleshooting.</p>
                    </div>
                    <div class="solution-card">
                        <h4><i class='bx bx-check-circle'></i> The Unified Solution</h4>
                        <p>Architected a centralized Telephony Integration Gateway that normalizes diverse vendor APIs, handles real-time webhooks, powers Click-to-Call CTI, synchronizes call recordings, and automates lead disposition updates directly within Meritto CRM.</p>
                    </div>
                </div>

                <div class="modal-card">
                    <h4 class="modal-card-title"><i class='bx bx-star'></i> Key Features & Capabilities</h4>
                    <div class="modal-features-grid">
                        <div class="modal-feature-item">
                            <i class='bx bx-git-merge'></i>
                            <div>
                                <div class="modal-feature-title">Universal Telephony Adapter</div>
                                <p class="modal-feature-desc">Standardized integration layer connecting 20+ vendors (Exotel, Knowlarity, Tata Tele, Mcube) seamlessly to Meritto CRM.</p>
                            </div>
                        </div>
                        <div class="modal-feature-item">
                            <i class='bx bx-phone-incoming'></i>
                            <div>
                                <div class="modal-feature-title">Click-to-Call & Real-Time CTI</div>
                                <p class="modal-feature-desc">One-click outbound dialing from counselor lead profiles with live call status popups.</p>
                            </div>
                        </div>
                        <div class="modal-feature-item">
                            <i class='bx bx-sync'></i>
                            <div>
                                <div class="modal-feature-title">Bi-Directional Call Sync</div>
                                <p class="modal-feature-desc">Automated ingestion of call duration, agent notes, call status, and recording URLs into student timelines.</p>
                            </div>
                        </div>
                        <div class="modal-feature-item">
                            <i class='bx bx-bug'></i>
                            <div>
                                <div class="modal-feature-title">Diagnostics & Webhook Resiliency</div>
                                <p class="modal-feature-desc">Robust payload transformation, retry queues, and diagnostic tools to troubleshoot webhook delivery edge cases.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            architecture: `
                <div class="arch-workflow-container">
                    <h4 class="modal-card-title" style="margin-bottom: 1.25rem;"><i class='bx bx-sitemap'></i> Telephony Architecture & Webhook Data Flow</h4>
                    <div class="arch-steps-flow">
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bx-user-voice'></i></div>
                            <div class="arch-node-title">1. Counselor Action</div>
                            <div class="arch-node-desc">Click-to-call or inbound student call trigger</div>
                        </div>
                        <div class="arch-arrow"><i class='bx bx-chevron-right'></i></div>
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bx-shuffle'></i></div>
                            <div class="arch-node-title">2. Meritto Gateway</div>
                            <div class="arch-node-desc">Dispatches to assigned vendor API with auth</div>
                        </div>
                        <div class="arch-arrow"><i class='bx bx-chevron-right'></i></div>
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bx-broadcast'></i></div>
                            <div class="arch-node-title">3. Cloud Providers</div>
                            <div class="arch-node-desc">Exotel / Knowlarity / Tata Tele / Mcube switches</div>
                        </div>
                        <div class="arch-arrow"><i class='bx bx-chevron-right'></i></div>
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bx-transfer-alt'></i></div>
                            <div class="arch-node-title">4. Webhook Receiver</div>
                            <div class="arch-node-desc">Normalizes status callbacks & recording URLs</div>
                        </div>
                        <div class="arch-arrow"><i class='bx bx-chevron-right'></i></div>
                        <div class="arch-node">
                            <div class="arch-node-icon"><i class='bx bx-server'></i></div>
                            <div class="arch-node-title">5. CRM Auto-Sync</div>
                            <div class="arch-node-desc">Updates lead activity timeline & disposition</div>
                        </div>
                    </div>

                    <div class="arch-details-list">
                        <div class="arch-detail-item">
                            <div class="arch-detail-header"><i class='bx bx-link-external'></i> Vendor Abstraction</div>
                            <p class="arch-detail-desc">Decoupled CRM core from third-party vendor APIs through modular adapter interfaces and endpoint configurations.</p>
                        </div>
                        <div class="arch-detail-item">
                            <div class="arch-detail-header"><i class='bx bx-pulse'></i> Webhook Processing</div>
                            <p class="arch-detail-desc">Parses high-throughput asynchronous status events (ringing, answered, busy, disconnected) with near zero latency.</p>
                        </div>
                        <div class="arch-detail-item">
                            <div class="arch-detail-header"><i class='bx bx-cloud-download'></i> Recording & Audit</div>
                            <p class="arch-detail-desc">Automatically validates and associates secure call audio URLs with student records for quality control and compliance.</p>
                        </div>
                    </div>
                </div>
            `,
            impact: `
                <div class="impact-stats-grid">
                    <div class="impact-stat-box">
                        <span class="stat-box-num">300+</span>
                        <div class="stat-box-title">Institutions Powered</div>
                        <div class="stat-box-sub">Seamless live telephony operations</div>
                    </div>
                    <div class="impact-stat-box">
                        <span class="stat-box-num">20+</span>
                        <div class="stat-box-title">Vendors Integrated</div>
                        <div class="stat-box-sub">Exotel, Knowlarity, Tata Tele, Mcube, etc.</div>
                    </div>
                    <div class="impact-stat-box">
                        <span class="stat-box-num">100%</span>
                        <div class="stat-box-title">Automated Logging</div>
                        <div class="stat-box-sub">Zero manual entry for admission counselors</div>
                    </div>
                </div>

                <div class="modal-card">
                    <h4 class="modal-card-title"><i class='bx bx-user-check'></i> My Role & Contributions</h4>
                    <p class="modal-card-text">
                        Coordinated with <strong>20+ cloud telephony vendors</strong> to define API contracts, webhook routing, and error recovery protocols. Designed and implemented the integration framework for <strong>300+ colleges</strong>, resolved critical webhook delivery and payload mismatch issues, and conducted technical workshops for seamless institutional onboarding.
                    </p>
                </div>

                <div class="modal-card" style="margin-top: 1rem;">
                    <h4 class="modal-card-title"><i class='bx bx-layer'></i> Verified Technologies & Integrations</h4>
                    <div class="verified-tech-cloud">
                        <span class="verified-pill"><i class='bx bx-phone-call'></i> Cloud Telephony APIs (Exotel, Knowlarity, Tata Tele, Mcube)</span>
                        <span class="verified-pill"><i class='bx bx-code-alt'></i> RESTful Webhook Handlers</span>
                        <span class="verified-pill"><i class='bx bxl-java'></i> Java / Spring Boot</span>
                        <span class="verified-pill"><i class='bx bxl-javascript'></i> JavaScript (ES6+)</span>
                        <span class="verified-pill"><i class='bx bx-shield-quarter'></i> Payload Validation & Error Handling</span>
                        <span class="verified-pill"><i class='bx bx-sitemap'></i> Meritto CRM CTI Framework</span>
                    </div>
                </div>
            `
        }
    }
};

let currentModalProject = 'gtm';
let currentModalTab = 'overview';

window.openProjectModal = function(projectId) {
    const data = projectModalData[projectId];
    if (!data) return;
    
    currentModalProject = projectId;
    currentModalTab = 'overview';
    
    const backdrop = document.getElementById('projectModalBackdrop');
    const titleEl = document.getElementById('modalProjectTitle');
    const badgeEl = document.getElementById('modalProjectBadge');
    const iconEl = document.getElementById('modalProjectIcon');
    
    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (iconEl) iconEl.innerHTML = `<i class='${data.icon}'></i>`;
    
    window.switchModalTab('overview');
    
    if (backdrop) {
        backdrop.classList.add('active');
        backdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
};

window.closeProjectModal = function() {
    const backdrop = document.getElementById('projectModalBackdrop');
    if (backdrop) {
        backdrop.classList.remove('active');
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

window.switchModalTab = function(tabId) {
    currentModalTab = tabId;
    const data = projectModalData[currentModalProject];
    if (!data) return;
    
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabId);
    });
    
    const bodyEl = document.getElementById('projectModalBody');
    if (bodyEl && data.tabs[tabId]) {
        bodyEl.innerHTML = `<div class="modal-tab-panel active">${data.tabs[tabId]}</div>`;
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeProjectModal();
    }
});

const backdropEl = document.getElementById('projectModalBackdrop');
if (backdropEl) {
    backdropEl.addEventListener('click', (e) => {
        if (e.target === backdropEl) {
            window.closeProjectModal();
        }
    });
}

// ========================================
// UTILITIES
// ========================================

// Auto-update footer year
const yearEl = document.getElementById('currentYear'); if (yearEl) yearEl.textContent = new Date().getFullYear();

// Console Easter Egg
console.log(
    '%cSystem Initialized. Welcome to Dileep\'s Terminal.%c\n\nRun %ccontact()%c to get in touch.',
    'color: #00ff88; font-size: 16px; font-weight: bold; background: #0a0a0f; padding: 10px;',
    'color: inherit;',
    'color: #00b4d8; font-family: monospace; font-weight: bold;',
    'color: inherit;'
);

function initDileepAIChatbot() {
    const trigger = document.getElementById('chatbotTrigger');
    const windowEl = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const clearBtn = document.getElementById('chatbotClear');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');
    const messagesEl = document.getElementById('chatbotMessages');
    const chipsContainer = document.getElementById('chatbotChips');

    if (!trigger || !windowEl) return;

    window.toggleDileepChatbot = (forceState) => {
        if (typeof forceState === 'boolean') {
            windowEl.classList.toggle('active', forceState);
        } else {
            windowEl.classList.toggle('active');
        }
    };

    trigger.addEventListener('click', () => window.toggleDileepChatbot());
    if (closeBtn) closeBtn.addEventListener('click', () => window.toggleDileepChatbot(false));

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user';
        msgDiv.innerHTML = `
            <div class="chat-avatar"><i class='bx bx-user'></i></div>
            <div class="chat-bubble"><p>${escapeHTML(text)}</p></div>
        `;
        messagesEl.appendChild(msgDiv);
        scrollToBottom();
    }

    const knowledgeBase = [
        { keywords: ['skill', 'skills', 'stack', 'technology', 'tech', 'languages', 'java', 'spring', 'aws', 'gtm', 'telephony'], response: `<p>🚀 <strong>Core Technical Skills:</strong></p><ul><li><strong>Languages:</strong> Core Java, Spring Boot, JavaScript (ES6+), SQL, HTML5/CSS3</li><li><strong>Backend & CTI:</strong> REST APIs, Webhooks, Cloud Telephony APIs (Exotel, Knowlarity, Tata Tele, Mcube), Microservices</li><li><strong>Analytics & Cloud:</strong> Google Tag Manager (GTM API), GA4, AWS (EC2, RDS), CI/CD Automation</li></ul>` },
        { keywords: ['experience', 'work', 'meritto', 'company', 'role', 'title', 'promotion', 'lead'], response: `<p>💼 <strong>Career at Meritto (3+ Years):</strong></p><ul><li><strong>Lead Implementation (July 2026–Present):</strong> Leading enterprise technical executions, GTM automation & telephony architecture.</li><li><strong>Implementation Specialist III (June 2023–July 2026):</strong> Deployed complex SaaS modules & telephony integrations for 300+ colleges.</li><li><strong>SaaS Developer II:</strong> Automated NIAA Chatbot deployments by 75%.</li><li><strong>Junior Developer:</strong> Onboarded 50+ domestic & international clients.</li></ul>` },
        { keywords: ['project', 'projects', 'works', 'portfolio', 'gtm', 'telephony'], response: `<p>🛠️ <strong>Featured Enterprise Projects:</strong></p><ul><li><strong>GTM Configuration & Automation Tool:</strong> Slashed setup time from 3–5 hours down to 2–5 minutes (98% speedup).</li><li><strong>Telephony Integration Tool:</strong> Unified 20+ cloud telephony providers with Meritto CRM for 300+ institutions.</li><li><strong>NIAA Chatbot Module Pipeline:</strong> 75% efficiency improvement (5-6 days to 1-2 days).</li></ul>` },
        { keywords: ['contact', 'email', 'phone', 'reach', 'hire'], response: `<p>📞 <strong>Get in Touch:</strong></p><ul><li>📧 <strong>Email:</strong> dileepkumary669@gmail.com</li><li>📱 <strong>Phone:</strong> +91 89202 85748</li><li>📍 <strong>Location:</strong> Gurugram, Haryana, India</li></ul>` }
    ];

    function matchKnowledge(query) {
        const q = query.toLowerCase();
        for (const item of knowledgeBase) {
            for (const key of item.keywords) {
                if (q.includes(key)) return item.response;
            }
        }
        return `<p>I can help you learn more about Dileep's <strong>3+ years experience</strong>, <strong>skills</strong>, <strong>awards</strong>, or <strong>projects</strong>!</p>`;
    }

    function addBotResponse(queryText) {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing-msg';
        typingDiv.innerHTML = `<div class="chat-avatar"><i class='bx bx-bot'></i></div><div class="chat-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
        messagesEl.appendChild(typingDiv);
        scrollToBottom();

        const matched = matchKnowledge(queryText);

        setTimeout(() => {
            typingDiv.remove();
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot';
            msgDiv.innerHTML = `<div class="chat-avatar"><i class='bx bx-bot'></i></div><div class="chat-bubble">${matched}</div>`;
            messagesEl.appendChild(msgDiv);
            scrollToBottom();
        }, 600);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        addUserMessage(text);
        input.value = '';
        addBotResponse(text);
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            messagesEl.innerHTML = `
                <div class="chat-message bot">
                    <div class="chat-avatar"><i class='bx bx-bot'></i></div>
                    <div class="chat-bubble"><p>👋 Chat cleared! How else can I assist you?</p></div>
                </div>
            `;
        });
    }

    if (chipsContainer) {
        chipsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.chat-chip');
            if (chip) {
                const question = chip.getAttribute('data-question') || chip.textContent;
                addUserMessage(question);
                addBotResponse(question);
            }
        });
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initDileepAIChatbot();
} else {
    document.addEventListener('DOMContentLoaded', initDileepAIChatbot);
    window.addEventListener('load', initDileepAIChatbot);
}
