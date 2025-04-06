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

updateGameboard(gameboard1, person);
updateGameboard(gameboard2, computer);

function updateGameboard(gameboardElement, currentPlayer) {
    let gameboardInfo = currentPlayer.gameboard;

    while(gameboardElement.firstChild) {
        gameboardElement.firstChild.remove();
    }

    for(let i = 0; i < gameboardInfo.tilesList.length; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.id = i;

        if(gameboardInfo.tilesList[i] instanceof Object && !currentPlayer.isComputer) {
            newCell.classList.add('cell-selected');
        } else if(gameboardInfo.tilesList[i] === 'hit') {
            newCell.classList.add('cell-hit');
        } else if(gameboardInfo.tilesList[i] === 'miss') {
            newCell.classList.add('cell-missed');
        } else if(gameboardInfo.tilesList[i] === 'sunk') {
            newCell.classList.add('cell-sunk');
        }

        if(currentPlayer.isComputer) {
            newCell.addEventListener('click', (e) => {
                gameboardInfo.receiveAttack(e.target.id);
                updateGameboard(gameboardElement, currentPlayer);
            });
        }

        gameboardElement.appendChild(newCell);
    }
}

//Might choose to permanently deprecate if i implement drag & drop placement of ships
/*function setupShips(gameboardElement, gameboardInfo) {
    for(let i = 0; i < gameboardInfo.tilesList.length; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.dataset.index = i.toString();

        if(gameboardInfo.tilesList[i] instanceof Object) {
            newCell.classList.add('cell-selected');
        } else if(gameboardInfo.tilesList[i] === 'hit') {
            newCell.classList.add('cell-hit');
        } else if(gameboardInfo.tilesList[i] === 'miss') {
            newCell.classList.add('cell-missed');
        }

        newCell.addEventListener('click', (e) => {
            console.log(e.target.parentNode);
            console.log(e.target.parentNode.querySelector(i));
            updateGameboard(gameboardElement, gameboardInfo);
        });

        newCell.addEventListener('mouseenter', (e) => {
            let size = 5;
            if(i%10 + size <= 10) {
                for(let j = 0; j < size; j++) {
                    e.target.parentNode.querySelector(`[data-index="${(i+j).toString()}" ]`).classList.add('cell-selected');
                }
            } else {
                for(let j = i; j < i + size && j <= 99; j++) {
                    e.target.parentNode.querySelector(`[data-index="${(j).toString()}" ]`).classList.add('cell-hit');
                }
            }
        });

        newCell.addEventListener('mouseleave', (e) => {
            let size = 5;
            if(i%10 + size <= 10) {
                for(let j = 0; j < size; j++) {
                    e.target.parentNode.querySelector(`[data-index="${(i+j).toString()}" ]`).classList.remove('cell-selected');
                }
            } else {
                for(let j = i; j < i + size && j <= 99; j++) {
                    e.target.parentNode.querySelector(`[data-index="${(j).toString()}" ]`).classList.remove('cell-hit');
                }
            }
        });

        gameboardElement.appendChild(newCell);
    }
}*/