const Gameboard = (function () {
  // initialize the board array with 9 null values
  const _board = new Array(9).fill(null);

  // set the cell in the array to the current player's mark
  const setCell = (id, mark) => {
    _board[id] = mark;
  }

  const resetBoard = () => {
    _board.forEach(cell => {
      cell = null;
    })
  }

  const getBoard = () => _board;

  return {
    board: getBoard(),
    setCell,
    resetBoard,
  }
})();

const PlayerFactory = function (name, mark) {
  const getName = () => name;

  const getMark = () => mark.toUpperCase();

  const _positions = [];

  const reset = () => {
    for (let i = 0; i < _positions.length;) {
      // remove the last element till array is empty
      _positions.pop();
    }
  }

  const makeMove = (e) => {
    if (e.target.firstChild === null && Game.current() === getMark()) {
      e.target.appendChild(document.createTextNode(`${getMark()}`));
      const id = e.target.id.split('').pop(); // This selects the very last character in the string
      Gameboard.setCell(Number(id) - 1, getMark());
      _positions.push(Number(id));
      getMark() === 'X' ? Game.setCurrent('O') : Game.setCurrent('X');
      Game.newMove();
    }
  }

  const isWinner = () => {
    if (_positions.length < 3) return false;
    if (_positions.includes(1) && _positions.includes(2) && _positions.includes(3)) return true;
    if (_positions.includes(4) && _positions.includes(5) && _positions.includes(6)) return true;
    if (_positions.includes(7) && _positions.includes(8) && _positions.includes(9)) return true;
    if (_positions.includes(1) && _positions.includes(4) && _positions.includes(7)) return true;
    if (_positions.includes(2) && _positions.includes(5) && _positions.includes(8)) return true;
    if (_positions.includes(3) && _positions.includes(6) && _positions.includes(9)) return true;
    if (_positions.includes(1) && _positions.includes(5) && _positions.includes(9)) return true;
    if (_positions.includes(3) && _positions.includes(5) && _positions.includes(7)) return true;
    return false;
  }

  return {
    name: getName(),
    mark: getMark(),
    makeMove,
    reset,
    isWinner,
  }
};

const popupContent = (function () {

  const _openPopup = () => {
    const popupContainer = document.querySelector('#popup-container');
    popupContainer.style.display = 'flex';
  }

  const _closePopup = () => {
    const popupContainer = document.querySelector('#popup-container');
    popupContainer.style.display = 'none';
  }

  const closeBtn = (closeCallback) => {
    const closeBtn = document.createElement('div');
    closeBtn.id = 'popup-close-btn';
    closeBtn.appendChild(document.createTextNode('x'));
    closeBtn.addEventListener('click', closeCallback);
    return closeBtn;
  }

  const _addToContent = (div, closeCallback=[]) => {
    const content = document.querySelector('#popup-content');
    if (content.firstChild != null) content.removeChild(content.firstChild);
    content.appendChild(div);
    if (closeCallback.length > 0) {
      const popupBox = document.querySelector('#popup-box');
      if (document.querySelector('#popup-close-btn') != null) popupBox.removeChild(popupBox.lastChild);
      popupBox.appendChild(closeBtn(closeCallback[0]));
    };
    _openPopup();
  }

  const displayWinner = (name, mark) => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`${name} (${mark}) has won!`));
    div.appendChild(p);
    _addToContent(div, [function closePopupAndReset() {
      Game.reset();
      _closePopup();
      Game.displayCurrent();
    }]);
  }

  const getNames = (mark='X') => {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const submitBtn = document.createElement('button');
    input.id = `player-${mark}-input`;
    label.htmlFor = `player-${mark}-input`;
    submitBtn.type = 'button';
    submitBtn.onclick = () => {
      Game.makePlayer(input.value, mark.toUpperCase());
      _closePopup();
      if (mark === 'X') {
        getNames("O");
      } else {
        document.querySelector("#start-btn").disabled = true;
        Game.displayCurrent();
      }
    };
    h3.appendChild(document.createTextNode(`Hi, Player ${mark.toUpperCase() === 'X' ? 1 : 2}. You'll be ${mark}`));
    label.appendChild(document.createTextNode('Please enter your name:'));
    submitBtn.appendChild(document.createTextNode('Submit'));
    div.appendChild(h3);
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(document.createElement('br'));
    div.appendChild(submitBtn);
    _addToContent(div);
  }

  return {
    closeBtn,
    displayWinner,
    getNames,
  }
})()

const Game = (function () {
  let currentPlayer;
  const players = [];

  const displayCurrent = () => {
    const currentDiv = document.querySelector("#current-player");
    if (currentDiv.firstChild != null) currentDiv.removeChild(currentDiv.firstChild);
    const playerName = players[0].mark === currentPlayer
      ? players[0].name
      : players[1].mark === currentPlayer
      ? players[1].name
      : players[0].name;
    currentDiv.appendChild(document.createTextNode(`${playerName}(${currentPlayer}) is to play.`));
  }

  const getCurrent = () => {
    return currentPlayer;
  }

  const setCurrent = (mark) => {
    currentPlayer = mark;
  }

  const start = () => {
    setCurrent('X');
    popupContent.getNames();
  }

  const reset = () => {
    // players.forEach(player => {
    //   // reset the players' data except names and marks
    //   player.reset();
    // })
    do {
      players.pop();
    } while (players.length > 0)

    Gameboard.resetBoard();
    for (let i = 1; i <= 9; i++) {
      let cell = document.querySelector(`#cell-${i}`);
      if (cell.firstChild != null) cell.removeChild(cell.firstChild);
    }
    moves = 0;
    document.querySelector("#start-btn").disabled = false;
    document.querySelector("#current-player").removeChild(document.querySelector("#current-player").firstChild);
  }

  let moves = 0;

  const newMove = () => {
    moves += 1;
  }

  getMoves = () => {
    return moves;
  }

  const makePlayer = (name, mark) => {
    players.push(new PlayerFactory(name, mark));
  }

  const playerMove = (e) => {
    if (currentPlayer === players[0].mark) {
      players[0].makeMove(e);
      if (players[0].isWinner()) setTimeout(() => {
        popupContent.displayWinner(players[0].name, players[0].mark);
        // Winner gets to be next player
        setCurrent(players[0].mark);
      }, 100);
    } else if (currentPlayer === players[1].mark) {
      players[1].makeMove(e);
      if (players[1].isWinner()) setTimeout(() => {
        popupContent.displayWinner(players[1].name, players[1].mark);
        // Winner gets to be next player
        setCurrent(players[1].mark);
      }, 100);
    }
    displayCurrent();
  }

  return {
    players,
    start,
    reset,
    makePlayer,
    playerMove,
    displayCurrent,
    current: getCurrent,
    setCurrent,
    newMove,
    moves: getMoves,
  }
  
})();

// window.onload = () => { Game.start() };
document.querySelector('#gameboard').addEventListener('click', Game.playerMove);
document.querySelector("#reset-btn").addEventListener("click", Game.reset);
document.querySelector("#start-btn").addEventListener("click", Game.start);
