// Função para inicializar um carrossel
function initSplide(selector, progressBarSelector) {
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
    bar.style.width = String(100 * rate) + "%";
  });

  splide.mount();
}

// Inicializa os dois carrosséis usando a função genérica
initSplide("#splide-elevadores", "#progresso-elevadores");
initSplide("#splide-lavadoras", "#progresso-lavadoras");

// Controle dos botões de próximo e anterior
$(".next-splide").click(function () {
  $(".splide__arrow.splide__arrow--next").click();
});
$(".prev-splide").click(function () {
  $(".splide__arrow.splide__arrow--prev").click();
});
