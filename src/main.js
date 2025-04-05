import './styles.css';
import Player from './player.js';

let computer = new Player(true);
let person = new Player(false);

const gameContainer = document.getElementById('gameContainer');
const gameboard1 = document.createElement('div');
const gameboard2 = document.createElement('div');

gameboard1.classList.add('board-container', 'board-container-1');
gameboard2.classList.add('board-container', 'board-container-2');
gameContainer.appendChild(gameboard1);
gameContainer.appendChild(document.createElement('div'));
gameContainer.appendChild(gameboard2);

updateGameboard(gameboard1, person.gameboard);
updateGameboard(gameboard2, computer.gameboard);

function updateGameboard(gameboardElement, gameboardInfo) {
    while(gameboardElement.firstChild) {
        gameboardElement.firstChild.remove();
    }

    for(let i = 0; i < gameboardInfo.tilesList.length; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.id = i;

        if(gameboardInfo.tilesList[i] instanceof Object) {
            newCell.classList.add('cell-selected');
        } else if(gameboardInfo.tilesList[i] === 'hit') {
            newCell.classList.add('cell-hit');
        } else if(gameboardInfo.tilesList[i] === 'miss') {
            newCell.classList.add('cell-missed');
        }

        newCell.addEventListener('click', (e) => {
            console.log(e.target.parentNode);
            console.log(e.target.id);
            updateGameboard(gameboardElement, gameboardInfo);
        });

        gameboardElement.appendChild(newCell);
    }
}