// PlayPro Sports Store - Global Script

// Utility: update footer year
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

  // Basic "Add to cart" feedback
  const cartButtons = document.querySelectorAll(".add-to-cart-btn");
  cartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-product") || "this product";
      alert(`“${name}” has been added to your demo cart!`);
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
});

