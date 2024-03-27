let tabIndexMedias = 100;
function createMedia(data, liked) {     // data représente un objet media (dans json), liked correspond à isLiked booléen qui est initialisé à 'false' dans photographer.js
    
    const { title, id, image, video, likes, photographerId } = data;    // destructuring    remplace const title = data.title;
    let isLiked = liked;
    const cardPhoto = document.createElement("div");
    cardPhoto.classList.add("cardPhoto");

    const mediaContent = image
    ? `<img src="./FishEye_Photos/${photographerId}/${image}" alt="image ${title}" id="photo ${id}" class="photo">` 
    : `<video class="photo">
      <source src="./FishEye_Photos/${photographerId}/${video}" type="video/mp4" alt="${title}">
      Votre navigateur ne prend pas en charge ce type de vidéo.
    </video>`;

    cardPhoto.innerHTML = `
    <button class="imagePhotographe" id="imagePhotographe" tabindex="${tabIndexMedias++}">${mediaContent}</button>
    <div class="infoPhoto">
      <h2 id="titre" >${title}</h2>
      <div class="likes" aria-label="nombre de likes total sur cette image">
        <span class="card-likes" data-id="${id}" tabindex="${tabIndexMedias++}">${likes}</span>
        <button class="btnLike ${isLiked ? "isLiked" : ""}" data-id="${id}" tabindex="${tabIndexMedias++}" aria-label="coeur like">
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-heart fa-coeur"></i>
        </button>
      </div>
    </div> `;

    return cardPhoto;
}