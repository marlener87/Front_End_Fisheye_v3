const photographersSection = document.querySelector(".photographer_section");

/**
 * function qui va chercher les données dans le fichier .json
 * @returns
 */
async function getPhotographers() {
  // pour aller chercher un fichier .json
  const result = await fetch("/data/photographers.json").then((res) => {
    //.then((res) => console.log(res));
    //.then((res) => res.json())
    return res.json();
  });
  //console.log(result);
  return result;
}

/**
 * function qui va créer la carte du photographe, avec son nom, prénom, photo, ville, tagline et TJM
 * @param {*} objectPhotographers 
 */
function displayPhotographers(objectPhotographers) {
  objectPhotographers.photographers.forEach((item) => {
    const divCard = document.createElement("div");
    divCard.classList.add("card");

    divCard.innerHTML = `
        <a href="photographer.html?id=${item.id}" class="lienPhotographe">
          <img src="../assets/photographersIDPhotos/${item.portrait} " alt="${item.name}" class="portrait">
          <h2 class="name">${item.name}</h2>
        </a>
        <p class="localisation">${item.city}, ${item.country}</p>
        <p class="tagline">${item.tagline}</p>
        <p class="price">${item.price}€/jour</p>
    `;
    photographersSection.appendChild(divCard);
  });
}

async function init() {
  const listPhotographers = await getPhotographers(); // récupère les données des photographes
  displayPhotographers(listPhotographers);
}

init();
