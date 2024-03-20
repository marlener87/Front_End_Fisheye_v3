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
};

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
    divCard.setAttribute("aria-label", "portrait et nom du photographe");
  //divCard.setAttribute("tabindex", tabindexCounter++);

    // Modification du contenu de la nouvelle div
    divCard.innerHTML = `
        <a href="photographer.html?id=${photographer.id}" class="lienPhotographe" tabindex="${tabindexCounter++}">
          <img src="../assets/photographersIDPhotos/${photographer.portrait}" alt="image de ${photographer.name}, lieu : ${photographer.city}, ${photographer.country}, citation: ${photographer.tagline}, TJM: ${photographer.price}€" class="portrait">
          <h2 class="name">${photographer.name}</h2>
        </a>
        <p class="localisation">${photographer.city}, ${photographer.country}</p>
        <p class="tagline">${photographer.tagline}</p>
        <p class="price">${photographer.price}€/jour</p>
    `;

    // aria-label="localisation du photographe : ${photographer.city}, ${photographer.country}" tabindex="${tabindexCounter++}"
    // aria-label="citation du photographe : ${photographer.tagline}" tabindex="${tabindexCounter++}"
    // aria-label="tarif à la journée du photographe : ${photographer.price}€ par jour" tabindex="${tabindexCounter++}"
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

