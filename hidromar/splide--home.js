// Função para inicializar um carrossel
function initSplide(
  selector,
  progressBarSelector,
  nextButtonSelector,
  prevButtonSelector,
  options = {}
) {
  // Configurações padrão do Splide
  const defaultOptions = {
    type: "loop",
    trimSpace: "move",
    overflow: "visible !important",
    focus: "center",
    drag: "free",
    snap: true,
    perPage: 3,
    lazyload: "nearby",
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
  };

  // Mescla as opções personalizadas com as padrão
  const splideOptions = { ...defaultOptions, ...options };

  var splide = new Splide(selector, splideOptions);

  var bar = splide.root.querySelector(progressBarSelector);

  // Atualiza a barra de progresso
  splide.on("mounted move", function () {
    var end = splide.Components.Controller.getEnd() + 1;
    var rate = Math.min((splide.index + 1) / end, 1);
    bar.style.width = String(100 * rate) + "%";
  });

  splide.mount();

  // Controle independente dos botões de próximo e anterior
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

// Inicializa os carrosséis com opções específicas
initSplide(
  "#splide-elevadores",
  "#progresso-elevadores",
  "#next-elevadores",
  "#prev-elevadores",
  {
    padding: "2rem",
  }
);
initSplide(
  "#splide-lavadoras",
  "#progresso-lavadoras",
  "#next-lavadoras",
  "#prev-lavadoras",
  {
    padding: "2rem",
  }
);
initSplide(
  "#splide-banner-home",
  "#progresso-banner-home",
  "#next-banner-home",
  "#prev-banner-home",
  {
    padding: "", // Remove o padding
  }
);
