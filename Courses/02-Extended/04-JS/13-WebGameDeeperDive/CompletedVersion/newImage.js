function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    move(imageElement).to(left, bottom);
    document.body.append(imageElement);

    return imageElement;
}