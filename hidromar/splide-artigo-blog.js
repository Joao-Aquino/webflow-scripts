// Inicializa o carrossel Splide
var splide = new Splide("#blog-recomendado", {
  trimSpace: "move",
  padding: "0rem",
  focus: "center",
  drag: "free",
  snap: true,
  perPage: 3,
  lazyload: "nearby",
  breakpoints: {
    767: {
      perPage: 2,
      padding: "0",
    },
    568: {
      perPage: 2,
      padding: "0",
    },
  },
});

var bar = splide.root.querySelector("#progresso-recomendado");

// Atualiza a barra de progresso
splide.on("mounted move", function () {
  var end = splide.Components.Controller.getEnd() + 1;
  var rate = Math.min((splide.index + 1) / end, 1);
  bar.style.width = String(100 * rate) + "%";
});

splide.mount();

// Controle dos botões de próximo e anterior
$(".next-splide").click(function () {
  $(".splide__arrow.splide__arrow--next").click();
});
$(".prev-splide").click(function () {
  $(".splide__arrow.splide__arrow--prev").click();
});
