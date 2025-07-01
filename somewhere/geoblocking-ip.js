(function () {
  const geoApiUrl = "https://get.geojs.io/v1/ip/geo.json",
    allowedCountries = new Set([
      "BR",
      "PH",
      "CO",
      "SA",
      "ZA",
      "IN",
      "LKA",
      "LK",
    ]),
    excludedIps = new Set(["189.14.27.21", "198.58.122.166"]),
    cacheTtlMs = 3600000;
  if (!document.querySelector("[data-hide-start-hiring]")) return;
  let cache;
  try {
    cache = JSON.parse(localStorage.getItem("geoCache"));
  } catch {}
  if (cache && Date.now() - cache.ts < cacheTtlMs)
    process(cache.countryCode, cache.ip);
  else
    fetch(geoApiUrl)
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(({ country_code, ip }) => {
        localStorage.setItem(
          "geoCache",
          JSON.stringify({ countryCode: country_code, ip, ts: Date.now() })
        );
        process(country_code, ip);
      })
      .catch((e) => console.error("Error hiding elements:", e));
  function process(countryCode, ip) {
    if (excludedIps.has(ip) || !allowedCountries.has(countryCode)) return;
    document
      .querySelectorAll("[data-hide-start-hiring='true']")
      .forEach((el) => (el.style.display = "none"));
  }
})();
