class BandWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupAnimations();
        this.setupScrollEffects();

    }

    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    setupAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        const isMobile = window.innerWidth <= 700;
        gsap.utils.toArray('section').forEach((section, index) => {
            gsap.fromTo(section, 
                { opacity: 0, y: isMobile ? 30 : 50 },
                { opacity: 1, y: 0, duration: isMobile ? 0.5 : 0.8, ease: "power2.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                  }
                }
            );
        });
    }

    setupScrollEffects() {
        const heroSection = document.querySelector('.hero-section');
        const isMobile = window.innerWidth <= 700;
        if (heroSection && !isMobile) {
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
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

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
            transition: opacity 0.5s;
        `;
        const loaderContent = loader.querySelector('.loader-content');
        loaderContent.style.cssText = `text-align: center;`;
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
        if (!document.getElementById('loader-spin-keyframes')) {
            const style = document.createElement('style');
            style.id = 'loader-spin-keyframes';
            style.textContent = `
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `;
            document.head.appendChild(style);
        }
        document.body.appendChild(loader);
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader.parentNode) loader.parentNode.removeChild(loader);
                }, 500);
            }, 500);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const bandWebsite = new BandWebsite();
    
    bandWebsite.addLoadingAnimation();
});

document.documentElement.style.scrollBehavior = 'smooth';

function enableLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src],img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
}
document.addEventListener('DOMContentLoaded', enableLazyLoad);

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                navLinks.forEach(l => l.classList.remove('active'));
                
                this.classList.add('active');
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                if (navList.classList.contains('show')) {
                    navList.classList.remove('show');
                }
            }
        });
    });
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
        });
    }
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu')) {
            navList.classList.remove('show');
        }
    });
    
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
    
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const memberCards = document.querySelectorAll('.member-card');
    const memberDetails = document.querySelectorAll('.member-detail');
    
    memberCards.forEach(card => {
        const header = card.querySelector('.member-card-header');
        
        header.addEventListener('click', function() {
            const memberId = card.getAttribute('data-member');
            const detail = document.getElementById(`member-detail-${memberId}`);
            
            if (card.classList.contains('active')) {
                card.classList.remove('active');
                detail.classList.remove('show');
                detail.style.display = 'none';
                return;
            }
            
            memberCards.forEach(c => {
                c.classList.remove('active');
            });
            
            memberDetails.forEach(d => {
                d.classList.remove('show');
                d.style.display = 'none';
            });
            
            card.classList.add('active');
            detail.style.display = 'block';
            
            setTimeout(() => {
                detail.classList.add('show');
                
                detail.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 10);
        });
    });
    
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

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    const arrowLeft = document.querySelector('.image-modal-arrow-left');
    const arrowRight = document.querySelector('.image-modal-arrow-right');

    let currentGallery = [];
    let currentIndex = 0;

    const galleryImages = document.querySelectorAll('.member-gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const gallery = Array.from(this.closest('.member-gallery-instagram').querySelectorAll('.member-gallery-img'));
            currentGallery = gallery;
            currentIndex = gallery.indexOf(this);
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    function showImageAt(index) {
        if (!currentGallery.length) return;
        if (index < 0) index = currentGallery.length - 1;
        if (index >= currentGallery.length) index = 0;
        currentIndex = index;
        const img = currentGallery[currentIndex];
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    }

    arrowLeft.addEventListener('click', function(e) {
        e.stopPropagation();
        showImageAt(currentIndex - 1);
    });
    arrowRight.addEventListener('click', function(e) {
        e.stopPropagation();
        showImageAt(currentIndex + 1);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
            currentGallery = [];
            currentIndex = 0;
        }
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    const arrowLeft = document.querySelector('.image-modal-arrow-left');
    const arrowRight = document.querySelector('.image-modal-arrow-right');

    let galleryMedia = [];
    let galleryIndex = 0;
    let isGalleryMode = false;

    const galleryElements = document.querySelectorAll('.gallery-media');
    galleryElements.forEach((el, idx) => {
        el.addEventListener('click', function() {
            galleryMedia = Array.from(galleryElements);
            galleryIndex = idx;
            isGalleryMode = true;
            showGalleryMediaAt(galleryIndex);
            modal.style.display = 'flex';
        });
    });

    function showGalleryMediaAt(index) {
        if (!galleryMedia.length) return;
        if (index < 0) index = galleryMedia.length - 1;
        if (index >= galleryMedia.length) index = 0;
        galleryIndex = index;
        const el = galleryMedia[galleryIndex];
        if (el.tagName === 'IMG') {
            modalImg.style.display = 'block';
            modalImg.src = el.src;
            modalImg.alt = el.alt;
            removeModalVideo();
        } else if (el.tagName === 'VIDEO') {
            modalImg.style.display = 'none';
            showModalVideo(el.querySelector('source').src, el.poster);
        }
    }

    function showModalVideo(src, poster) {
        removeModalVideo();
        const video = document.createElement('video');
        video.className = 'image-modal-content';
        video.src = src;
        video.poster = poster || '';
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '90vw';
        video.style.maxHeight = '80vh';
        video.style.borderRadius = '12px';
        video.style.background = '#000';
        video.style.display = 'block';
        video.style.margin = '0 auto';
        video.id = 'image-modal-video';
        modal.querySelector('.image-modal-controls').before(video);
    }

    function removeModalVideo() {
        const oldVideo = document.getElementById('image-modal-video');
        if (oldVideo) oldVideo.remove();
    }

    arrowLeft.addEventListener('click', function(e) {
        if (isGalleryMode) {
            e.stopPropagation();
            showGalleryMediaAt(galleryIndex - 1);
        }
    });
    arrowRight.addEventListener('click', function(e) {
        if (isGalleryMode) {
            e.stopPropagation();
            showGalleryMediaAt(galleryIndex + 1);
        }
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
            removeModalVideo();
            galleryMedia = [];
            galleryIndex = 0;
            isGalleryMode = false;
        }
    });
}); 