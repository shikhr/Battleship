import Player from './Player';
import renderStart from '../domFn/renderStart';
import * as Helper from '../domFn/helper';

import renderPlay, {
  renderPlayBoards,
  renderOverlays,
} from '../domFn/renderPlay';

class Game {
  attackdelay = 0;
  currentPlayer;
  currentPlayerAttacks;
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.currentPlayerAttacks = player2;
    this.game_Over = false;
  }
  gameStart() {
    renderStart(this.player1);
  }
  gamePlay() {
    renderPlay(this.player1, this.player2);
    document
      .querySelector('.boards-container')
      .addEventListener('click', (e) => {
        if (this.currentPlayer === this.player2) return;
        if (this.game_Over) return;
        if (
          !e.target.closest('.gameboard') ||
          !e.target
            .closest('.gameboard')
            .classList.contains(this.player2.gameboard.boardName)
        )
          return;
        this.checkCell(e.target);
      });
  }

  checkCell(target) {
    const cell = this.findCell(target);
    if (cell.clicked === true) return;
    this.clickCell(cell);
  }
  findCell(target) {
    const cell = this.currentPlayerAttacks.gameboard.board.find((cell) => {
      if (cell.x === +target.dataset.x && cell.y === +target.dataset.y)
        return true;
    });
    return cell;
  }
  clickCell(cell) {
    cell.clicked = true;
    renderPlayBoards(this.player1, this.player2);
    if (cell.shipID !== null) {
      const hitShip = this.currentPlayerAttacks.gameboard.findShip(cell.shipID);
      const hitShipPos = this.currentPlayerAttacks.gameboard.findShipPos(
        cell,
        hitShip
      );
      hitShip.hit(hitShipPos);
      if (hitShip.isSunk()) this.clickAllNeighbours(hitShip);
      const allShipsHit = this.currentPlayerAttacks.gameboard.checkSunk();
      if (allShipsHit) {
        this.gameOver(this.currentPlayer);
        return;
      }
    }
    this.switchPlayers();
  }

  switchPlayers() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
      this.currentPlayerAttacks = this.player1;
    } else if (this.currentPlayer === this.player2) {
      this.currentPlayer = this.player1;
      this.currentPlayerAttacks = this.player2;
    }
    renderOverlays(this.currentPlayer, this.currentPlayerAttacks);
    if (this.currentPlayer === this.player2) {
      this.autoClick();
      return;
    }
    return;
  }

  autoClick() {
    const cell = this.currentPlayerAttacks.gameboard.findClickCell();
    setTimeout(() => {
      this.clickCell(cell);
    }, this.attackdelay);
  }

  gameOver(winnerPlayer) {
    this.game_Over = true;
    Helper.renderGameOver(winnerPlayer);
  }
  clickAllNeighbours(ship) {
    let x = ship.coords.x;
    let y = ship.coords.y;
    const board = this.currentPlayerAttacks.gameboard.board;
    if (ship.orientation === 'h') {
      y--;
      for (let i = 0; i < ship.length + 2; i++) {
        const nextCell = board.find((cell) => cell.x === x && cell.y === y);
        console.log(nextCell);
        y++;
        if (!nextCell) continue;
        const u = board.find(
          (cell) => cell.x === x - 1 && cell.y === nextCell.y
        );
        const d = board.find(
          (cell) => cell.x === x + 1 && cell.y === nextCell.y
        );
        console.log(u, d);
        nextCell.clicked = true;
        if (u) u.clicked = true;

        if (d) d.clicked = true;
      }
    }
    if (ship.orientation === 'v') {
      x--;
      for (let i = 0; i < ship.length + 2; i++) {
        const nextCell = board.find((cell) => cell.x === x && cell.y === y);
        x++;
        if (!nextCell) continue;
        const l = board.find(
          (cell) => cell.y === y - 1 && cell.x === nextCell.x
        );
        const r = board.find(
          (cell) => cell.y === y + 1 && cell.x === nextCell.x
        );
        nextCell.clicked = true;
        if (l) l.clicked = true;
        if (r) r.clicked = true;
      }
    }
    renderPlayBoards(this.player1, this.player2);
  }
}

export default Game;
