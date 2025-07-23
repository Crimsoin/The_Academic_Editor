    // Authors Carousel Navigation
    const authorsCarousel = document.getElementById('authorsCarousel');
    const authorsPrev = document.getElementById('authorsCarouselPrev');
    const authorsNext = document.getElementById('authorsCarouselNext');
    if (authorsCarousel && authorsPrev && authorsNext) {
        const scrollAmount = 350; // px per click
        authorsPrev.addEventListener('click', () => {
            authorsCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        authorsNext.addEventListener('click', () => {
            authorsCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Pricing Calculator Logic
    const pricingWordCountInput = document.getElementById('pricingWordCount');
    const pricingServiceTypeSelect = document.getElementById('pricingServiceType');
    const pricingCalculatorResult = document.getElementById('pricingCalculatorResult');

    function calculatePricing() {
        const wordCount = parseInt(pricingWordCountInput.value) || 0;
        const serviceType = pricingServiceTypeSelect.value;
        let price = 0;

        if (serviceType === 'academic') {
            if (wordCount <= 500) price = 59;
            else if (wordCount <= 1000) price = 99;
            else if (wordCount <= 3000) price = 199;
            else if (wordCount <= 6000) price = 299;
            else if (wordCount <= 8000) price = 499;
            else price = wordCount * 0.06;
        } else if (serviceType === 'editorial') {
            if (wordCount <= 500) price = 99;
            else if (wordCount <= 1000) price = 199;
            else if (wordCount <= 3000) price = 449;
            else if (wordCount <= 6000) price = 799;
            else if (wordCount <= 8000) price = 999;
            else price = wordCount * 0.15;
        } else if (serviceType === 'expert') {
            if (wordCount <= 500) price = 199;
            else if (wordCount <= 1000) price = 399;
            else if (wordCount <= 3000) price = 799;
            else if (wordCount <= 6000) price = 1499;
            else if (wordCount <= 8000) price = 1999;
            else price = wordCount * 0.25;
        }

        let displayPrice = price > 0 ? `Estimated Price: €${price.toFixed(2)}` : 'Estimated Price: —';
        pricingCalculatorResult.textContent = displayPrice;
        pricingCalculatorResult.style.transform = 'scale(1.1)';
        setTimeout(() => {
            pricingCalculatorResult.style.transform = 'scale(1)';
        }, 200);
    }

    if (pricingWordCountInput && pricingServiceTypeSelect) {
        pricingWordCountInput.addEventListener('input', calculatePricing);
        pricingServiceTypeSelect.addEventListener('change', calculatePricing);
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Quote Calculator
    const quoteWordCountInput = document.getElementById('wordCount');
    const serviceTypeSelect = document.getElementById('serviceType');
    const turnaroundSelect = document.getElementById('turnaround');
    const totalPriceDisplay = document.getElementById('totalPrice');

    function calculateQuote() {
        const wordCount = parseInt(wordCountInput.value) || 0;
        const pricePerWord = parseFloat(serviceTypeSelect.value) || 0;
        const rushMultiplier = parseFloat(turnaroundSelect.value) || 1;
        
        const basePrice = wordCount * pricePerWord;
        const totalPrice = basePrice * rushMultiplier;
        
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        
        // Add animation to price change
        totalPriceDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            totalPriceDisplay.style.transform = 'scale(1)';
        }, 200);
    }

    // Add event listeners for quote calculator
    if (quoteWordCountInput && serviceTypeSelect && turnaroundSelect) {
        quoteWordCountInput.addEventListener('input', calculateQuote);
        serviceTypeSelect.addEventListener('change', calculateQuote);
        turnaroundSelect.addEventListener('change', calculateQuote);
    }

    // Journal Slider functionality
    const journalImages = [
        "src/Journal-Logo/1.png",
        "src/Journal-Logo/2.png",
        "src/Journal-Logo/3.png",
        "src/Journal-Logo/4.png",
        "src/Journal-Logo/5.png",
        "src/Journal-Logo/6.png",
        "src/Journal-Logo/7.png",
        "src/Journal-Logo/8.png",
        "src/Journal-Logo/9.png",
        "src/Journal-Logo/10.png"
    ];

    const galleryContainer = document.querySelector('.journal-gallery');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');
    let currentIndex = 0;
    let isAnimating = false;

    // Initialize gallery with first three images
    function initGallery() {
        if (!galleryContainer) return;

        // Clear existing images
        galleryContainer.innerHTML = '';

        // Create initial images
        for (let i = 0; i < 3; i++) {
            const img = document.createElement('img');
            img.src = journalImages[(currentIndex + i) % journalImages.length];
            img.alt = `Journal Logo ${(currentIndex + i) % journalImages.length + 1}`;
            img.classList.add(i === 0 ? 'left' : i === 1 ? 'center' : 'right');
            img.dataset.position = i === 0 ? 'left' : i === 1 ? 'center' : 'right';
            
            // Add load event to ensure images are visible
            img.onload = function() {
                this.style.visibility = 'visible';
            };
            img.style.visibility = 'hidden';
            
            galleryContainer.appendChild(img);
        }
    }

    // Function to update image sources after rotation
    function updateImageSources() {
        const images = galleryContainer.querySelectorAll('img');
        images.forEach((img, index) => {
            const position = img.dataset.position;
            if (position === 'left') {
                img.src = journalImages[currentIndex];
            } else if (position === 'center') {
                img.src = journalImages[(currentIndex + 1) % journalImages.length];
            } else {
                img.src = journalImages[(currentIndex + 2) % journalImages.length];
            }
        });
    }

    // Function to rotate images
    function rotateImages(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const images = galleryContainer.querySelectorAll('img');
        
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % journalImages.length;
            
            // Remove current transitions
            images.forEach(img => img.style.transition = 'none');
            
            // Set new positions with transitions
            setTimeout(() => {
                images.forEach(img => img.style.transition = 'all 0.5s ease');
                
                images.forEach(img => {
                    const currentPosition = img.dataset.position;
                    if (currentPosition === 'left') {
                        img.classList.remove('left');
                        img.classList.add('center');
                        img.dataset.position = 'center';
                    } else if (currentPosition === 'center') {
                        img.classList.remove('center');
                        img.classList.add('right');
                        img.dataset.position = 'right';
                    } else {
                        img.classList.remove('right');
                        img.classList.add('left');
                        img.dataset.position = 'left';
                    }
                });
                
                // Update image sources after position changes
                updateImageSources();
            }, 50);
        } else {
            currentIndex = (currentIndex - 1 + journalImages.length) % journalImages.length;
            
            // Remove current transitions
            images.forEach(img => img.style.transition = 'none');
            
            // Set new positions with transitions
            setTimeout(() => {
                images.forEach(img => img.style.transition = 'all 0.5s ease');
                
                // Update classes for rotation
                images[0].classList.remove('left');
                images[0].classList.add('right');
                
                images[1].classList.remove('center');
                images[1].classList.add('left');
                
                images[2].classList.remove('right');
                images[2].classList.add('center');
                
                // Update all image sources
                images[0].src = journalImages[(currentIndex + 2) % journalImages.length];
                images[1].src = journalImages[currentIndex];
                images[2].src = journalImages[(currentIndex + 1) % journalImages.length];
            }, 50);
        }

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Initialize gallery on load
    initGallery();

    // Add event listeners for navigation buttons
    if (nextButton) {
        nextButton.addEventListener('click', () => rotateImages('next'));
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => rotateImages('prev'));
    }

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        if (!isAnimating) {
            rotateImages('next');
        }
    }, 5000);

    if (slidesContainer) {
        const prevSlide = slidesContainer.querySelector('.prev-slide');
        const currentSlide = slidesContainer.querySelector('.current-slide');
        const nextSlide = slidesContainer.querySelector('.next-slide');

        function updateSlides() {
            const prevIndex = (currentIndex - 1 + journalImages.length) % journalImages.length;
            const nextIndex = (currentIndex + 1) % journalImages.length;

            // Apply transition classes
            prevSlide.className = 'slide prev-slide';
            currentSlide.className = 'slide current-slide';
            nextSlide.className = 'slide next-slide';

            // Update images with fade effect
            prevSlide.querySelector('img').src = journalImages[prevIndex];
            currentSlide.querySelector('img').src = journalImages[currentIndex];
            nextSlide.querySelector('img').src = journalImages[nextIndex];
        }

        // Initial setup
        updateSlides();


        // Event listeners for next and previous buttons
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % journalImages.length;
                updateSlides();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + journalImages.length) % journalImages.length;
                updateSlides();
            });
        }

        // Auto-advance slides every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % journalImages.length;
            updateSlides();
        }, 5000);
    }

    // Inquire Button - scroll to submit manuscript section
    const inquireBtn = document.getElementById('inquireBtn');
    const submitSection = document.getElementById('submit-manuscript');
    
    if (inquireBtn && submitSection) {
        inquireBtn.addEventListener('click', function() {
            const headerOffset = 70;
            const elementPosition = submitSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    }

    // Learn More Button - scroll to services section
    const learnMoreBtn = document.querySelector('.btn-secondary');
    const servicesSection = document.getElementById('services');
    
    if (learnMoreBtn && servicesSection) {
        learnMoreBtn.addEventListener('click', function() {
            const headerOffset = 70;
            const elementPosition = servicesSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    }
    


    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
            
            // In a real application, this would submit to a server
            console.log('Form submission:', {
                name,
                email,
                subject,
                message
            });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .feature, .stat');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Service card click to scroll to pricing
    const serviceCards = document.querySelectorAll('.service-card');
    const pricingSection = document.getElementById('pricing');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            if (pricingSection) {
                const headerOffset = 70;
                const elementPosition = pricingSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Add cursor pointer to indicate clickability
        card.style.cursor = 'pointer';
    });

    // Word count input validation
    if (wordCountInput) {
        wordCountInput.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (value < 0) {
                this.value = 0;
            }
            if (value > 100000) {
                this.value = 100000;
            }
        });
    }

    // Add loading state for buttons
    function addLoadingState(button, duration = 2000) {
        const originalText = button.textContent;
        const originalDisabled = button.disabled;
        
        button.textContent = 'Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = originalDisabled;
        }, duration);
    }

    // Add click effects to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const rippleCSS = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);

    // Initialize AOS (Animate On Scroll) alternative
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in');
        
        const checkElements = () => {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        };
        
        window.addEventListener('scroll', checkElements);
        checkElements(); // Check on initial load
    }
    
    initScrollAnimations();

    // Console welcome message
    console.log('%c Welcome to ProofPerfect! ', 'background: #6366f1; color: white; padding: 10px; border-radius: 5px; font-size: 16px;');
    console.log('Thanks for visiting our website. If you have any questions, feel free to contact us!');
    
    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });
});
