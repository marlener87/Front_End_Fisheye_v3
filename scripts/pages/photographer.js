//Mettre le code JavaScript lié à la page photographer.html
//const photographerID = 930; // Simulation de l'ID de la page de Mimi Keel
const photographerHeader = document.querySelector(".photograph-header");
const url = new URL(document.location.href);
const photographerID = parseInt(url.searchParams.get("id"));
const mediaPhotos = document.querySelector("#mediaPhotos");
const totalLikesDOM = document.querySelector("#totalLikes");

// Function pour récupérer avec un fetch (attention await/async) les données de tous les photographes
// Au lieu de retourner tous les photographes, retourne uniquement celui qui à le bon ID photographerID

async function getPhotographer() {
  const results = await fetch("/data/photographers.json").then((res) => {
    return res.json();
  });

  let photographer = null; // c'est un objet
  results.photographers.forEach((item) => {
    if (item.id === photographerID) {
      photographer = item;
    }
  });

  let medias = []; // c'est un tableau
  results.media.forEach((itemMedia) => {
    if (itemMedia.photographerId === photographerID) {
      medias.push({ ...itemMedia, isLiked: false });
    }
  });

  return { photographer, medias };
  //return result;
}

// fonction get medias

function displayPhotographer(insertPhotographer) {
  // insertPhotographer.photographers.forEach((item) => {
  //   const divInsert = document.createElement("div");
  //   divInsert.classList.add("insert");

  //   divInsert.innerHTML = `
  //         <div class='coordonnees'>
  //             <h2 class="name">${insertPhotographer.name}</h2>
  //             <p class="localisation">${insertPhotographer.city}, ${insertPhotographer.country}</p>
  //             <p class="tagline">${insertPhotographer.tagline}</p>
  //         </div>
  //         <div class='portraitPhotographe'>
  //             <img src="../assets/photographersIDPhotos/${insertPhotographer.portrait}" alt="${insertPhotographer.name}"  class="imgPortrait">
  //         </div>
  //     `;

  userName.innerHTML = insertPhotographer.name;
  userCity.innerHTML = `${insertPhotographer.city}, ${insertPhotographer.country}`;
  userTagline.innerHTML = insertPhotographer.tagline;

  userImage.src = `./assets/PhotographersIDPhotos/${insertPhotographer.portrait}`;
  userImage.alt = `Portrait du photographe ${insertPhotographer.name}`;
  // afficher le prix tjm
  tjm.innerHTML = `${insertPhotographer.price}€ / jour`;

  //photographerHeader.appendChild(divInsert);
  //});
}

// function displayMedias(photoMedia) {
//   const divInsert = document.createElement("div");
//   divInsert.classList.add("cardPhoto");

//   divInsert.innerHTML = `
//     <img src="./FishEye_Photos/${photographerID.id}/${photoMedia.image}" alt="">
//   `;
//   console.log(divInsert);
//   mediaPhotos.appendChild(divInsert);
//   //  photoMedia.
// }

function displayMedias(medias) {
  // Réinitialise l'affichage
  mediaPhotos.innerHTML = "";

  // parcours tous les médias, une boucle
  medias.forEach((media) => {
    const cardPhoto = document.createElement("div");
    cardPhoto.classList.add("cardPhoto");

    cardPhoto.innerHTML = `
    <img src="./FishEye_Photos/${photographerID}/${
      media.image
    }" alt="" id="photo" class="photo">
    <div class="infoPhoto">
      <p id="titre">${media.title}</p>
      <div class="likes">
        <span class="card-likes" data-id="${media.id}">${media.likes}</span>
        <button class="btnLike ${media.isLiked ? "isLiked" : ""}" data-id="${
      media.id
    }">
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
    </div> `;

    mediaPhotos.appendChild(cardPhoto);

    const btn = document.querySelector(`.btnLike[data-id="${media.id}"]`);
    const cardLikes = document.querySelector(
      `.card-likes[data-id="${media.id}"]`
    );

    btn.addEventListener("click", () => {
      /* faire la trace
      media.isLiked = false;
      media.likes = 88;
      button = ".btnLike";
      cardLikes.innerHTML = media.likes  = 88

      media.isLiked = true;
      media.likes = 88;
      button = ".btnLike .isLiked";
      cardLikes.innerHTML = media.likes + 1 = 89

      media.isLiked = false;
      media.likes = 88;
      button = ".btnLike";
      cardLikes.innerHTML = media.likes  = 88
      */
      media.isLiked = !media.isLiked;
      // c'est une ternaire
      //cardLikes.innerHTML = media.isLiked ? media.likes + 1 : media.likes;
      if (media.isLiked) {
        cardLikes.innerHTML = media.likes + 1;
      } else {
        cardLikes.innerHTML = media.likes;
      }

      /*
      if(media.isLiked === true) équivaut à if(media.isLiked)
      if(media.isLiked === false) équivaut à if(!media.isLiked)
      */

      if (media.isLiked === true) {
        if (btn.classList.contains("isLiked") === false) {
          btn.classList.add("isLiked");
        }
      } else {
        btn.classList.remove("isLiked");
      }
      //btn.classList.toggle("isLiked");

      displayLikes(medias);
    });
  });

  //   je parcours la liste des medias
  //     je prends les likes de chaque media
  //     je les additionne
  // };

  //photo.src = `./FishEye_Photos/${photographerID}/${photoMedia.id}`;

  //titre.innerHTML = photoMedia.title;
  //likes.innerHTML = photoMedia.likes;
}

function displayLikes(medias) {
  let likes = 0;
  for (let i = 0; i < medias.length; i++) {
    likes += medias[i].likes;

    if (medias[i].isLiked === true) {
      likes++;
    }
  }

  totalLikesDOM.innerHTML = likes;
}

/**
 * TODO:
 * - Lorsque tu click sur le choix du dropdown de tri (onChange) (addeventlistener)
 * - supprime les médias (remove)
 * - Récupérer les médias
 * - Trier le tableau de médias - fonction à faire
 * - Réafficher avec les médias triés précédement
 *
 *
 * tri un tableau d'objet
 */
// function orderBy() {
//   let x = document.getElementById("orderBy").value;
//   const element = document.getElementById("mediaPhotos");
//   document.getElementById("demo").innerHTML = "Vous avez sélectionné " + x;
//   element.remove();
// }

let orderByType = "popularity"; // fonctionne
//let orderByType = "title"; // fonctionne
//let orderByType = "date"; // fonctionne

// si on clique sur une option, ce que l'on a choisi s'affiche dans le <p>

// let orderByTypeSelect = document.querySelector("#orderBy");
// orderByTypeSelect.addEventListener("change", async (e) => {
//   e.preventDefault();

//   // Change le type de tri
//   orderByType = e.target.value;

//   // récupère les médias = simulation de l'API
//   const { medias } = await getPhotographer();

//   // va trier le tableau des médias avec le new orderByType
//   const newMedias = orderBy(medias);

//   // Affichage des médias triés
//   displayMedias(newMedias);

//   //return orderByType;
// });
const btnList = document.querySelectorAll(".btnSelect");
btnList.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    orderByType = btn.getAttribute("data-value");

    // récupère les médias = simulation de l'API
    const { medias } = await getPhotographer();

    // va trier le tableau des médias avec le new orderByType
    const newMedias = orderBy(medias);

    // Affichage des médias triés
    displayMedias(newMedias);
  });
});

// function sort() {
//   let sortValue = document.getElementById("orderBy").value;
//   return sortValue;
// }
// console.log(sort());

// la fonction orderBy prend un tableau en paramètre
// cette fonction est censée retourner un tableau de médias triés
function orderBy(mediasToSort) {
  // const orderByPopularity = document.querySelector(".popularity");
  // const orderByDate = document.querySelector(".date");
  // const orderByTitle = document.querySelector(".title");
  // //console.log(orderByTitle);

  // orderByTitle.addEventListener("click", () => {
  //   const element = document.getElementById("titre");

  //   //element.remove();
  //   element.sort();
  //   console.log(element);
  //   document.getElementById("titre");
  // });

  //const mediasSorted = [];
  const mediasSorted = mediasToSort;

  // to do
  // trier mediasToSort en fonction de orderByType (par défaut title)
  mediasToSort.sort(function (a, b) {
    if (orderByType === "title") {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
      //return a.title - b.title;
    }

    if (orderByType === "date") {
      // comparaison de a.date et de b.date il faut les transformer en objet date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      //return dateA - dateB;
      if (dateA > dateB) {
        return 1;
      }
      if (dateA < dateB) {
        return -1;
      }
      return 0;
    }

    if (orderByType === "popularity") {
      return parseInt(a.likes) - parseInt(b.likes);
    }
  });
  // mettre le résultat dans mediasSorted
  return mediasSorted;
}

// const btnSortByTitle = document.querySelector(".title");
// btnSortByTitle.addEventListener("click", () => {
//   const { medias } = getPhotographer();

//   const newMedias = orderBy(medias, "title");

//   displayMedias(newMedias);
// });

// const btnSortByDate = document.querySelector(".date");
// btnSortByDate.addEventListener("click", () => {
//   const { medias } = getPhotographer();

//   const newMedias = orderBy(medias, "date");

//   displayMedias(newMedias);
// });

// const btnSortByPopularity = document.querySelector(".popularity");
// btnSortByPopularity.addEventListener("click", () => {
//   const { medias } = getPhotographer();

//   const newMedias = orderBy(medias, "popularity");

//   displayMedias(newMedias);
// });

async function init() {
  //const object = await getPhotographer();
  //displayPhotographer(object.photographer);
  //displayMedias(object.medias);

  //const object = await getPhotographer();
  //const photographer = object.photographer
  //const medias = object.medias
  //displayPhotographer(photographer);
  //displayMedias(medias);

  const { photographer, medias } = await getPhotographer();
  const newMedias = orderBy(medias); // va trier le tableau des médias
  displayPhotographer(photographer);
  displayMedias(newMedias);
  displayLikes(newMedias);
}

init();
