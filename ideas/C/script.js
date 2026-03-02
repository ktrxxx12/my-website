/* ========================================
   ServerCare — JavaScript (Apple-Style Version)
   - Unsplash API Image Loading
   - Scroll Animations (IntersectionObserver)
   - Counter Animation
   - FAQ Accordion
   - Mobile Menu
   - Header Scroll Effect
   - Smooth Scroll
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    initScrollAnimations();
    initCounterAnimation();
    initFaqAccordion();
    initMobileMenu();
    initSmoothScroll();
});

/* ========================================
   IMAGE LOADING (Unsplash)
========================================= */
function loadImages() {
    const imageMap = {
        'hero-bg': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80&auto=format&fit=crop',
        'track-bg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop',
        'contact-bg': 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=1920&q=80&auto=format&fit=crop',
    };

    const dataImgMap = {
        'hardware': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop',
        'software': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop',
        'monitoring': 'https://images.unsplash.com/photo-1607799279861-4dd421887fc9?w=800&q=80&auto=format&fit=crop',
        'onsite': 'https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?w=800&q=80&auto=format&fit=crop',
        'cost': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
        'extend': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80&auto=format&fit=crop',
        'multi': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop',
        'speed': 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&q=80&auto=format&fit=crop',
        'engineer': 'https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?w=800&q=80&auto=format&fit=crop',
        'case-finance': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop',
        'case-telecom': 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&q=80&auto=format&fit=crop',
        'case-mfg': 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80&auto=format&fit=crop',
    };

    // Set background-image by ID
    Object.entries(imageMap).forEach(([id, url]) => {
        const el = document.getElementById(id);
        if (el) {
            const img = new Image();
            img.onload = () => {
                el.style.backgroundImage = `url(${url})`;
                el.classList.add('loaded');
            };
            img.src = url;
        }
    });

    // Set background-image by data-img attribute
    Object.entries(dataImgMap).forEach(([key, url]) => {
        const el = document.querySelector(`[data-img="${key}"]`);
        if (el) {
            const img = new Image();
            img.onload = () => {
                el.style.backgroundImage = `url(${url})`;
                el.classList.add('loaded');
            };
            img.src = url;
        }
    });
}

/* ========================================
   SCROLL ANIMATIONS
========================================= */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation slightly for sibling elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ========================================
   COUNTER ANIMATION
========================================= */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.hasAttribute('data-decimal');
    const duration = 2000;
    const startTime = performance.now();

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = easedProgress * target;

        if (isDecimal) {
            el.textContent = current.toFixed(1);
        } else {
            el.textContent = Math.round(current).toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ========================================
   FAQ ACCORDION
========================================= */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-answer').style.maxHeight = '0';
                other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle clicked
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ========================================
   MOBILE MENU
========================================= */
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ========================================
   SMOOTH SCROLL
========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navHeight = document.getElementById('nav')?.offsetHeight || 48;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        });
    });
}
