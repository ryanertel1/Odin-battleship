import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';

let board = new Gameboard();

board.placeShip([0,0], 'x', 2);

console.log(board.tilesList[0[0]]);