const modalBtn = document.querySelectorAll(".open");
const modalBtnClose = document.querySelectorAll(".close");
const btnCloseEnd = document.querySelectorAll(".btnClose");

const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

/**
 * Manage the navigation page
 */
function openClosePageNavigation() {
  let nodeNavigation = document.getElementById("pageNavigation");

  if (nodeNavigation.classList.contains("isNavigationOpen")) {
    nodeNavigation.classList.remove("isNavigationOpen");
  } else {
    nodeNavigation.classList.add("isNavigationOpen");
  }
}

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// TO OPEN OR CLOSE THE FORM
// open modal event
modalBtn.forEach((btn) => btn.addEventListener("click", displayModal));

// close modal event
modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));
btnCloseEnd.forEach((btn) => btn.addEventListener("click", closeModal));
