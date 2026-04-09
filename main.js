// Initialize Cart
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let total = 0;
let itemCount = 0;
updateCartCount();
renderCartItems();

// Add to Cart
function addToCart(productCard) {
    const name = productCard.querySelector(".product-name").textContent;
    const priceText = productCard.querySelector(".product-price").textContent;
    const price = parseFloat(priceText.replace("$", ""));
    const imgSrc = productCard.querySelector(".product-image").src;

    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price, quantity: 1, image: imgSrc });
    }

    updateLocalStorage();
    updateCartDisplay();
    updateCartCount();
    renderCartItems();
    animateAddToCart(productCard);
}

// Remove Item
function removeItem(name) {
    cartItems = cartItems.filter(item => item.name !== name);
    updateLocalStorage();
    updateCartDisplay();
    updateCartCount();
    renderCartItems();
}

// Animation on Add to Cart
function animateAddToCart(element) {
    const cartIcon = document.getElementById("cart-icon");
    const cartRect = cartIcon.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    const flyingItem = document.createElement("div");
    flyingItem.className = "flying-item";
    flyingItem.style.cssText = `
        position: fixed;
        z-index: 1000;
        width: 150px;
        height: 150px;
        background-image: url(${element.querySelector('.product-image').src});
        background-size: cover;
        border-radius: 50%;
        left: ${rect.left}px;
        top: ${rect.top}px;
        transition: all 0.8s ease-in-out;
        pointer-events: none;
    `;
    document.body.appendChild(flyingItem);

    // Trigger animation
    setTimeout(() => {
        flyingItem.style.transform = "scale(0.5)";
        flyingItem.style.left = `${cartRect.left + cartRect.width / 2 - 75}px`;
        flyingItem.style.top = `${cartRect.top + cartRect.height / 2 - 75}px`;
        flyingItem.style.opacity = "0";
    }, 50);

    // Remove after animation
    setTimeout(() => {
        flyingItem.remove();
    }, 1000);
}

// Update Cart Display
function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    const totalElement = document.getElementById("total-price");
    const countElement = document.getElementById("cart-count");

    cartList.innerHTML = '';
    total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeItem('${item.name}')">X</button>
        `;
        cartList.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2);
    countElement.textContent = itemCount;
}

// Local Storage Update
function updateLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Cart Count Update
function updateCartCount() {
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalCount;
}

// Change Quantity
function changeQuantity(name, delta) {
    const item = cartItems.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeItem(name);
        } else {
            updateLocalStorage();
            updateCartDisplay();
            updateCartCount();
        }
    }
}

// Render Cart Items on Load
function renderCartItems() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";

    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="cart-item">
                <img src="${item.image}" class="cart-img" alt="${item.name}" />
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price} × ${item.quantity}</p>
                </div>
            </div>
        `;
        cartList.appendChild(li);
    });

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Load Cart on Page Refresh
window.onload = function () {
    updateCartDisplay();
    updateCartCount();
};

// Toggle Cart Modal
let cartIcon = document.querySelector(".cart-icon");
let cartModel = document.querySelector(".cart-model");
let cartClose = document.querySelector(".close-btn");

cartIcon.onclick = () => {
    cartModel.classList.add("open-cart");
};

cartClose.onclick = () => {
    cartModel.classList.remove("open-cart");
};
