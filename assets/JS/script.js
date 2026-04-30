document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburgerMenu");
    const overlay = document.getElementById("myNav");

    let isOpen = false;

    hamburger.addEventListener("click", function() {
        if (isOpen) {
            overlay.style.width = "0%";
            isOpen = false;
        } else {
            overlay.style.width = "50%";
            isOpen = true;
        }
    });

    const allLinks = document.querySelectorAll('.product-links ul li a');
    
    if (allLinks.length > 0) {
        allLinks[0].classList.add('active');
    }
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all
            allLinks.forEach(l => l.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
        });
    });

    const slider = document.getElementById('productSlider');
    let autoSlide;
    
    // Clone all cards many times for infinite scrolling
    const cards = Array.from(slider.children);
    for (let i = 0; i < 5; i++) { // Clone 5 times - massive infinite length
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            slider.appendChild(clone);
        });
    }
    
    // Auto slide every 3 seconds - PURE SCROLL, NO RESET
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
        }, 3000);
    }
    
    // Optional: Stop autoplay when manually scrolling
    slider.addEventListener('mousedown', () => {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseup', () => {
        startAutoSlide();
    });
    
    slider.addEventListener('touchstart', () => {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('touchend', () => {
        startAutoSlide();
    });
    
    startAutoSlide();

        // Hide all spans inside product-icons
        // Hide all spans inside product-icons
    const icons = document.querySelectorAll('.product-icons div');
    
    icons.forEach(icon => {
        const tooltip = icon.querySelector('span');
        const iconElement = icon.querySelector('i');
        
        icon.addEventListener('mouseenter', () => {
            tooltip.classList.add('show');
            iconElement.classList.add('active');
        });
        
        icon.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
            iconElement.classList.remove('active');
        });
    });


    const wishlistButtons = document.querySelectorAll('.wishlist-icon');
    const wishlistCounter = document.querySelector('.wishlist-holder');

    let counter = 1;  // Simple as that!

    wishlistButtons.forEach((button) => {
        button.addEventListener('click', () => {
            counter++;
            wishlistCounter.innerHTML = counter;
        });
    });
            
});

