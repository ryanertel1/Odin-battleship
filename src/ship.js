export default class Ship {
    constructor(length) {
        this.hits = null;
        this.length = length || null;
        this.sunk = false;
        this.indexList = [];
    }

    hit() {
        if(this.sunk === false) {
            this.hits += 1;
            this.#isSunk();
            return true;
        }
    }

    #isSunk() {
        if(this.hits >= this.length) {
            this.sunk = true;
            return true;
        } else { return false; }
    }
}