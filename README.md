## PlayPro Sports Store (Premium Rebuild)

PlayPro is now a high-end, multi-page sports equipment storefront built with plain **HTML**, **CSS**, and **JavaScript**.

### What is new

- Complete premium UI redesign with a custom visual system (typography, gradients, card hierarchy, and responsive layouts).
- Motion and interaction improvements:
  - Scroll reveal animations
  - Counter animations
  - Hover transitions and floating hero cards
  - Toast notifications
- Full catalog experience:
  - Dynamic product catalog
  - Smart filters (search, category, sorting, price cap)
  - Product detail pages with gallery and highlights
- Shopping flow upgrades:
  - Persistent cart (localStorage)
  - Persistent wishlist (localStorage)
  - Promo code support (`PLAYPRO10`)
  - Shipping mode logic (standard/express)
  - Checkout flow with validation and order confirmation
- About/brand upgrade that clearly mentions the founder.
- PlayPro X Lab expansion with advanced ecommerce experience pages:
  - Bundles, Drops, Rewards, Track Order, Returns, Team Orders, Gift Cards,
    Resources, Partnerships, Press, Trust Center.
- New interaction systems:
  - Live drop countdown timers
  - Sport scene switching hero with parallax, seasonal lanes, and dynamic drop rails
  - Athlete testimonial wall (video snippets) and before/after outcome carousel
  - Product quick view modal
  - Product compare dock + comparison modal
  - Simulated tool workflows for loyalty, bundles, tracking, returns, B2B, and media
  - No-key AI shopping assistant:
    - Uses local Python GPT-2 server on localhost when available (`ai/gpt2_coach_server.py`)
    - Uses local Ollama automatically on localhost (if running)
    - Uses in-browser open-source model on hosted environments (e.g., GitHub Pages)
    - Falls back to smart built-in coaching replies if model loading fails
  - Social-proof activity feed
  - Smart cart drawer with shipping progress and bundle completion prompts
  - Advanced shop discovery: grouped autocomplete, visual search, visual sport filters, use-case filters, density toggles, infinite/pagination modes
  - Product intelligence modules: 360 preview slider, fit assistant, spec accordions, compatibility matrix, review uploads
- Growth/ops/enterprise surfaces:
  - Personal dashboard, analytics dashboard, admin console
  - Founder blog, live shopping page, limited drop queue page, VIP page, team spotlight page
  - Multi-currency, reduced-motion preference, service worker registration, structured data injection
  - Admin operations tooling: campaign scheduler, catalog bulk updates, RBAC simulation, and audit workflow cards

### Founder

This project now explicitly includes:

- **Created and founded by Deon Menezes**

### Pages

- `index.html` - Premium landing page with hero, categories, featured products
- `shop.html` - Full catalog with filtering and sorting
- `product.html` - Dynamic product details (uses query param `?id=`)
- `wishlist.html` - Saved products view
- `cart.html` - Cart management with totals and promo support
- `checkout.html` - Checkout form and order confirmation
- `about.html` - Brand story and founder section
- `contact.html` - Contact form, FAQ accordion, and map
- `experience.html` - PlayPro X Lab innovation hub
- `bundles.html`, `drops.html`, `rewards.html`, `track-order.html`, `returns.html`
- `team-orders.html`, `gift-cards.html`, `resources.html`, `partnerships.html`
- `press.html`, `trust.html`
- `dashboard.html`, `analytics.html`, `admin.html`
- `blog.html`, `live.html`, `queue.html`, `vip.html`, `spotlight.html`
- `login.html`, `signup.html`, `profile.html`

### Tech details

- Global styles: `css/style.css`
- Store logic and data: `js/script.js`
- No build tooling required.

### Run locally

1. Open this folder.
2. Run a local static server (example):

```bash
python3 -m http.server 4173
```

3. Open `http://127.0.0.1:4173/` in your browser.

### Optional: local GPT-2 coach (no API key)

1. Keep the static server running.
2. In another terminal, start the local coach endpoint:

```bash
python3 ai/gpt2_coach_server.py
```

3. Open the website on localhost and use AI Coach.
   - If GPT-2 cannot load, the coach still works via smart rules fallback.
   - First GPT-2 run may download model files from Hugging Face.

### Notes

- Product and section imagery uses high-quality remote image sources.
- Cart, wishlist, and checkout data are demo-only and stored in browser localStorage.
- Enterprise/AI/ops features are implemented as frontend-ready interactive simulations.
