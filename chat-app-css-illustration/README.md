# Frontend Mentor - Chat app CSS illustration solution

This is a solution to the [Chat app CSS illustration challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/chat-app-css-illustration-O5auMkFqY). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

### The challenge

Users should be able to:

- View the optimal layout for the component depending on their device's screen size
- **Bonus**: See the chat interface animate on the initial load


## My process

### Built with

- Semantic HTML5 markup
- BEM Methodology
- Flexbox
- CSS Grid
- Normalize CSS
- FontAwesome
- Mobile-first workflow

### What I learned

Loops with sass

```css
  @for $i from 1 through 8 {
    .mobile__message:nth-child(#{$i}) {
      animation-delay: $delay;
    }
    $delay: $delay + 0.1s;
  }
```


Animations with css

```css
  .mobile__message {
    animation: grow 1s;
    &--recieved {
      transform-origin: left;
    }
    &--sent {
      transform-origin: right;
    }
  }
  @keyframes grow {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
```

## Author

- Frontend Mentor - [@rojaence](https://www.frontendmentor.io/profile/rojaence)

