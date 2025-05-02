export function initPrimaryNavigation() {
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.querySelector(".primary-navigation");
  const menu = navToggle.querySelector("span");

  if (!navToggle || !nav || !menu) return;

  navToggle.addEventListener("click", () => {
    const visibility = menu.getAttribute("aria-expanded");

    if (visibility === "false") {
      menu.setAttribute("aria-expanded", true);
      nav.classList.add("expanded");
      navToggle.setAttribute(
        "style",
        "background-image: url('./assets/shared/icon-close.svg');"
      );
    } else {
      menu.setAttribute("aria-expanded", false);
      nav.classList.remove("expanded");
      navToggle.setAttribute(
        "style",
        "background-image: url('./assets/shared/icon-hamburger.svg');"
      );
    }
  });
}

initPrimaryNavigation();
