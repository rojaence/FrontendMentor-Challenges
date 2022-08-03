const themeSelector = document.getElementById("theme-selector");
const themeButtons = themeSelector.getElementsByClassName(
  "theme-selector__button"
);
const keypad = document.getElementById("keypad");
const display = document.getElementById("result");
var globalNumber = null;
var focusNumber = 'global';
var secondNumber = null;
var globalOperator = null;

const keyboardMap = {
  "0": { value: "0", type: "number" },
  "1": { value: "1", type: "number" },
  "2": { value: "2", type: "number" },
  "3": { value: "3", type: "number" },
  "4": { value: "4", type: "number" },
  "5": { value: "5", type: "number" },
  "6": { value: "6", type: "number" },
  "7": { value: "7", type: "number" },
  "8": { value: "8", type: "number" },
  "9": { value: "9", type: "number" },
  ".": { value: ".", type: "number" },
  "*": { value: "mult", type: "operator" },
  "/": { value: "divi", type: "operator" },
  "-": { value: "subst", type: "operator" },
  "+": { value: "sum", type: "operator" },
  "=": { value: "equal", type: "operator" },
  "Backspace": { value: "del", type: "operator" },
  "Delete": { value: "reset", type: "operator" },
  "Enter": { value: "equal", type: "operator" },
}

const errorMessages = [
  'undefined',
  'cannot be divided by zero',
]

window.addEventListener('load', () => {
  let theme = window.localStorage.getItem("calc-app-theme");
  if (theme) {
    setTheme(theme);
  } else {
    setTheme("theme-1");
  }
})

themeSelector.addEventListener("click", (e) => {
  if (e.target.dataset.role === "button") {
    const theme = e.target.dataset.value;
    setTheme(theme);
  }
});

keypad.addEventListener("click", (e) => {
  if (e.target.dataset.value === "reset") {
    performOperation();
  }
  if (!checkIfErrorDisplay()) {
    if (e.target.classList.contains("calculator__key")) {
      switch (e.target.dataset.type) {
        case "number":
          if (display.textContent.length <= 16) {
            writeInDisplay(e.target.dataset.value);
            displayFontSize();
          }
          break;
        case "operator":
          performOperation(e.target.dataset.value);
          break;
      }
    }
  }
});

window.addEventListener("load", () => {
  if (window.localStorage.getItem("calc-app-theme")) {
    theme = window.localStorage.getItem("calc-app-theme");
    setTheme(window.localStorage.getItem("calc-app-theme"));
  } else {
    window.localStorage.setItem("calc-app-theme", "theme-1");
    setTheme("theme-1");
  }
});

const setTheme = (theme) => {
  switch (theme) {
    case "theme-1":
      document.body.className = "theme--one";
      window.localStorage.setItem("calc-app-theme", "theme-1");
      break;
    case "theme-2":
      document.body.className = "theme--two";
      window.localStorage.setItem("calc-app-theme", "theme-2");
      break;
    case "theme-3":
      document.body.className = "theme--three";
      window.localStorage.setItem("calc-app-theme", "theme-3");
      break;
  }
  for (let button of themeButtons) {
    if (button.id === `button-${theme}`) {
      button.classList.add("theme-selector__button--active");
    } else {
      button.classList.remove("theme-selector__button--active");
    }
  }
  window.localStorage.setItem("calc-app-theme", theme);
};

window.addEventListener('keydown', (e) => {
  if (keyboardMap[e.key]) {
    document.querySelector(`[data-value="${keyboardMap[e.key].value}"]`).click();
  }
});

const writeInDisplay = (value) => {
  let number = display.textContent.replace(/,/g, '');
  if (parseFloat(number) >= 0 && parseFloat(value) >= 0) {
    number == '0'
      ? (number = `${value}`)
      : (number = `${number}${value}`);
  } else if (value == ".") {
    if (parseFloat(number) > 0 && !number.includes('.')) {
      number = `${number}${value}`;
    }
    if (number == '0') {
      number = '0.';
    }
  } 
  display.textContent = validateFormat(number);
};

const performOperation = (operator) => {
  switch (operator) {
    case "reset":
      clearDisplay("all");
      break;
    case "del":
      clearDisplay("digit");
      break;
    case 'equal':
      if (secondNumber == null) {
        secondNumber = parseFloat(display.textContent.replace(/,/g, ''));
      }
      if (globalOperator != null && secondNumber != null) {
        arithmeticOperation(globalOperator);
      }
      break;
    default:
      if (globalNumber == null) {
        globalNumber = parseFloat(display.textContent.replace(/,/g, ''));
      }
      secondNumber = null;
      display.textContent = '0';
      focusNumber = 'second'; 
      globalOperator = operator;
      break;
  }
};

const arithmeticOperation = (operator) => {
  if (globalNumber == 0 && secondNumber == 0 && operator == 'divi') {
    display.textContent = 'Undefined';
  } else if (secondNumber == 0 && operator == 'divi') {
    display.textContent = 'Cannot be divided by zero';
  } else {
    switch (operator) {
      case 'sum':
        globalNumber += secondNumber;
        break;
      case 'subst':
        globalNumber -= secondNumber;
        break;
      case 'mult':
        globalNumber *= secondNumber;
        break;
      case 'divi':
        globalNumber /= secondNumber;
    }
    display.textContent = validateFormat(globalNumber);
  }
  displayFontSize();
}

const displayFontSize = () => {
  if (display.textContent.length >= 12) {
    display.classList.add('calculator__result--small-font')
  } else {
    display.classList.remove('calculator__result--small-font')
  }
}

const clearDisplay = (type) => {
  switch (type) {
    case "all":
      display.textContent = 0;
      globalNumber = null;
      secondNumber = null;
      globalOperator = null;
      break;
    case "digit":
      if (display.textContent.length == 1) {
        display.textContent = 0;
      } else {
        let number = 0;
        if (display.textContent[display.textContent.length - 2] == ',') { number = display.textContent.slice(0, display.textContent.length - 2) } 
        else { number = display.textContent.slice(0, display.textContent.length - 1)}
        display.textContent = validateFormat(number.replace(/,/g, ''));
      }
      break;
  }
  displayFontSize();
};

const validateFormat = (number) => {
  var str = number.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
};

const checkIfErrorDisplay = () => {
  if (errorMessages.includes(display.textContent.toLowerCase())) {
    globalNumber = null;
    secondNumber = null;
    globalOperator = null;
    return true;
  } else {
    return false;
  }
}