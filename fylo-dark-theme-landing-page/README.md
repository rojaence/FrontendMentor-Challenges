# Frontend Mentor - Fylo dark theme landing page solution

This is a solution to the [Fylo dark theme landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/fylo-dark-theme-landing-page-5ca5f2d21e82137ec91a50fd). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page

### Screenshots

Mobile
![](assets/screenshots/mobile_screenshot.png)

Desktop
![](assets/screenshots/desktop_screenshot.png)

### Links

- Live Site URL: [Fylo dark theme landing page](https://rojaence.github.io/FrontendMentor-Challenges/fylo-dark-theme-landing-page/)

## My process

### Built with

- Semantic HTML5 markup
- Normalize CSS
- Flexbox
- CSS Grid
- Mobile-first workflow
- Font Awesome
- Vanilla JavaScript

### What I learned

Use a 'br' tag to split a paragraph via CSS media queries:

```html
<a
  href="https://www.frontendmentor.io?ref=challenge"
  class="attribution__link"
  target="_blank"
  >Frontend Mentor</a
>. <br class="line-break" />
Coded by
<a href="https://github.com/rojaence" class="attribution__link" target="_blank"
  >Ronny Endara</a
>.
```

```css
@media screen and (min-width: 1025px) {
  .line-break {
    display: none;
  }
}
```

Use a 'tag' to show email error validation through a function with regex:

```html
<label for="email" id="email-error" class="form__email--error"></label>
```

```js
const validateEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address';
  }
```

## Author

- Frontend Mentor - [@rojaence](https://www.frontendmentor.io/profile/rojaence)
