// https://stackoverflow.com/questions/6567941/how-does-sort-function-work-in-javascript-along-with-compare-function

/**
 * Cette fonction prend un tableau non trié mediasToSort
 * Elle le trie en fonction de sortByType
 * Elle retourne le tableau newMedias trié
 */
function orderBy(mediasToSort, sortByType) {
  const newMedias = [];

  // ... trie en fonction de sortByType
  newMedias.sort(function (a, b) {
    // sort prends 2 paramètres l'object n°1 A et l'object n°2 B

    if (sortByType === "title") {
      return a.title - b.title;
    }

    if (sortByType === "date") {
      // comparaison de a.date et de b.date il faut les transformer en objet date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA - dateB;
    }

    if (sortByType === "popularity") {
      return a.likes - b.likes;
    }
  });

  return newMedias;
}

const btnSortByTitle = document.querySelector(".title");
btnSortByTitle.addEventListener("click", () => {
  const { medias } = getPhotographers();

  const newMedias = orderBy(medias, "title");

  displayMedias(newMedias);
});

const btnSortByDate = document.querySelector(".date");
btnSortByDate.addEventListener("click", () => {
  const { medias } = getPhotographers();

  const newMedias = orderBy(medias, "date");

  displayMedias(newMedias);
});

const btnSortByPopularity = document.querySelector(".popularity");
btnSortByPopularity.addEventListener("click", () => {
  const { medias } = getPhotographers();

  const newMedias = orderBy(medias, "popularity");

  displayMedias(newMedias);
});

function init() {
  // on récupère un tableau de médias non trié
  const { medias } = getPhotographers();

  // transforme le tableau non trié medias en un tableau trié newMedias (par default trié par sortByType = 'title')
  const newMedias = orderBy(medias, "title");

  // Affichage à l'écran du tableau trié newMedias
  displayMedias(newMedias);
}

/*

1) Faire le dropdown
modifier le JS
--- 

1)
- Au clic sur une image d'un média, ouvrir le carrousel 
- Dans le carrousel avoir toutes les images + titres et pouvoir les faire défiler au clic sur la flèche gauche et droite
- Bouton de fermeture du carrousel 
- carrousel avec une boucle infinie 

2) 
- Au clic, sur umage d'un média, ouvrir cette fois le carrousel positionné sur la bonne image
- même comportement que le niveau 1

3) 
- à chaque fois que tu utilises le dropdown, réinitialiser + recharger dans le carrousel les images dans le bon ordre

4) 
- permettre dans la liste des médias d'avoir une vidéo à la place d'une image (pas de controls sur la vidéo - static)
- remplacer aussi dans le carrousel la vidéo (pouvoir avoir les controls avec play, restart, ...)

*/
