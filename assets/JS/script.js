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

    // Select all product containers
    const productContainers = document.querySelectorAll('.product-container');

    productContainers.forEach(container => {
        const links = container.querySelectorAll('.product-links ul li a');
        
        if (links.length > 0) {
            links[0].classList.add('active');
        }
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active from all links in THIS container only
                links.forEach(l => l.classList.remove('active'));
                
                // Add active to clicked link
                this.classList.add('active');
            });
        });
    });

    // Select ALL sliders
// Select ALL sliders
const sliders = document.querySelectorAll('.product-slider');

// Function to initialize a slider
function initializeSlider(slider) {
    let autoSlide;
    let currentIndex = 0;
    let gap = 20;
    let visibleCards = 4; // Default for desktop
    let cardWidth = 0;
    let totalOriginalCards = 0;
    let isTransitioning = false;
    
    // Get visible cards count based on screen width
    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) {
            return 2; // Mobile: 2 cards
        }
        return 4; // Desktop: 4 cards
    }
    
    // Setup slider styles
    slider.style.display = 'flex';
    slider.style.overflow = 'hidden';
    slider.style.scrollBehavior = 'smooth';
    slider.style.position = 'relative';
    
    // Get all cards
    const cards = Array.from(slider.children);
    totalOriginalCards = cards.length;
    
    // Clone cards for infinite scroll
    for (let i = 0; i < 10; i++) { // Clone enough for infinite feel
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            // Remove any existing event listeners from clones
            clone.removeEventListener('click', () => {});
            slider.appendChild(clone);
        });
    }
    
    // Update card widths based on visible count
    function updateCardWidths() {
        const sliderWidth = slider.parentElement.offsetWidth;
        visibleCards = getVisibleCardsCount();
        cardWidth = (sliderWidth - (gap * (visibleCards - 1))) / visibleCards;
        
        const allCards = slider.querySelectorAll('.card-slide');
        allCards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.marginRight = `${gap}px`;
            card.style.cursor = 'pointer';
        });
        
        // Reset position
        slider.scrollTo({ left: 0, behavior: 'auto' });
        currentIndex = 0;
    }
    
    // Slide to specific card
    function slideToCard(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const scrollAmount = index * (cardWidth + gap);
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Reset for infinite loop when reaching cloned cards
        setTimeout(() => {
            if (index >= totalOriginalCards * 5) {
                slider.scrollTo({ left: 0, behavior: 'auto' });
                currentIndex = 0;
            }
            isTransitioning = false;
        }, 500);
    }
    
    // Next slide function
    function nextSlide() {
        if (isTransitioning) return;
        currentIndex++;
        slideToCard(currentIndex);
    }
    
    // Previous slide function (optional)
    function prevSlide() {
        if (isTransitioning) return;
        if (currentIndex > 0) {
            currentIndex--;
            slideToCard(currentIndex);
        }
    }
    
    // Auto slide function
    function startAutoSlide() {
        if (autoSlide) clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            nextSlide();
        }, 3000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlide);
    }
    
    // IMPORTANT: Only stop auto-slide on hover, NOT on card click
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    slider.addEventListener('touchstart', stopAutoSlide);
    slider.addEventListener('touchend', startAutoSlide);
    
    // Cards should NOT stop auto-slide when clicked
    // Instead, add click handlers to individual cards
    const allCards = slider.querySelectorAll('.card-slide');
    allCards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            // Do NOT stop auto-slide here
            console.log('Card clicked:', idx);
            // Add your card click logic here
        });
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCardWidths();
            currentIndex = 0;
            slider.scrollTo({ left: 0, behavior: 'auto' });
        }, 250);
    });
    
    // Initialize
    updateCardWidths();
    startAutoSlide();
}

// Initialize all sliders
sliders.forEach((slider, index) => {
    console.log(`Initializing slider ${index + 1}`);
    initializeSlider(slider);
});

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

