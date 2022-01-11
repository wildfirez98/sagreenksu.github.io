function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', () => {
        itemImageElement.remove();
        moveItemToInventory(url);
    })
}