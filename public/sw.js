/* eslint-env serviceworker */
/* ---------------------------------------------------------------------------
 * Kill switch for the Service Worker left behind by the old Gatsby site.
 *
 * The previous site was built with `gatsby-plugin-offline`, which registered a
 * Service Worker at `/space/sw.js` that precached the whole app shell. That
 * shell references Gatsby chunk URLs which no longer exist after the migration
 * to Next.js, so returning visitors got a permanently blank page.
 *
 * It could not heal itself either: browsers re-fetch the SW script on every
 * navigation to look for updates, but this file did not exist any more, so the
 * update always failed and the stale worker stayed in control.
 *
 * Now that a byte-different `sw.js` is served again, browsers will install this
 * one. It throws away every cache, unregisters itself and reloads the tabs it
 * was controlling, so every request goes straight back to the network.
 *
 * This file can be deleted in a later release once enough time has passed for
 * returning visitors to have picked it up.
 * ------------------------------------------------------------------------- */

self.addEventListener('install', () => {
    // Don't wait for the old worker to release its clients.
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Drop everything the old worker precached.
            const keys = await caches.keys();
            await Promise.all(keys.map((key) => caches.delete(key)));

            // Remove this registration so request handling goes back to the
            // network (this app never registers a worker of its own).
            await self.registration.unregister();

            // Reload the tabs this worker was controlling so they immediately
            // fetch the current site instead of the cached shell.
            const clientList = await self.clients.matchAll({ type: 'window' });
            clientList.forEach((client) => client.navigate(client.url));
        })(),
    );
});
