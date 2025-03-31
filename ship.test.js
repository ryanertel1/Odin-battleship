import Ship from './ship.js'

test('ship length is registered correctly', () => {
    expect(new Ship(3).length).toBe(3);
});

test('ship hit method registers correctly', () => {
    let battleship = new Ship(4);
    battleship.hit();
    expect(battleship.hits).toBe(1);
});

test('ship isSunk method registers when ship is sunk', () => {
    let patrol = new Ship(2);
    patrol.hit();
    patrol.hit();
    expect(patrol.sunk).toBe(true);
});