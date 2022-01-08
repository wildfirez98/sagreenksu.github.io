function newInventory() {
    let inventory = document.createElement('div')
    inventory.style.backgroundColor = 'brown';
    inventory.style.border = '2px solid black';
    inventory.style.width = '100%';
    inventory.style.height = '100px';
    move(inventory).to(0, 0);
    inventory.style.display = 'flex';
    inventory.style.flexDirection = 'row';
    inventory.style.alignItems = 'center';
    inventory.style.justifyContent = 'space-evenly';
    document.body.append(inventory);
    return inventory;
}