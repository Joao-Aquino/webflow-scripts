// Função genérica para inicializar sliders com as configurações padrão
function initSplide(
  selector,
  progressBarSelector,
  nextButtonSelector,
  prevButtonSelector
) {
  var splide = new Splide(selector, {
    type: "slide", // Configuração padrão para os sliders comuns
    trimSpace: "move",
    overflow: "visible !important",
    padding: "2rem",
    focus: "center",
    drag: "free",
    snap: true,
    perPage: 3,
    lazyload: "nearby",
    autoplay: false, // Sem autoplay por padrão
    breakpoints: {
      767: {
        perPage: 2,
        padding: "2rem",
      },
      568: {
        perPage: 2,
        padding: "1.5rem",
      },
    },
  });

  var bar = splide.root.querySelector(progressBarSelector);

  // Atualiza a barra de progresso
  splide.on("mounted move", function () {
    var end = splide.Components.Controller.getEnd() + 1;
    var rate = Math.min((splide.index + 1) / end, 1);
    if (bar) bar.style.width = String(100 * rate) + "%";
  });

  // Monta o slider
  splide.mount();

  // Configura os botões de controle individuais
  document
    .querySelector(nextButtonSelector)
    .addEventListener("click", function () {
      splide.go(">");
    });

  document
    .querySelector(prevButtonSelector)
    .addEventListener("click", function () {
      splide.go("<");
    });
}

// Inicializa sliders com configurações padrão
initSplide(
  "#splide-elevadores",
  "#progresso-elevadores",
  "#next-elevadores",
  "#prev-elevadores"
);
initSplide(
  "#splide-lavadoras",
  "#progresso-lavadoras",
  "#next-lavadoras",
  "#prev-lavadoras"
);

// Inicializa o #splide-banner com configurações específicas e sem herança das configurações padrão
var splideBanner = new Splide("#splide-banner", {
  type: "loop",
  autoplay: true,
});

splideBanner.mount();

// Configura os botões de controle para o #splide-banner
document.querySelector("#next-banner").addEventListener("click", function () {
  splideBanner.go(">");
});

document.querySelector("#prev-banner").addEventListener("click", function () {
  splideBanner.go("<");
});
