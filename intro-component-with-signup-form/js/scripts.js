const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.name.value ? resetStyle(form.name) : showAlert(form.name, "empty");
  form.surname.value ? resetStyle(form.surname) : showAlert(form.surname, "empty");
  form.email.value ? validateEmail() : showAlert(form.email, "empty");
  form.password.value ? resetStyle(form.password) : showAlert(form.password, "empty");
});

const showAlert = (field, type) => {
  switch (type) {
    case "empty":
      field.parentNode.dataset.error = `${field.placeholder} cannot be empty`;
      break;
    case "email format":
      field.parentNode.dataset.error = `Looks like this not an ${field.placeholder}`;
      break;
  }
  field.parentNode.classList.add("form__field--error");
}

const resetStyle = (field) => {
  field.parentNode.dataset.error = "";
  field.parentNode.classList.remove("form__field--error");
}

const validateEmail = () => {
  const emailRegex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailRegex.test(form.email.value) ? resetStyle(form.email) : showAlert(form.email, "email format");
};