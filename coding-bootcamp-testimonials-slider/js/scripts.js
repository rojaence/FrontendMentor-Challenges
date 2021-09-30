const sliderContainer = document.getElementById("testimonials-container");
const testimonialContainer = document.getElementById("testimonials");
const cardTemplate = document.getElementById("card-template");
const previousButton = document.getElementById("slider-previous");
const nextButton = document.getElementById("slider-next");
var cont = 0;

const testimonialData = [
  {
    name: "Tanya Sinclair",
    picture: "../assets/images/image-tanya.jpg",
    profession: "UX Engineer",
    comment:
      "I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future",
  },
  {
    name: "John Tarkpor",
    picture: "../assets/images/image-john.jpg",
    profession: "Junior Front-end Developer",
    comment:
      "If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer",
  }
];

sliderContainer.style.width = `${testimonialData.length * 100}%`;

previousButton.addEventListener("click", () => {
  if (cont > 0) {
    slideImage("previous");
  }
});

nextButton.addEventListener("click", () => {
  if (cont == 0 || cont < testimonialData.length - 1) {
    slideImage("next");
  }
});

sliderContainer.addEventListener("click", () => {
  nextButton.focus();
});

window.addEventListener("keydown", (e) => {
  if ( document.activeElement == nextButton || document.activeElement == previousButton) {
    if (e.key == "ArrowLeft") {
      if (cont > 0) {
        slideImage("previous");
      }
    } else if (e.key == "ArrowRight") {
      if (cont == 0 || cont < testimonialData.length - 1) {
        slideImage("next");
      }
    }
  }
});

const readData = () => {
  const fragment = document.createDocumentFragment();
  testimonialData.forEach(testimonial => {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector('.card__image').setAttribute('src', testimonial.picture);
    card.querySelector('.card__copy').textContent = `“ ${testimonial.comment}. ”`;
    card.querySelector('.card__name').textContent = testimonial.name;
    card.querySelector('.card__profession').textContent = testimonial.profession;
    card.querySelector('.card').id = `card-${testimonialData.indexOf(testimonial)+1}`;
    card.querySelector('.card').style.width = `${100/testimonialData.length}%`;
    fragment.appendChild(card);
  })
  sliderContainer.appendChild(fragment);
  document.getElementById(`card-1`).classList.add('card--active')
  testimonialData.length > 1 ? (
    previousButton.classList.add('slider-control__button--disabled')
  ) : (
    previousButton.classList.add('slider-control__button--disabled'),
    nextButton.classList.add('slider-control__button--disabled')
  );
}

const slideImage = (side) => {
  const nodeReference = document.getElementById(`card-${cont+1}`);
  let nodeNeighbor;
  switch (side) {
    case "previous":
      cont--;
      break;
    case "next":
      cont++;
      break;
  }
  nodeNeighbor = document.getElementById(`card-${cont+1}`);
  sliderContainer.style.left = `-${cont}00%`;
  nodeReference.classList.remove('card--active');
  nodeNeighbor.classList.add('card--active');

  if (testimonialData.length == 2) {
    switch (nodeReference.id) {
      case `card-${1}`:
        nextButton.classList.add('slider-control__button--disabled');
        previousButton.classList.remove('slider-control__button--disabled');
        break;
      case `card-${2}`:
        previousButton.classList.add('slider-control__button--disabled');
        nextButton.classList.remove('slider-control__button--disabled');
        break;
    }
  } else {
    switch (nodeNeighbor.id) {
      case `card-${1}`:
        previousButton.classList.add('slider-control__button--disabled');
        break;
      case `card-${testimonialData.length}`:
        nextButton.classList.add('slider-control__button--disabled');
        break;
      default:
        previousButton.classList.remove('slider-control__button--disabled');
        nextButton.classList.remove('slider-control__button--disabled');
        break;
    }
  }
}

readData();