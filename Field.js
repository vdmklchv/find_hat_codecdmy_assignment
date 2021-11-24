const { hat, hole, fieldCharacter, pathCharacter } = require('./pointers.js');

module.exports = class Field {

    constructor(field) {

        this._field = field;
        this._playerCoords = [0, 0];
        this._directionList = ['n', 's', 'w', 'e'];

    }

    get field() {
        return this._field;
    }

    get playerCoords() {
        return this._playerCoords;
    }


    print() {
        for (let row of this._field) {
            console.log(row.join(''));
        }

    }


    move(direction) {
        if (typeof direction === 'string') {
            direction = direction.toLowerCase();
            switch (direction) {
                case 'w':
                    this._playerCoords[1]--;
                    break;
                case 'n':
                    this._playerCoords[0]--;
                    break;
                case 'e':
                    this._playerCoords[1]++;
                    break;
                case 's':
                    this._playerCoords[0]++;
                    break;
                default:
                    console.log('Illegal move! Please choose from one of known directions - South (s), North (n), West (w) or East (e).');
                    break;
            }
        } else {
            console.log('Bad format provided');
        }
    }

    moveNotOutOfBounds() {
        return this._playerCoords[0] >= 0 && this._playerCoords[1] >= 0;
    }

    updateField() {
        this._field[this._playerCoords[0]][this._playerCoords[1]] = pathCharacter;
    }

    static generateField(height, width, holePercentage) {

        const numberOfItems = height * width - 2;
        const plainArray = [];
        // put 1 hat
        plainArray.push(hat);
        // determine number of holes
        const remainingItems = numberOfItems - 1;
        const holes = Math.floor(remainingItems * holePercentage / 100);

        for (let i = 0; i < holes; i++) {

            plainArray.push(hole);

        }
        // determine number of fields
        const fields = remainingItems - holes;

        for (let i = 0; i < fields; i++) {

            plainArray.push(fieldCharacter);

        }


        // randomize array 
        for (let i = plainArray.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [plainArray[i], plainArray[j]] = [plainArray[j], plainArray[i]];

        }

        // add player starting position
        plainArray.unshift(pathCharacter);

        // create multidimensional array
        const twoDimensionalField = [];
        let chunk = [];

        for (let item of plainArray) {

            chunk.push(item);

            if (chunk.length === width) {
                twoDimensionalField.push(chunk);
                chunk = [];
            };

        }

        return twoDimensionalField;
    }

}
