// Função para inicializar um carrossel
function initSplide(
  selector,
  progressBarSelector,
  nextBtnSelector,
  prevBtnSelector
) {
  var splide = new Splide(selector, {
    trimSpace: "move",
    overflow: "visible !important",
    padding: { left: "0rem", right: "1.5rem" },
    focus: "center",
    omitEnd: true,
    drag: "free",
    snap: true,
    perPage: 3,
    lazyload: "nearby",
    breakpoints: {
      767: {
        perPage: 2,
        padding: { left: "0rem", right: "1.5rem" },
      },
      568: {
        perPage: 2,
        padding: { left: "0rem", right: "1.5rem" },
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

  // Adiciona controles aos botões específicos
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
  "#splide-blog-recomendado",
  "#progresso-blog-recomendado",
  "#next-blog-recomendado",
  "#prev-blog-recomendado"
);
