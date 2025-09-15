// Contributors data - Add your team members here
function shuffle(arr) {
  	for (let i = arr.length - 1; i > 0; i--) {
    	const j = Math.floor(Math.random() * (i + 1));
    	[arr[i], arr[j]] = [arr[j], arr[i]];
  	}
  	return arr;
}




// Used like so
let arr = [2, 11, 37, 42];
shuffle(arr);
const contributors = shuffle([
    {
        name: "Zeina Ali",
        role: 'Team Leader',
        avatar: null // Will use default avatar
    },
    {
        name: "Sajid Elmanakhly",
        role: '✨Lead web developer✨',
        avatar: "images/peoples/Sajid.jpeg"
    },
    {
        name: "Eslam Ahmed",
        role: 'Lead designer',
        avatar: "images/peoples/eslam.jpeg"
    },
    {
        name: "Abdel-Moe'z Sayed",
        role: "Lead developer",
        avatar: "images/peoples/abmoez.jpeg"
    },
    {
        name: "Ahmed Anan",
        role: 'Web Developer',
        avatar: null
    },
    {
        name: "Menna Khaled",
        role: 'Sticker Squad',
        avatar: null
    },
    {
        name: "Ahmed Hani",
        role: 'Card Creator',
        avatar: "images/peoples/hani.jpeg"
    },
    {
        name: "Mohammad Fahd",
        role: "graphic designer",
        avatar: "images/peoples/fahd.jpeg"
    },
    {
        name: "Shahd Yasser Abdel-Hady",
        role: "graphic designer, content creator, marketing",
        avatar: "images/peoples/shahd.jpeg"
    },
    {
        name: "Yahya Ismail",
        role: "graphic designer, content",
        avatar: "images/peoples/yahya.jpeg"
    },
    {
        name: "Shaimaa Omar Zidan",
        role: "graphic designer, content creator",
        avatar: "images/peoples/shaimaa.jpeg"
    },
    {
        name: "Ahmed Atta",
        role: "Content creator, organizer",
        avatar: "images/peoples/atta.jpeg"
    },
    {
        name: "Habiba Ayman",
        role: "designer",
        avatar: "images/peoples/habiba.jpeg"
    },
    {
        name: "Ahmed Elewa",
        role: "designer",
        avatar: "images/peoples/elewa.jpeg"
    },
    {
        name: "Moroj Mostafa",
        role: "Content Creator",
        avatar: null
    },
    {
        name: "Marwan Khaled",
        role: "designer",
        avatar: "images/peoples/marwan.jpeg"
    },
    {
        name: "Esraa Esmat",
        role: "Data provider, graphic designer",
        avatar: null
    },
    {
        name: "Haneen Sayed",
        role: "Editor",
        avatar: null
    },
]);

// Group configurations - Define which contributors should be grouped together
const groupConfigurations = [
    // {
    //     title: 'Stickers',
    //     titleAr: "الاستيكر",
    //     contributors: [3, 6], 
    //     description: 'Creative minds behind the visual identity',
    //     descriptionAr: 'العقول المبدعة وراء الهوية البصرية'
    // }
    // Add more group configurations as needed
];

// Controller for the Contributors page
class ContributorsController {
    constructor() {
        this.currentLang = 'ar';
        this.currentTheme = 'light';
        this.contributors = contributors;
        this.groupConfigurations = groupConfigurations;
        this.translations = {
            ar: {
                title: 'فريق العمل',
                subtitle: 'تعرف على الفريق الرائع وراء هذا المشروع',
                footer: 'تم إنشاء وتصميم الموقع بواسطة فريق من كلية الهندسة جامعة القاهرة',
                langSwitch: 'English',
                backText: 'الرئيسية'
            },
            en: {
                title: 'Our Team',
                subtitle: 'Meet the amazing team behind this project',
                footer: 'This website was created and designed by a team from Cairo University Faculty of Engineering',
                langSwitch: 'العربية',
                backText: 'Home'
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPreferences();
        this.renderContributors();
        this.initAnimations();
    }

    bindEvents() {
        document.getElementById('langSwitcher').addEventListener('click', () => this.toggleLanguage());
        document.getElementById('modeSwitcher').addEventListener('click', () => this.toggleTheme());
        document.getElementById('backBtn').addEventListener('click', (e) => this.handleBackClick(e));
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
        document.getElementById('contributorsTitle').textContent = texts.title;
        document.getElementById('contributorsSubtitle').textContent = texts.subtitle;
        document.getElementById('footerText').textContent = texts.footer;
        document.querySelector('.lang-text').textContent = texts.langSwitch;
        document.querySelector('.back-text').textContent = texts.backText;

        // Update back arrow direction
        const arrow = document.querySelector('#backBtn .material-icons');
        arrow.textContent = lang === 'ar' ? 'arrow_forward' : 'arrow_back';

        localStorage.setItem('preferred-language', lang);

        // Re-render contributors with new language
        this.renderContributors();

        // Animate text change
        gsap.fromTo(['.contributors-title', '.contributors-subtitle'],
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

    renderContributors() {
        const grid = document.getElementById('contributorsGrid');
        grid.innerHTML = '';

        // Track which contributors are already in groups
        const groupedIndices = new Set();
        this.groupConfigurations.forEach(group => {
            group.contributors.forEach(index => groupedIndices.add(index));
        });

        // Render individual contributor cards for non-grouped contributors
        this.contributors.forEach((contributor, index) => {
            if (!groupedIndices.has(index)) {
                const card = this.createContributorCard(contributor, index);
                grid.appendChild(card);
            }
        });

        // Render group cards
        this.groupConfigurations.forEach((group, index) => {
            const groupCard = this.createGroupCard(group, index);
            grid.appendChild(groupCard);
        });
    }

    createContributorCard(contributor, index) {
        const card = document.createElement('div');
        card.className = 'contributor-card';
        card.setAttribute('data-index', index);

        const avatarSrc = contributor.avatar || 'images/default-avatar.jpg';

        card.innerHTML = `
            <div class="contributor-avatar-wrapper">
                <img src="${avatarSrc}" alt="${contributor.name}" class="contributor-avatar" 
                     onerror="this.src='images/default-avatar.jpg'">
                <div class="avatar-overlay"></div>
            </div>
            <h3 class="contributor-name">${contributor.name}</h3>
            <p class="contributor-role">${contributor.role}</p>
        `;

        // Add hover effects
        card.addEventListener('mouseenter', () => this.handleCardHover(card, true));
        card.addEventListener('mouseleave', () => this.handleCardHover(card, false));

        return card;
    }

    createGroupCard(group, groupIndex) {
        const card = document.createElement('div');
        card.className = 'contributor-card group-card';
        card.setAttribute('data-group-index', groupIndex);

        const groupMembers = group.contributors.map(index => this.contributors[index]);
        const title = this.currentLang === 'ar' ? group.titleAr : group.title;
        const description = this.currentLang === 'ar' ? group.descriptionAr : group.description;

        // Create avatars HTML
        const avatarsHtml = groupMembers.map(member => {
            const avatarSrc = member.avatar || 'images/default-avatar.jpg';
            return `
                <div class="group-member-avatar">
                    <img src="${avatarSrc}" alt="${member.name}" 
                         onerror="this.src='images/default-avatar.jpg'">
                    <div class="member-tooltip">${member.name}</div>
                </div>
            `;
        }).join('');

        // Create names list
        const namesList = groupMembers.map(member => member.name).join(' • ');

        card.innerHTML = `
            <div class="group-header">
                <h3 class="group-title">${title}</h3>
                <p class="group-description">${description}</p>
            </div>
            <div class="group-avatars">
                ${avatarsHtml}
            </div>
            <div class="group-members">
                <p class="members-list">${namesList}</p>
            </div>
        `;

        // Add hover effects
        card.addEventListener('mouseenter', () => this.handleGroupCardHover(card, true));
        card.addEventListener('mouseleave', () => this.handleGroupCardHover(card, false));

        return card;
    }

    handleCardHover(card, isHovering) {
        const avatar = card.querySelector('.contributor-avatar-wrapper');
        const overlay = card.querySelector('.avatar-overlay');
        
        if (isHovering) {
            gsap.to(avatar, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(overlay, {
                opacity: 0.3,
                duration: 0.3
            });
            gsap.to(card, {
                y: -5,
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        } else {
            gsap.to(avatar, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3
            });
            gsap.to(card, {
                y: 0,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                duration: 0.3
            });
        }
    }

    handleGroupCardHover(card, isHovering) {
        const avatars = card.querySelectorAll('.group-member-avatar');
        const tooltips = card.querySelectorAll('.member-tooltip');
        
        if (isHovering) {
            gsap.to(avatars, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.05
            });
            gsap.to(tooltips, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.05
            });
            gsap.to(card, {
                y: -8,
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        } else {
            gsap.to(avatars, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(tooltips, {
                opacity: 0,
                y: -10,
                duration: 0.3
            });
            gsap.to(card, {
                y: 0,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                duration: 0.3
            });
        }
    }

    handleBackClick(e) {
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
                window.location.href = 'landing.html';
            }
        });

        // Add loading state to button
        button.classList.add('loading');
    }

    initAnimations() {
        // Set initial state for contributor cards to ensure visibility
        gsap.set('.contributor-card', { opacity: 1, visibility: 'visible' });
        
        // Initial page load animation
        gsap.timeline()
            .from('.header', { 
                y: -100, 
                opacity: 0, 
                duration: 1, 
                ease: "power3.out" 
            })
            .from('.bg-graphic', {
                scale: 0,
                opacity: 0,
                duration: 2,
                stagger: 0.2,
                ease: "elastic.out(1, 0.3)"
            }, '-=0.8')
            .from('.contributors-title', {
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            }, '-=1.5')
            .from('.contributors-subtitle', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            }, '-=0.8')
            .from('.contributor-card', {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)",
                onComplete: function() {
                    // Ensure cards are fully visible after animation
                    gsap.set('.contributor-card', { opacity: 1, scale: 1 });
                }
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

        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.bg-graphic');
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContributorsController();
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