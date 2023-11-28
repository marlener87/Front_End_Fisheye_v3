const photographersSection = document.querySelector(".photographer_section");

async function getPhotographers() {
  const result = await fetch("/data/photographers.json") // pour aller chercher un fichier .json
    //.then((res) => console.log(res));
    //.then((res) => res.json())
    .then((res) => {
      //const test = 3;
      //const toto = { cle: "valeur" };
      //return toto;

      return res.json();
    });
  //.then((res2) => console.log(res2));
  //.then((data) => console.log(data));

  console.log(result);
  return result;
}

async function init() {
  const listPhotographers = await getPhotographers(); // récupère les données des photographes
  displayPhotographers(listPhotographers);
}

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

init();
