import Ship from './Ship';

class Gameboard {
  board = [];
  ships = [];
  constructor(boardName) {
    this.boardName = boardName;
    this.initBoard();
    this.initShips();
  }

  initBoard() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        this.board.push({
          status: 'blank',
          clicked: false,
          x,
          y,
          shipID: null,
        });
      }
    }
  }
  #addShip(id, length, orientation) {
    this.ships.push(new Ship(id, length, orientation));
  }
  initShips() {
    this.#addShip(1, 5);
    this.#addShip(2, 4);
    this.#addShip(3, 3);
    this.#addShip(4, 2);
    this.#addShip(5, 2);
    this.#addShip(6, 1);
    this.#addShip(7, 1);
  }
  autoPlace() {
    this.clearShipPlacement();
    this.generateRandomOrientation();
    this.ships.forEach((ship) => {
      const { x, y } = this.generateRandomCoords(ship);
      this.placeShip(ship, x, y);
    });
  }
  placeShip(ship, x, y) {
    ship.coords.x = x;
    ship.coords.y = y;
    const xyCell = this.board.findIndex((cell) => cell.x === x && cell.y === y);
    if (ship.orientation === 'h') {
      for (let i = 0; i < ship.length; i++) {
        this.board[xyCell + i].status = 'ship';
        this.board[xyCell + i].shipID = ship.id;
      }
    }
    if (ship.orientation === 'v') {
      for (let i = 0; i < ship.length; i++) {
        this.board[xyCell + i * 10].status = 'ship';
        this.board[xyCell + i * 10].shipID = ship.id;
      }
    }
  }
  switchOrientation(ship) {
    if (ship.orientation === 'h') {
      ship.orientation = 'v';
      return;
    }
    if (ship.orientation === 'v') {
      ship.orientation = 'h';
      return;
    }
  }
  generateRandomOrientation() {
    const orientationArray = ['h', 'v'];
    this.ships.forEach((ship) => {
      const rand = Math.trunc(Math.random() * 2);
      ship.orientation = orientationArray.at(rand);
    });
  }
  generateRandomCoords(ship) {
    while (true) {
      const x = Math.trunc(Math.random() * 10);
      const y = Math.trunc(Math.random() * 10);

      if (!this.verifyCoords(ship, x, y)) continue;
      return { x, y };
    }
  }

  verifyCoords(ship, x, y) {
    switch (ship.orientation) {
      case 'h':
        return this.verifyCoords_h(ship, x, y);
        break;
      case 'v':
        return this.verifyCoords_v(ship, x, y);
        break;
      default:
        return false;
    }
  }

  verifyCoords_h(ship, x, y) {
    let xyCellIndex = this.board.findIndex(
      (cell) => cell.x === x && cell.y === y
    );
    if (this.board[xyCellIndex].status === 'ship') return false;
    if (y + ship.length - 1 > 9) return false;
    let intersectingShip = false;
    y--;
    for (let i = 0; i < ship.length + 2; i++) {
      const nextCell = this.board.find((cell) => cell.x === x && cell.y === y);
      y++;
      if (!nextCell) continue;
      if (nextCell.status === 'ship') {
        intersectingShip = true;
        break;
      }
      const u = this.board.find(
        (cell) => cell.x === x - 1 && cell.y === nextCell.y
      );
      const d = this.board.find(
        (cell) => cell.x === x + 1 && cell.y === nextCell.y
      );

      if (u?.status === 'ship' || d?.status === 'ship') {
        intersectingShip = true;
        break;
      }
    }
    if (intersectingShip) return false;
    return true;
  }
  verifyCoords_v(ship, x, y) {
    let xyCellIndex = this.board.findIndex(
      (cell) => cell.x === x && cell.y === y
    );
    if (this.board[xyCellIndex].status === 'ship') return false;
    if (x + ship.length - 1 > 9) return false;
    let intersectingShip = false;
    x--;
    for (let i = 0; i < ship.length + 2; i++) {
      const nextCell = this.board.find((cell) => cell.x === x && cell.y === y);
      x++;
      if (!nextCell) continue;
      if (nextCell.status === 'ship') {
        intersectingShip = true;
        break;
      }
      const l = this.board.find(
        (cell) => cell.y === y - 1 && cell.x === nextCell.x
      );
      const r = this.board.find(
        (cell) => cell.y === y + 1 && cell.x === nextCell.x
      );

      if (l?.status === 'ship' || r?.status === 'ship') {
        intersectingShip = true;
        break;
      }
    }
    if (intersectingShip) return false;
    return true;
  }

  clearShipPlacement() {
    this.board.forEach((cell) => {
      cell.status = 'blank';
      cell.shipID = null;
    });
    this.ships.forEach((ship) => {
      ship.orientation = 'h';
      ship.coords = { x: null, y: null };
    });
  }

  findShip(shipID) {
    const ship = this.ships.find((ship) => ship.id === shipID);
    return ship;
  }
  findShipPos(cell, ship) {
    let pos;
    if (ship.orientation === 'h') {
      pos = cell.y - ship.coords.y;
    }
    if (ship.orientation === 'v') {
      pos = cell.x - ship.coords.x;
    }
    return pos;
  }
  checkSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  findClickCell() {
    while (true) {
      const x = Math.trunc(Math.random() * 10);
      const y = Math.trunc(Math.random() * 10);
      let clickCell = this.board.find((cell) => cell.x === x && cell.y === y);

      if (clickCell.clicked) continue;
      return clickCell;
    }
  }
}

export default Gameboard;
