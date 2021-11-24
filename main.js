const prompt = require('prompt-sync')({sigint: true});
const Field = require('./Field.js');
const pointers = require('./pointers.js');

// Game logic
const field = new Field(Field.generateField(10, 7, 33));
field.print();

while (true) {
    // get direction from user input
    const reply = prompt('What direction would you like to move? (n, w, e, s) > ');

    // make move (update player coords)
    field.move(reply);

    // check if out of bounds
    if (!field.moveNotOutOfBounds()) {
        console.log('GAME OVER! You have fallen off the edge of the board.');
        break;
    }

    // check if hole
    if (field.field[field.playerCoords[0]][field.playerCoords[1]] === pointers.hole) {
        console.log('GAME OVER! You have fallen into a hole.');
        break;
    }

    // check if hat
    if (field.field[field.playerCoords[0]][field.playerCoords[1]] === pointers.hat) {
        console.log('YOU WIN! THE MAGIC HAT IS YOURS!!!!');
        break;
    }

    // update field
    field.updateField();

    // print field
    field.print();
}
