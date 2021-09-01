const shareButton = document.getElementById("button-share");
const shareMenu = document.getElementById("share-menu");

shareButton.addEventListener("click", () => {
  shareMenu.classList.contains("share--active")
    ? (shareMenu.classList.remove("share--active"),
      shareButton.classList.remove("card__button--active"))
    : (shareMenu.classList.add("share--active"),
      shareButton.classList.add("card__button--active"));
});
