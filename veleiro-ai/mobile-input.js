document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("#phone");

  input.setAttribute("inputmode", "numeric");
  input.setAttribute("pattern", "[0-9]*");

  const iti = window.intlTelInput(input, {
    initialCountry: "auto",
    separateDialCode: true, // ← oculta o código do país no input
    nationalMode: true, // ← permite digitação no formato local
    autoPlaceholder: "polite",
    geoIpLookup: function (callback) {
      fetch("https://ipinfo.io/json?token=5da38cfa916b8b")
        .then((resp) => resp.json())
        .then((resp) => callback(resp.country))
        .catch(() => callback("us"));
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      if (!iti.isValidNumber()) {
        e.preventDefault();
        alert("Please enter a valid phone number.");
        return false;
      }
      input.value = iti.getNumber(); // número formatado com o DDI
    });
  }
});
