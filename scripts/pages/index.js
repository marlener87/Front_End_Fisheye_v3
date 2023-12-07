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
 * function qui va créer la carte du photographe, avec son nom, prénom, photo, ville, tagline et TJM
 */
function displayPhotographers(objectPhotographers) {
  objectPhotographers.photographers.forEach((item) => {

    // passer ces résultats dans un pipeline => ce truc me retourne TOUJOURS le même object
    const photographer = PhotographerFactory(item, 'V1')

    // Création d'une nouvelle div
    const divCard = document.createElement("div");  // <div></div>
    divCard.classList.add("card"); // <div class="card"></div>

    // Modification du contenu de la nouvelle div
    divCard.innerHTML = `
        <a href="photographer.html?id=${photographer.id}" class="lienPhotographe">
          <img src="../assets/photographersIDPhotos/${photographer.portrait} " alt="${photographer.name}" class="portrait">
          <h2 class="name">${photographer.name}</h2>
        </a>
        <p class="localisation">${photographer.city}, ${photographer.country}</p>
        <p class="tagline">${photographer.tagline}</p>
        <p class="price">${photographer.price}€/jour</p>
    `;

    /*
        <div class="card">
          <a href="photographer.html?id=243" class="lienPhotographe">
            <img src="../assets/photographersIDPhotos/MimiKeel.jpg " alt="Mimi Keel" class="portrait">
            <h2 class="name">Mimi Keel</h2>
          </a>
          <p class="localisation">London, UK</p>
          <p class="tagline">Voir le beau dans le quotidien</p>
          <p class="price">400€/jour</p>
        </div>
     */

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

