const cardBody = document.getElementById("card-body");
const targetsClassList = ["card__question", "card__arrow"];

cardBody.addEventListener("click", (e) => {
  if (targetsClassList.includes(e.target.classList[0])){ 
      e.target.parentElement.classList.toggle("card__accordion--active");
  }
});