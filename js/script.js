// PlayPro Sports Store - Global Script

const CART_STORAGE_KEY = "playpro_cart_v1";

/* ---------------- CART UTILITIES ---------------- */

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
  return `₹${value.toFixed(2)}`;
}

/* ---------------- GLOBAL UI ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  /* Footer year */
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* Mobile navigation */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
    });
  }

  /* Header cart badge */
  const cartCountHeader = document.getElementById("cartCountHeader");
  const updateHeaderCartCount = () => {
    if (!cartCountHeader) return;
    const count = getCartCount(getCart());
    cartCountHeader.textContent = count > 0 ? String(count) : "";
  };
  updateHeaderCartCount();

  /* Add to cart buttons */
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.product || "Unnamed product";
      const price = parseFloat(btn.dataset.price || "0");
      const category = btn.dataset.category || "General";

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

  /* ---------------- CONTACT FORM ---------------- */

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
      let valid = true;

      if (successEl) successEl.textContent = "";
      if (nameError) nameError.textContent = "";
      if (emailError) emailError.textContent = "";
      if (messageError) messageError.textContent = "";

      if (!nameInput.value.trim()) {
        nameError.textContent = "Please enter your name.";
        valid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = "Please enter your email.";
        valid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = "Please enter your message.";
        valid = false;
      }

      if (!valid) return;

      successEl.textContent = "Thank you! Your message has been sent.";
      contactForm.reset();
    });
  }

  /* ---------------- CART PAGE ---------------- */

  const cartItemsBody = document.getElementById("cartItemsBody");
  const cartContent = document.getElementById("cartContent");
  const cartEmptyMessage = document.getElementById("cartEmptyMessage");
  const subtotalEl = document.getElementById("cartSubtotal");
  const taxEl = document.getElementById("cartTax");
  const totalEl = document.getElementById("cartTotal");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cartItemsBody && cartContent && cartEmptyMessage) {
    const renderCart = () => {
      const cart = getCart();
      const hasItems = cart.length > 0;

      cartContent.hidden = !hasItems;
      cartEmptyMessage.style.display = hasItems ? "none" : "block";
      cartItemsBody.innerHTML = "";

      let subtotal = 0;

      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td class="cart-col-center">${item.category}</td>
          <td class="cart-col-right">${formatCurrency(item.price)}</td>
          <td class="cart-col-center">
            <input type="number" min="1" value="${item.quantity}"
              class="cart-qty-input" data-index="${index}">
          </td>
          <td class="cart-col-right">${formatCurrency(itemTotal)}</td>
          <td class="cart-col-center">
            <button class="cart-remove-btn" data-index="${index}">Remove</button>
          </td>
        `;
        cartItemsBody.appendChild(row);
      });

      const tax = subtotal * 0.05;
      subtotalEl.textContent = formatCurrency(subtotal);
      taxEl.textContent = formatCurrency(tax);
      totalEl.textContent = formatCurrency(subtotal + tax);

      updateHeaderCartCount();
    };

    cartItemsBody.addEventListener("input", (e) => {
      if (!e.target.classList.contains("cart-qty-input")) return;
      const index = Number(e.target.dataset.index);
      const cart = getCart();
      cart[index].quantity = Math.max(1, Number(e.target.value));
      saveCart(cart);
      renderCart();
    });

    cartItemsBody.addEventListener("click", (e) => {
      if (!e.target.classList.contains("cart-remove-btn")) return;
      const index = Number(e.target.dataset.index);
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    });

    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        if (confirm("Clear all items from your cart?")) {
          saveCart([]);
          renderCart();
        }
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        alert("Demo checkout — no real payment is processed.");
      });
    }

    renderCart();
  }
});
