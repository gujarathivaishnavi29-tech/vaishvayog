document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.textContent = navLinks.classList.contains('active') ? '\u2715' : '\u2630';
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.textContent = '\u2630';
            });
        });
    }

    // 2. Form Validation Logic
    const form = document.getElementById('yogaRegistrationForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear prior errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            const successDiv = document.getElementById('formSuccess');
            successDiv.textContent = '';
            successDiv.style.display = 'none';

            let isValid = true;

            // Full Name Validation
            const nameInput = document.getElementById('fullName');
            if (!nameInput.value.trim()) {
                document.getElementById('nameError').textContent = 'Please enter your full name.';
                isValid = false;
            }

            // Email Validation
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Phone Number Validation (Strict 10-digit rule)
            const phoneInput = document.getElementById('phoneNumber');
            const phoneRegex = /^\d{10}$/; 
            if (!phoneRegex.test(phoneInput.value.trim())) {
                document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number.';
                isValid = false;
            }

            // Batch Selection Validation
            const batchSelect = document.getElementById('preferredBatch');
            if (!batchSelect.value) {
                document.getElementById('batchError').textContent = 'Please select your preferred morning batch.';
                isValid = false;
            }

            // If everything is valid
            if (isValid) {
                successDiv.textContent = '\u2728 Namaste! Your registration request has been submitted successfully. We will reach out to you soon!';
                successDiv.style.display = 'block';
                form.reset();
            }
        });
    }

    // 3. Image Slider Logic
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const dotsContainer = slider.querySelector('.slider-dots');
        let currentIndex = 0;
        let autoPlayTimer;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            dotsContainer.children[currentIndex].classList.remove('active');
            currentIndex = index;
            slides[currentIndex].classList.add('active');
            dotsContainer.children[currentIndex].classList.add('active');
        }

        function nextSlide() {
            const next = (currentIndex + 1) % slides.length;
            goToSlide(next);
        }

        function prevSlide() {
            const prev = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(prev);
        }

        // Button events
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Auto-play every 4 seconds
        function startAutoPlay() {
            autoPlayTimer = setInterval(nextSlide, 4000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }

        startAutoPlay();

        // Pause auto-play on hover
        slider.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        slider.addEventListener('mouseleave', () => startAutoPlay());
    });

    // 4. Lightbox for slider images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) {
        // Click on any slide image to open lightbox
        document.querySelectorAll('.slide img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                lightboxImg.src = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                lightboxImg.src = '';
            }
        });
    }
});
