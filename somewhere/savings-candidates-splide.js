document.addEventListener("DOMContentLoaded", function () {
  const sliders = [
    {
      id: "savings",
    },
    {
      id: "candidates",
    },
  ];

  sliders.forEach(({ id }) => {
    const sel = `#splide-${id}`;
    const prog = `#progress-${id}`;
    const next = `#next-${id}`;
    const prev = `#prev-${id}`;

    const el = document.querySelector(sel);
    if (!el) return;

    const splide = new Splide(el, {
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
        568: { perPage: 1, padding: { left: "0rem", right: "1.5rem" } },
      },
    });

    const bar = el.querySelector(prog);
    if (bar) {
      splide.on("mounted move", function () {
        const end = splide.Components.Controller.getEnd() + 1;
        const rate = Math.min((splide.index + 1) / end, 1);
        bar.style.width = rate * 100 + "%";
      });
    }

    splide.mount();

    const btnNext = document.querySelector(next);
    if (btnNext)
      btnNext.addEventListener("click", function () {
        splide.go(">");
      });

    const btnPrev = document.querySelector(prev);
    if (btnPrev)
      btnPrev.addEventListener("click", function () {
        splide.go("<");
      });
  });
});
