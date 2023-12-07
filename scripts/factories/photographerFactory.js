function PhotographerFactory(data, type){
    if(type === 'V1'){
        return PhotographerV1(data)
    }

    if(type === 'V2'){
        return PhotographerV2(data)
    }
}

/*
class PhotographerFacotyr{
    constructor(data, type){
        this.data = data
        this.type = type
    }

    create(){
        if(this.type === 'V1'){
            return new PhotographerV1(this.data)
        }

        if(this.type === 'V2'){
            return new PhotographerV2(this.data)
        }
    }
}
*/