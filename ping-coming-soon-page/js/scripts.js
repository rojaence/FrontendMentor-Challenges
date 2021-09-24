const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.email.value ? validateEmail(form.email.value) : showAlert("empty");
})

const showAlert = (type) => {
  switch (type) {
    case "empty":
      form.email.parentNode.dataset.error = "Whoops! It looks like you forgot to add your email";
      break;
    case "format":
      form.email.parentNode.dataset.error = "Please provide a valid email address";
      break;
  }
  form.email.parentNode.classList.add("form__field--error");
}

const resetStyle = () => {
  form.email.parentNode.dataset.error = "";
  form.email.parentNode.classList.remove("form__field--error");
}

const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailRegex.test(email) ? resetStyle() : showAlert("format");
};