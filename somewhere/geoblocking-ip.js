(function () {
  const geoApiUrl = "https://get.geojs.io/v1/ip/geo.json";
  const allowedCountries = new Set([
    "BR",
    "PH",
    "CO",
    "SA",
    "ZA",
    "IN",
    "LKA",
    "LK",
  ]);
  const excludedIps = new Set(["187.62.63.192", "198.58.122.166"]);
  const cacheTtlMs = 60 * 60 * 1000; // 1 hour

  if (!document.querySelector("[data-hide-start-hiring]")) return;

  let cache = null;
  try {
    cache = JSON.parse(localStorage.getItem("geoCache"));
  } catch (_) {}

  if (cache && Date.now() - cache.ts < cacheTtlMs) {
    process(cache.countryCode, cache.ip);
  } else {
    fetch(geoApiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(({ country_code, ip }) => {
        localStorage.setItem(
          "geoCache",
          JSON.stringify({
            countryCode: country_code,
            ip,
            ts: Date.now(),
          })
        );
        process(country_code, ip);
      })
      .catch((err) => console.error("Error hiding elements:", err));
  }

  function process(countryCode, ip) {
    if (excludedIps.has(ip)) return;
    if (!allowedCountries.has(countryCode)) return;
    document
      .querySelectorAll("[data-hide-start-hiring]")
      .forEach((el) => (el.style.display = "none"));
  }
})();
