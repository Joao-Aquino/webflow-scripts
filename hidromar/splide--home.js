// Função para inicializar um carrossel com Splide
function initSplide(
  selector,
  progressBarSelector,
  nextButtonSelector,
  prevButtonSelector,
  options = {}
) {
  var splide = new Splide(selector, {
    type: "loop",
    trimSpace: "move",
    overflow: "visible !important",
    padding: "2rem",
    focus: "center",
    drag: "free",
    snap: true,
    perPage: 3,
    lazyload: "nearby",
    autoplay: options.autoplay || false, // Usa opção autoplay se fornecida
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
    ...options, // Mescla configurações adicionais
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

// Inicializa os sliders existentes com botões individuais
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

initSplide(
  "#splide-banner",
  "#progresso-banner",
  "#next-banner",
  "#prev-banner",
  { autoplay: true }
);
