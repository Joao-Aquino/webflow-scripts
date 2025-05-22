document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navbarElements = navbar.querySelectorAll("*");

  const darkSections = [...document.querySelectorAll('[nav="dark"]')];

  const observer = new IntersectionObserver(
    (entries) => {
      const isOnDark = entries.some((entry) => entry.isIntersecting);

      navbarElements.forEach((el) => {
        el.classList.toggle("light", !isOnDark);
      });
    },
    {
      root: null,
      threshold: 0.5,
    }
  );

  darkSections.forEach((section) => observer.observe(section));
});
