const PRODUCTS_URL = 'data/products.json';
let cart = JSON.parse(localStorage.getItem('infinityCart') || '[]');

function updateCartCount() {
  const count = cart.reduce((total, product) => total + product.quantity, 0);
  document.querySelectorAll('#cart-count').forEach((element) => { element.textContent = count; });
}

function saveCart() {
  localStorage.setItem('infinityCart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = window.infinityProducts.find((item) => item.id === productId);
  if (!product) return;
  const existing = cart.find((item) => item.id === productId);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart();
  const button = document.querySelector(`[data-add-product="${productId}"]`);
  if (button) { button.textContent = 'Added'; setTimeout(() => { button.textContent = 'Add to cart'; }, 1200); }
}

function productCard(product) {
  return `<article class="product-card">
    <a class="product-image" href="product.html?id=${product.id}">
      <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
      <span class="product-category">${product.category}</span>
    </a>
    <div class="product-card-body">
      <div class="product-card-meta"><span>0${product.id}</span><span>Handmade</span></div>
      <h2><a href="product.html?id=${product.id}">${product.name}</a></h2>
      <p>${product.description}</p>
      <div class="product-card-footer"><strong>Rs. ${product.price.toLocaleString('en-IN')}</strong><button type="button" data-add-product="${product.id}" onclick="addToCart(${product.id})">Add to cart</button></div>
    </div>
  </article>`;
}

async function loadProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;
  container.innerHTML = '<p class="loading-products">Loading the collection...</p>';
  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) throw new Error('Products could not be loaded');
    const products = await response.json();
    window.infinityProducts = products;
    const requestedCategory = new URLSearchParams(window.location.search).get('category');
    const filtered = requestedCategory ? products.filter((product) => product.category.toLowerCase().includes(requestedCategory.toLowerCase().replace('paintings', 'art'))) : products;
    container.innerHTML = filtered.length ? filtered.map(productCard).join('') : products.map(productCard).join('');
  } catch (error) {
    container.innerHTML = '<p class="loading-products">The collection is taking a moment to arrive. Please refresh and try again.</p>';
    console.error(error);
  }
}

function addProductToCart() {
  const productId = Number(new URLSearchParams(window.location.search).get('id'));
  addToCart(productId);
}

function changeProductQuantity(amount) {
  const quantityElement = document.getElementById('product-quantity');
  if (!quantityElement) return;
  quantityElement.innerText = Math.max(1, Number(quantityElement.innerText) + amount);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadProducts();
});
