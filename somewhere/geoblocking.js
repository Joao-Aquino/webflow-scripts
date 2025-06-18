(function () {
  const GEO_API_URL = "https://get.geojs.io/v1/ip/geo.json";
  const ALLOWED_COUNTRIES = new Set([
    "BR",
    "PH",
    "CO",
    "SA",
    "ZA",
    "IN",
    "LKA",
    "LK",
  ]);
  const EXCLUDED_IPS = new Set(["187.62.63.192"]);
  const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

  // 1) Exit immediately if nothing is marked to hide
  if (!document.querySelector("[data-hide-start-hiring]")) return;

  // 2) Try to load from cache
  let cache = null;
  try {
    cache = JSON.parse(localStorage.getItem("geoCache"));
  } catch (_) {
    /* ignore */
  }

  if (cache && Date.now() - cache.ts < CACHE_TTL_MS) {
    process(cache.countryCode, cache.ip);
  } else {
    fetch(GEO_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(({ country_code, ip }) => {
        localStorage.setItem(
          "geoCache",
          JSON.stringify({ countryCode: country_code, ip, ts: Date.now() })
        );
        process(country_code, ip);
      })
      .catch((err) => console.error("Error hiding elements:", err));
  }

  function process(countryCode, ip) {
    // 3) Skip hiding if this is your own IP
    if (EXCLUDED_IPS.has(ip)) return;
    // 4) Only hide for our target countries
    if (!ALLOWED_COUNTRIES.has(countryCode)) return;
    document
      .querySelectorAll("[data-hide-start-hiring]")
      .forEach((el) => (el.style.display = "none"));
  }
})();
