const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let userEmail = emailInput.value;
  validateEmail(userEmail);
});

emailInput.addEventListener('keypress', (e) => {
  resetEmailError();
});

emailInput.addEventListener('change', (e) => {
  resetEmailError();
});

const validateEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address';
  }
  else {
      resetEmailError();
  }
};

const resetEmailError = () => {
    emailError.textContent = '';
}