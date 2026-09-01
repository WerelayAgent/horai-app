// Runtime-derived API origin, kept deliberately OUT of the bundle.
//
// Turbopack constant-folds every in-source host derivation (`typeof window`, `globalThis.location`)
// down to the loopback fallback, and does not inline NEXT_PUBLIC_* into the client chunks — so a
// deployed page ends up fetching the fallback, which the browser blocks as a private-network
// violation (this is what broke connect-wallet). This plain static file the bundler never sees
// derives the origin from the real page host at runtime and hands it to the app via a custom global
// the bundler has no define for, and therefore cannot fold away.
//
// THE FALLBACK IS THIS DEPLOYMENT'S OWN API PORT. It used to name a DIFFERENT deployment of this
// codebase, live on this same box — so every local run of this app, and the literal baked into the
// built client bundle, pointed at that product's API instead. `deployment.spec.ts` reads the port
// out of `.env` and fails if this line disagrees with it.
(function () {
  try {
    var h = location.host;
    if (h && h.indexOf("localhost") !== 0 && h.indexOf("127.0.0.1") !== 0) {
      window.__HORAI_API__ = location.protocol + "//api." + h.replace(/^www\./, "");
      return;
    }
  } catch (e) {}
  window.__HORAI_API__ = "http://127.0.0.1:5300";
})();
