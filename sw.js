/* ============================================================
   SMV Kontorhjælper — Service Worker
   ============================================================
   🔧 BUMP THIS NUMBER EVERY TIME YOU DEPLOY AN UPDATE.
      That's all you need to do — users get fresh files
      automatically within seconds of opening the app.
============================================================ */

const VERSION = 3;
const CACHE   = `smv-v${VERSION}`;

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
];

// ── Install: pre-cache all app files ──────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())  // activate immediately, don't wait
  );
});

// ── Activate: wipe old caches, take control of all tabs ───────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())  // control open tabs immediately
  );
});

// ── Fetch: network-first for HTML, cache-first for assets ─────
self.addEventListener('fetch', event => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  const isNavigation = event.request.mode === 'navigate';

  if (isNavigation) {
    // HTML: try network first so updates arrive immediately.
    // Fall back to cache if offline.
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // CSS / JS / other: serve from cache instantly, then update cache
    // in the background so next load is also fresh (stale-while-revalidate).
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          const networkFetch = fetch(event.request).then(res => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          });
          return cached || networkFetch;
        })
      )
    );
  }
});

// ── Message: force reload on demand from the page ─────────────
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
