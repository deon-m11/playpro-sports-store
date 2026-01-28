// PlayPro Sports Store - Global Script

const CART_STORAGE_KEY = "playpro_cart_v1";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getCartCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

// Utility: update footer year and shared UI
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
    });
  }

  // Cart badge in header
  const cartCountHeader = document.getElementById("cartCountHeader");
  const updateHeaderCartCount = () => {
    if (!cartCountHeader) return;
    const cart = getCart();
    const count = getCartCount(cart);
    cartCountHeader.textContent = count > 0 ? String(count) : "";
  };
  updateHeaderCartCount();

  // Add to cart buttons
  const cartButtons = document.querySelectorAll(".add-to-cart-btn");
  cartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-product") || "Unnamed product";
      const priceAttr = btn.getAttribute("data-price") || "0";
      const category = btn.getAttribute("data-category") || "General";
      const price = parseFloat(priceAttr) || 0;

      const cart = getCart();
      const existing = cart.find((item) => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, category, quantity: 1 });
      }
      saveCart(cart);
      updateHeaderCartCount();
      alert(`“${name}” has been added to your cart.`);
    });
  });

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const successEl = document.getElementById("formSuccess");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset messages
      if (successEl) successEl.textContent = "";

      if (nameError) nameError.textContent = "";
      if (emailError) emailError.textContent = "";
      if (messageError) messageError.textContent = "";

      // Name validation
      if (!nameInput || !nameInput.value.trim()) {
        if (nameError) nameError.textContent = "Please enter your name.";
        isValid = false;
      }

      // Email validation
      const emailValue = emailInput && emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue) {
        if (emailError) emailError.textContent = "Please enter your email.";
        isValid = false;
      } else if (!emailRegex.test(emailValue)) {
        if (emailError) emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      // Message validation
      if (!messageInput || !messageInput.value.trim()) {
        if (messageError) messageError.textContent = "Please enter your message.";
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Simulate successful submission
      if (successEl) {
        successEl.textContent = "Thank you! Your message has been sent.";
      }
      contactForm.reset();
    });
  }

  // Cart page logic
  const cartItemsBody = document.getElementById("cartItemsBody");
  const cartContent = document.getElementById("cartContent");
  const cartEmptyMessage = document.getElementById("cartEmptyMessage");
  const subtotalEl = document.getElementById("cartSubtotal");
  const taxEl = document.getElementById("cartTax");
  const totalEl = document.getElementById("cartTotal");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cartItemsBody && cartContent && cartEmptyMessage && subtotalEl && taxEl && totalEl) {
    const renderCart = () => {
      const cart = getCart();
      const hasItems = cart.length > 0;
      cartContent.hidden = !hasItems;
      cartEmptyMessage.style.display = hasItems ? "none" : "block";

      cartItemsBody.innerHTML = "";
      let subtotal = 0;

      cart.forEach((item, index) => {
        const row = document.createElement("tr");
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        row.innerHTML = `
          <td>${item.name}</td>
          <td class="cart-col-center">${item.category}</td>
          <td class="cart-col-right">${formatCurrency(item.price)}</td>
          <td class="cart-col-center">
            <input
              type="number"
              min="1"
              value="${item.quantity}"
              class="cart-qty-input"
              data-index="${index}"
            />
          </td>
          <td class="cart-col-right">${formatCurrency(itemTotal)}</td>
          <td class="cart-col-center">
            <button class="cart-remove-btn" data-index="${index}">Remove</button>
          </td>
        `;

        cartItemsBody.appendChild(row);
      });

      const tax = subtotal * 0.05;
      const total = subtotal + tax;

      subtotalEl.textContent = formatCurrency(subtotal);
      taxEl.textContent = formatCurrency(tax);
      totalEl.textContent = formatCurrency(total);

      // Update header badge
      if (cartCountHeader) {
        cartCountHeader.textContent = getCartCount(cart) > 0 ? String(getCartCount(cart)) : "";
      }
    };

    // Delegate quantity changes and removes
    cartItemsBody.addEventListener("input", (e) => {
      const target = e.target;
      if (target instanceof HTMLInputElement && target.classList.contains("cart-qty-input")) {
        const index = Number(target.getAttribute("data-index"));
        let qty = parseInt(target.value, 10);
        if (!Number.isFinite(qty) || qty < 1) qty = 1;
        const cart = getCart();
        if (cart[index]) {
          cart[index].quantity = qty;
          saveCart(cart);
          renderCart();
        }
      }
    });

    cartItemsBody.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLButtonElement && target.classList.contains("cart-remove-btn")) {
        const index = Number(target.getAttribute("data-index"));
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
      }
    });

    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        if (!confirm("Clear all items from your cart?")) return;
        saveCart([]);
        renderCart();
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        const cart = getCart();
        if (!cart.length) {
          alert("Your cart is empty.");
          return;
        }
        alert("This is a demo checkout. In a real store, you would now enter shipping and payment details.");
      });
    }

    // Initial render
    renderCart();
  }
});

