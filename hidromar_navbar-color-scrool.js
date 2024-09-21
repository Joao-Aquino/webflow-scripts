const body = document.body;
const navbar = document.querySelector(".navbar_component");
let originalTema = navbar.getAttribute("tema"); // Armazena o tema original

// Função para atualizar as cores da navbar
function updateNavbarColors() {
  const tema = navbar.getAttribute("tema");

  if (tema === "light") {
    document.documentElement.style.setProperty("--navbar--color-01", "#d00324");
    document.documentElement.style.setProperty("--navbar--color-02", "white");
    document.documentElement.style.setProperty("--navbar--color-03", "");
    document.documentElement.style.setProperty("--navbar--color-04", "white");
  } else if (tema === "red") {
    document.documentElement.style.setProperty("--navbar--color-01", "#d00324");
    document.documentElement.style.setProperty("--navbar--color-02", "white");
    document.documentElement.style.setProperty("--navbar--color-03", "white");
    document.documentElement.style.setProperty("--navbar--color-04", "white");
  } else if (tema === "nav-open") {
    document.documentElement.style.setProperty("--navbar--color-01", "white");
    document.documentElement.style.setProperty("--navbar--color-02", "#d00324");
    document.documentElement.style.setProperty(
      "--navbar--color-03",
      "transparent"
    );
    document.documentElement.style.setProperty("--navbar--color-04", "#282735");
    document.documentElement.style.setProperty(".navbar_component", "white");
  } else {
    document.documentElement.style.setProperty("--navbar--color-01", "");
    document.documentElement.style.setProperty("--navbar--color-02", "");
    document.documentElement.style.setProperty("--navbar--color-03", "");
    document.documentElement.style.setProperty("--navbar--color-04", "");
  }
}

// Função para controlar o scroll e alterar o tema quando a navbar abre/fecha
function letBodyScroll(bool) {
  if (bool) {
    body.style.overflow = "hidden";
    navbar.setAttribute("tema", "nav-open"); // Altera o tema para 'nav-open' quando a navbar está aberta
  } else {
    body.style.overflow = "auto";
    navbar.setAttribute("tema", originalTema); // Restaura o tema original quando a navbar é fechada
  }
  updateNavbarColors(); // Atualiza as cores ao abrir ou fechar a navbar
}

// Observer para detectar mudanças na navbar (abrir/fechar)
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

// Executa a atualização das cores ao carregar a página
document.addEventListener("DOMContentLoaded", updateNavbarColors);
