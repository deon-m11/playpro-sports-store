## PlayPro Sports Store

PlayPro Sports Store is a demo responsive ecommerce website built with **HTML**, **CSS**, and **JavaScript**.  
It showcases a clean, modern sports‑themed UI suitable for an online sports equipment store.

### Features

- **Multi‑page layout**: Home, About, and Contact pages.
- **Navigation menu**: Links to Home, About, and Contact on every page.
- **Modern sports UI**: Red, black, and white theme with card‑based layouts.
- **Product showcase**:
  - Product cards with image, name, price, and “Add to Cart” button.
  - Clickable product images (open a larger placeholder image in a new tab).
- **Contact / Feedback form**:
  - Fields: Name, Email, Message, and Submit button.
  - Basic client‑side form validation using JavaScript.
- **Responsive design**: Mobile‑friendly navigation and layout.
- **Footer**: Social media links on every page.

### Project Structure

```text
playpro-sports-store/
├── index.html       # Home page (hero, featured products, CTA)
├── about.html       # About page (mission, vision, categories)
├── contact.html     # Contact page (feedback form, info, map placeholder)
├── css/
│   └── style.css    # Global styles and responsive layout
├── js/
│   └── script.js    # Navigation toggle, add‑to‑cart alert, form validation
└── images/          # Place your product / hero images here (optional)
```

> Note: The demo uses online placeholder images in `index.html`.  
> You can replace them with your own local files stored in the `images/` folder.

### How to Run Locally

1. **Download or clone** this project into a folder called `playpro-sports-store`.
2. Open the folder in your code editor.
3. Double‑click `index.html` (or right‑click → “Open with” → your browser).
4. Navigate using the top menu to view the About and Contact pages.

### Basic Customization

- **Colors & theme**: Edit `css/style.css` to adjust colors, fonts, and spacing.
- **Products**: Update the product cards in `index.html` (name, price, copy, image URLs).
- **Contact info**: Edit address, phone, and email in `contact.html`.
- **Google Map**: Replace the placeholder box in `contact.html` with your own Google Maps `<iframe>`.

### Hosting on GitHub Pages

1. **Create a new GitHub repository**
   - Go to GitHub and create a new repository named `playpro-sports-store`.
   - Do **not** initialize with a README if you already have this one locally.

2. **Push the project to GitHub**
   - Open a terminal in the `playpro-sports-store` folder.
   - Run the following commands (replace `YOUR_USERNAME` with your GitHub username):

   ```bash
   git init
   git add .
   git commit -m "Initial commit - PlayPro Sports Store"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/playpro-sports-store.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - In your GitHub repository, go to **Settings → Pages**.
   - Under **Source**, select **Deploy from a branch**.
   - Choose the `main` branch and `/ (root)` folder, then click **Save**.

4. **Access your site**
   - After a short build time, your site will be live at:
     - `https://YOUR_USERNAME.github.io/playpro-sports-store/`
   - Open this URL in your browser to view the live demo.

### License

This project is provided as a demo/learning resource. You are free to modify and reuse it for personal or educational purposes.

