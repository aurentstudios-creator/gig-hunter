self.addEventListener('install', (e) => {
    console.log('[Aurent Service Worker] Installed');
});

self.addEventListener('fetch', (e) => {
    // Required to be recognized as a PWA
});
