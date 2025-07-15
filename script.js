// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
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
    const wordCountInput = document.getElementById('wordCount');
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
    if (wordCountInput && serviceTypeSelect && turnaroundSelect) {
        wordCountInput.addEventListener('input', calculateQuote);
        serviceTypeSelect.addEventListener('change', calculateQuote);
        turnaroundSelect.addEventListener('change', calculateQuote);
    }

    // Inquire Button - scroll to contact section
    const inquireBtn = document.getElementById('inquireBtn');
    const contactSection = document.getElementById('contact');
    
    if (inquireBtn && contactSection) {
        inquireBtn.addEventListener('click', function() {
            const headerOffset = 70;
            const elementPosition = contactSection.getBoundingClientRect().top;
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

    // Order Now Button
    const orderNowBtn = document.getElementById('orderNowBtn');
    
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', function() {
            const wordCount = parseInt(wordCountInput.value) || 0;
            const serviceType = serviceTypeSelect.options[serviceTypeSelect.selectedIndex].text;
            const turnaround = turnaroundSelect.options[turnaroundSelect.selectedIndex].text;
            const totalPrice = totalPriceDisplay.textContent;
            
            if (wordCount === 0) {
                alert('Please enter the number of words for your document.');
                wordCountInput.focus();
                return;
            }
            
            // Create order summary
            const orderSummary = `Order Summary:
            
Word Count: ${wordCount} words
Service Type: ${serviceType}
Turnaround: ${turnaround}
Total Price: ${totalPrice}

Thank you for choosing ProofPerfect! We will contact you shortly to proceed with your order.`;
            
            alert(orderSummary);
            
            // In a real application, this would submit to a server
            console.log('Order details:', {
                wordCount,
                serviceType,
                turnaround,
                totalPrice
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
