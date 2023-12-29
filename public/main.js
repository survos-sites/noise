console.log("registering sw")
if ("serviceWorker" in navigator) {
    try {
        let reg;
        // reg = await navigator.serviceWorker.register('/service-worker.js', {
        //     type: 'module',
        // });
        // Register the service worker
        reg = navigator.serviceWorker.register("sw.js").then((reg) => {
            console.log(`Service worker has been registered`);
        });
    } catch (err) {
        console.log('😥 Service worker registration failed: ', err);
    }
}
