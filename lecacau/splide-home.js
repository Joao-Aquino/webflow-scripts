document.addEventListener("DOMContentLoaded", () => {
  const defaultOptions = {
    trimSpace: "move",
    overflow: "visible",
    padding: { left: "0rem", right: "1.5rem" },
    focus: "center",
    omitEnd: true,
    drag: "free",
    snap: true,
    breakpoints: {
      767: { perPage: 2, padding: { left: "0rem", right: "1.5rem" } },
      568: { perPage: 2, padding: { left: "0rem", right: "1.5rem" } },
    },
  };

  const carousels = [
    {
      sel: "#splide-produtos",
      prog: "#progresso-produtos",
      next: "#next-produtos",
      prev: "#prev-produtos",
      opts: { perPage: 3, lazyload: "nearby" },
    },
    {
      sel: "#splide-dicas",
      prog: "#progresso-dicas",
      next: "#next-dicas",
      prev: "#prev-dicas",
      opts: { perPage: 3, lazyload: "nearby" },
    },
    {
      sel: "#splide-receitas",
      prog: "#progresso-receitas",
      next: "#next-receitas",
      prev: "#prev-receitas",
      opts: { perPage: 3, lazyload: "nearby" },
    },
    {
      sel: "#splide-depoimentos",
      prog: "#progresso-depoimentos",
      next: "#next-depoimentos",
      prev: "#prev-depoimentos",
      opts: { perPage: 3, lazyload: "nearby" },
    },
    {
      sel: ".splide-header",
      prog: "#progresso-header",
      next: "#next-header",
      prev: "#prev-header",
      opts: {
        perPage: 1,
        perMove: 1,
        type: "loop",
        autoplay: true,
        interval: 6000,
        pauseOnHover: true,
        pauseOnFocus: true,
        speed: 1600,
      },
    },
  ];

  function initSplide({ sel, prog, next, prev, opts }) {
    const el = document.querySelector(sel);
    if (!el) return;

    // 1) Cria a instância, mas NÃO monta ainda
    const options = Object.assign({}, defaultOptions, opts);
    const splide = new Splide(el, options);

    // 2) Se houver barra, inscreve o listener antes do mount
    const bar = el.querySelector(prog);
    if (bar) {
      const updateBar = () => {
        const end = splide.Components.Controller.getEnd() + 1;
        const rate = Math.min((splide.index + 1) / end, 1);
        bar.style.width = rate * 100 + "%";
      };
      splide.on("mounted move", updateBar);
    }

    // 3) Agora monta — o evento "mounted" será capturado
    splide.mount();

    // 4) Botões de navegação
    [
      [next, ">"],
      [prev, "<"],
    ].forEach(([selector, dir]) => {
      const btn = document.querySelector(selector);
      if (btn) btn.addEventListener("click", () => splide.go(dir));
    });
  }

  carousels.forEach(initSplide);
});
