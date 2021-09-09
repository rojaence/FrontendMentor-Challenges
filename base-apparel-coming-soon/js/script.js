const submitButton = document.getElementById("submit-button");
const form = document.getElementById("form");
const emailInput = document.getElementById("form-email");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  validateEmail(emailInput.value);
});

emailInput.addEventListener("click", () => {
  form.classList.remove("email-error");
});

const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    form.classList.add("email-error");
  } else {
    form.classList.remove("email-error");
  }
};
