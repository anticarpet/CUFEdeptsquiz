// Language and theme management
class WebsiteController {
    constructor() {
        this.currentLang = 'ar';
        this.currentTheme = 'light';
        this.translations = {
            ar: {
                title: 'أهلا يا بشمهندس!',
                subtitle: 'بشوية اسئلة هنساعدك تختار تخصصك الأنسب ليك',
                btnText: 'يلا نبدأ',
                footer: 'تم إنشاء وتصميم الموقع بواسطة فريق من كلية الهندسة جامعة القاهرة',
                langSwitch: 'English',
                drive: "الدرابف",
                catalog: "الكاتالوج"
            },
            en: {
                title: 'Hey Future Engineer!',
                subtitle: 'A few questions will help you choose the perfect department for your specialty',
                btnText: 'Let\'s Start',
                footer: 'This website was created and designed by a team from Cairo University Faculty of Engineering',
                langSwitch: 'العربية',
                drive: "drive",
                catalog: "catalogue"
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPreferences();
        this.initAnimations();
    }

    bindEvents() {
        document.getElementById('langSwitcher').addEventListener('click', () => this.toggleLanguage());
        document.getElementById('modeSwitcher').addEventListener('click', () => this.toggleTheme());
        document.getElementById('startBtn').addEventListener('click', (e) => this.handleStartClick(e));
    }

    loadPreferences() {
        const savedLang = localStorage.getItem('preferred-language') || 'ar';
        const savedTheme = localStorage.getItem('preferred-theme') || 'light';

        if (savedLang !== this.currentLang) {
            this.setLanguage(savedLang);
        }

        if (savedTheme !== this.currentTheme) {
            this.setTheme(savedTheme);
        }
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.setLanguage(newLang);
    }

    setLanguage(lang) {
        this.currentLang = lang;
        const html = document.documentElement;

        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update text content
        const texts = this.translations[lang];
        document.getElementById('heroTitle').textContent = texts.title;
        document.getElementById('heroSubtitle').textContent = texts.subtitle;
        document.getElementById('btnText').textContent = texts.btnText;
        document.getElementById('footerText').textContent = texts.footer;
        document.querySelector('.lang-text').textContent = texts.langSwitch;
        document.getElementById('drivebtn').textContent = texts.drive;
        document.getElementById('cataBtn').textContent = texts.catalog;
        

        // Update arrow direction for button
        const arrow = document.querySelector('#startBtn .material-icons');
        arrow.textContent = lang === 'ar' ? 'arrow_back' : 'arrow_forward';

        localStorage.setItem('preferred-language', lang);

        // Animate text change
        gsap.fromTo(['.hero-title', '.hero-subtitle'],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
        );
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.body.setAttribute('data-theme', theme);

        const icon = document.querySelector('#modeSwitcher .material-icons');
        icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';

        localStorage.setItem('preferred-theme', theme);

        // Animate theme change
        gsap.to('body', { duration: 0.3 });
    }

    handleStartClick(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const circle = document.querySelector('.transition-circle');

        // Position circle at button center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        circle.style.left = centerX - 25 + 'px';
        circle.style.top = centerY - 25 + 'px';

        // Animate circle expansion
        gsap.set(circle, { scale: 0, opacity: 1 });
        gsap.to(circle, {
            scale: 50,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                // Note to future 3nan ( sajid ) : Replace with actual navigation logic
                // like: window.location.href = 'quiz.html';
                window.location.href = 'quiz.html'
                // lmaoooooooo
                //console.log('Navigate to quiz page');

                // just reset the circle for demo (should be handled on page load)
                setTimeout(() => {
                    gsap.to(circle, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.3
                    });
                }, 500);
            }
        });

        // Add loading state to button
        button.classList.add('loading');
        setTimeout(() => button.classList.remove('loading'), 1000);
    }

    initAnimations() {
        // Ensure button is visible first
        gsap.set('.btn-primary', { opacity: 1, visibility: 'visible', display: 'inline-flex' });
        gsap.set('.btn-secondary', { opacity: 1, visibility: 'visible', display: 'inline-flex' });

        // Animate elements on load with more dramatic entrance
        gsap.timeline()
            .from('.header', { y: -100, opacity: 0, duration: 1, ease: "power3.out" })
            .from('.bg-graphic', {
                scale: 0,
                opacity: 0,
                duration: 2,
                stagger: 0.2,
                ease: "elastic.out(1, 0.3)"
            }, '-=0.8')
            .from('.hero-title', {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            }, '-=1.5')
            .from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            }, '-=0.8')
            .from('.btn-primary', {
                scale: 0.7,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, '-=0.4')
            .from('.btn-secondary', {
                scale: 0.7,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, '-=0.4')
            .from('.footer', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, '-=0.3');

        // Add floating animation to background graphics
        gsap.to('.bg-graphic', {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-5, 5)",
            duration: "random(15, 25)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.5
        });

        // Add scroll-triggered animations for better UX
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.hero-content, .footer').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WebsiteController();
});

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate layouts if needed
        gsap.set('.transition-circle', { scale: 0, opacity: 0 });
    }, 150);
});

//pulse-animation

