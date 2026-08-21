/**
 * AJAY ANANDAKUMAR - FUTURISTIC PORTFOLIO ENGINE
 * Cyberpunk & Futuristic Interactive UI Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initTypewriter();
    initCyberTerminal();
    initProjectFilter();
    initScrollAnimations();
    initMobileNav();
    initContactForm();
});

/* ==========================================================================
   1. PARTICLES & CYBER GRID CANVAS
   ========================================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 1.8 + 0.5;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#00f0ff' : (Math.random() > 0.5 ? '#8b5cf6' : '#ec4899');
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1.0;
        }
    }

    // Initialize 60 particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 75);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connecting laser mesh between close particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = '#00f0ff';
                    ctx.globalAlpha = (1 - dist / 130) * 0.15;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. TYPEWRITER EFFECT FOR HERO ROLES
   ========================================================================== */
function initTypewriter() {
    const typedTextEl = document.getElementById('typed-text');
    if (!typedTextEl) return;

    const roles = [
        "Full Stack Engineer.",
        "AI Executive & Automator.",
        "React.js & Node.js Developer.",
        "Java & Cloud Specialist.",
        "Flutter Mobile Architect."
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const erasingSpeed = 40;
    const pauseTime = 1800;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? erasingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            delay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }

        setTimeout(type, delay);
    }

    type();
}

/* ==========================================================================
   3. INTERACTIVE RECRUITER AI TERMINAL
   ========================================================================== */
function initCyberTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const quickButtons = document.querySelectorAll('.term-chip');

    if (!input || !output) return;

    const commandMap = {
        'help': `
<span class="term-cyan">> AVAILABLE SYSTEM COMMANDS:</span>
- <span class="term-green">summary</span>    : Display professional background overview
- <span class="term-green">skills</span>     : List full technical stack & frameworks
- <span class="term-green">experience</span> : Show Teknogrede 6-Month AI Internship details
- <span class="term-green">projects</span>   : Display key full-stack & mobile apps
- <span class="term-green">education</span>  : Show MCA & BSc degree info
- <span class="term-green">contact</span>    : Output email, phone & social coordinates
- <span class="term-green">clear</span>      : Clear screen memory logs
        `,
        'summary': `
<span class="term-purple">> PROFESSIONAL SUMMARY:</span>
Full Stack Engineer with hands-on experience building responsive web and mobile applications using React.js, TypeScript/JavaScript (ES6+), Node.js, and REST APIs, with a growing foundation in Java from academic coursework and project work. Completed a 6-month AI internship at Teknogrede building workflow automation and LLM API integrations.
        `,
        'skills': `
<span class="term-cyan">> TECHNICAL SKILLS:</span>
- <span class="term-pink">Frontend:</span> React.js, JavaScript (ES6+), HTML5, CSS3, Responsive UI, State Management
- <span class="term-pink">Backend:</span> Java, Node.js, Express.js, Django REST Framework, REST API Design
- <span class="term-pink">Databases:</span> PostgreSQL, MongoDB, MySQL, Firebase (Auth, Firestore)
- <span class="term-pink">Cloud & DevOps:</span> AWS, Oracle Cloud (OCI), Docker, Git/GitHub, CI/CD
- <span class="term-pink">AI Integrations:</span> Google Gemini LLM API, AI Coding Tools, Python Automation
        `,
        'experience': `
<span class="term-green">> EXPERIENCE RECORD:</span>
<span class="term-yellow">[AI Executive Intern @ Teknogrede]</span> (6 Months | Bangalore)
• Built & configured Python-based AI tools/scripts to automate business workflows.
• Applied ML concepts and REST API integrations in live production.
• Collaborated cross-functionally in Agile/SDLC environment to ship AI-powered features.
• Authored workflow documentation for maintainable team practices.
        `,
        'projects': `
<span class="term-purple">> FEATURED PROJECTS:</span>
1. <span class="term-cyan">Online Banquet Booking System</span> (React.js, Node.js, Express.js, MongoDB, Admin Dashboard)
2. <span class="term-cyan">NATPAC Travel Survey App</span> (Smart India Hackathon, Flutter, Django REST, PostgreSQL, Firebase, Gemini AI)
3. <span class="term-cyan">Peace Pal Stress Management</span> (Flutter, Dart, Firebase, REST API)
        `,
        'education': `
<span class="term-cyan">> ACADEMIC RECORD:</span>
• <span class="term-green">MCA (Master of Computer Applications):</span> Presidency University, Bangalore (2024 - 2026) [Full-Stack & Cloud Focus]
• <span class="term-green">BSc Computer Science:</span> Sri Krishna Arts & Science College, Coimbatore (2021 - 2024)
        `,
        'contact': `
<span class="term-pink">> CONTACT COORDINATES:</span>
• Email    : aajayanadakumar@gmail.com
• Phone    : +91 637-473-2321
• Location : Bangalore, India
• LinkedIn : linkedin.com/in/ajay8969
• GitHub   : github.com/ajayanandakumar-ux
        `
    };

    function executeCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        
        // Create prompt echo
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="term-prompt">ajay@cyber-deck:~$</span> ${escapeHtml(cmd)}`;
        output.appendChild(line);

        if (trimmed === 'clear') {
            output.innerHTML = '';
            return;
        }

        const resp = document.createElement('div');
        resp.className = 'terminal-response';

        if (commandMap[trimmed]) {
            resp.innerHTML = commandMap[trimmed];
        } else if (trimmed === '') {
            resp.innerHTML = '';
        } else {
            resp.innerHTML = `<span class="term-red">Command not recognized: "${escapeHtml(cmd)}". Type '<span class="term-cyan">help</span>' for available options.</span>`;
        }

        output.appendChild(resp);
        output.scrollTop = output.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value;
            input.value = '';
            executeCommand(val);
        }
    });

    quickButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) executeCommand(cmd);
        });
    });

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

/* ==========================================================================
   4. INTERACTIVE PROJECT CATEGORY FILTER
   ========================================================================== */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.work-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category') || '';
                if (category === 'all' || cardCat.includes(category)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   5. SCROLL TRIGGERED REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
    const sidemenu = document.getElementById("sidemenu");
    const openBtn = document.querySelector(".fa-bars");
    const closeBtn = document.querySelector(".fa-square-xmark");

    if (openBtn && sidemenu) {
        openBtn.addEventListener('click', () => {
            sidemenu.style.right = "0";
        });
    }

    if (closeBtn && sidemenu) {
        closeBtn.addEventListener('click', () => {
            sidemenu.style.right = "-280px";
        });
    }

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('#sidemenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && sidemenu) {
                sidemenu.style.right = "-280px";
            }
        });
    });
}

/* ==========================================================================
   7. CONTACT FORM SUBMISSION TO GOOGLE SHEETS
   ========================================================================== */
function initContactForm() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwldy2qgSqldj_qFKJeOS2JAzCma-u5w_DOPWIdW34mxgaCA15EM6Mw_67Tx-p0FsYm/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    if (!form || !msg) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        msg.className = 'form-status sending';
        msg.innerHTML = "<i class='fa-solid fa-satellite-dish fa-spin'></i> Encrypting & Dispatching Signal...";

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msg.className = 'form-status success';
                msg.innerHTML = "<i class='fa-solid fa-circle-check'></i> Signal Transmitted Successfully! Will respond within 24 hours.";
                setTimeout(function(){
                    msg.innerHTML = "";
                    msg.className = 'form-status';
                }, 6000);
                form.reset();
            })
            .catch(error => {
                console.error('Submission Error:', error.message);
                msg.className = 'form-status error';
                msg.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Transmission Interrupted. Please try emailing directly.";
            });
    });
}
