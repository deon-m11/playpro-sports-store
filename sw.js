const CACHE_NAME = "playpro-v8-cache";
const IMAGE_CACHE = "playpro-images-v6";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/shop.html",
  "/product.html",
  "/cart.html",
  "/checkout.html",
  "/wishlist.html",
  "/about.html",
  "/contact.html",
  "/experience.html",
  "/bundles.html",
  "/drops.html",
  "/rewards.html",
  "/track-order.html",
  "/returns.html",
  "/team-orders.html",
  "/gift-cards.html",
  "/resources.html",
  "/partnerships.html",
  "/press.html",
  "/trust.html",
  "/dashboard.html",
  "/analytics.html",
  "/admin.html",
  "/blog.html",
  "/live.html",
  "/queue.html",
  "/vip.html",
  "/spotlight.html",
  "/login.html",
  "/signup.html",
  "/profile.html",
  "/css/style.css",
  "/js/script.js",
  "/images/elite-football.svg",
  "/images/hoops-basketball.svg",
  "/images/deon-menezes-founder.jpeg",
  "/manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== IMAGE_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const request = event.request;
  const destination = request.destination;

  if (destination === "image") {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request)
            .then((response) => {
              cache.put(request, response.clone());
              return response;
            })
            .catch(() => caches.match("/images/elite-football.svg"));
        })
      )
    );
    return;
  }

  const acceptsHtml = request.headers.get("accept") && request.headers.get("accept").includes("text/html");
  if (acceptsHtml) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
