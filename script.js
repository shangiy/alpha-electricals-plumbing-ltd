// Header Resize on Scroll
const header = document.getElementById('main-header'); 
const logoImg = document.getElementById('logo-img');
console.log('Script loaded!');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.height = '60px';
    logoImg.style.height = '45px';
  } else {
    header.style.height = '100px';
    logoImg.style.height = '90px';
  }
});

// Carousel Logic
const track = document.querySelector('.carousel-track');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let scrollSpeed = 1; // pixels per frame
let position = 0;

// Clone items to make it endless
items.forEach(item => {
  const clone = item.cloneNode(true);
  track.appendChild(clone);
});

// Animate the track smoothly
function animateCarousel() {
  position -= scrollSpeed;
  if (Math.abs(position) >= track.scrollWidth / 2) {
    position = 0; // Reset position when half the cloned track has scrolled
  }
  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animateCarousel);
}

// Start animation
animateCarousel();

// Manual controls (optional if you want buttons to move faster)
nextButton.addEventListener('click', () => {
  position -= 200; // move 200px left
});

prevButton.addEventListener('click', () => {
  position += 200; // move 200px right
});

// Speed up the carousel on hover
track.addEventListener('mouseenter', () => {
  scrollSpeed = 3; // Increase speed when hovering
});

track.addEventListener('mouseleave', () => {
  scrollSpeed = 1; // Reset speed when mouse leaves
});

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const cartCountElement = document.getElementById('cart-count');

  // Load existing cart from localStorage or start with empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Update cart count on page load
  updateCartCount();

  // Attach click listeners to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.product-item button');
  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const productItem = button.parentElement;
      const title = productItem.querySelector('h3').innerText;
      const priceText = productItem.querySelector('.price').innerText;
      const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Remove Ksh, etc.

      // Add the item to the cart
      cart.push({ title, price });

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Update the cart count
      updateCartCount();

      alert(`${title} added to cart!`);
    });
  });

  function updateCartCount() {
    cartCountElement.innerText = cart.length;
  }
});
document.querySelector('.nav-toggle').addEventListener('click', function() {
  document.querySelector('nav ul').classList.toggle('nav-active');
});