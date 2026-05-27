// EmailJS credentials
const EMAILJS_SERVICE_ID  = 'service_kzqvuig';
const EMAILJS_TEMPLATE_ID = 'template_9x3gdqr';
const EMAILJS_PUBLIC_KEY  = 'KJ_jsMmSw07Yz6Kz-';

// Init EmailJS once — before DOMContentLoaded
document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') emailjs.init(EMAILJS_PUBLIC_KEY);
});

// Initialize EmailJS immediately when script loads


document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       INTERACTIVE CUSTOM CURSOR
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');
    
    let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0, circleX = 0, circleY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        circleX += (mouseX - circleX) * 0.12;
        circleY += (mouseY - circleY) * 0.12;
        if (cursorDot) { cursorDot.style.left = `${dotX}px`; cursorDot.style.top = `${dotY}px`; }
        if (cursorCircle) { cursorCircle.style.left = `${circleX}px`; cursorCircle.style.top = `${circleY}px`; }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    const hoverables = document.querySelectorAll('a, button, input, textarea, select, .cursor-hover');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });

    /* ==========================================================================
       HIGH-PERFORMANCE CANVAS PARTICLE SYSTEM
       ========================================================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = window.innerWidth < 768 ? 25 : 55;
        const connectionDistance = 140;
        const mouseRadius = 180;
        let canvasMouse = { x: null, y: null };
        
        window.addEventListener('mousemove', (e) => { canvasMouse.x = e.clientX; canvasMouse.y = e.clientY; });
        window.addEventListener('mouseleave', () => { canvasMouse.x = null; canvasMouse.y = null; });
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }
        window.addEventListener('resize', resizeCanvas);
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(212, 175, 55, 0.25)' : 'rgba(99, 102, 241, 0.25)';
            }
            update() {
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                this.x += this.vx; this.y += this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) particles.push(new Particle());
        }
        
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * 0.15;
                        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`; ctx.lineWidth = 0.5; ctx.stroke();
                    }
                }
                if (canvasMouse.x !== null) {
                    const mouseDist = Math.hypot(p1.x - canvasMouse.x, p1.y - canvasMouse.y);
                    if (mouseDist < mouseRadius) {
                        const alpha = (1 - mouseDist / mouseRadius) * 0.2;
                        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(canvasMouse.x, canvasMouse.y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`; ctx.lineWidth = 0.8; ctx.stroke();
                    }
                }
            }
        }
        
        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawConnections();
            requestAnimationFrame(loop);
        }
        resizeCanvas();
        loop();
    }

    /* ==========================================================================
       SCROLL-TRIGGERED REVEAL SYSTEM
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('reveal-visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       LUXURY SCROLLING HEADER EFFECT
       ========================================================================== */
    const header = document.querySelector('.luxury-header');
    function checkHeaderScroll() {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll();

    /* ==========================================================================
       MOBILE NAVIGATION OVERLAY MENU
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-link, .mobile-link-btn');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ==========================================================================
       TACTILE 3D CARD TILT & REFLECTION SHEEN EFFECT
       ========================================================================== */
    const tiltCards = document.querySelectorAll('[class*="3d-card"]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = (x / rect.width) - 0.5;
            const normY = (y / rect.height) - 0.5;
            const maxDeg = 8;
            card.style.transform = `perspective(1000px) rotateX(${(-normY * maxDeg).toFixed(2)}deg) rotateY(${(normX * maxDeg).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            const shine = card.querySelector('.card-inner-shine, .project-glow');
            if (shine) shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            const shine = card.querySelector('.card-inner-shine');
            if (shine) shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)';
            const glow = card.querySelector('.project-glow');
            if (glow) glow.style.background = 'radial-gradient(circle at 50% -20%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)';
        });
    });

    /* ==========================================================================
       DYNAMIC PROJECT PORTFOLIO FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-wrapper');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => card.classList.add('reveal-visible'), 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       CONTACT FORM — EmailJS Integration
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSuccessOverlay = document.getElementById('form-success');
    const successCloseBtn = document.getElementById('success-close');

    // EmailJS config loaded from config.js (not committed to GitHub)

    

    if (contactForm && formSuccessOverlay) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn    = contactForm.querySelector('.submit-btn');
            const btnLabel     = submitBtn.querySelector('span');
            const originalText = btnLabel.textContent;

            const name    = document.getElementById('user-name').value.trim();
            const email   = document.getElementById('user-email').value.trim();
            const subject = document.getElementById('user-subject').value.trim();
            const message = document.getElementById('user-message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            submitBtn.disabled = true;
            btnLabel.textContent = 'Transmitting...';

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                name       : name,        // matches {{name}} in template
                from_email : email,       // matches {{from_email}} in template
                subject    : subject,     // matches {{subject}} in template
                message    : message,     // matches {{message}} in template
                reply_to   : email,
                time       : new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
            })
            .then(() => {
                formSuccessOverlay.classList.add('show');
                contactForm.reset();
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                alert('Something went wrong. Please try again.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                btnLabel.textContent = originalText;
            });
        });
    }

    if (successCloseBtn && formSuccessOverlay) {
        successCloseBtn.addEventListener('click', () => {
            formSuccessOverlay.classList.remove('show');
        });
    }
});
