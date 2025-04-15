const delay = 3; // pop-up delay in seconds
const popupId = "pop-up-wrapper"; // pop-up Id name

$(document).ready(function () {
  if (!Cookies.get("alert")) {
    setTimeout(function () {
      document.getElementById(popupId).style.display = "flex";
      Cookies.set("alert", true, { expires: 1 });
    }, delay * 1000);
  }
});
