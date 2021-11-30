import Ship from '../factory/Ship';

const renderBoard = function (ele, player, hidden = false) {
  const gameboard = player.gameboard;
  ele.innerHTML = '';
  document.documentElement.style.setProperty('--size', 10);

  gameboard.board.forEach((cell) => {
    let hiddenCellClass = '';
    if (hidden) {
      if (!cell.clicked) hiddenCellClass = 'hidden-cell';
    }
    const cellHtml = `
      <div class="cell ${cell.status} ${hiddenCellClass}" data-x="${cell.x}" , data-y="${cell.y}" data-shipid="${cell.shipID}"></div>
    `;
    ele.insertAdjacentHTML('beforeend', cellHtml);
  });
};

const renderShips = function (ships) {
  const container_h = document.querySelector('.ship-unplaced-container-h');
  const container_v = document.querySelector('.ship-unplaced-container-v');
  container_h.innerHTML = '';
  container_v.innerHTML = '';
  ships.forEach((ship) => {
    if (ship.coords.x !== null && ship.coords.y !== null) {
      return;
    }
    if (ship.orientation === 'v') return;
    let shipCell = '';
    for (let i = 0; i < ship.length; i++) {
      shipCell += `
          <div class="cell ship-cell"></div>
      `;
    }
    let shipHtml = `<div class="ship-unplaced ship-unplaced-${ship.orientation}" data-id="${ship.id}">${shipCell}</div>`;
    container_h.insertAdjacentHTML('beforeend', shipHtml);
  });
  ships.forEach((ship) => {
    if (ship.coords.x !== null && ship.coords.y !== null) {
      return;
    }
    if (ship.orientation === 'h') return;
    let orientation = ship.orientation;
    let shipCell = '';
    for (let i = 0; i < ship.length; i++) {
      shipCell += `
          <div class="cell ship-cell"></div>
      `;
    }
    let shipHtml = `<div class="ship-unplaced ship-unplaced-${orientation}" data-id="${ship.id}">${shipCell}</div>`;
    container_v.insertAdjacentHTML('beforeend', shipHtml);
  });

  if (container_h.children.length === 0 && container_v.children.length === 0) {
    document.querySelector('.btn-play').classList.remove('btn-hidden');
  } else {
    document.querySelector('.btn-play').classList.add('btn-hidden');
  }
};

const renderGameOver = function (winnerPlayer) {
  const root = document.querySelector('.root');
  const goHtml = `
      <div class="gameover-container">
        <div class="gameover">
          <p class="winner-info">WINNER: ${winnerPlayer.name}</p>
          <button class="btn btn-restart">RESTART</button>
        </div>
      </div>    
  `;
  root.insertAdjacentHTML('beforeend', goHtml);
  document.querySelector('.btn-restart').addEventListener('click', (e) => {
    location.reload();
  });
};

export { renderBoard, renderShips, renderGameOver };
