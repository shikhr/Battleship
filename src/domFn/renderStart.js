import * as Helper from './helper';

const renderStart = function (player) {
  const gameboard = player.gameboard;
  const root = document.querySelector('.root');
  root.innerHTML = '';

  const startHtml = `
  <div class="btn-container">
    <button id="autoPlace" class="btn">AUTO PLACE</button>
    <button id="clear" class="btn">clear</button>
  </div>
  <div class="start boards-container">
        <div class="myboard gameboard"></div>
        <div class="allships">
          <button class="btn btn-play btn-hidden">PLAY</button>
          <div class="ship-unplaced-container ship-unplaced-container-v"></div>
          <div class="ship-unplaced-container ship-unplaced-container-h"></div>
        </div>
    </div>
  `;
  root.insertAdjacentHTML('afterbegin', startHtml);

  Helper.renderBoard(document.querySelector('.myboard'), player);
  Helper.renderShips(gameboard.ships);

  document.getElementById('autoPlace').addEventListener('click', (e) => {
    gameboard.clearShipPlacement();
    gameboard.autoPlace();
    Helper.renderBoard(document.querySelector('.myboard'), player);
    Helper.renderShips(gameboard.ships);
  });

  document.getElementById('clear').addEventListener('click', () => {
    gameboard.clearShipPlacement();
    Helper.renderBoard(document.querySelector('.myboard'), player);
    Helper.renderShips(gameboard.ships);
  });

  document.querySelector('.allships').addEventListener('click', (e) => {
    let targetShip = e.target.closest('.ship-unplaced');
    if (!targetShip) return;
    console.log(targetShip);
    const shipId = targetShip.dataset.id;
    const ship = gameboard.ships.find((ship) => ship.id == shipId);
    console.log(ship);
    gameboard.switchOrientation(ship);
    console.log(ship);
    Helper.renderShips(gameboard.ships);
  });
};

export default renderStart;
