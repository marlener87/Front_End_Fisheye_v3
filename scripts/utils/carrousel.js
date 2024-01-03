const carrouselOpen = document.querySelectorAll(".imagePhotographe");
const carrouselBtnClose = document.querySelectorAll(".closeCarrousel"); // bouton croix
const carrousel = document.querySelector("#carrousel");

function closeModalCarrousel() {
  carrousel.style.display = "none";

  document.body.classList.remove("isModalOpen");
}

function displayCarrousel() {
  carrousel.style.display = "block";

  document.body.classList.add("isModalOpen");
  document.querySelector(".closeCarrousel").focus();    
}

carrouselOpen.forEach((btn) => btn.addEventListener("click", displayCarrousel));
carrouselBtnClose.forEach((btn) =>
  btn.addEventListener("click", closeModalCarrousel)
);
