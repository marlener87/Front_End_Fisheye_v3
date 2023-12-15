function mediaV2(data){
    const newObject = {
        id: data.id,
        photographerId: data.photographerId,
        title: data.vignette.title,
        image: data.vignette.image,
        video: data.vignette.video,
        likes: data.likes,
        date: data.date,
        price: data.price
    }

    return newObject
}