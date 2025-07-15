document.addEventListener('DOMContentLoaded', function() {
            // Smooth reveal on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all dog cards
            document.querySelectorAll('.dog-card').forEach(card => {
                observer.observe(card);
            });

            // Header background effect on scroll
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                }
            });

            // Add click effects to contact items
            document.querySelectorAll('.contact-item').forEach(item => {
                item.addEventListener('click', function() {
                    this.style.transform = 'translateY(-5px) scale(1.05)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-5px) scale(1)';
                    }, 150);
                });
            });
        });

        // Carousel functionality
        function changeSlide(button, direction) {
            const card = button.closest('.dog-card');
            const carousel = card.querySelector('.carousel-images');
            const dots = card.querySelectorAll('.carousel-dot');
            
            let currentSlide = 0;
            dots.forEach((dot, index) => {
                if (dot.classList.contains('active')) {
                    currentSlide = index;
                }
            });
            
            const newSlide = (currentSlide + direction + 3) % 3;
            
            carousel.style.transform = `translateX(-${newSlide * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === newSlide);
            });
        }

        function currentSlide(dot, slideIndex) {
            const card = dot.closest('.dog-card');
            const carousel = card.querySelector('.carousel-images');
            const dots = card.querySelectorAll('.carousel-dot');
            
            carousel.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
            
            dots.forEach((d, index) => {
                d.classList.toggle('active', index === slideIndex - 1);
            });
        }