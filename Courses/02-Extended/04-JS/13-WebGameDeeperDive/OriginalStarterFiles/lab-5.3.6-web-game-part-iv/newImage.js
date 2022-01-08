function newImage(url){
    let image = document.createElement('img')
    image.src = url
    document.body.append(image)
    return image
}