const carrouselOpen = document.querySelectorAll(".imagePhotographe");
const carrouselBtnClose = document.querySelectorAll(".closeCarrousel"); // bouton croix
const carrousel = document.querySelector("#carrousel");

function closeModalCarrousel() {
  carrousel.style.display = "none";

  //   const openForm = document.querySelector(".containerCarrousel");
  //   openForm.classList.remove("hidden");

  //   const closeForm = document.querySelector(".closeCarrousel");
  //   closeForm.classList.remove("active");

  document.body.classList.remove("isModalOpen");
}

function displayCarrousel() {
  carrousel.style.display = "block";

  document.body.classList.add("isModalOpen");
}

carrouselOpen.forEach((btn) => btn.addEventListener("click", displayCarrousel));
carrouselBtnClose.forEach((btn) =>
  btn.addEventListener("click", closeModalCarrousel)
);
