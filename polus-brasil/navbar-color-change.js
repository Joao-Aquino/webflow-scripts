document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navbarElements = navbar.querySelectorAll("*");
  const darkSections = [...document.querySelectorAll('[nav="dark"]')];

  if (darkSections.length === 0) {
    // Se não há seções com nav="dark", aplica light diretamente
    navbarElements.forEach((el) => el.classList.add("light"));
    return;
  }

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
