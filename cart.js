document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
  
    // Only proceed if elements exist
    if (!cartItemsElement || !cartTotalElement) return;
  
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function renderCart() {
      cartItemsElement.innerHTML = '';
  
      if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.innerHTML = '';
        return;
      }
  
      cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <p>${item.title} - Ksh ${item.price.toFixed(2)}</p>
          <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsElement.appendChild(itemElement);
      });
  
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      cartTotalElement.innerHTML = `<h2>Total: Ksh ${total.toFixed(2)}</h2>`;
    }
  
    window.removeItem = function(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
  
    renderCart();
  });
  