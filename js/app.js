// JavaScript functionality for InfinityArtWorld website

let cart = [];
let cartCount = 0;

function addProductToCart() {
    const productQuantity = parseInt(document.getElementById('product-quantity').innerText);
    const productName = document.getElementById('product-name').innerText;
    const productPrice = parseFloat(document.getElementById('product-price').innerText.replace('₹', ''));

    const product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity
    };

    cart.push(product);
    cartCount += productQuantity;
    updateCartCount();
    alert(`${productQuantity} ${productName}(s) added to cart!`);
}

function changeProductQuantity(amount) {
    const quantityElement = document.getElementById('product-quantity');
    let currentQuantity = parseInt(quantityElement.innerText);
    currentQuantity += amount;

    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    quantityElement.innerText = currentQuantity;
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cartCount;
}