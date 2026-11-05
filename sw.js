const CACHE_NAME = "chat-shell-v1";

self.addEventListener("install", (event) => {
  const base = self.registration.scope;
  const appFiles = [
    base,
    new URL("manifest.webmanifest", base).href,
    new URL("icon.svg", base).href
  ];

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(appFiles))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
