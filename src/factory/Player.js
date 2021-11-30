import Gameboard from './Gameboard';

class Player {
  constructor(name, boardName) {
    this.name = name;
    this.gameboard = new Gameboard(boardName);
  }
}

export default Player;
