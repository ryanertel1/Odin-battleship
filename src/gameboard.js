import Ship from './ship.js'

export default class Gameboard {
    constructor(size = 10) {
        this.boardSize = size;
        this.tilesList = Array(Math.pow(this.boardSize, 2)).fill(null);
        this.shipList = [];
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
    placeShip(pos, direction, size) {
        if(this.#checkPlace(pos, direction, size) === true) {
            return false;
        }

        let newShip = new Ship(size);
        this.shipList.push({
            size: size,
            ship: newShip,
        })

        //insert initial position
        //if on x insert on initial + 1
        //if on y insert on initial + 1*boardSize
        for(let i = 0; i < size; i++) {
            if(direction === 'x') {
                var newIndex = pos+i;
                this.tilesList.splice(newIndex, 1, newShip);
            } else {
                var newIndex = pos + i * this.boardSize
                this.tilesList.splice(newIndex, 1, newShip);
            }
            newShip.indexList.push(newIndex);
        }

        return true;
    }

    //returns true if any of the intended placement locations are filled, else returns false
    #checkPlace(pos, direction, size) {
        //checks if placement of ship would be out of boundary
        if(direction === 'x' && pos % 10 + size > this.boardSize) {
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

    //returns true if hit, returns false otherwise
    receiveAttack(position) {
        let currentTile = this.tilesList[position];

        if(currentTile === null) {
            this.tilesList.splice(position, 1, 'miss');
            return true;
        } else if (currentTile instanceof Ship) {
            currentTile.hit();
            if(currentTile.sunk) {
                for(let i = 0; i < currentTile.length; i++) {
                    this.tilesList.splice(currentTile.indexList[i], 1, 'sunk');
                }
            } else {
                this.tilesList.splice(position, 1, 'hit');
            }
            return true;
        }

        return false;
    }

    //returns false if one or more ships are still alive, else returns true
    areAllSunk() {
        for(let i = 0; i < this.shipList.length; i++) {
            if(!this.shipList[i].ship.sunk) {
                return false;
            }
        }

        return true;
    }
}