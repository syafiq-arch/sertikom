const navBar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const position = window.scrollY > 0;
    navBar.classList.toggle("scrolling-active", position);
});

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all required fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual fetch/axios)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                alert('Thank you! Your message has been sent successfully.');
                
                // Redirect to home page
                window.location.href = '#home';
                
                // Smooth scroll to home
                document.querySelector('#home').scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error:not(.hidden)');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });
    
    // Validation functions
    function validateField(field) {
        const value = field.value.trim();
        const errorId = field.id + 'Error';
        const errorElement = document.getElementById(errorId);
        
        // Check if field is required
        const isRequired = field.hasAttribute('required') || 
                          field.parentElement.querySelector('.required');
        
        if (!isRequired) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        switch(field.type) {
            case 'text':
            case 'textarea':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'This field is required';
                } else if (field.id === 'firstName' && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                }
                break;
                
            case 'email':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'tel':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Phone number is required';
                } else if (!isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
                
            case 'select-one':
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Please select a service';
                }
                break;
        }
        
        // Update UI
        if (errorElement) {
            if (!isValid) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
                field.classList.add('error-input');
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                field.classList.remove('error-input');
            }
        }
        
        return isValid;
    }
    
    function clearError(field) {
        const errorId = field.id + 'Error';
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            field.classList.remove('error-input');
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Basic phone validation (accepts +, numbers, spaces, dashes)
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
});



        //mobile  menu
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
        
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            //hamburger
            const bars = document.querySelectorAll('.bar');
            bars[0].classList.toggle('active');
            bars[1].classList.toggle('active');
            bars[2].classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                
                // Remove active class from all links
                navLinks.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Reset hamburger icon
                const bars = document.querySelectorAll('.bar');
                bars[0].classList.remove('active');
                bars[1].classList.remove('active');
                bars[2].classList.remove('active');
            });
        });
        
        // Update current viewport indicator
        function updateViewportIndicator() {
            const indicator = document.querySelector('.current-view');
            let viewport = "Desktop";
            
            if (window.innerWidth <= 576) {
                viewport = "Mobile";
            } else if (window.innerWidth <= 992) {
                viewport = "Tablet";
            }
            
            indicator.textContent = `Current Viewport: ${viewport}`;
        }
        
        // Update on load and resize
        window.addEventListener('load', updateViewportIndicator);
        window.addEventListener('resize', updateViewportIndicator);
        
        // Add animation for hamburger to X
        const style = document.createElement('style');
        style.textContent = `
            .bar.active:nth-child(1) {
                transform: rotate(-45deg) translate(-6px, 6px);
            }
            
            .bar.active:nth-child(2) {
                opacity: 0;
            }
            
            .bar.active:nth-child(3) {
                transform: rotate(45deg) translate(-6px, -6px);
            }
        `;
        document.head.appendChild(style);
