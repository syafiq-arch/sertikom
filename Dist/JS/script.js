const navBar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const position = window.scrollY > 0;
    navBar.classList.toggle("scrolling-active", position);
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const message = document.getElementById('message');

    // Error message 
    const firstNameError = document.getElementById('firstNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    

    const serviceError = document.createElement('span');
    serviceError.className = 'error-message';
    serviceError.id = 'serviceError';
    service.parentNode.appendChild(serviceError);
    
    const messageError = document.getElementById('messageError');

   
    function validateName() {
        if (firstName.value.trim() === '') {
            showError(firstName, firstNameError, 'Full Name is required');
            return false;
        } else {
            hideError(firstName, firstNameError);
            return true;
        }
    }

    function validateEmail() {
        const emailValue = email.value.trim();
        if (emailValue === '') {
            showError(email, emailError, 'Email Address is required');
            return false;
        } else if (!emailValue.includes('@')) {
            showError(email, emailError, '@ is required in email address');
            return false;
        } else if (!emailValue.includes('.')) {
            showError(email, emailError, 'Email must contain a dot (.)');
            return false;
        } else if (!isValidEmail(emailValue)) {
            showError(email, emailError, 'Please enter a valid email address');
            return false;
        } else {
            hideError(email, emailError);
            return true;
        }
    }

    function validatePhone() {
        if (phone.value.trim() === '') {
            showError(phone, phoneError, 'Phone Number is required');
            return false;
        } else {
            hideError(phone, phoneError);
            return true;
        }
    }

    function validateService() {
        if (service.value === '') {
            showError(service, serviceError, 'Please select a service');
            return false;
        } else {
            hideError(service, serviceError);
            return true;
        }
    }

    function validateMessage() {
        if (message.value.trim() === '') {
            showError(message, messageError, 'Message is required');
            return false;
        } else {
            hideError(message, messageError);
            return true;
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, errorElement, errorMessage) {
        input.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }

    function hideError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }


    firstName.addEventListener('blur', validateName);
    email.addEventListener('blur', validateEmail);
    phone.addEventListener('blur', validatePhone);
    service.addEventListener('change', validateService);
    message.addEventListener('blur', validateMessage);

  
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isServiceValid = validateService();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isPhoneValid && isServiceValid && isMessageValid) {
            alert('Form submitted successfully! We will contact you soon.');
            form.reset();
        } else {
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});


        // Toggle mobile menu
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
        
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger to X
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
