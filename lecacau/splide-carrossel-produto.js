document.addEventListener("DOMContentLoaded", function () {
  //
  // 1) Slider de Produtos
  //
  const splideProdutos = new Splide("#splide-produtos", {
    trimSpace: "move",
    overflow: "visible",
    padding: { left: "0rem", right: "1.5rem" },
    focus: "center",
    omitEnd: true,
    drag: "free",
    snap: true,
    perPage: 3,
    lazyload: "nearby",
    breakpoints: {
      767: { perPage: 2, padding: { left: "0rem", right: "1.5rem" } },
      568: { perPage: 2, padding: { left: "0rem", right: "1.5rem" } },
    },
  });

  // barra de progresso produtos
  const barProdutos = splideProdutos.root.querySelector("#progresso-produtos");
  splideProdutos.on("mounted move", function () {
    const end = splideProdutos.Components.Controller.getEnd() + 1;
    const rate = Math.min((splideProdutos.index + 1) / end, 1);
    if (barProdutos) barProdutos.style.width = rate * 100 + "%";
  });

  splideProdutos.mount();

  // botões customizados produtos
  const nextProdutos = document.querySelector("#next-produtos");
  const prevProdutos = document.querySelector("#prev-produtos");
  if (nextProdutos)
    nextProdutos.addEventListener("click", () => splideProdutos.go(">"));
  if (prevProdutos)
    prevProdutos.addEventListener("click", () => splideProdutos.go("<"));

  //
  // 2) Slider Lightbox (thumbnails abaixo)
  //
  const splideLightbox = new Splide("#splide-lightbox", {
    type: "loop",
    drag: "free",
    lazyload: "nearby",
    snap: true,
    pagination: false,
    arrows: false,
  });

  // thumbnails
  const thumbnails = document.getElementsByClassName("thumbnails_item");
  let currentThumb;
  Array.from(thumbnails).forEach((thumb, idx) => {
    thumb.addEventListener("click", () => splideLightbox.go(idx));
  });

  // barra de progresso lightbox
  const barLightbox = splideLightbox.root.querySelector("#progresso-lightbox");

  const updateLightboxUI = () => {
    // ativa miniatura
    const thumb = thumbnails[splideLightbox.index];
    if (currentThumb) currentThumb.classList.remove("is-active");
    if (thumb) thumb.classList.add("is-active");
    currentThumb = thumb;

    // atualiza barra
    const end = splideLightbox.Components.Controller.getEnd() + 1;
    const rate = Math.min((splideLightbox.index + 1) / end, 1);
    if (barLightbox) barLightbox.style.width = rate * 100 + "%";
  };

  splideLightbox.on("mounted move", updateLightboxUI);
  splideLightbox.mount();

  // botões customizados lightbox
  const nextLightbox = document.querySelector("#next-lightbox");
  const prevLightbox = document.querySelector("#prev-lightbox");
  if (nextLightbox)
    nextLightbox.addEventListener("click", () => splideLightbox.go(">"));
  if (prevLightbox)
    prevLightbox.addEventListener("click", () => splideLightbox.go("<"));
});
