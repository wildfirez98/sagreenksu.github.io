let inventory = newInventory();

const character = newImage('assets/green-character.gif')

function handleDirectionChange(direction){
    if(direction === null){
        character.src = 'assets/green-character.gif'
    }
    if(direction === 'west'){
        character.src = 'assets/green-character/west.gif'
    }
    if(direction === 'north'){
        character.src = 'assets/green-character/north.gif'
    }
    if(direction === 'east'){
        character.src = 'assets/green-character/east.gif'
    }
    if(direction === 'south'){
        character.src = 'assets/green-character/south.gif'
    }
}

move(character).withArrowKeys(100, 250, handleDirectionChange)

newImage('assets/tree.png', 200, 450);
newImage('assets/pillar.png', 350, 250);
newImage('assets/pine-tree.png', 450, 350);
newImage('assets/crate.png', 150, 350);
newImage('assets/well.png', 500, 575);


newItem('assets/sword.png', 500, 555);
newItem('assets/shield.png', 165, 335);
newItem('assets/staff.png', 600, 250);