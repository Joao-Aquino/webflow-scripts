const body = document.body;
const navbar = document.querySelector(".navbar_component");
let originalTema = navbar.getAttribute("tema");

function updateNavbarColors() {
  const tema = navbar.getAttribute("tema");

  if (tema === "light") {
    document.documentElement.style.setProperty("--navbar--color-01", "#d00324");
    document.documentElement.style.setProperty("--navbar--color-02", "white");
    document.documentElement.style.setProperty("--navbar--color-03", "");
    document.documentElement.style.setProperty("--navbar--color-04", "white");
    navbar.style.backgroundColor = "";
  } else if (tema === "red") {
    document.documentElement.style.setProperty("--navbar--color-01", "#d00324");
    document.documentElement.style.setProperty("--navbar--color-02", "white");
    document.documentElement.style.setProperty("--navbar--color-03", "white");
    document.documentElement.style.setProperty("--navbar--color-04", "white");
    navbar.style.backgroundColor = "";
  } else if (tema === "nav-open") {
    document.documentElement.style.setProperty("--navbar--color-01", "white");
    document.documentElement.style.setProperty("--navbar--color-02", "#d00324");
    document.documentElement.style.setProperty(
      "--navbar--color-03",
      "transparent"
    );
    document.documentElement.style.setProperty("--navbar--color-04", "#282735");
    navbar.style.backgroundColor = "white";
  } else {
    document.documentElement.style.setProperty("--navbar--color-01", "");
    document.documentElement.style.setProperty("--navbar--color-02", "");
    document.documentElement.style.setProperty("--navbar--color-03", "");
    document.documentElement.style.setProperty("--navbar--color-04", "");
    navbar.style.backgroundColor = "";
  }
}

function letBodyScroll(bool) {
  if (bool) {
    body.style.overflow = "hidden";
    navbar.setAttribute("tema", "nav-open");
  } else {
    body.style.overflow = "auto";
    navbar.setAttribute("tema", originalTema);
  }
  updateNavbarColors();
}

const targetNode = document.querySelector(".w-nav-button");
const config = { attributes: true, childList: false, subtree: false };

const callback = function (mutationsList, observer) {
  for (let i = 0; i < mutationsList.length; i++) {
    if (mutationsList[i].type === "attributes") {
      const menuIsOpen = mutationsList[i].target.classList.contains("w--open");
      letBodyScroll(menuIsOpen);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

document.addEventListener("DOMContentLoaded", updateNavbarColors);
