const menuButton = document.getElementById("menu-button");
const mainNav = document.getElementById("main-nav");

window.addEventListener("click", (e) => {
  switch (e.target.dataset.menu) {
    case "main-menu-button":
      mainNav.classList.contains("main-nav--active")
        ? (mainNav.classList.remove("main-nav--active"),
          menuButton.classList.remove("menu-button--active"))
        : (mainNav.classList.add("main-nav--active"),
          menuButton.classList.add("menu-button--active"));
      break;
    case "main-menu":
      mainNav.classList.add("main-nav--active");
      menuButton.classList.add("menu-button--active");
      break;
    default:
      mainNav.classList.remove("main-nav--active");
      menuButton.classList.remove("menu-button--active");
  }
});
