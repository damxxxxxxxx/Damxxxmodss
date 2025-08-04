// Product Data
const products = [
    // Panel Data
    {
        id: 1,
        name: "Panel Data 1GB",
        category: "panel",
        description: "1GB data package for your needs",
        price: 0.50,
        options: [
            { name: "1GB", price: 0.50 }
        ]
    },
    {
        id: 2,
        name: "Panel Data 5GB",
        category: "panel",
        description: "5GB data package for your needs",
        price: 1.00,
        options: [
            { name: "5GB", price: 1.00 }
        ]
    },
    {
        id: 3,
        name: "Panel Data 10GB",
        category: "panel",
        description: "10GB data package for your needs",
        price: 2.00,
        options: [
            { name: "10GB", price: 2.00 }
        ]
    },
    {
        id: 4,
        name: "Panel Data UNLI",
        category: "panel",
        description: "Unlimited data package",
        price: 2.50,
        options: [
            { name: "UNLI", price: 2.50 }
        ]
    },
    {
        id: 5,
        name: "Reseller Panel",
        category: "panel",
        description: "Reseller panel access",
        price: 5.00,
        options: [
            { name: "Reseller", price: 5.00 }
        ]
    },
    {
        id: 6,
        name: "Admin Panel",
        category: "panel",
        description: "Admin panel access",
        price: 6.00,
        options: [
            { name: "Admin", price: 6.00 }
        ]
    },

    // Script Via Tele
    {
        id: 7,
        name: "MAHJONG Script",
        category: "script",
        description: "Premium MAHJONG script with different update options",
        price: 10.00,
        options: [
            { name: "No Update", price: 10.00 },
            { name: "Update 3x", price: 14.00 },
            { name: "Permanent Update", price: 20.00 }
        ]
    },
    {
        id: 8,
        name: "CIKIWIR Script",
        category: "script",
        description: "Premium CIKIWIR script with different update options",
        price: 7.00,
        options: [
            { name: "No Update", price: 7.00 },
            { name: "Full Update", price: 12.00 }
        ]
    },
    {
        id: 9,
        name: "DRAGON Script",
        category: "script",
        description: "Premium DRAGON script with different update options",
        price: 4.00,
        options: [
            { name: "No Update", price: 4.00 },
            { name: "Update 5x", price: 6.00 },
            { name: "Update 7x", price: 7.00 },
            { name: "Permanent Update", price: 10.00 },
            { name: "Reseller", price: 15.00 }
        ]
    },

    // Script Via WA
    {
        id: 10,
        name: "AMBA CRASH Script",
        category: "wa",
        description: "WhatsApp AMBA CRASH script options",
        price: 7.00,
        options: [
            { name: "ENC", price: 7.00 },
            { name: "NO ENC", price: 10.00 },
            { name: "Reseller", price: 15.00 }
        ]
    },
    {
        id: 11,
        name: "PSYCHO CRASH Script",
        category: "wa",
        description: "WhatsApp PSYCHO CRASH script options",
        price: 10.00,
        options: [
            { name: "NO ENC", price: 10.00 },
            { name: "Reseller", price: 15.00 }
        ]
    },
    {
        id: 12,
        name: "NEXSUS Script",
        category: "wa",
        description: "WhatsApp NEXSUS script options",
        price: 7.00,
        options: [
            { name: "NO UP", price: 7.00 },
            { name: "FULL UP", price: 10.00 }
        ]
    },

    // Murban 777
    {
        id: 13,
        name: "Murban 777 Package",
        category: "murban",
        description: "Murban 777 | INPOSIBLE'S - Permanent Access",
        price: 10.00,
        options: [
            { name: "Permanent Access", price: 10.00 }
        ],
        features: [
            "APK Cek Ban",
            "APK Force Close",
            "MT Fresh",
            "MT Gacor",
            "Kang Ban",
            "BAN Semua Orang Yang Lu Benci",
            "Full Tutorial (Ajar Sampai Faham)"
        ]
    }
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const categoryBtns = document.querySelectorAll('.category-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');
const modalProductDetails = document.querySelector('.modal-product-details');
const paymentModal = document.querySelector('.payment-modal');
const closePayment = document.querySelector('.close-payment');
const paymentOptions = document.querySelector('.payment-options');
const paymentInstructions = document.querySelector('.payment-instructions');
const paymentBtns = document.querySelectorAll('.payment-btn');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
function init() {
    renderProducts('all');
    updateCartCount();
    setupEventListeners();
}

// Render products based on category
function renderProducts(category) {
    productGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <i class="fas fa-box-open"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">From RM ${product.price.toFixed(2)}</p>
                <button class="view-btn" data-id="${product.id}">View Options</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            openProductModal(product);
        });
    });
}

// Open product modal with details
function openProductModal(product) {
    modalProductDetails.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        
        <div class="price-options">
            <h3>Select Option:</h3>
            ${product.options.map(option => `
                <div class="price-option" data-price="${option.price}">
                    <span>${option.name}</span>
                    <span>RM ${option.price.toFixed(2)}</span>
                </div>
            `).join('')}
        </div>
        
        ${product.features ? `
            <div class="product-features">
                <h3>Package Includes:</h3>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        
        <button class="btn add-to-cart-btn">Add to Cart</button>
    `;

    // Add event listeners to price options
    const priceOptions = modalProductDetails.querySelectorAll('.price-option');
    priceOptions.forEach(option => {
        option.addEventListener('click', () => {
            priceOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Add event listener to add to cart button
    const addToCartBtn = modalProductDetails.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const selectedOption = modalProductDetails.querySelector('.price-option.selected');
        if (!selectedOption) {
            alert('Please select an option');
            return;
        }

        const price = parseFloat(selectedOption.getAttribute('data-price'));
        const optionName = selectedOption.querySelector('span:first-child').textContent;
        
        addToCart({
            id: product.id,
            name: product.name,
            option: optionName,
            price: price,
            quantity: 1
        });

        modal.style.display = 'none';
    });

    modal.style.display = 'block';
}

// Add item to cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => 
        cartItem.id === item.id && cartItem.option === item.option
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }

    updateCartCount();
    saveCartToLocalStorage();
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Open cart sidebar
function openCartSidebar() {
    renderCartItems();
    cartSidebar.style.right = '0';
    document.body.style.overflow = 'hidden';
}

// Close cart sidebar
function closeCartSidebar() {
    cartSidebar.style.right = '-400px';
    document.body.style.overflow = 'auto';
}

// Render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.option}</p>
            </div>
            <div class="cart-item-price">
                RM ${(item.price * item.quantity).toFixed(2)}
                <span class="remove-item" data-index="${index}">&times;</span>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = total.toFixed(2);

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            saveCartToLocalStorage();
            updateCartCount();
            renderCartItems();
        });
    });
}

// Open payment modal
function openPaymentModal() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    paymentInstructions.innerHTML = '';
    paymentModal.style.display = 'block';
}

// Close payment modal
function closePaymentModal() {
    paymentModal.style.display = 'none';
}

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.getAttribute('data-category'));
        });
    });

    // Cart icon
    cartIcon.addEventListener('click', openCartSidebar);

    // Close cart
    closeCart.addEventListener('click', closeCartSidebar);

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', openPaymentModal);

    // Close payment modal
    closePayment.addEventListener('click', closePaymentModal);

    // Payment buttons
    paymentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const method = btn.getAttribute('data-method');
            showPaymentInstructions(method);
        });
    });
}

// Show payment instructions based on method
function showPaymentInstructions(method) {
    paymentInstructions.style.display = 'block';
    
    if (method === 'tng') {
        paymentInstructions.innerHTML = `
            <h4>Touch 'n Go Payment Instructions</h4>
            <p>Please send payment to:</p>
            <p><strong>TnG Number:</strong> 012-3456789</p>
            <p><strong>Amount:</strong> RM ${cartTotalAmount.textContent}</p>
            <p>After payment, please send receipt to admin via WhatsApp or Telegram for verification.</p>
        `;
    } else if (method === 'duitnow') {
        paymentInstructions.innerHTML = `
            <h4>DuitNow Payment Instructions</h4>
            <p>Please send payment to:</p>
            <p><strong>Bank:</strong> Maybank</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>Account Name:</strong> DAMX STORE</p>
            <p><strong>Amount:</strong> RM ${cartTotalAmount.textContent}</p>
            <p>After payment, please send receipt to admin via WhatsApp or Telegram for verification.</p>
        `;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
