// Função para inicializar um carrossel
function initSplide(
  selector,
  progressBarSelector,
  nextBtnSelector,
  prevBtnSelector
) {
  // Configurações padrão
  var splide = new Splide(selector, {
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
  });

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
  "#splide-relacionados",
  "#progresso-relacionados",
  "#next-relacionados",
  "#prev-relacionados"
);
