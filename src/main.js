import './styles.css';
import Player from './player.js';

let computer = new Player(true);
let person = new Player(false);

const gameContainer = document.getElementById('gameContainer');
const gameboard1 = document.createElement('div');
const gameboard2 = document.createElement('div');

gameboard1.classList.add('board-container', 'board-container-1');
gameboard1.innerHTML = 'hello';
gameboard2.classList.add('board-container', 'board-container-2');
gameboard2.innerHTML = 'hello';
gameContainer.appendChild(gameboard1);
gameContainer.appendChild(document.createElement('div'));
gameContainer.appendChild(gameboard2);

function updateGameboard(gameboard) {

}