import Player from './Player';
import renderStart from '../domFn/renderStart';
import Game from './Game';

export default function () {
  const player1 = new Player('Me', 'myboard');
  const player2 = new Player('Computer', 'computerboard');

  const game = new Game(player1, player2);
  player2.gameboard.autoPlace();
  game.gameStart();
  document.querySelector('.btn-play').addEventListener('click', () => {
    game.gamePlay();
  });
}
