console.log('This log comes from sw.js, which is created by pwa()')
// *** Workbox Bundle rules ***
//WORKBOX_IMPORT_PLACEHOLDER
//STANDARD_RULES_PLACEHOLDER
//OFFLINE_FALLBACK_PLACEHOLDER
//WIDGETS_PLACEHOLDER

const audioCacheStrategy = new workbox.strategies.CacheOnly({
    cacheName: 'audio',
    plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({statuses: [0, 200]}),
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 10, // Adapt this line if needed
            maxAgeSeconds: 365 * 24 * 60 * 60 // Adapt this line if needed
        }),
    ],
});

workbox.routing.registerRoute(
    ({url}) => url.pathname.endsWith('.mp3'),
    audioCacheStrategy
);

// Optional: this will store the file when the user arrives on the application
// audioFiles contains the list of URLs
const audioFiles = [
    '/sounds/WhiteNoise.mp3'
];
self.addEventListener('install', event => {
    const done = audioFiles.map(
        path =>
            audioCacheStrategy.handleAll({
                event,
                request: new Request(path),
            })[1]
    );

    event.waitUntil(Promise.all(done));
});
