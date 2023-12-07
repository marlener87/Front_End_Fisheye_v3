// VARIABLES
const modalBtn = document.querySelectorAll(".open");
const modalBtnClose = document.querySelectorAll(".close"); // bouton croix
const btnCloseEnd = document.querySelectorAll(".btnClose"); // bouton 'envoyer'

const modal = document.querySelector("#contact_modal");

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

let input = document.querySelectorAll("input");
// création de la variable qui récupère les données de l'input
//let inputValue = "";

let btnSubmitValidationForm = document.querySelector("#button");
let inputFirst = document.querySelector("#firstName");
let inputLast = document.querySelector("#lastName");
let inputEmail = document.querySelector("#email");
let inputMessage = document.querySelector("#message");

function displayModal() {
  modal.style.display = "block";

  const myBody = document.querySelector("body");
  myBody.classList.add("isModalOpen");
}

function closeModal() {
  modal.style.display = "none";

  const openForm = document.querySelector("#openForm");
  openForm.classList.remove("hidden");

  const closeForm = document.querySelector(".close");
  closeForm.classList.remove("active");

  const myBody = document.querySelector("body");
  myBody.classList.remove("isModalOpen");

  resetMyForm();
}

/**
 * function to validate lastname and firstname
 * @param {object} inputName
 * @param {string} inputId
 * @returns {boolean} isInputValid retourne si l'input est rempli
 */
function checkInputsValidationName(inputName, inputId) {
  const error = document.querySelector("#" + inputId);
  let inputFirst = firstName.value;
  let inputLast = lastName.value;
  let isInputValid = false;

  if (inputName.value === "" || inputName.value.trim().length < 2) {
    error.innerHTML = "Merci de remplir ce champ.";
    isInputValid = false;
  } else {
    error.innerHTML = "";
    isInputValid = true;
  }

  return {
    isInputValid: isInputValid,
    inputLast: inputLast,
    inputFirst: inputFirst,
  };
}

/**
 * function to validate email
 * @returns {boolean} isInputValid retourne si l'input est rempli
 */
function checkInputValidationEmail() {
  const error = document.querySelector("#emailError");

  let regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
  let inputEmail = email.value;
  let isInputValid = false;

  if (regex.test(inputEmail)) {
    error.innerHTML = "";
    isInputValid = true;
  } else {
    error.innerHTML = "Merci de remplir correctement ce champ.";
    isInputValid = false;
  }

  return {
    isInputValid: isInputValid,
    inputEmail: inputEmail,
  };
}

/**
 * function to validate message
 * @returns {boolean} isInputValid retourne si l'input est rempli
 */
function checkInputValidationMessage() {
  const error = document.querySelector("#messageError");

  let inputMessage = message.value;
  let isInputValid = false;

  if (inputMessage === "" || inputMessage.trim().length < 5) {
    error.innerHTML = "Merci de remplir correctement ce champ.";
    isInputValid = false;
  } else {
    error.innerHTML = "";
    isInputValid = true;
  }

  return {
    isInputValid: isInputValid,
    inputMessage: inputMessage,
  };
}

/**
 * function to reset form
 */
function resetMyForm() {
  inputFirst.value = "";
  inputLast.value = "";
  inputEmail.value = "";
  inputMessage.value = "";
}

// EVENTS
// creation of the button variable
const openForm = document.querySelector("#openForm");
openForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const error = document.querySelector("#btnError");
  //console.log('le formulaire est bon.');

  const isFirstNameIsValid = checkInputsValidationName(
    firstName,
    "firstNameError"
  );
  console.log(isFirstNameIsValid);
  const isLastNameIsValid = checkInputsValidationName(
    lastName,
    "lastNameError"
  );
  console.log(isLastNameIsValid);
  const isEmailIsValid = checkInputValidationEmail();
  console.log(isEmailIsValid);
  const isMessageIsValid = checkInputValidationMessage();
  console.log(isMessageIsValid);

  if (
    isFirstNameIsValid.isInputValid &&
    isLastNameIsValid.isInputValid &&
    isEmailIsValid.isInputValid &&
    isMessageIsValid.isInputValid
  ) {
    const openForm = document.querySelector("#openForm");
    openForm.classList.add("hidden");

    const closeForm = document.querySelector(".close");
    closeForm.classList.add("active");

    resetMyForm();

    console.log("Le formulaire est bon");
    error.innerHTML = "";
  } else {
    error.innerHTML = "Merci de remplir correctement le formulaire.";
    console.log("le formulaire n'est pas bon");
  }
});

// creation of the firstname variable
inputFirst.addEventListener("input", (event) => {
  event.preventDefault();

  // checkInputFirstName();
  checkInputsValidationName(firstName, "firstNameError");
});

// creation of the lastname variable
inputLast.addEventListener("input", (event) => {
  event.preventDefault();

  //checkInputLastName();
  checkInputsValidationName(lastName, "lastNameError");
});

// creation of the email variable
inputEmail.addEventListener("input", (event) => {
  event.preventDefault();

  checkInputValidationEmail();
});

inputMessage.addEventListener("textarea", (event) => {
  event.preventDefault();

  checkInputValidationMessage();
});

// TO OPEN OR CLOSE THE FORM
// open modal event
modalBtn.forEach((btn) => btn.addEventListener("click", displayModal));

// close modal event
modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));
btnCloseEnd.forEach((btn) => btn.addEventListener("click", closeModal));
