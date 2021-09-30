# Frontend Mentor - Coding bootcamp testimonials slider solution

This is a solution to the [Coding bootcamp testimonials slider challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/coding-bootcamp-testimonials-slider-4FNyLA8JL). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the component depending on their device's screen size
- Navigate the slider using either their mouse/trackpad or keyboard

### Screenshot

![](./assets/design/screenshot.png)


### Links

- Live Site URL: [Clic here](https://rojaence.github.io/FrontendMentor-Challenges/coding-bootcamp-testimonials-slider/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- SASS
- Normalize
- BEM
- Mobile-first workflow
- Vanilla JS

### What I learned

HTML templates to render cards from JS

```html
  <template id="card-template">
    <article class="card">
      <header class="card__header">
        <figure class="card__figure">
          <img src="" alt="picture" class="card__image">
        </figure>
      </header>
      <div class="card__body">
        <p class="card__copy"></p>
      </div>
      <footer class="card__footer">
        <h2 class="card__name"></h2>
        <span class="card__profession"></span>
      </footer>
    </article>
  </template>
```  

Data is taken from an array of objects  

```js
const cardTemplate = document.getElementById("card-template");

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
  });
  sliderContainer.appendChild(fragment);
}
```

## Author

- Frontend Mentor - [@rojaence](https://www.frontendmentor.io/profile/rojaence)
- Twitter - [@EndaraRonny](https://www.twitter.com/EndaraRonny)

