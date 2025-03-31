import Gameboard from './gameboard.js'
import Ship from './ship.js'

test('check gameboard size', () => {
    expect(new Gameboard(10).tilesList.length).toBe(Math.pow(10, 2));
});

test('place size 2 ship horizontally', () => {
    let board = new Gameboard();
    board.placeShip([0,0], 'x', 2);
    expect(
        board.tilesList[0] &&
        board.tilesList[1]
    ).toBeInstanceOf(Ship);
});

test('place size 2 ship vertically', () => {
    let board = new Gameboard();
    board.placeShip([0,0], 'y', 2);
    expect(
        board.tilesList[0] &&
        board.tilesList[10]
    ).toBeInstanceOf(Ship);
});

test('ensure horizontal ship was not also placed vertically', () => {
    let board = new Gameboard();
    board.placeShip([0,0], 'x', 5);
    expect(board.tilesList[10]).toBe(null);
});

test('ensure horizontal ship will not place out of bounds', () => {
    let board = new Gameboard();
    board.placeShip([9,9], 'x', 5);
    expect(board.tilesList[99]).toBe(null);
});

test('ensure vertical ship will not place out of bounds', () => {
    let board = new Gameboard();
    board.placeShip([9,9], 'y', 5);
    expect(board.tilesList[99]).toBe(null);
});

test('ensure ship will not place ontop of already present ship', () => {
    let board = new Gameboard();
    board.placeShip([0,0], 'x', 5);
    board.placeShip([1,0], 'y', 3);
    expect(board.tilesList[11]).toBe(null);
});