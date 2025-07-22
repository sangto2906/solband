// Main JavaScript for BAND Website
class BandWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupAnimations();
        this.setupScrollEffects();
        // Đã loại bỏ setupContactLinks vì không còn cần thiết
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
    }

    // Scroll effects
    setupScrollEffects() {
        // Parallax effect for hero section (chỉ chạy nếu tồn tại .hero-section)
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
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

    // Đã loại bỏ setupContactLinks vì không còn cần thiết

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

// Zoom member image modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    const arrowLeft = document.querySelector('.image-modal-arrow-left');
    const arrowRight = document.querySelector('.image-modal-arrow-right');

    // Lưu trữ danh sách ảnh hiện tại và vị trí đang xem
    let currentGallery = [];
    let currentIndex = 0;

    // Open modal when click image
    const galleryImages = document.querySelectorAll('.member-gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Xác định gallery hiện tại (cùng cha .member-gallery-instagram)
            const gallery = Array.from(this.closest('.member-gallery-instagram').querySelectorAll('.member-gallery-img'));
            currentGallery = gallery;
            currentIndex = gallery.indexOf(this);
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    // Chuyển ảnh theo index
    function showImageAt(index) {
        if (!currentGallery.length) return;
        // Vòng lặp khi vượt quá đầu/cuối
        if (index < 0) index = currentGallery.length - 1;
        if (index >= currentGallery.length) index = 0;
        currentIndex = index;
        const img = currentGallery[currentIndex];
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    }

    // Xử lý mũi tên
    arrowLeft.addEventListener('click', function(e) {
        e.stopPropagation();
        showImageAt(currentIndex - 1);
    });
    arrowRight.addEventListener('click', function(e) {
        e.stopPropagation();
        showImageAt(currentIndex + 1);
    });

    // Close modal when click close button or outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
            currentGallery = [];
            currentIndex = 0;
        }
    });
}); 

// Zoom gallery media modal
// Sử dụng lại modal #image-modal, cho phép phóng to cả ảnh và video trong gallery

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    const arrowLeft = document.querySelector('.image-modal-arrow-left');
    const arrowRight = document.querySelector('.image-modal-arrow-right');

    // Lưu trữ danh sách gallery media và vị trí đang xem
    let galleryMedia = [];
    let galleryIndex = 0;
    let isGalleryMode = false;

    // Open modal when click gallery image or video
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
            // Xóa video nếu có
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

    // Chuyển media
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

    // Đóng modal khi click ngoài
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