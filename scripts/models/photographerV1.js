/*class PhotographerV1  {

    constructor(data){
        this.id = data.id
        this.name = data.name
        this.city = data.city
        this.price = data.price
        this.country = data.country 
        this.tagline = data.tagline
        this.portrait = data.portrait
    }
}
*/


function PhotographerV1(data){    
    const newObject = {
        id: data.id,
        name: data.name,
        city: data.city,
        price: data.price,
        country: data.country,
        tagline: data.tagline,
        portrait: data.portrait
    }

    return newObject
}