import Gameboard from './gameboard.js'

export default class Player {
    constructor(isComputer = true) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard;

        this.#randomizeShips();
    }

    #shipList = [5,4,3,3,2];

    #randomizeShips() {
        while (this.#shipList.length > 0) {
            let success = false;
            let size = this.#shipList.pop();

            while(success === false) {
                let location = this.#pickRandomLocation();
                let direction = this.#pickRandomDirection();
                let response = this.gameboard.placeShip(location, direction, size);

                if(response === true) {
                    success = true;
                }
            }
        }
    }

    #pickRandomLocation() {
        return(Math.floor(Math.random() * 99));
    }

    #pickRandomDirection() {
        let number = Math.round(Math.random());

        if(number > 0.5) {
            return('x');
        }

        return('y');
    }

    randomShot() {
        let shotsTried = [];
        let location = this.#pickRandomLocation();

        while(!this.gameboard.receiveAttack(location)) {
            location = this.#pickRandomLocation();

            while(shotsTried.includes(location)) {
                location = this.#pickRandomLocation();
            }

            shotsTried.push(location);
        }
    }
}
