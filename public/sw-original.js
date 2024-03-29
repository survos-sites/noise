// @ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ (
  /** @type {unknown} */ (self)
);

// static cache - if you ever want to invalidate this cache then change the
// name of the cache (e.g. static-cache-v2)
const CACHE_NAME = `static-cache-v1`;

const ASSETS = [
  "/",
  "/index.html",
  "/index.js",
  "/index.css",
  "/sounds/WhiteNoise.mp3",
];

/**
 * This event runs when a new service worker is detected. The new service worker isn't
 * being used to intercept fetches until it is "active". This event is a good opportunity
 * to handle precaching (i.e. caching pages and assets before they are actually needed).
 */
sw.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      // Create a new cache (if not already present) and add all files to it
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS);

      // activate the new SW immediately
      await sw.skipWaiting();
    })()
  );
});

/**
 * This event is called when the new service worker has taken over and the old service
 * is deregistered.  This is a good opportunity to clean up old caches as they will no
 * longer be used (since the old service worker using them is gone).
 */
sw.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in sw.registration) {
        await sw.registration.navigationPreload.enable();
      }

      // Remove previous cached data from disk
      const cache_keys = await caches.keys();

      // note: awaiting here to ensure by the time this sw is activated the
      // caches are in a deterministic state (fetch handler below uses
      // "caches.match", so it's good to know that the caches are in a good state)
      await Promise.allSettled(
        cache_keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })()
  );
});

/**
 * This is the bread and butter of the service worker.  Called any time a network
 * fetch is made.
 *
 * To ignore a request (and let it go to the network) just return nothing from this
 * function.
 */
sw.addEventListener("fetch", (event) => {
  const { request } = event;

  // ignore non-GET requests
  if (request.method !== "GET") {
    return;
  }

  return; // skip cache

  const url = new URL(event.request.url);

  // ignore requests from chrome extensions
  if (url.protocol === "chrome-extension:") {
    return;
  }

  event.respondWith(
    (async () => {
      // We use a stale-while-revalidate strategy. This means that we'll respond
      // to the request with the cached version (if present), and fetch the latest
      // version in the background, so the next request will get the latest version.

      // For non-ok and opaque responses we'll be safer and use a network-first
      // strategy.  We'll attempt to fetch from network but if that fails
      // because we are offline or the server is down then we'll fall back
      // to the cache if the response is there.

      // IMPORTANT: we check if there is a preload response available, if we don't do this
      // then the browser will try to fetch the resource again, which is wasteful
      const cached_response =
        (await event.preloadResponse) || (await caches.match(request));
      if (cached_response && cached_response.ok) {
        // CACHE HIT for ok response

        // fetch latest in background (don't await it)
        fetch(request)
          .then(async (response) => {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response);
          })
          .catch(() => {});

          // console.log("returning cached... " + url);
        return cached_response;
      }

      // if not cached or not OK response then try the network
      try {
        const response = await fetch(request);

        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());

        // console.log("returning fresh... " + url);
        return response;
      } catch (error) {
        if (cached_response) {
          return cached_response;
        }

        // otherwise pass on the error, nothing else we can do
        console.error(url);
        throw error;
      }
    })()
  );
});
