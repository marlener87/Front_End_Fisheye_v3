const photographersSection = document.querySelector(".photographer_section");

/**
 * function qui va chercher les données dans le fichier .json
 */
async function getPhotographers() {
  // pour aller chercher un fichier .json
  const result = await fetch("/data/photographers.json").then((res) => {
    return res.json(); // obtenir les résultats
  });
  //console.log(result);

  return result;
}

/**
 * function qui va créer la carte du photographe, avec son nom, prénom, photo, ville, tagline, portrait et TJM
 * @param {*} objectPhotographers
 */
function displayPhotographers(objectPhotographers) {
  let tabindexCounter = 100;
  objectPhotographers.photographers.forEach((item) => {

    // passer ces résultats dans un pipeline => ce truc me retourne TOUJOURS le même object
    const photographer = PhotographerFactory(item, 'V1');

    // Création d'une nouvelle div
    const divCard = document.createElement("div"); 
    divCard.classList.add("card");

    // Modification du contenu de la nouvelle div
    divCard.innerHTML = `
        <a href="photographer.html?id=${photographer.id}" class="lienPhotographe" aria-label="bouton portrait et nom du photographe" tabindex="${tabindexCounter++}">
          <img src="../assets/photographersIDPhotos/${photographer.portrait}" alt="${photographer.name}" class="portrait">
          <h2 class="name" aria-label="nom du photographe">${photographer.name}</h2>
        </a>
        <p class="localisation" aria-label="localisation du photographe" tabindex="${tabindexCounter++}">${photographer.city}, ${photographer.country}</p>
        <p class="tagline" aria-label="citation du photographe" tabindex="${tabindexCounter++}">${photographer.tagline}</p>
        <p class="price" aria-label="tarif à la journée du photographe" tabindex="${tabindexCounter++}">${photographer.price}€/jour</p>
    `;

    // Ajout de la div dans le DOM
    photographersSection.appendChild(divCard);
  });
}

/**
 * 1ère fonction de la page qui est appelée et qui appelle toutes les autres
 */
async function init() {
  const listPhotographers = await getPhotographers(); // récupère les données des photographes
  displayPhotographers(listPhotographers);
}

init();

