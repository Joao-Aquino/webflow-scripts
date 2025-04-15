document.addEventListener("DOMContentLoaded", () => {
  const elementsToToggle = [
    document.querySelector(".navbar_component"),
    ...document.querySelectorAll(".navbar_logo-link"),
    ...document.querySelectorAll(".navbar_link"),
    ...document.querySelectorAll(".navbar_link-drop"),
    ...document.querySelectorAll(".dropdown-chevron"),
    document.querySelector(".search-navbar-button"),
    document.querySelector(".locale-dropdown-toogle"),
    document.querySelector(".menu-icon_line-top"),
    document.querySelector(".menu-icon_line-middle"),
    document.querySelector(".menu-icon_line-bottom"),
    document.querySelector(".navbar_background"),
    document.querySelector(".navbar_menu"),
  ].filter(Boolean); // Filtra elementos nulos/undefined

  const darkSections = document.querySelectorAll('[data-section="dark"]');

  const addImportantClass = (element, className) => {
    element.classList.add(className);
    const currentStyles = getComputedStyle(element);
    element.style.setProperty("color", currentStyles.color, "important");
    element.style.setProperty(
      "background-color",
      currentStyles.backgroundColor,
      "important"
    );
    // Adicione mais propriedades que precisar modificar como importante
  };

  const removeImportantClass = (element, className) => {
    element.classList.remove(className);
    element.style.removeProperty("color");
    element.style.removeProperty("background-color");
    // Remova mais propriedades que foram modificadas como importante
  };

  const updateClasses = (isDark) => {
    elementsToToggle.forEach((el) => {
      if (isDark) {
        addImportantClass(el, "dark");
      } else {
        removeImportantClass(el, "dark");
      }
    });
  };

  const checkSectionVisibility = () => {
    const navbarHeight = elementsToToggle[0].offsetHeight;
    const isDark = Array.from(darkSections).some((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= navbarHeight && rect.bottom >= 0;
    });
    updateClasses(isDark);
  };

  window.addEventListener("scroll", checkSectionVisibility);
  window.addEventListener("resize", checkSectionVisibility);
  checkSectionVisibility();
});
