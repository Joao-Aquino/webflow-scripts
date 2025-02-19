document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navbarBackground = document.querySelector(".navbar_background");
  const navbarImage = document.querySelector(".navbar_brand-image");
  const navbarButton = document.querySelector(".button");
  const navbarMenuTop = document.querySelector(".menu-icon2_line-top");
  const navbarMenuMiddle = document.querySelector(".menu-icon2_line-middle");
  const navbarMenuBottom = document.querySelector(".menu-icon2_line-bottom");
  const navbarMenu = document.querySelector(".navbar_navmenu");
  const links = navbar.querySelectorAll(".navbar_navlink");

  const darkSections = document.querySelectorAll('[nav-theme="dark"]');

  const updateClasses = (isDark) => {
    navbar.classList.toggle("dark", isDark);
    navbarBackground?.classList.toggle("dark", isDark);
    navbarImage?.classList.toggle("dark", isDark);
    navbarButton?.classList.toggle("dark", isDark);
    links.forEach((link) => link.classList.toggle("dark", isDark));
    if (window.innerWidth <= 991) {
      navbarMenuTop?.classList.toggle("dark", isDark);
      navbarMenuMiddle?.classList.toggle("dark", isDark);
      navbarMenuBottom?.classList.toggle("dark", isDark);
      navbarMenu?.classList.toggle("dark", isDark);
    }
  };
  const checkSectionVisibility = () => {
    const navbarHeight = navbar.offsetHeight;
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
