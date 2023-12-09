/*
class PhotographerV2  {

    constructor(data){
        this.id = data.id
        this.name = data.firstname
        this.city = data.localisation.city
        this.price = data.price
        this.country = data.localisation.country 
        this.tagline = data.tagline
        this.portrait = data.portrait
    }
}*/

function PhotographerV2(data){
    const newObject = {
       id : data.id,
       name : data.firstname,
       city : data.localisation.city,
       price : data.price,
       country : data.localisation.country ,
       tagline : data.tagline,
       portrait : data.portrait
    }

    return newObject
}