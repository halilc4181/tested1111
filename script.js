// Create floating particles
function createParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particles.appendChild(particle);
    }
}

// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            createParticles();
        }, 1500);
    }
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Counter Animation
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Stats Counter Observer
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const suffix = target === 99 ? '%' : '+';
                    animateCounter(counter, target, suffix);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        if (!faqItem) return;

        const isActive = faqItem.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Chat Widget
const chatToggle = document.getElementById('chatToggle');
const chatMenu = document.getElementById('chatMenu');
const chatbotOption = document.getElementById('chatbotOption');

if (chatToggle && chatMenu) {
    chatToggle.addEventListener('click', () => {
        chatMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chat-widget')) {
            chatMenu.classList.remove('active');
        }
    });
}

if (chatbotOption) {
    chatbotOption.addEventListener('click', (e) => {
        e.preventDefault();
        alert('💬 Merhaba! Size nasıl yardımcı olabiliriz?\n\n• Web Tasarım\n• SEO\n• Pazarlama\n• Ücretsiz analiz');
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Başarıyla Gönderildi!';
            setTimeout(() => {
                alert('🚀 Mesajınız başarıyla gönderildi!');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }, 2000);
    });
}

// Service Card Hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-20px) rotateX(10deg) scale(1.02)';
        card.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
        card.style.zIndex = '1';
    });
});

// Tech Items
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'translateY(-10px) scale(1.15) rotateY(360deg)';
        setTimeout(() => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
        }, 600);
    });
});

// Portfolio Hover
document.querySelectorAll('.portfolio-item').forEach(item => {
    const link = item.querySelector('.portfolio-link');
    if (!link) return;

    item.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(15px)';
        item.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.4)';
    });

    item.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});

// Blog Hover
document.querySelectorAll('.blog-card').forEach(card => {
    const link = card.querySelector('.blog-link');
    if (!link) return;

    card.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(10px)';
    });
    card.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.orb');
    const scrollY = window.scrollY;

    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
    }

    orbs.forEach((orb, i) => {
        const speed = 0.2 + (i * 0.1);
        orb.style.transform = `translateY(${scrollY * speed}px) scale(${1 + scrollY * 0.0005})`;
    });
});

// Dynamic Background (Safe fallback)
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    document.documentElement.style.setProperty('--mouse-x', mouseX);
    document.documentElement.style.setProperty('--mouse-y', mouseY);
});

// Mobile Menu with Enhanced Dropdown Behavior
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Enhanced dropdown functionality for mobile
    const dropdownParents = navMenu.querySelectorAll('.dropdown > a');
    const dropdownMenus = navMenu.querySelectorAll('.dropdown-menu');
    
    // Track tap counts for dropdown parents (only on mobile)
    const tapCounts = new Map();
    const tapTimeouts = new Map();
    
    dropdownParents.forEach((parentLink, index) => {
        const dropdownMenu = dropdownMenus[index];
        const parentId = parentLink.id || `dropdown-${index}`;
        
        parentLink.addEventListener('click', (e) => {
            // Check if we're on mobile (screen width < 768px)
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                // Mobile behavior: double-tap logic
                e.preventDefault();
                
                const currentCount = tapCounts.get(parentId) || 0;
                const newCount = currentCount + 1;
                tapCounts.set(parentId, newCount);
                
                // Clear existing timeout
                if (tapTimeouts.get(parentId)) {
                    clearTimeout(tapTimeouts.get(parentId));
                }
                
                // Set timeout to reset tap count (increased to 1000ms for better UX)
                const timeout = setTimeout(() => {
                    tapCounts.set(parentId, 0);
                    tapTimeouts.delete(parentId);
                }, 1000); // 1000ms window for double tap
                
                tapTimeouts.set(parentId, timeout);
                
                // Check if dropdown is already open
                const isOpen = dropdownMenu.style.display === 'block' || dropdownMenu.parentElement.classList.contains('active');
                
                if (isOpen) {
                    // If dropdown is already open, navigate immediately
                    tapCounts.set(parentId, 0);
                    clearTimeout(tapTimeouts.get(parentId));
                    tapTimeouts.delete(parentId);
                    
                    const href = parentLink.getAttribute('data-href') || 'kurumsal.html';
                    
                    // Add visual feedback for navigation
                    parentLink.style.backgroundColor = 'rgba(255, 0, 110, 0.3)';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 150);
                } else if (newCount === 1) {
                    // First tap - toggle dropdown
                    
                    // Close all other dropdowns first
                    dropdownMenus.forEach((menu, menuIndex) => {
                        if (menuIndex !== index) {
                            menu.style.display = 'none';
                            menu.parentElement.classList.remove('active');
                        }
                    });
                    
                    // Open current dropdown
                    dropdownMenu.style.display = 'block';
                    dropdownMenu.parentElement.classList.add('active');
                    
                    // Add visual feedback for first tap
                    parentLink.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    setTimeout(() => {
                        parentLink.style.backgroundColor = '';
                    }, 200);
                    
                } else if (newCount === 2) {
                    // Second tap - navigate to parent link
                    tapCounts.set(parentId, 0);
                    clearTimeout(tapTimeouts.get(parentId));
                    tapTimeouts.delete(parentId);
                    
                    const href = parentLink.getAttribute('data-href') || 'kurumsal.html';
                    
                    // Add visual feedback for navigation
                    parentLink.style.backgroundColor = 'rgba(255, 0, 110, 0.3)';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 150);
                }
            } else {
                // Desktop/tablet behavior: navigate immediately
                const href = parentLink.getAttribute('data-href') || 'kurumsal.html';
                window.location.href = href;
            }
        });
    });

    // Handle regular menu items (non-dropdown) and dropdown child items
    navMenu.querySelectorAll('a:not(.dropdown > a)').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // Close all dropdowns when navigating
            dropdownMenus.forEach(menu => {
                menu.style.display = 'none';
                menu.parentElement.classList.remove('active');
            });
        });
    });
    
    // Handle window resize to update menu behavior
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth < 768;
        
        // If switching to desktop, clear any pending tap timeouts and reset counts
        if (!isMobile) {
            tapTimeouts.forEach((timeout) => {
                clearTimeout(timeout);
            });
            tapTimeouts.clear();
            tapCounts.clear();
            
            // Close any open dropdowns on desktop
            dropdownMenus.forEach(menu => {
                menu.style.display = 'none';
                menu.parentElement.classList.remove('active');
            });
        }
    });
}

// Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) konamiCode.shift();

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => document.body.style.filter = 'none', 3000);
        console.log('🎉 Gizli kod aktif!');
    }
});

// Advanced Effects
function initializeAdvancedEffects() {
    document.querySelectorAll('.service-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.2}s`;
    });
}

document.addEventListener('DOMContentLoaded', initializeAdvancedEffects);

// Scroll Throttle
let ticking = false;
function updateOnScroll() {
    ticking = false;
    // custom scroll animations
}
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Globe Interactions
const interactiveGlobe = document.getElementById('interactiveGlobe');
const globeSphere = interactiveGlobe?.querySelector('.globe-sphere');

if (interactiveGlobe && globeSphere) {
    let isDragging = false;
    let startX, startY;
    let currentRotationY = 0;
    let currentRotationX = 0;
    const rotationSpeed = 0.3;

    interactiveGlobe.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        globeSphere.style.animationPlayState = 'paused';
        globeSphere.style.transition = 'none';
        interactiveGlobe.style.cursor = 'grabbing';
    });

    interactiveGlobe.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        currentRotationY += deltaX * rotationSpeed;
        currentRotationX -= deltaY * rotationSpeed;
        currentRotationX = Math.max(-90, Math.min(90, currentRotationX));

        globeSphere.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
        startX = e.clientX;
        startY = e.clientY;
    });

    const stopDragging = () => {
        isDragging = false;
        globeSphere.style.animationPlayState = 'running';
        globeSphere.style.transition = 'transform 0.1s ease-out';
        interactiveGlobe.style.cursor = 'grab';
    };

    interactiveGlobe.addEventListener('mouseup', stopDragging);
    interactiveGlobe.addEventListener('mouseleave', stopDragging);
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Helper function to get the theme icon
function getThemeIcon() {
    if (!themeToggle) return null;
    // The icon is in a sibling div with class 'chat-option-icon'
    const themeOption = themeToggle.closest('.theme-option');
    if (!themeOption) return null;
    return themeOption.querySelector('.chat-option-icon i');
}

// Load saved theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = getThemeIcon();
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    } else {
        body.classList.remove('light-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
        // Sadece tema butonuna tıklandığında çalışsın
        e.stopPropagation();
        
        const themeIcon = getThemeIcon();
        
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
        }
    });
}

// Load theme when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadTheme);

// Blog Page Functionality
function initializeBlogFeatures() {
    // Category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    const featuredPosts = document.querySelectorAll('.featured-post');
    const recentPosts = document.querySelectorAll('.recent-post');
    
    if (categoryCards.length > 0) {
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all cards
                categoryCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                card.classList.add('active');
                
                const selectedCategory = card.getAttribute('data-category');
                
                // Filter posts based on category
                if (selectedCategory === 'all') {
                    // Show all posts
                    featuredPosts.forEach(post => post.style.display = 'block');
                    recentPosts.forEach(post => post.style.display = 'block');
                } else {
                    // Filter posts by category
                    featuredPosts.forEach(post => {
                        const postCategory = post.querySelector('.post-category').textContent.toLowerCase();
                        if (postCategory === selectedCategory || selectedCategory === 'all') {
                            post.style.display = 'block';
                        } else {
                            post.style.display = 'none';
                        }
                    });
                    
                    recentPosts.forEach(post => {
                        const postCategory = post.querySelector('.post-category').textContent.toLowerCase();
                        if (postCategory === selectedCategory || selectedCategory === 'all') {
                            post.style.display = 'block';
                        } else {
                            post.style.display = 'none';
                        }
                    });
                }
                
                // Smooth scroll to posts section
                const postsSection = document.querySelector('.featured-posts');
                if (postsSection) {
                    postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show success message (you can customize this)
                const submitBtn = newsletterForm.querySelector('.btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Abone Olundu!';
                submitBtn.style.background = 'var(--gradient-success)';
                
                // Reset form
                emailInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }
    
    // Post image lazy loading enhancement
    const postImages = document.querySelectorAll('.post-image img');
    if (postImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        postImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize blog features when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBlogFeatures);
} else {
    initializeBlogFeatures();
}

