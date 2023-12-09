function mediaFactory(data, type){
    if(type === 'V1'){
        return mediaV1(data)
    }

    if(type === 'V2'){
        return mediaV2(data)
    }
}