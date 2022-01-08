# Web Game Deeper Dive
This is an extended look at the Web Game project and a culmulative description of its concepts and functionality.

## Progression
This project was presented across four parts.
### Part 1 - Positioning Images and Adding a Mouse Click Event
#### Version 1
![](./Captures/WebGameCapture00017.png)

For this version, I simply started by importing the =green= 
```javascript
let greenCharacter = document.createElement('img');
greenCharacter.src = 'assets/green-character.gif';
greenCharacter.style.position = 'fixed';
greenCharacter.style.left = '100px';
greenCharacter.style.bottom = '100px';
document.body.append(greenCharacter);
```

This code creates an HTML element object - in this case, an ```img``` tag.

The ```src``` property of the element is set to the relative file path of the image (gif format in this instance, but png will be shown later).<sup>[1](#footnote001)</sup>

#### Version 2
![](./Captures/WebGameCapture00018.png)
Now, adding a pine tree using the same code structure:
```javascript
let pineTree = document.createElement('img');
pineTree.src = 'assets/pine-tree.png';
pineTree.style.position = 'fixed';
pineTree.style.left = '450px';
pineTree.style.bottom = '200px';
document.body.append(pineTree);
```
However, what about adding more images later? This is redundancy a function can help solve.

#### Version 3 - Refactoring Using a Function
![](./Captures/WebGameCapture00019.png)
The code becomes more sophisticated and refined by eliminating redundancy where possible. In this case, the function eliminates redundant code structure.
```javascript
function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.style.position = 'fixed';
    imageElement.style.left = left + 'px';
    imageElement.style.bottom = bottom + 'px';
    document.body.append(imageElement);
}

newImage('assets/green-character.gif', 100, 100);
newImage('assets/pine-tree.png', 450, 200);
```
#### Version 4 - Adding More Images
![](./Captures/WebGameCapture00020.png)
And now with more images placed on the page with the same function as before, ```newImage```.
```javascript
newImage('assets/tree.png', 200, 300);
newImage('assets/pillar.png', 350, 100);
newImage('assets/crate.png', 150, 200);
newImage('assets/well.png', 500, 425);
```
#### Version 5 - Add an Item (Not an Image)
Adding a sword for the player to click to pick up.

This is a variation on the ```newImage()``` function, where an event listener is added and on the ```click``` event, the item disappears from the document body.

I begin by adding the return to the ```newImage()``` function.

```javascript
function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.style.position = 'fixed';
    imageElement.style.left = left + 'px';
    imageElement.style.bottom = bottom + 'px';
    document.body.append(imageElement);

    return imageElement;
}
```

```javascript
function newItem(url, left, bottom) {
    newImage(url, left, bottom);
}

newItem('assets/sword.png', 500, 405);
```

And now, the sword appears.  However, nothing happens when it is clicked.  It should disappear.

![](./Captures/WebGameCapture00021.png)

To remedy this, make two changes to the ```newItem()``` function:  declare a variable to hold the object (image element item) returned from the ```newImage``` function call, and the second, add the event listener as shown.

```javascript
function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', function() {
        itemImageElement.remove();
    });
}
```
![](./Captures/WebGameCapture00023.gif)

The animated GIF doesn't show the mouse movement too well, but rest assured, the mouse was positioned over the sword item before the left mouse button was clicked to remove the item image element from the document body.

#### Version 6 - Add More Items with the Function
Adding two more items to the document with the ```newItem()``` function from before.
```javascript
newItem('assets/shield.png', 165, 185);
newItem('assets/staff.png', 600, 100);
```
The results are shown below (again, the mouse pointer isn't captured precisely located in this animated GIF).

![](./Captures/WebGameCapture00027.gif)

#### Version 7 - Modifying the Event Behavoir
What if we wanted to make a change across all items?  With a function it's very easy - just one change, instead of changing each time the ```newItem``` block appeared in the code.
</details>

## Finished Result - Part 1
![](./Captures/WebGameCapture00031.gif)

And, here is the complete code listing:
```javascript
function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.style.position = 'fixed';
    imageElement.style.left = left + 'px';
    imageElement.style.bottom = bottom + 'px';
    document.body.append(imageElement);

    return imageElement;
}

function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', function() {
        itemImageElement.remove();
    });
}


newImage('assets/green-character.gif', 100, 100);
newImage('assets/pine-tree.png', 450, 200);

newImage('assets/tree.png', 200, 300);
newImage('assets/pillar.png', 350, 100);
newImage('assets/crate.png', 150, 200);
newImage('assets/well.png', 500, 425);


newItem('assets/sword.png', 500, 405);
newItem('assets/shield.png', 500, 405);
newItem('assets/staff.png', 500, 405);
```
## Items of Interest in Part 1
Part 1 utilized the following JavaScript items:

```javascript
document.createElement()
document.createElement().style.position
document.createElement().style.left
document.createElement().style.bottom

document.body.append()

function name() {
    // function body goes here
    return // in our example, we returned a DOM object
}

document.createElement().addEventListener('click', () => {
    // when a mouse pointer is clicked on the element created, the function in this declaration is performed.
})

document.body.append(document.createElement())

document.createElement().remove()
```
---
### Part 2
The code resumes from where we were at in the previous part (Part 1).  Although, the image and item positions are located in slightly different places.  The only major change is the removal of our event listener in the ```newItem()``` function:
```javascript
function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    // itemImageElement.addEventListener('click', function() {
    //     itemImageElement.remove();
    // });
}
```
#### Version 1
We start with a function that adds a ```div``` element to our document. This will be known as the "inventory."
```javascript
function newInventory() {
    let inventory = document.createElement('div')
    document.body.append(inventory)
}

newInventory();
```
Nothing is visible yet.  We add a border to the element, and see that it is positioned within the flow at the top of the document (it is not styled with ```position: 'fixed'```, so it is simply placed within the document flow like any other element).
```javascript
function newInventory() {
    let inventory = document.createElement('div')
    inventory.style.border = '2px solid black';

    document.body.append(inventory)
}

newInventory();
```
![](./Captures/WebGameCapture00044.png)

Adding width and height styles:
```javascript
function newInventory() {
    let inventory = document.createElement('div')
    inventory.style.border = '2px solid black';
    inventory.style.width = '100%';
    inventory.style.height = '100px';
    document.body.append(inventory)
}

newInventory();
```
![](./Captures/WebGameCapture00045.png)

Changing the ```div``` color to brown:
```javascript
function newInventory() {
    let inventory = document.createElement('div')
    inventory.style.backgroundColor = 'brown';
    inventory.style.border = '2px solid black';
    inventory.style.width = '100%';
    inventory.style.height = '100px';
    document.body.append(inventory)
}

newInventory();
```
![](./Captures/WebGameCapture00046.png)
Now, positioning the ```div``` in a fixed position at the bottom, left of the screen:
```javascript
function newInventory() {
    let inventory = document.createElement('div')
    inventory.style.backgroundColor = 'brown';
    inventory.style.border = '2px solid black';
    inventory.style.width = '100%';
    inventory.style.height = '100px';
    inventory.style.position = 'fixed';
    inventory.style.bottom = '0px';
    inventory.style.left = '0px';
    document.body.append(inventory)
}

newInventory();
```
![](./Captures/WebGameCapture00047.png)
And finally, adding more style choices to position elements within the ```div``` to flexbox with a direction of "row," an element alignment of "center," and to justify the content with even spacing.
```javascript
function newInventory() {
    let inventory = document.createElement('div')
    inventory.style.backgroundColor = 'brown';
    inventory.style.border = '2px solid black';
    inventory.style.width = '100%';
    inventory.style.height = '100px';
    inventory.style.position = 'fixed';
    inventory.style.bottom = '0px';
    inventory.style.left = '0px';
    inventory.style.display = 'flex';
    inventory.style.flexDirection = 'row';
    inventory.style.alignItems = 'center';
    inventory.style.justifyContent = 'space-evenly';
    document.body.append(inventory)
}

newInventory();
```
That completes the setup.  We can now begin with the assignment instructions.
#### Version 2
When the user clicks on an item, we want to remove it from the document.  This is how:
```javascript
function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', () => {
        itemImageElement.remove();
    })
}
```
The function calls remain the same as before:
```javascript
newItem('assets/sword.png', 500, 555);
newItem('assets/shield.png', 165, 335);
newItem('assets/staff.png', 600, 250);
```
![](./Captures/WebGameCapture00049.gif)
#### Version 3
The item is now removed when clicked.  Let's place the same item in the inventory ```div```.
```javascript
function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', () => {
        itemImageElement.remove();
        let inventoryItem = document.createElement('img');
        inventoryItem.src = url;
        inventory.append(inventoryItem);
    })
}
```
However, this will not work - the interpreter will throw an error. Our problem is that the ```inventory``` variable is not within scope. The user will click on items, and they will disappear (```.remove()```) but not reappear within the inventory ```div```.  The inventory declaration in ```newInventory()``` must be exposed at a level above the ```newInventory()``` function.  Let's make the variable declaration global:
```javascript
function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', () => {
        itemImageElement.remove();
        let inventoryItem = document.createElement('img');
        inventoryItem.src = url;
        inventory.append(inventoryItem);
    })
}

let inventory;

function newInventory() {
    inventory = document.createElement('div')
    inventory.style.backgroundColor = 'brown';
    inventory.style.border = '2px solid black';
    inventory.style.width = '100%';
    inventory.style.height = '100px';
    inventory.style.position = 'fixed';
    inventory.style.bottom = '0px';
    inventory.style.left = '0px';
    inventory.style.display = 'flex';
    inventory.style.flexDirection = 'row';
    inventory.style.alignItems = 'center';
    inventory.style.justifyContent = 'space-evenly';
    document.body.append(inventory)
}
```
Now, the application works as intended.
![](./Captures/WebGameCapture00051.gif)
#### Version 4
To improve the coding, let's make the ```newInventory()``` function return a ```div``` element object.
```javascript
function newInventory() {
    let inventory = document.createElement('div')
    inventory.style.backgroundColor = 'brown';
    inventory.style.border = '2px solid black';
    inventory.style.width = '100%';
    inventory.style.height = '100px';
    inventory.style.position = 'fixed';
    inventory.style.bottom = '0px';
    inventory.style.left = '0px';
    inventory.style.display = 'flex';
    inventory.style.flexDirection = 'row';
    inventory.style.alignItems = 'center';
    inventory.style.justifyContent = 'space-evenly';
    document.body.append(inventory);
    return inventory;
}

let inventory = newInventory();
```
And now we have a more elegant function and function call to work with.
#### Version 5
Lastly, let's refactor to have the "clicked" items move into the inventory ```div``` through the use of a ```moveItemToInventory()``` function. Re-writing our ```newItem()``` function to incorporate this new item-moving function, we get the following:
```javascript
function moveItemToInventory(url) {
    let inventoryItem = document.createElement('img');
    inventoryItem.src = url;
    inventory.append(inventoryItem);
}

function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', () => {
        itemImageElement.remove();
        moveItemToInventory(url);
    })
}
```
The same item-clicking event removes the item from our document and places it in the inventory ```div```.  The functionality has not changed, although the implementation is better and more versatile.
## Finished Result - Part 2
```javascript
function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.style.position = 'fixed';
    imageElement.style.left = left + 'px';
    imageElement.style.bottom = bottom + 'px';
    document.body.append(imageElement);

    return imageElement;
}

function moveItemToInventory(url) {
    let inventoryItem = document.createElement('img');
    inventoryItem.src = url;
    inventory.append(inventoryItem);
}

function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', () => {
        itemImageElement.remove();
        moveItemToInventory(url);
    })
}

function newInventory() {
    let inventory = document.createElement('div')
    inventory.style.backgroundColor = 'brown';
    inventory.style.border = '2px solid black';
    inventory.style.width = '100%';
    inventory.style.height = '100px';
    inventory.style.position = 'fixed';
    inventory.style.bottom = '0px';
    inventory.style.left = '0px';
    inventory.style.display = 'flex';
    inventory.style.flexDirection = 'row';
    inventory.style.alignItems = 'center';
    inventory.style.justifyContent = 'space-evenly';
    document.body.append(inventory);
    return inventory;
}

let inventory = newInventory();

newImage('assets/green-character.gif', 100, 250);
newImage('assets/tree.png', 200, 450);

newImage('assets/pillar.png', 350, 250);
newImage('assets/pine-tree.png', 450, 350);
newImage('assets/crate.png', 150, 350);
newImage('assets/well.png', 500, 575);


newItem('assets/sword.png', 500, 555);
newItem('assets/shield.png', 165, 335);
newItem('assets/staff.png', 600, 250);
```

---
### Part 3
We want our character to be able to move (or any other image or item in the future?).  Let's begin by defining a ```move()``` function.

#### Version 1
```javascript
function move(image, left, bottom) {
    image.style.position = 'fixed';
    image.style.left = left + 'px';
    image.style.bottom = bottom + 'px';
}
```
Then, to test this functionality change the ```newImage()``` code by replacing its positioning logic with a call to the ```move()``` function.
```javascript
function move(image, left, bottom) {
    image.style.position = 'fixed';
    image.style.left = left + 'px';
    image.style.bottom = bottom + 'px';
}

function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    move(imageElement, left, bottom);
    document.body.append(imageElement);

    return imageElement;
}
```
To test this functionality, modify the ```left``` and ```bottom``` parameters of the ```newImage('assets/green-character.gif', 100, 250);``` function call and watch as the green character moves around the screen.

#### Version 2 - Defining a Function Within Another Function
If we refactor the ```move()``` function to the following, we will have the same functionality.
```javascript
function move(image, left, bottom) {
    image.style.position = 'fixed';

    function moveToCoordinates(left, bottom) {
        image.style.left = left + 'px';
        image.style.bottom = bottom + 'px';

    }

    moveToCoordinates(left, bottom);
}
```
What if we make the ```moveToCoordinates()``` sub-function available to the caller of the ```move()``` function instead?

Changing the ```move()``` function and it's call in the ```newImage()``` function to the following produces the same results.  Note that the parameters for the ```move()``` function now exclude the ```left``` and ```bottom``` parameters, but those parameters are consumed in the sub-function, ```moveToCoordinates(left, bottom)```.

```javascript
function move(image) {
    image.style.position = 'fixed';

    function moveToCoordinates(left, bottom) {
        image.style.left = left + 'px';
        image.style.bottom = bottom + 'px';
    }

    return {
        to: moveToCoordinates
    }
}

function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    move(imageElement).to(left, bottom);
    document.body.append(imageElement);

    return imageElement;
}
```
#### Version 3
Note that event the ```newInventory()``` function can take advantage of this function.
```javascript
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

let inventory = newInventory();
```
To generalize the ```move()``` function from images to all element types, let's rename the ```image``` variable to ```element``` instead.  This will improve readability and understanding by others maintaining our code later.

```javascript
function move(element) {
    element.style.position = 'fixed';

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px';
        element.style.bottom = bottom + 'px';
    }

    return {
        to: moveToCoordinates
    }
}
```
The finished code for this part looks like this:
```javascript
function move(element) {
    element.style.position = 'fixed';

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px';
        element.style.bottom = bottom + 'px';
    }

    return {
        to: moveToCoordinates
    }
}

function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    move(imageElement).to(left, bottom);
    document.body.append(imageElement);

    return imageElement;
}

function moveItemToInventory(url) {
    let inventoryItem = document.createElement('img');
    inventoryItem.src = url;
    inventory.append(inventoryItem);
}

function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', () => {
        itemImageElement.remove();
        moveItemToInventory(url);
    })
}

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

let inventory = newInventory();

newImage('assets/green-character.gif', 100, 250);
newImage('assets/tree.png', 200, 450);

newImage('assets/pillar.png', 350, 250);
newImage('assets/pine-tree.png', 450, 350);
newImage('assets/crate.png', 150, 350);
newImage('assets/well.png', 500, 575);


newItem('assets/sword.png', 500, 555);
newItem('assets/shield.png', 165, 335);
newItem('assets/staff.png', 600, 250);
```
---
### Part 4
#### Version 1
Begin by refactoring our code, placing our functions into separate ```*.js``` files.
With that done, our HTML will appear as follows:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sandbox</title>
</head>
<body>
    <script src="newImage.js"></script>
    <script src="newItem.js"></script>
    <script src="newInventory.js"></script>
    <script src="move.js"></script>
    <script src="moveItemToInventory.js"></script>
    <script src="index.js"></script>
</body>
</html>
```
And, our ```index.js``` file will be:
```javascript
let inventory = newInventory();

newImage('assets/green-character.gif', 100, 250);
newImage('assets/tree.png', 200, 450);

newImage('assets/pillar.png', 350, 250);
newImage('assets/pine-tree.png', 450, 350);
newImage('assets/crate.png', 150, 350);
newImage('assets/well.png', 500, 575);


newItem('assets/sword.png', 500, 555);
newItem('assets/shield.png', 165, 335);
newItem('assets/staff.png', 600, 250);
```
All of the function definitions are contained within their own files and are referenced by ```script``` tags in the ```index.html``` file.

#### Version 2 - Create a moveCharacter() Function
Change the ```newImage()``` invocation to store the resulting object in a variable:
```javascript
const character = newImage('assets/green-character.gif');
```
![](./Captures/WebGameCapture00101.png)

Then, position that same character to the bottom right of the screen by calling the ```.to()``` method.
```javasctipt
move(character).to(100, 250);
```
#### Version 3 - Position and Direction
We will need variables to hold the character's current position.  Also, we will want a variable to let us know and control the character's direction of movement.  Also, feed the position variables into the ```move().to()``` call.
```javascript
const character = newImage('assets/green-character.gif')
let x = 100;
let y = 250;
let direction = null;
move(character).to(x, y);
```
#### Version 4 - Creating a moveCharacter() Function
```javascript
function moveCharacter() {
    if(direction === 'west') {
        x -= 1;
    }
    if(direction === 'north') {
        y += 1; 
    }
    if(direction === 'east') {
        x += 1;
    }
    if(direction === 'south') {
        y -= 1;
    }
    character.style.left = x + 'px';
    character.style.bottom = y + 'px';
}

direction = 'east';
setInterval(moveCharacter, 1);
```
![](./Captures/WebGameCapture00103.gif)
---
#### Version 5 - Refactoring the moveCharacter Function into the setInterval() Function
Our code, when refactoring the function looks like this:
```javascript
setInterval(() => {
    if(direction === 'west') {
        x -= 1;
    }
    if(direction === 'north') {
        y += 1; 
    }
    if(direction === 'east') {
        x += 1;
    }
    if(direction === 'south') {
        y -= 1;
    }
    character.style.left = x + 'px';
    character.style.bottom = y + 'px';
}, 1);
```
Or, to improve upon this, use the ```move().to()``` function previously discussed.
```javascript
setInterval(() => {
    if(direction === 'west') {
        x -= 1;
    }
    if(direction === 'north') {
        y += 1;
    }
    if(direction === 'east') {
        x += 1;
    }
    if(direction === 'south') {
        y -= 1;
    }
    move(character).to(x, y);
}, 1);
```
#### Version 6 - Adding Movement with Keyboard Keys
To begin, we add a keyboard ```keydown``` event listener in our ```index.js``` file.
```javascript
document.addEventListener('keydown', function(e){                
    if(e.key === 'ArrowLeft'){
        direction = 'west'
    }
});
```
![](./Captures/WebGameCapture00105.gif)
However, this only captures movements to the left (West). Improving the code by adding the other 3 cardinal directions:
```javascript
document.addEventListener('keydown', function(e){                
    if(e.key === 'ArrowLeft'){
        direction = 'west'
    }
    if(e.key === 'ArrowUp'){
        direction = 'north'
    }
    if(e.key === 'ArrowRight'){
        direction = 'east'
    }
    if(e.key === 'ArrowDown'){
        direction = 'south'
    }
});
```
#### Version 7 - Shunting Repeated Keyboard Key Reads
We have a relatively sticky keyboard, and the computer can rapidly fire off multiple events on a single keypress.  We simply need to capture the key once when it is pressed.  We add the following line of code to the ```keydown``` event listener to avoid problems:
```javascript
    if(e.repeat) return; 
```
As the first line to be evaluated in the ```keydown``` event, the ```if``` statement shunts the function to end before evaluating the remainder of the code by using an early ```return```.
The event listener now looks like this:
```javascript
document.addEventListener('keydown', function(e){       
    if(e.repeat) return;         
    if(e.key === 'ArrowLeft'){
        direction = 'west'
    }
    if(e.key === 'ArrowUp'){
        direction = 'north'
    }
    if(e.key === 'ArrowRight'){
        direction = 'east'
    }
    if(e.key === 'ArrowDown'){
        direction = 'south'
    }
});
```
#### Version 8 - A Keyup Event
Our character can move in all four directions, but now will not stop moving once started.  Let's add a ```keyup``` event to improve our functionality.
```javascript
document.addEventListener('keyup', function(e){
    direction = null;
});
```

#### Version 9 - Refactoring the Move Functionality
We can improve the ```move()``` function, allowing it to work on other images too.  Change the ```move.js``` file to the following:
```javascript
function move(element) {
    element.style.position = 'fixed';

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px';
        element.style.bottom = bottom + 'px';
    }

    function moveWithArrowKeys(left, bottom) {
        let direction = null;
        let x = left;
        let y = bottom;
    
        element.style.left = x + 'px';
        element.style.bottom = y + 'px';
    
        function moveCharacter(){
            if(direction === 'west'){
                x -= 1;
            }
            if(direction === 'north'){
                y += 1;
            }
            if(direction === 'east'){
                x += 1;
            }
            if(direction === 'south'){
                y -= 1;
            }
            element.style.left = x + 'px';
            element.style.bottom = y + 'px';
        }
    
        setInterval(moveCharacter, 1);
    
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
    
            if(e.key === 'ArrowLeft'){
                direction = 'west';
            }
            if(e.key === 'ArrowUp'){
                direction = 'north';
            }
            if(e.key === 'ArrowRight'){
                direction = 'east';
            }
            if(e.key === 'ArrowDown'){
                direction = 'south';
            }
        });
    
        document.addEventListener('keyup', function(e){
            direction = null;
        })
    }

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }
}
```
And, modify the ```index.js``` file to use this new function.
```javascript
let inventory = newInventory();

const character = newImage('assets/green-character.gif')
move(character).withArrowKeys(100, 250);

newImage('assets/tree.png', 200, 450);

newImage('assets/pillar.png', 350, 250);
newImage('assets/pine-tree.png', 450, 350);
newImage('assets/crate.png', 150, 350);
newImage('assets/well.png', 500, 575);


newItem('assets/sword.png', 500, 555);
newItem('assets/shield.png', 165, 335);
newItem('assets/staff.png', 600, 250);
```
Now - if we create the tree object with this same method, it too will move with the arrow keys (in the same fashion as our character).
```javascript
let inventory = newInventory();

const character = newImage('assets/green-character.gif')
move(character).withArrowKeys(100, 250);

move(newImage('assets/tree.png')).withArrowKeys(200, 450);


newImage('assets/pillar.png', 350, 250);
newImage('assets/pine-tree.png', 450, 350);
newImage('assets/crate.png', 150, 350);
newImage('assets/well.png', 500, 575);


newItem('assets/sword.png', 500, 555);
newItem('assets/shield.png', 165, 335);
newItem('assets/staff.png', 600, 250);
```
![](./Captures/WebGameCapture00107.gif)
Before proceeding, we revert our tree to a static image.
```javascript
newImage('assets/tree.png', 200, 450);
```
#### Version 10
In this last step, we modify the character to change images to make it appear to walk when moving.  We will utilize animated gif's to do so.
Add the following to the ```index.js``` file, replacing duplicate code where necessary.
```javascript
const character = newImage('assets/green-character.gif')

function handleDirectionChange(){
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
```
Then add a callback parameter to the ```moveWithArrowKeys``` sub-function:
```javascript
function moveWithArrowKeys(left, bottom, callback) {
```
And finally, in the ```keydown``` and ```keyup``` event listeners, invoke the callback.
```javascript
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
    
            if(e.key === 'ArrowLeft'){
                direction = 'west';
            }
            if(e.key === 'ArrowUp'){
                direction = 'north';
            }
            if(e.key === 'ArrowRight'){
                direction = 'east';
            }
            if(e.key === 'ArrowDown'){
                direction = 'south';
            }
            callback(direction);
        });
    
        document.addEventListener('keyup', function(e){
            direction = null;
            callback(direction);
        })
```
But also, in the ```handleDirectionChange()``` function, add ```direction``` as a parameter.
```javascript
function handleDirectionChange(direction){
```
#### Version 11
Change the event listeners in the ```move.js``` file to invoke the callback only if the callback parameter is passed in.
```javascript
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
    
            if(e.key === 'ArrowLeft'){
                direction = 'west';
            }
            if(e.key === 'ArrowUp'){
                direction = 'north';
            }
            if(e.key === 'ArrowRight'){
                direction = 'east';
            }
            if(e.key === 'ArrowDown'){
                direction = 'south';
            }
            if(callback !== undefined) {
                callback(direction);
            }
        });
    
        document.addEventListener('keyup', function(e){
            direction = null;
            if(callback !== undefined) {
                callback(direction);
            }
        })
    }
```
Now, change the ```newImage()``` invocation to use this new functionality.  The tree will move with the character, but the character will use the callback to change the animated GIF it is using.
![](./Captures/WebGameCapture00109.gif)
#### Version 12
The image can be moved off screen.  Let's improve our design.
```javascript
        function moveCharacter(){
            if(direction === 'west'){
                x = Math.max(0, x - 1);
            }
            if(direction === 'north'){
                y += 1;
            }
            if(direction === 'east'){
                x += 1;
            }
            if(direction === 'south'){
                y = Math.max(0, y - 1);
            }
            element.style.left = x + 'px';
            element.style.bottom = y + 'px';
        }
```
This handles the minimum bounds (zero left, zero bottom).  To handle the maximum side of these bounds, we will use the ```window.innerWidth``` and ```window.innerHeight``` properties.

![](./Captures/WebGameCapture00111.gif)

You can see from this that the character and tree images ultimately have their lower, left image corners aligned - they have the same left and bottom coordinates after returning from over screen top and off screen right.  The images are stopping at ```window.innerWidth``` and ```window.innerHeight```, but they are offset by their image dimensions and therefore are off screen.  To prevent this, we need to limit not to ```window.innerWidth``` and ```window.innerHeight```, but the window inner dimensions less the dimension size of the images.  But, we need these parameter values to be given. We change the ```moveWithArrowKeys``` function signature to the following:
```javascript
function moveWithArrowKeys(left, bottom, width = 0, height = 0, callback) {
```
This gives the ```width``` and ```height``` parameters, and gives them default values of zero. To use this, we modify the ```moveCharacter()``` function to as follows:
```javascript
        function moveCharacter(){
            if(direction === 'west'){
                x = Math.max(0, x - 1);
            }
            if(direction === 'north'){
                y = Math.min(window.innerHeight - height, y + 1);
            }
            if(direction === 'east'){
                x = Math.min(window.innerWidth - width, x + 1);
            }
            if(direction === 'south'){
                y = Math.max(0, y - 1);
            }
            element.style.left = x + 'px';
            element.style.bottom = y + 'px';
        }
```
We invoke these objects by the following code changes:
```javascript
move(character).withArrowKeys(100, 250, 50, 75, handleDirectionChange)
move(newImage('assets/tree.png')).withArrowKeys(200, 450, 125, 165);
```
![](./Captures/WebGameCapture00113.gif)
Notice that the character and tree stop differently at the edges. Each goes completely to the edge before stopping, regardless of whether the other image is already limited to the edge?
#### Version 13
The images can move behind the other images.  This is due to the z-index of each element.  What we want is the further up the image is placed on the screen, the further back it is positioned in z-index terms.  If a moving image is below the static image in screen height, it will pass in front of it, otherwise, behind.  To do this, we set the z-index for all images when they are first created.  However, we want to lowest vertical height images to have the highest z-index value and vise versa.

We change the ```moveToCoordinates()``` and ```moveWithArrowKeys()``` functions to take z-index into account.  Note, there are three lines beginning with ```element.style.zIndex```.
```javascript
    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px';
        element.style.bottom = bottom + 'px';
        element.style.zIndex = window.innerHeight - bottom;
    }

    function moveWithArrowKeys(left, bottom, width = 0, height = 0, callback) {
        let direction = null;
        let x = left;
        let y = bottom;
    
        element.style.left = x + 'px';
        element.style.bottom = y + 'px';
        element.style.zIndex = window.innerHeight - y;
    
        function moveCharacter(){
            if(direction === 'west'){
                x = Math.max(0, x - 1);
            }
            if(direction === 'north'){
                y = Math.min(window.innerHeight - height, y + 1);
            }
            if(direction === 'east'){
                x = Math.min(window.innerWidth - width, x + 1);
            }
            if(direction === 'south'){
                y = Math.max(0, y - 1);
            }
            element.style.left = x + 'px';
            element.style.bottom = y + 'px';
            element.style.zIndex = window.innerHeight - y;
        }
```
![](./Captures/WebGameCapture00115.gif)

## Completion
This completes the project.  The full code is as follows:

```index.html```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sandbox</title>
</head>
<body>
    <script src="newImage.js"></script>
    <script src="newItem.js"></script>
    <script src="newInventory.js"></script>
    <script src="move.js"></script>
    <script src="moveItemToInventory.js"></script>
    <script src="index.js"></script>
</body>
</html>
```
```index.js```
```javascript
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

move(character).withArrowKeys(100, 250, 50, 75, handleDirectionChange)
move(newImage('assets/tree.png')).withArrowKeys(200, 450, 125, 165);

newImage('assets/pillar.png', 350, 250);
newImage('assets/pine-tree.png', 450, 350);
newImage('assets/crate.png', 150, 350);
newImage('assets/well.png', 500, 575);


newItem('assets/sword.png', 500, 555);
newItem('assets/shield.png', 165, 335);
newItem('assets/staff.png', 600, 250);
```
```move.js```
```javascript
function move(element) {
    element.style.position = 'fixed';

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px';
        element.style.bottom = bottom + 'px';
        element.style.zIndex = window.innerHeight - bottom;
    }

    function moveWithArrowKeys(left, bottom, width = 0, height = 0, callback) {
        let direction = null;
        let x = left;
        let y = bottom;
    
        element.style.left = x + 'px';
        element.style.bottom = y + 'px';
        element.style.zIndex = window.innerHeight - y;
    
        function moveCharacter(){
            if(direction === 'west'){
                x = Math.max(0, x - 1);
            }
            if(direction === 'north'){
                y = Math.min(window.innerHeight - height, y + 1);
            }
            if(direction === 'east'){
                x = Math.min(window.innerWidth - width, x + 1);
            }
            if(direction === 'south'){
                y = Math.max(0, y - 1);
            }
            element.style.left = x + 'px';
            element.style.bottom = y + 'px';
            element.style.zIndex = window.innerHeight - y;
        }
    
        setInterval(moveCharacter, 1);
    
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
    
            if(e.key === 'ArrowLeft'){
                direction = 'west';
            }
            if(e.key === 'ArrowUp'){
                direction = 'north';
            }
            if(e.key === 'ArrowRight'){
                direction = 'east';
            }
            if(e.key === 'ArrowDown'){
                direction = 'south';
            }
            if(callback !== undefined) {
                callback(direction);
            }
        });
    
        document.addEventListener('keyup', function(e){
            direction = null;
            if(callback !== undefined) {
                callback(direction);
            }
        })
    }

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }
}
```

```moveItemToInventory.js```

```javascript
function moveItemToInventory(url) {
    let inventoryItem = document.createElement('img');
    inventoryItem.src = url;
    inventory.append(inventoryItem);
}
```
```newImage.js```
```javascript
function newImage(url, left, bottom) {
    let imageElement = document.createElement('img');
    imageElement.src = url;
    move(imageElement).to(left, bottom);
    document.body.append(imageElement);

    return imageElement;
}
```
```newInventory.js```
```javascript
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
```
```newItem.js```
```javascript
function newItem(url, left, bottom) {
    let itemImageElement = newImage(url, left, bottom);
    itemImageElement.addEventListener('click', () => {
        itemImageElement.remove();
        moveItemToInventory(url);
    })
}
```



## Footnotes
<a name="footnote001">1</a>: The image tag supports other file formats, for example ```*.jpg``` among others.

<a name="footnote002">2</a>: The assignment does not explain this, and my explanation may be incorrect, but here it goes.  GIF images do not have the possibility of being created with transparent backgrounds, but they do have the ability to be animated.  PNG images are the opposite - "yes" to background transparency for a PNG and "no" to an animated image in a PNG.

## Additional Information
<details><summary>Screen Captures of Original Assignment Instructions - Part 1</summary>
    <h2>Original Assignment - Part 1</h2>

![](./Captures/WebGameCapture00001.png)
![](./Captures/WebGameCapture00002.png)
![](./Captures/WebGameCapture00003.png)
![](./Captures/WebGameCapture00004.png)
![](./Captures/WebGameCapture00005.png)
![](./Captures/WebGameCapture00006.png)
![](./Captures/WebGameCapture00007.png)
![](./Captures/WebGameCapture00008.png)
![](./Captures/WebGameCapture00009.png)
![](./Captures/WebGameCapture00010.png)
![](./Captures/WebGameCapture00011.png)
![](./Captures/WebGameCapture00012.png)
![](./Captures/WebGameCapture00013.png)
![](./Captures/WebGameCapture00014.png)
![](./Captures/WebGameCapture00015.png)
</details>
<details><summary>Screen Captures of Original Assignment Instructions - Part 2</summary>
    <h2>Original Assignment - Part 2</h2>
    
![](./Captures/WebGameCapture00032.png)
![](./Captures/WebGameCapture00033.png)
![](./Captures/WebGameCapture00034.png)
![](./Captures/WebGameCapture00035.png)
![](./Captures/WebGameCapture00036.png)
![](./Captures/WebGameCapture00037.png)
![](./Captures/WebGameCapture00038.png)
![](./Captures/WebGameCapture00039.png)
![](./Captures/WebGameCapture00040.png)
![](./Captures/WebGameCapture00041.png)
![](./Captures/WebGameCapture00042.png)
![](./Captures/WebGameCapture00043.png)
</details>
<details><summary>Screen Captures of Original Assignment Instructions - Part 3</summary>
    <h2>Original Assignment - Part 3</h2>
    
![](./Captures/WebGameCapture00052.png)
![](./Captures/WebGameCapture00053.png)
![](./Captures/WebGameCapture00054.png)
![](./Captures/WebGameCapture00055.png)
![](./Captures/WebGameCapture00056.png)
![](./Captures/WebGameCapture00057.png)
![](./Captures/WebGameCapture00058.png)
![](./Captures/WebGameCapture00059.png)
![](./Captures/WebGameCapture00060.png)
![](./Captures/WebGameCapture00061.png)
![](./Captures/WebGameCapture00062.png)
![](./Captures/WebGameCapture00063.png)
![](./Captures/WebGameCapture00064.png)
![](./Captures/WebGameCapture00065.png)
![](./Captures/WebGameCapture00066.png)
![](./Captures/WebGameCapture00067.png)
![](./Captures/WebGameCapture00068.png)
![](./Captures/WebGameCapture00069.png)
![](./Captures/WebGameCapture00070.png)
![](./Captures/WebGameCapture00071.png)
![](./Captures/WebGameCapture00072.png)
</details>
<details><summary>Screen Captures of Original Assignment Instructions - Part 4</summary>
    <h2>Original Assignment - Part 4</h2>
    
![](./Captures/WebGameCapture00073.png)
![](./Captures/WebGameCapture00074.png)
![](./Captures/WebGameCapture00075.png)
![](./Captures/WebGameCapture00076.png)
![](./Captures/WebGameCapture00077.png)
![](./Captures/WebGameCapture00078.png)
![](./Captures/WebGameCapture00079.png)
![](./Captures/WebGameCapture00080.png)
![](./Captures/WebGameCapture00081.png)
![](./Captures/WebGameCapture00082.png)
![](./Captures/WebGameCapture00083.png)
![](./Captures/WebGameCapture00084.png)
![](./Captures/WebGameCapture00085.png)
![](./Captures/WebGameCapture00086.png)
![](./Captures/WebGameCapture00087.png)
![](./Captures/WebGameCapture00088.png)
![](./Captures/WebGameCapture00089.png)
![](./Captures/WebGameCapture00090.png)
![](./Captures/WebGameCapture00091.png)
![](./Captures/WebGameCapture00092.png)
![](./Captures/WebGameCapture00093.png)
![](./Captures/WebGameCapture00094.png)
![](./Captures/WebGameCapture00095.png)
![](./Captures/WebGameCapture00096.png)
![](./Captures/WebGameCapture00097.png)
![](./Captures/WebGameCapture00098.png)
![](./Captures/WebGameCapture00099.png)
![](./Captures/WebGameCapture00100.png)
</details>