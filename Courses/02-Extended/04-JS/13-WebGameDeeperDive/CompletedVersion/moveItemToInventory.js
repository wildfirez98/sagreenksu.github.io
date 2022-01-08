function moveItemToInventory(url) {
    let inventoryItem = document.createElement('img');
    inventoryItem.src = url;
    inventory.append(inventoryItem);
}