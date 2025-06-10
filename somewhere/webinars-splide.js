document.addEventListener("DOMContentLoaded", function () {
  var sel = "#splide-webinars";
  var prog = "#progress-webinars";
  var next = "#next-webinars";
  var prev = "#prev-webinars";

  var el = document.querySelector(sel);
  if (!el) return;

  var splide = new Splide(el, {
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

  var bar = el.querySelector(prog);
  if (bar) {
    splide.on("mounted move", function () {
      var end = splide.Components.Controller.getEnd() + 1;
      var rate = Math.min((splide.index + 1) / end, 1);
      bar.style.width = rate * 100 + "%";
    });
  }

  splide.mount();

  var btnNext = document.querySelector(next);
  if (btnNext)
    btnNext.addEventListener("click", function () {
      splide.go(">");
    });

  var btnPrev = document.querySelector(prev);
  if (btnPrev)
    btnPrev.addEventListener("click", function () {
      splide.go("<");
    });
});
