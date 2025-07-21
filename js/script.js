// Main JavaScript for BAND Website
class BandWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupContactLinks();
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // GSAP animations
    setupAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections on scroll
        gsap.utils.toArray('section').forEach((section, index) => {
            gsap.fromTo(section, 
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
            });
        });

        // Animate team members with stagger
        gsap.fromTo('.team-member',
            {
                opacity: 0,
                y: 30,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.team-section',
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
        });

        // Animate service items
        gsap.fromTo('.service-item',
            {
                opacity: 0,
                x: -30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.services-section',
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
        });

        // Animate commitment items
        gsap.fromTo('.commitment-item',
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.commitment-section',
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
        });

        // Animate contact items
        gsap.fromTo('.contact-item',
            {
                opacity: 0,
                x: 30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
        });
    }

    // Scroll effects
    setupScrollEffects() {
        // Parallax effect for hero section
        gsap.to('.hero-section', {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Contact links functionality
    setupContactLinks() {
        // Phone number click handler
        const phoneLink = document.querySelector('.contact-item:first-child');
        if (phoneLink) {
            phoneLink.addEventListener('click', () => {
                window.open('tel:0123456789');
            });
            phoneLink.style.cursor = 'pointer';
        }

        // Email click handler
        const emailLink = document.querySelector('.contact-item:nth-child(2)');
        if (emailLink) {
            emailLink.addEventListener('click', () => {
                window.open('mailto:booking@band.com');
            });
            emailLink.style.cursor = 'pointer';
        }

        // Facebook click handler
        const facebookLink = document.querySelector('.contact-item:nth-child(3)');
        if (facebookLink) {
            facebookLink.addEventListener('click', () => {
                window.open('https://facebook.com/bandmusic', '_blank');
            });
            facebookLink.style.cursor = 'pointer';
        }
    }

    // Utility function to add loading animation
    addLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading BAND...</p>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-family: 'Inter', sans-serif;
        `;

        const loaderContent = loader.querySelector('.loader-content');
        loaderContent.style.cssText = `
            text-align: center;
        `;

        const spinner = loader.querySelector('.loader-spinner');
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        `;

        // Add keyframes for spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(loader);

        // Remove loader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
                    document.body.removeChild(loader);
                }, 500);
            }, 1000);
        });
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const bandWebsite = new BandWebsite();
    
    // Add loading animation
    bandWebsite.addLoadingAnimation();
});

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add intersection observer for lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
} 

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navList.classList.contains('show')) {
                    navList.classList.remove('show');
                }
            }
        });
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu')) {
            navList.classList.remove('show');
        }
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
    
    // Set active link for home section by default
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// Member card click functionality
document.addEventListener('DOMContentLoaded', function() {
    const memberCards = document.querySelectorAll('.member-card');
    const memberDetails = document.querySelectorAll('.member-detail');
    
    memberCards.forEach(card => {
        const header = card.querySelector('.member-card-header');
        
        header.addEventListener('click', function() {
            const memberId = card.getAttribute('data-member');
            const detail = document.getElementById(`member-detail-${memberId}`);
            
            // If this card is already active, close it
            if (card.classList.contains('active')) {
                card.classList.remove('active');
                detail.classList.remove('show');
                detail.style.display = 'none';
                return;
            }
            
            // Remove active class from all cards and close all details
            memberCards.forEach(c => {
                c.classList.remove('active');
            });
            
            memberDetails.forEach(d => {
                d.classList.remove('show');
                d.style.display = 'none';
            });
            
            // Add active class to clicked card and show detail
            card.classList.add('active');
            detail.style.display = 'block';
            
            // Use setTimeout to ensure display: block is applied before adding show class
            setTimeout(() => {
                detail.classList.add('show');
                
                // Smooth scroll to details
                detail.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 10);
        });
    });
    
    // Initialize with first member selected
    if (memberCards.length > 0) {
        const firstCard = memberCards[0];
        const firstDetail = document.getElementById('member-detail-1');
        firstCard.classList.add('active');
        firstDetail.style.display = 'block';
        setTimeout(() => {
            firstDetail.classList.add('show');
        }, 10);
    }
}); 