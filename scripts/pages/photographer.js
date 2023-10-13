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
        <button class="btnLike ${media.isLiked ? "isLiked" : ""}" data-id="${
      media.id
    }">
          <span class="card-likes" data-id="${media.id}">${media.likes}</span>
        </button>
        <i class="fa-regular fa-heart"></i>
        
      </div>
    </div> `;

    mediaPhotos.appendChild(cardPhoto);

    const btn = document.querySelector(`.btnLike[data-id="${media.id}"]`);
    const cardLikes = document.querySelector(
      `.card-likes[data-id="${media.id}"]`
    );

    btn.addEventListener("click", () => {
      const heartFull = document.querySelector(".fa-regular");
      media.isLiked = !media.isLiked;
      cardLikes.innerHTML = media.isLiked ? media.likes + 1 : media.likes;

      if (media.isLiked === true) {
        heartFull.classList.toggle("fa-solid");
      }

      displayLikes(medias);
    });
  });

  /* <i class="fa-solid fa-heart"></i>

<svg width="18" height="18" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"
      fill="#911C1C" />
</svg> */

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

function orderBy() {
  const orderByPopularity = document.querySelector(".popularity");
  const orderByDate = document.querySelector(".date");
  const orderByTitle = document.querySelector(".title");
  //console.log(orderByTitle);

  orderByTitle.addEventListener("click", () => {
    const element = document.getElementById("titre");

    //element.remove();
    element.sort();
    console.log(element);
    document.getElementById("titre");
  });
}

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

  displayPhotographer(photographer);
  displayMedias(medias);
  displayLikes(medias);
  orderBy(medias);
}

init();
