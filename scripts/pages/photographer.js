// Code JavaScript lié à la page photographer.html
//const photographerID = 930; // Simulation de l'ID de la page de Mimi Keel
//const photographerHeader = document.querySelector(".photograph-header");
const url = new URL(document.location.href);
const photographerID = parseInt(url.searchParams.get("id"));
const mediaPhotos = document.querySelector("#mediaPhotos");
const totalLikesDOM = document.querySelector("#totalLikes");
const carrouselPhotos = document.querySelector(".containerCarrousel");
const btnSliderNext = document.querySelector(".chevronD");
const btnSliderPrevious = document.querySelector(".chevronG");
const userName = document.querySelector("#userName");
const userCity = document.querySelector("#userCity");
const userTagline = document.querySelector("#userTagline");
const userImage = document.getElementById("userImage");
const tjm = document.getElementById("tjm");

let orderByType = "popularity"; 
const btnList = document.querySelectorAll(".btnSelect");

let medias = []; // c'est un tableau
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
    // en passant par FactoryPhotographer
    //const newItem = PhotographerFactory(item, 'V1')
    // if (newItem.id === photographerID) {
    //   photographer = newItem;
    // };

    if (item.id === photographerID) {
      photographer = item
    }
  });

  medias = []; // c'est un tableau
  results.media.forEach((itemMedia) => {
    if (itemMedia.photographerId === photographerID) {
      medias.push({ ...itemMedia, isLiked: false });
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
  userImage.alt = `Portrait du photographe ${insertPhotographer.name}, ${insertPhotographer.city}, ${insertPhotographer.country}, ${insertPhotographer.tagline}`;
  // afficher le prix tjm
  tjm.innerHTML = `${insertPhotographer.price}€ / jour`;
}

// paramètre : permet de transmettre des infos de l'extérieur
/**
 * function qui affiche les medias du photographe, création de la page en JS
 * appelle la factory mediaFactory.js
 * @param {*} medias 
 */
function displayMedias(medias) {
  // Réinitialise l'affichage
  mediaPhotos.innerHTML = "";

  // parcours tous les médias, une boucle
  // on appelle la factory 'createMedia' qui est dans mediaFactory.js
  medias.forEach((media, index) => {
    const cardPhoto = createMedia(media, false);
    mediaPhotos.appendChild(cardPhoto);

    // au clique sur la photo, le carrousel s'ouvre
    cardPhoto.addEventListener('click', () => {
      displaySlide(index);
      displayCarrousel();
    })

    const btn = document.querySelector(`.btnLike[data-id="${media.id}"]`);  // correspond au coeur
    const cardLikes = document.querySelector(`.card-likes[data-id="${media.id}"]`); //correspond au nombre de likes sur l'image

    // bouton coeur, ajoute ou retire 1, colore ou retire la couleur du coeur
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      
      // booléen, si on clique dessus, mettre l'inverse le true passe à false et inversement (v l 48, initialisé à false)
      media.isLiked = !media.isLiked;

      // incrémente ou décrémente le nombre de likes de l'image
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

      // met le coeur vide ou le coeur rempli (style.css)
      if (media.isLiked === true) {
        if (btn.classList.contains("isLiked") === false) {
          btn.classList.add("isLiked");
        }
      } else {
        btn.classList.remove("isLiked");
      }

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

/////// TRI DES MEDIAS /////////////////////////////////////////////
btnList.forEach((btn) => {
  btn.addEventListener("click", () => {
    orderByType = btn.getAttribute("data-value");

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

////////////////////////// CARROUSEL ////////////////////////////////////////
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