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

function init() {
  // on récupère un tableau de médias non trié
  const { medias } = getPhotographers();

  // transforme le tableau non trié medias en un tableau trié newMedias (par default trié par sortByType = 'title')
  const newMedias = orderBy(medias, "title");

  // Affichage à l'écran du tableau trié newMedias
  displayMedias(newMedias);
}
