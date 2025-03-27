// Função para inicializar um carrossel
function initSplide(
  selector,
  progressBarSelector,
  nextBtnSelector,
  prevBtnSelector
) {
  // Configurações padrão
  var options = {
    trimSpace: "move",
    overflow: "visible !important",
    margin: { left: "0rem", right: "2rem" },
    focus: "center",
    omitEnd: true,
    drag: "free",
    snap: true,
    perPage: 3,
    lazyload: "nearby",
    breakpoints: {
      767: {
        perPage: 2,
        margin: { left: "0rem", right: "1.5rem" },
      },
      568: {
        perPage: 2,
        margin: { left: "0rem", right: "1.5rem" },
      },
    },
  };

  // Se o seletor for para o banner, define perPage para 1
  if (selector === "#splide-banner") {
    options.perPage = 1;
    options.type = "loop";
    (options.autoplay = true),
      (options.interval = "6000"),
      // (Opcional) Ajusta os breakpoints para o banner se necessário
      (options.breakpoints = {
        767: {
          perPage: 1,
          margin: { left: "0rem", right: "1.5rem" },
        },
        568: {
          perPage: 1,
          margin: { left: "0rem", right: "1.5rem" },
        },
      });
  }

  var splide = new Splide(selector, options);

  var bar = splide.root.querySelector(progressBarSelector);

  // Atualiza a barra de progresso
  splide.on("mounted move", function () {
    var end = splide.Components.Controller.getEnd() + 1;
    var rate = Math.min((splide.index + 1) / end, 1);
    bar.style.width = String(100 * rate) + "%";
  });

  splide.mount();

  // Adiciona os controles dos botões, se existirem
  if (nextBtnSelector) {
    document
      .querySelector(nextBtnSelector)
      .addEventListener("click", function () {
        splide.go(">");
      });
  }

  if (prevBtnSelector) {
    document
      .querySelector(prevBtnSelector)
      .addEventListener("click", function () {
        splide.go("<");
      });
  }
}

// Inicializa os carrosséis de forma independente
initSplide(
  "#splide-banner",
  "#progresso-banner",
  "#next-banner",
  "#prev-banner"
);
initSplide("#splide-manha", "#progresso-manha", "#next-manha", "#prev-manha");
initSplide(
  "#splide-programacao",
  "#progresso-programacao",
  "#next-programacao",
  "#prev-programacao"
);
initSplide(
  "#splide-noticias",
  "#progresso-noticias",
  "#next-noticias",
  "#prev-noticias"
);
