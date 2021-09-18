# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshots

Light theme

![](./assets/screenshots/light-main-screenshot.png)  

Dark Theme  

![](./assets/screenshots/dark-main-screenshot.png)  

Modal window  

![](./assets/screenshots/light-modal-screenshot.png)  
![](./assets/screenshots/dark-modal-screenshot.png)  

Drag and Drop  
![](./assets/screenshots/drag-screenshot.png)  

### Links

- Live Site URL: [Todo App](https://rojaence.github.io/FrontendMentor-Challenges/todo-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Normalize
- Mobile-first workflow
- Vanilla JS
- Local Storage
- IndexedDB

### What I learned

How to create a modal window only HTML, CSS, and JS

```html
<div class="modal" id="modal-window" data-modal="window">
<div class="modal__content" data-modal="content">
  <img alt="alert icon" class="modal__icon" data-modal="content" id="modal-icon">
  <p class="modal__message" id="modal-message" data-modal="content" id="modal-message"></p>
  <div class="modal__actions">
    <button class="modal__button modal__button--confirm" data-action="confirm" id="modal-button-confirm">Ok</button>
    <button class="modal__button modal__button--cancel" data-action="cancel" id="modal-button-cancel">Cancel</button>
  </div>
</div>
```
  
Show each modal window case with a function  
```js
const showModalWindow = (message, type) => {
  modalMessage.textContent = message;
  modalConfirmButton.focus();
  switch (type) {
    case "alert":
      modalIcon.setAttribute("src", "../assets/images/alert.svg");
      modalConfirmButton.setAttribute("data-action", "confirm");
      modalConfirmButton.style.display = "block";
      modalCancelButton.style.display = "none";
      break;
    case "question":
      modalIcon.setAttribute("src", "../assets/images/question.svg");
      modalConfirmButton.setAttribute("data-action", "clear-completed");
      modalConfirmButton.style.display = "block";
      modalCancelButton.style.display = "block";
      break;
  }
  modalWindow.classList.add("modal--active");
}
```

### Useful resources

- [Sweetalert](https://sweetalert2.github.io/) - This helped me to define a modal window layout. I really liked this pattern and will use it going forward.

## Author

- Frontend Mentor - [@rojaence](https://www.frontendmentor.io/profile/rojaence)
- Twitter - [@EndaraRonny](https://www.twitter.com/EndaraRonny)
