function mediaV1(data){    
    const newObject = {
        id: data.id,
        photographerId: data.photographerId,
        title: data.title,
        image: data.image,
        likes: data.likes,
        date: data.date,
        price: data.price
    }

    return newObject
}