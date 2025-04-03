import Player from '../src/player.js';

test('ensures correct amount of ships was created on gameboard for AI player', () => {
    let computer = new Player(true);

    expect(computer.gameboard.shipList.length).toBe(5);
});