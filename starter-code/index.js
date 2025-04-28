const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");

mobileNavToggle.addEventListener("click", () => {
  const span = mobileNavToggle.querySelector("span");
  const isExpanded = span.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    nav.classList.add("primary-navigation-expanded");
    mobileNavToggle.classList.add("mobile-nav-toggle-expanded");
    span.setAttribute("aria-expanded", "false");
  } else {
    nav.classList.remove("primary-navigation-expanded");
    mobileNavToggle.classList.remove("mobile-nav-toggle-expanded");
    span.setAttribute("aria-expanded", "true");
  }
});
