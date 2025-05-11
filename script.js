document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initAnnouncementBar();
    initProductGallery();
    initProductVariants();
    initQuantitySelector();
    initProductTabs();
    initCarousel();
    initModals();
    initImageZoom();
    
    // Save selected variants in localStorage
    loadSavedVariants();
});

/**
 * Initialize the announcement bar slider
 */
function initAnnouncementBar() {
    const slider = document.querySelector('.announcement-slider');
    const slides = document.querySelectorAll('.announcement-slide');
    
    if (!slider || slides.length <= 1) return;
    
    let currentSlide = 0;
    
    // Function to show the next slide
    function showNextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Auto-rotate slides every 5 seconds
    setInterval(showNextSlide, 5000);
}

/**
 * Initialize the product gallery with thumbnails
 */
function initProductGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.thumbnail-scroll-btn.prev');
    const nextBtn = document.querySelector('.thumbnail-scroll-btn.next');
    const thumbnailsWrapper = document.querySelector('.thumbnails');
    
    if (!mainImage || !thumbnails.length) return;
    
    // Handle thumbnail click
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            const imageSrc = this.getAttribute('data-image');
            mainImage.src = imageSrc;
            
            // Update zoom modal image source
            const zoomImage = document.getElementById('zoom-image');
            if (zoomImage) {
                zoomImage.src = imageSrc;
            }
        });
    });
    
    // Handle thumbnail navigation
    if (prevBtn && nextBtn && thumbnailsWrapper) {
        let scrollPosition = 0;
        const scrollAmount = 100; // Adjust as needed
        
        prevBtn.addEventListener('click', function() {
            scrollPosition = Math.max(scrollPosition - scrollAmount, 0);
            thumbnailsWrapper.style.transform = `translateX(-${scrollPosition}px)`;
        });
        
        nextBtn.addEventListener('click', function() {
            const maxScroll = thumbnailsWrapper.scrollWidth - thumbnailsWrapper.clientWidth;
            scrollPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
            thumbnailsWrapper.style.transform = `translateX(-${scrollPosition}px)`;
        });
    }
    
    // Open zoom modal on main image click
    mainImage.addEventListener('click', function() {
        const zoomModal = document.getElementById('zoom-modal');
        const zoomImage = document.getElementById('zoom-image');
        
        if (zoomModal && zoomImage) {
            zoomImage.src = mainImage.src;
            zoomModal.classList.add('active');
        }
    });
}

/**
 * Initialize product variants (color and size selection)
 */
function initProductVariants() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const colorLabel = document.querySelector('.variant-group label .selected-variant');
    const sizeLabel = document.querySelector('.variant-group label:nth-of-type(2) .selected-variant');
    
    // Handle color selection
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Update active state
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Update selected color text
            if (colorLabel) {
                colorLabel.textContent = this.getAttribute('data-color');
            }
            
            // Save to localStorage
            localStorage.setItem('selectedColor', this.getAttribute('data-color'));
        });
    });
    
    // Handle size selection
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update selected size text
            if (sizeLabel) {
                sizeLabel.textContent = this.getAttribute('data-size');
            }
            
            // Save to localStorage
            localStorage.setItem('selectedSize', this.getAttribute('data-size'));
        });
    });
}
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function () {
        // Remove the 'active' class from all swatches
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));

        // Add the 'active' class to the clicked swatch
        this.classList.add('active');

        // Get the color data attribute
        const color = this.getAttribute('data-color');

        // Map colors to their respective image sets
        const colorImageMap = {
            Beige: [
                "https://street9.com/cdn/shop/products/SWT00005165_1_900x.jpg?v=1746623630",
                "https://street9.com/cdn/shop/products/SWT00005165_2_900x.jpg?v=1746623630",
                "https://street9.com/cdn/shop/products/SWT00005165_3_180x.jpg?v=1746623630",
                "https://street9.com/cdn/shop/products/SWT00005165_5_900x.jpg?v=1746623630",
                "https://street9.com/cdn/shop/products/SWT00005165_6_900x.jpg?v=1746623630"
            ],
            Mustard: [
                "https://street9.com/cdn/shop/products/SWT00005155_1_900x.jpg?v=1746623633",
                "https://street9.com/cdn/shop/products/SWT00005155_2_900x.jpg?v=1746623633",
                "https://street9.com/cdn/shop/products/SWT00005155_3_900x.jpg?v=1746623633",
                "https://street9.com/cdn/shop/products/SWT00005155_4_900x.jpg?v=1746623633",
                "https://street9.com/cdn/shop/products/SWT00005155_5_900x.jpg?v=1746623633"
            ],
            Green: [
                "https://street9.com/cdn/shop/products/SWT00005154_1_900x.jpg?v=1746623634",
                "https://street9.com/cdn/shop/products/SWT00005154_2_900x.jpg?v=1746623634",
                "https://street9.com/cdn/shop/products/SWT00005154_3_900x.jpg?v=1746623634",
                "https://street9.com/cdn/shop/products/SWT00005154_4_900x.jpg?v=1746623634",
                "https://street9.com/cdn/shop/products/SWT00005154_6_900x.jpg?v=1746623634"
            ],
            Blue: [
                "https://street9.com/cdn/shop/products/SWT00007246_1_900x.jpg?v=1746621777",
                "https://street9.com/cdn/shop/products/SWT00007246_2_900x.jpg?v=1746621777",
                "https://street9.com/cdn/shop/products/SWT00007246_3_900x.jpg?v=1746621778",
                "https://street9.com/cdn/shop/products/SWT00007246_5_900x.jpg?v=1746621778",
                "https://street9.com/cdn/shop/products/SWT00007246_4_900x.jpg?v=1746621778"
            ],
            Skin: [
                "https://street9.com/cdn/shop/products/SWT00005166_1_900x.jpg?v=1746623629",
                "https://street9.com/cdn/shop/products/SWT00005166_2_900x.jpg?v=1746623629",
                "https://street9.com/cdn/shop/products/SWT00005166_3_900x.jpg?v=1746623629",
                "https://street9.com/cdn/shop/products/SWT00005166_4_900x.jpg?v=1746623629",
                "https://street9.com/cdn/shop/products/SWT00005166_5_900x.jpg?v=1746623629"
            ],
            
        };

        // Update the main image
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = colorImageMap[color][0];
        mainImage.alt = `Premium Ribbed Sweater in ${color}`;

        // Update the thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            if (colorImageMap[color][index]) {
                const img = thumbnail.querySelector('img');
                thumbnail.setAttribute('data-image', colorImageMap[color][index]);
                img.src = colorImageMap[color][index];
                img.alt = `Premium Ribbed Sweater in ${color} - View ${index + 1}`;
            }
        });
    });
});
/**
 * Load saved variants from localStorage
 */
function loadSavedVariants() {
    const savedColor = localStorage.getItem('selectedColor');
    const savedSize = localStorage.getItem('selectedSize');
    
    // Apply saved color
    if (savedColor) {
        const colorSwatch = document.querySelector(`.color-swatch[data-color="${savedColor}"]`);
        if (colorSwatch) {
            colorSwatch.click();
        }
    }
    
    // Apply saved size
    if (savedSize) {
        const sizeButton = document.querySelector(`.size-btn[data-size="${savedSize}"]`);
        if (sizeButton) {
            sizeButton.click();
        }
    }
}

/**
 * Initialize quantity selector
 */
function initQuantitySelector() {
    const decreaseBtn = document.querySelector('.quantity-btn.decrease');
    const increaseBtn = document.querySelector('.quantity-btn.increase');
    const quantityInput = document.getElementById('quantity');
    
    if (!decreaseBtn || !increaseBtn || !quantityInput) return;
    
    decreaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        const maxValue = parseInt(quantityInput.getAttribute('max') || 10);
        if (currentValue < maxValue) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Ensure quantity is always valid
    quantityInput.addEventListener('change', function() {
        const minValue = parseInt(quantityInput.getAttribute('min') || 1);
        const maxValue = parseInt(quantityInput.getAttribute('max') || 10);
        let value = parseInt(quantityInput.value);
        
        if (isNaN(value) || value < minValue) {
            value = minValue;
        } else if (value > maxValue) {
            value = maxValue;
        }
        
        quantityInput.value = value;
    });
}

/**
 * Initialize product tabs
 */
function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (!tabButtons.length || !tabPanels.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab panel
            const tabId = this.getAttribute('data-tab');
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === tabId) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialize carousels
 */
function initCarousel() {
    const carousels = document.querySelectorAll('.carousel-wrapper');
    
    carousels.forEach(carousel => {
        const items = carousel.querySelector('.carousel-items');
        const prevBtn = carousel.parentElement.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.parentElement.querySelector('.carousel-btn.next');
        
        if (!items || !prevBtn || !nextBtn) return;
        
        let position = 0;
        const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
        const itemsCount = carousel.querySelectorAll('.carousel-item').length;
        const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
        const maxPosition = Math.max(0, itemsCount - visibleItems);
        
        // Update carousel position
        function updatePosition() {
            items.style.transform = `translateX(-${position * itemWidth}px)`;
            
            // Update button states
            prevBtn.disabled = position <= 0;
            nextBtn.disabled = position >= maxPosition;
            
            // Add visual indication for disabled buttons
            if (prevBtn.disabled) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }
            
            if (nextBtn.disabled) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }
        
        // Initialize button states
        updatePosition();
        
        // Handle navigation
        prevBtn.addEventListener('click', function() {
            if (position > 0) {
                position--;
                updatePosition();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (position < maxPosition) {
                position++;
                updatePosition();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // Recalculate visible items
            const newVisibleItems = Math.floor(carousel.offsetWidth / itemWidth);
            const newMaxPosition = Math.max(0, itemsCount - newVisibleItems);
            
            // Adjust position if needed
            if (position > newMaxPosition) {
                position = newMaxPosition;
            }
            
            updatePosition();
        });
    });
}

/**
 * Initialize modals
 */
function initModals() {
    // Size Chart Modal
    const sizeChartBtn = document.getElementById('size-chart-btn');
    const sizeChartModal = document.getElementById('size-chart-modal');
    
    if (sizeChartBtn && sizeChartModal) {
        sizeChartBtn.addEventListener('click', function() {
            sizeChartModal.classList.add('active');
        });
    }
    
    // Compare Colors Modal
    const compareColorsBtn = document.getElementById('compare-colors-btn');
    const compareColorsModal = document.getElementById('compare-colors-modal');
    
    if (compareColorsBtn && compareColorsModal) {
        compareColorsBtn.addEventListener('click', function() {
            compareColorsModal.classList.add('active');
        });
        
        // Handle color comparison checkboxes
        const colorCheckboxes = compareColorsModal.querySelectorAll('.color-option input');
        const comparisonItems = compareColorsModal.querySelectorAll('.comparison-item');
        
        colorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const color = this.value;
                const comparisonItem = compareColorsModal.querySelector(`.comparison-item[data-color="${color}"]`);
                
                if (comparisonItem) {
                    if (this.checked) {
                        comparisonItem.style.display = 'block';
                    } else {
                        comparisonItem.style.display = 'none';
                    }
                }
                
                // Limit to 3 selections
                const checkedCount = [...colorCheckboxes].filter(cb => cb.checked).length;
                if (checkedCount >= 3) {
                    colorCheckboxes.forEach(cb => {
                        if (!cb.checked) {
                            cb.disabled = true;
                        }
                    });
                } else {
                    colorCheckboxes.forEach(cb => {
                        cb.disabled = false;
                    });
                }
            });
        });
    }
    
    // Close modals
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    // Close on overlay click
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.parentElement;
            modal.classList.remove('active');
        });
    });
    
    // Close on close button click
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
        });
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

/**
 * Initialize image zoom functionality
 */
function initImageZoom() {
    const mainImageContainer = document.querySelector('.main-image-container');
    const mainImage = document.getElementById('main-product-image');
    const zoomLens = document.querySelector('.image-zoom-lens');
    
    if (!mainImageContainer || !mainImage || !zoomLens) return;
    
    let isZooming = false;
    
    // Create zoom effect
    mainImageContainer.addEventListener('mouseenter', function(e) {
        if (window.innerWidth < 768) return; // Disable on mobile
        
        isZooming = true;
        zoomLens.style.display = 'block';
        updateZoomPosition(e);
    });
    
    mainImageContainer.addEventListener('mousemove', function(e) {
        if (!isZooming) return;
        updateZoomPosition(e);
    });
    
    mainImageContainer.addEventListener('mouseleave', function() {
        isZooming = false;
        zoomLens.style.display = 'none';
        mainImage.style.transform = 'scale(1)';
    });
    
    function updateZoomPosition(e) {
        // Get cursor position relative to the image container
        const rect = mainImageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate position as percentage
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // Move lens to cursor position
        zoomLens.style.left = `${x - zoomLens.offsetWidth / 2}px`;
        zoomLens.style.top = `${y - zoomLens.offsetHeight / 2}px`;
        
        // Move background image in opposite direction for zoom effect
        mainImage.style.transform = 'scale(1.5)';
        mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    }
}

/**
 * Add to cart functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const bundleAddBtn = document.querySelector('.bundle-add-btn');
    const quickAddBtns = document.querySelectorAll('.quick-add-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const color = document.querySelector('.color-swatch.active')?.getAttribute('data-color') || 'Default';
            const size = document.querySelector('.size-btn.active')?.getAttribute('data-size') || 'M';
            const quantity = document.getElementById('quantity')?.value || 1;
            
            addToCart({
                name: 'Premium Ribbed Sweater',
                color: color,
                size: size,
                quantity: parseInt(quantity),
                price: 4995
            });
        });
    }
    
    if (bundleAddBtn) {
        bundleAddBtn.addEventListener('click', function() {
            // Add main product
            const color = document.querySelector('.color-swatch.active')?.getAttribute('data-color') || 'Default';
            const size = document.querySelector('.size-btn.active')?.getAttribute('data-size') || 'M';
            
            addToCart({
                name: 'Premium Ribbed Sweater',
                color: color,
                size: size,
                quantity: 1,
                price: 4995
            });
            
            // Add bundle products
            addToCart({
                name: 'Wool Blend Scarf',
                color: 'Default',
                size: 'One Size',
                quantity: 1,
                price: 1995
            });
            
            addToCart({
                name: 'Chunky Knit Beanie',
                color: 'Default',
                size: 'One Size',
                quantity: 1,
                price: 1295
            });
        });
    }
    
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseInt(productCard.querySelector('.product-card-price').textContent.replace(/[^0-9]/g, ''));
            
            addToCart({
                name: productName,
                color: 'Default',
                size: 'One Size',
                quantity: 1,
                price: productPrice
            });
        });
    });
    
    function addToCart(product) {
        // In a real implementation, this would send data to a cart API
        // For this demo, we'll just show a confirmation message
        
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="cart-notification-content">
                <div class="cart-notification-icon">✓</div>
                <div class="cart-notification-text">
                    <p><strong>${product.name}</strong> added to cart</p>
                    <p>${product.color} | ${product.size} | Qty: ${product.quantity}</p>
                </div>
            </div>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'white',
            boxShadow: 'var(--shadow-md)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            zIndex: '1000',
            maxWidth: '300px',
            animation: 'slideUp 0.3s ease forwards'
        });
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        console.log('Added to cart:', product);
    }
});

// Add keyframe animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .cart-notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .cart-notification-icon {
        width: 24px;
        height: 24px;
        background-color: #38a169;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
    }
    
    .cart-notification-text p {
        margin: 0;
        font-size: 0.875rem;
    }
    
    .cart-notification-text p:last-child {
        color: var(--color-secondary);
        font-size: 0.75rem;
    }
`;
document.head.appendChild(style);