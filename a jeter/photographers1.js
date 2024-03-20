// dans un fichier 'mediaFactory.js'
// function mediaFactory(data, type){
//     if(type === 'V1'){
//         return mediaV1(data)
//     }

//     if(type === 'V2'){
//         return mediaV2(data)
//     }
// }























// Code JavaScript lié à la page photographer.html
//const photographerID = 930; // Simulation de l'ID de la page de Mimi Keel
const photographerHeader = document.querySelector(".photograph-header");
const url = new URL(document.location.href);
const photographerID = parseInt(url.searchParams.get("id"));
const mediaPhotos = document.querySelector("#mediaPhotos");
const totalLikesDOM = document.querySelector("#totalLikes");
const carrouselPhotos = document.querySelector(".containerCarrousel");
const btnSliderNext = document.querySelector(".chevronD");
const btnSliderPrevious = document.querySelector(".chevronG");

let orderByType = "popularity"; 
const btnList = document.querySelectorAll(".btnSelect");

// Function pour récupérer avec un fetch (attention await/async) les données de tous les photographes
// Au lieu de retourner tous les photographes, retourne uniquement celui qui à le bon ID photographerID

/**
 * function qui appelle le fichier .json et récupère les photographes et leurs médias
 * met le 'like' en 'false'
 * @returns 
 */
async function getPhotographer() {
  const results = await fetch("/data/photographers.json").then((res) => {
    return res.json();
  });

  let photographer = null; // c'est un objet
  results.photographers.forEach((item) => {

    // FactoryPhotographer
    const newItem = PhotographerFactory(item, 'V1')

    if (newItem.id === photographerID) {
      photographer = newItem;
    };
  });

  let medias = []; // c'est un tableau
  results.media.forEach((itemMedia) => {

    // FactoryMedia
    const newMedia = mediaFactory(itemMedia, 'V1');

    //console.log(newMedia)

    if (newMedia.photographerId === photographerID) {
      medias.push({ ...newMedia, isLiked: false });
    }
  });

  return { photographer, medias };
}

/**
 * function qui va créer la carte du photographe, avec son nom, prénom, photo, ville, tagline et TJM en remplissant 'photographer.html'
 * bouton like = au clic, ajoute ou retire 1
 * @param {*} insertPhotographer 
 */
function displayPhotographer(insertPhotographer) {
  userName.innerHTML = insertPhotographer.name;
  userCity.innerHTML = `${insertPhotographer.city}, ${insertPhotographer.country}`;
  userTagline.innerHTML = insertPhotographer.tagline;

  userImage.src = `./assets/PhotographersIDPhotos/${insertPhotographer.portrait}`;
  userImage.alt = `Portrait du photographe ${insertPhotographer.name}`;
  // afficher le prix tjm
  tjm.innerHTML = `${insertPhotographer.price}€ / jour`;
}

// paramètre : permet de transmettre des infos de l'extérieur
/**
 * function qui affiche les medias du photographe, création de la page en JS
 * @param {*} medias 
 */
function displayMedias(medias) {
  // Réinitialise l'affichage
  mediaPhotos.innerHTML = "";

  let tabIndexMedias = 100;
  // parcours tous les médias, une boucle
  medias.forEach((media, index) => {
    const cardPhoto = document.createElement("div");
    cardPhoto.classList.add("cardPhoto");

    const mediaContent = media.image
    ? `<img src="./FishEye_Photos/${photographerID}/${media.image}" alt="image ${media.title}" id="photo ${media.id}" class="photo">` 
    : `<video class="photo">
      <source src="./FishEye_Photos/${photographerID}/${media.video}" type="video/mp4" alt="${media.title}">
      Votre navigateur ne prend pas en charge ce type de vidéo.
    </video>`;

    cardPhoto.innerHTML = `
    <button class="imagePhotographe" id="imagePhotographe" tabindex="${tabIndexMedias++}">${mediaContent}</button>
    <div class="infoPhoto">
      <h2 id="titre" tabindex="${tabIndexMedias++}">${media.title}</h2>
      <div class="likes" aria-label="nombre de likes total sur cette image" tabindex="${tabIndexMedias++}">
        <span class="card-likes" data-id="${media.id}" tabindex="${tabIndexMedias++}">${media.likes}</span>
        <button class="btnLike ${media.isLiked ? "isLiked" : ""}" data-id="${media.id}" tabindex="${tabIndexMedias++}" aria-label="coeur like">
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-heart fa-coeur"></i>
        </button>
      </div>
    </div> `;
    //console.log(cardPhoto);
    mediaPhotos.appendChild(cardPhoto);

    cardPhoto.addEventListener('click', () => {
      displaySlide(index);
      displayCarrousel();
    })

    const btn = document.querySelector(`.btnLike[data-id="${media.id}"]`);
    const cardLikes = document.querySelector(`.card-likes[data-id="${media.id}"]`);

    // bouton coeur, ajoute ou retire 1, colore ou retire la couleur du coeur
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      
      media.isLiked = !media.isLiked;
      // c'est une ternaire
      //cardLikes.innerHTML = media.isLiked ? media.likes + 1 : media.likes;
      if (media.isLiked) {
        cardLikes.innerHTML = media.likes + 1;
      } else {
        cardLikes.innerHTML = media.likes;
      };

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
      };

      displayLikes(medias);
    });
  });
}

/**
 * function qui additionne le total des likes d'un photographe
 * @param {*} medias 
 */
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

/////// TRI DES MEDIAS
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

    // Réinitialise l'affichage des médias dans le carrousel
    initCarrousel(newMedias);
  });
});

/**
 * function qui prend un tableau en paramètre
 * function qui retourne un tableau de médias triés
 * @param {*} mediasToSort 
 * @returns 
 */
function orderBy(mediasToSort) {
  const mediasSorted = mediasToSort;

  // trier mediasToSort en fonction de orderByType (par défaut popularité)
  mediasToSort.sort(function (a, b) {
    if (orderByType === "title") {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
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

/**
 * on ajoute toutes les images au carrousel et on les met sans la class='active'
 * @param {*} arrayImg 
 */
function initCarrousel(arrayImg) {
  // vide l'affichage
  carrouselPhotos.innerHTML = "";

  // parcours tous les médias, une boucle
  arrayImg.forEach((media) => {
    const carrouselPhoto = document.createElement("div");
    carrouselPhoto.classList.add("carrouselPhoto");
    carrouselPhoto.setAttribute("tabindex", "302");

    const mediaContent = media.image
    ? `<img src="./FishEye_Photos/${photographerID}/${media.image}" alt="${media.title}" id="carrouselImg ${media.id}" class="carrouselImg">` 
    : `<video controls class="carrouselVideo">
      <source src="./FishEye_Photos/${photographerID}/${media.video}" type="video/mp4" alt="${media.title}">
      Votre navigateur ne prend pas en charge ce type de vidéo.
    </video>`;

    carrouselPhoto.innerHTML = `
      ${mediaContent}
      <div class="infoPhoto">
        <h2 id="carrouselTitre" class="carrouselTitre">${media.title}</h2>
      </div>`;
    //console.log(carrouselPhoto);
    carrouselPhotos.appendChild(carrouselPhoto);
  });
}

/**
 * affiche la bonne slide (retire la class='active' à tout le monde et l'ajoute à la bonne slide)
 * va cherche les carrouselPhoto qu'il y a dans le DOM
 * @param {*} indexSlide 
 */
function displaySlide(indexSlide) {
  const photos = document.querySelectorAll(".carrouselPhoto");

  // retire la class='active' de tous les éléments
  for(let i = 0; i < photos.length; i++){
		photos[i].classList.remove("active")
	}
  photos[indexSlide].classList.add("active");

  // Sauvegarder la position du carrousel 
  carrouselPhotos.setAttribute("data-position", indexSlide)
}

// function btnSliderPrevious1() {
//   btnSliderPrevious.addEventListener('click', () => {
//     const position = carrouselPhotos.getAttribute('data-position')
//     let slideIndex = parseInt(position)
    
//     if(slideIndex > 0) {
//         slideIndex--
//     } else {
//         slideIndex = newMedias.length - 1
//     }
//     displaySlide(slideIndex);
//   })

// }



/**
 * function qui initialise toutes les functions
 * gère les boutons 'avant'/'après' du carrousel
 * */
async function init() {
  const { photographer, medias } = await getPhotographer();
  const newMedias = orderBy(medias); // va trier le tableau des médias
  displayPhotographer(photographer);
  displayMedias(newMedias);
  initCarrousel(newMedias);
  displayLikes(newMedias);

  // action sur chevron gauche dans carrousel
  btnSliderPrevious.addEventListener('click', () => {
    const position = carrouselPhotos.getAttribute('data-position')
    let slideIndex = parseInt(position)
    
    if(slideIndex > 0) {
        slideIndex--
    } else {
        slideIndex = newMedias.length - 1
    }
    displaySlide(slideIndex);
  })

  // action sur chevron droite dans carrousel
  btnSliderNext.addEventListener('click', () => {
    const position = carrouselPhotos.getAttribute('data-position')
    let slideIndex = parseInt(position)

    if(slideIndex < newMedias.length - 1) {
        slideIndex++
    } else {
        slideIndex = 0;
    }
    displaySlide(slideIndex);
  })

  // action sur flèche droite dans carrousel
  document.addEventListener('keydown', (e) => { 
    if(e.key === "ArrowRight") {
      e.preventDefault();
      console.log('flèche droite');
      
      const position = carrouselPhotos.getAttribute('data-position')
      let slideIndex = parseInt(position)

        if(slideIndex < newMedias.length - 1) {
            slideIndex++
        } else {
            slideIndex = 0;
        }
      displaySlide(slideIndex);
    }
  })

  // action sur flèche gauche dans carrousel
  document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      console.log('flèche gauche');
  
      const position = carrouselPhotos.getAttribute('data-position')
      let slideIndex = parseInt(position)
      
      if(slideIndex > 0) {
          slideIndex--
      } else {
          slideIndex = newMedias.length - 1
      }
      displaySlide(slideIndex);
    } 
   })
}

init();