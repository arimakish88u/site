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

    // Lightbox functionality
    let currentImages = [];
    let currentIndex = 0;

    document.querySelectorAll('.carousel-image img').forEach(img => {
        img.addEventListener('click', function() {
            const card = this.closest('.dog-card');
            currentImages = Array.from(card.querySelectorAll('.carousel-image img')).map(img => img.src);
            currentIndex = Array.from(card.querySelectorAll('.carousel-image img')).indexOf(this);
            openLightbox();
        });
    });

    function openLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        lightboxImage.src = currentImages[currentIndex];
        lightbox.style.display = 'flex';
    }

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
    };

    window.changeLightboxSlide = function(direction) {
        currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
        document.getElementById('lightbox-image').src = currentImages[currentIndex];
    };

    // Close lightbox when clicking outside the image
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
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