import Ship from './ship.js'

export default class Gameboard {
    constructor(size = 10) {
        this.boardSize = size;
        this.tilesList = Array(Math.pow(this.boardSize, 2)).fill(null);
    }

    #convertToIndex(coords) {
        return coords[0] + (coords[1]*this.boardSize);
    }

    #convertToCoords(index) {
        let y = Math.floor(index / this.boardSize);
        let x = index % this.boardSize;

        return ([x,y]);
    }

    //expects coords to be the top-left corner of the ship that is being placed
    //expects direction to be 'x' for horizontal or 'y' for vertical
    //returns true if ship is successfully placed, else returns false
    placeShip(coords, direction, size) {
        let pos = this.#convertToIndex(coords);

        if(this.#checkPlace(pos, direction, size) === true) {
            return false;
        }

        let newShip = new Ship(size);

        //insert initial position
        //if on x insert on initial + 1
        //if on y insert on initial + 1*boardSize
        for(let i = 0; i < size; i++) {
            if(direction === 'x') {
                this.tilesList.splice(pos + i, 0, newShip);
            } else {
                this.tilesList.splice(pos + i * this.boardSize, 0, newShip);
            }
        }

        return true;
    }

    //returns true if any of the intended placement locations are filled, else returns false
    #checkPlace(pos, direction, size) {
        //checks if placement of ship would be out of boundary
        if(direction === 'x' && pos + size > this.boardSize) {
            return true;
        }
        if (direction === 'y' && pos + (size * this.boardSize) > this.tilesList.length) {
            return true;
        }

        //checks if placement of ship would conflict with already present ship
        for(let i = 0; i < size; i++) {
            if(direction === 'x') {
                if(this.tilesList[pos + i] != null) {
                    return true;
                }
            } else {
                if(this.tilesList[pos + i*this.boardSize] != null) {
                    return true;
                }
            }
        }

        return false;
    }
}