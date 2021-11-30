import * as Helper from './helper';

const renderPlay = function (player1, player2) {
  const root = document.querySelector('.root');
  root.innerHTML = '';

  const playHtml = `
    <div class="play boards-container">
        <div class="myboard gameboard"></div>
        <div class="computerboard gameboard"></div>
    </div>
  `;
  root.insertAdjacentHTML('afterbegin', playHtml);

  renderPlayBoards(player1, player2);
  renderOverlays(player1, player2);
};

const renderPlayBoards = function (player1, player2) {
  Helper.renderBoard(document.querySelector('.myboard'), player1, true);
  Helper.renderBoard(document.querySelector('.computerboard'), player2, true);
};

const renderOverlays = function (currentPlayer, currentPlayerAttacks) {
  const hidden = document.querySelector(
    `.${currentPlayer.gameboard.boardName}`
  );
  const visible = document.querySelector(
    `.${currentPlayerAttacks.gameboard.boardName}`
  );

  hidden.classList.add('shade-overlay');
  visible.classList.remove('shade-overlay');
};

export default renderPlay;
export { renderPlayBoards, renderOverlays };
