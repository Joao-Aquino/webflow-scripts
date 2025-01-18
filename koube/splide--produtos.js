// Slider Header
const splideMain = new Splide("#produtos-header-produtos", {
  type: "loop",
  drag: "free",
  lazyload: "nearby",
  snap: true,
  pagination: false,
});

const thumbnails = document.getElementsByClassName(
  "thumbnails-header-produtos"
);
let current;

for (let i = 0; i < thumbnails.length; i++) {
  initThumbnail(thumbnails[i], i);
}

function initThumbnail(thumbnail, index) {
  thumbnail.addEventListener("click", function () {
    splideMain.go(index);
  });
}

splideMain.on("mounted move", function () {
  const thumbnail = thumbnails[splideMain.index];

  if (thumbnail) {
    if (current) {
      current.classList.remove("is-active");
    }

    thumbnail.classList.add("is-active");
    current = thumbnail;
  }
});

// Barra de Progresso
const barMain = splideMain.root.querySelector("#progresso-header-produtos");

splideMain.on("mounted move", function () {
  const end = splideMain.Components.Controller.getEnd() + 1;
  const rate = Math.min((splideMain.index + 1) / end, 1);
  barMain.style.width = String(100 * rate) + "%";
});

splideMain.mount();

// Slider Recomendado
const splideRecommended = new Splide("#produto-recomendado", {
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

const barRecommended = splideRecommended.root.querySelector(
  "#progresso-recomendado"
);

splideRecommended.on("mounted move", function () {
  const end = splideRecommended.Components.Controller.getEnd() + 1;
  const rate = Math.min((splideRecommended.index + 1) / end, 1);
  barRecommended.style.width = String(100 * rate) + "%";
});

splideRecommended.mount();

// Controle dos botões de próximo e anterior
$(".next-splide").click(function () {
  $(".splide__arrow.splide__arrow--next").click();
});
$(".prev-splide").click(function () {
  $(".splide__arrow.splide__arrow--prev").click();
});
