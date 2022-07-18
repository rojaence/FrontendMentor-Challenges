const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');
const slider = document.getElementById('slider');
const sliderImages = document.querySelectorAll('.slider__picture');
const sliderControl = document.getElementById('slider-switch');
const sliderControlButtons = document.querySelectorAll('.slider-switch__button');
const sliderCards = document.querySelectorAll('.card');

menuButton.addEventListener('click', (e) => {
  if (mainNav.classList.contains('main-nav-container--active')) {
    toggleMenu(false);
  } else {
    toggleMenu(true);
  }
});

mainNav.addEventListener('click', (e) => {
  if (e.target.classList.contains('main-nav-container')) {
    toggleMenu(false);
  }
});

sliderControlButtons.forEach(controlButton => {
  controlButton.addEventListener('click', (e) =>  {
    toggleSlider(controlButton.dataset.id);
  })
});

const toggleSlider = (index) => {
  sliderControlButtons.forEach(button => {
    if (button.dataset.id === index) button.classList.add('slider-switch__button--active');
    else button.classList.remove('slider-switch__button--active');
  });

  sliderImages.forEach(image => {
    if (image.dataset.id === index) image.classList.add('slider__picture--active');
    else image.classList.remove('slider__picture--active');
  })

  sliderCards.forEach(card => {
    if (card.dataset.id === index) card.classList.add('card--active');
    else card.classList.remove('card--active');
  })
}

const toggleMenu = (active) => {
  if (active) {
    mainNav.classList.add('main-nav-container--active');
    menuButton.classList.add('menu-button--active');
  } else {
    mainNav.classList.remove('main-nav-container--active');
    menuButton.classList.remove('menu-button--active');
  }
}