const Gameboard = (function () {
  // initialize the board array with 9 null values
  const _board = new Array(9).fill(null);
  // const board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']

  // set the cell in the array to the current player's mark
  const setCell = (id, mark) => {
    board[id] = mark;
  }

  const getBoard = () => _board;

  return {
    board: getBoard(),
    setCell,
  }
})();

const PlayerFactory = function (name, mark) {
  const getName = () => name;

  const getMark = () => mark.toUpperCase();

  const _positions = [];

  const reset = () => {
    // assign the length to a variable becasue it will change in the loop
    const length = _positions.length;
    for (let i = 0; i < length; i++) {
      // splice only first element because everything is getting spliced
      _positions.splice(0, 1);
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

const dummyPlayer1 = PlayerFactory('Dummy1', 'X', false);
const dummyPlayer2 = PlayerFactory('Dummy2', 'O', false);

const popupContent = (function () {

  const _openPopup = () => {
    const popupContainer = document.querySelector('#popup-container');
    popupContainer.style.display = 'flex';
    return console.log('Popup opened');
  }

  const _closePopup = () => {
    const popupContainer = document.querySelector('#popup-container');
    popupContainer.style.display = 'none';
    return console.log('Popup closed');
  }

  const closeBtn = () => {
    const closeBtn = document.querySelector('#popup-close-btn');
    closeBtn.addEventListener('click', _closePopup);
    return console.log('Close button now pressable');
  }

  const _addToContent = (div) => {
    const content = document.querySelector('#popup-content');
    if (content.firstChild != null) content.removeChild(content.firstChild);
    content.appendChild(div);
    _openPopup();
    return console.log('Popup content added');
  }

  const getName = (mark) => {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');
    label.htmlFor = 'nameInput';
    input.id = 'nameInput';
    input.name = `player ${mark}`;
    div.style = {
      'display':'flex', 
      'flex-direction':'column',
    }
    h3.appendChild(document.createTextNode(`Hi, Player ${mark.toUpperCase() === 'X' ? 1 : 2}. You'll be ${mark}`));
    label.appendChild(document.createTextNode('Please enter your name:'));
    form.appendChild(label);
    form.appendChild(input);
    div.appendChild(h3);
    div.appendChild(form);
    _addToContent(div);
    return console.log('Popup name form set');
  }

  return {
    closeBtn,
    getName,
  }
})()

const Game = (function () {
  let currentPlayer;
  const players = [];

  const getCurrent = () => {
    return currentPlayer;
  }

  const setCurrent = (mark) => {
    currentPlayer = mark;
  }

  const start = () => {
    currentPlayer = 'X';
    const player1Name = null;
    const player2Name = null;
    players.push(PlayerFactory(player1Name, 'X'));
    players.push(PlayerFactory(player2Name, 'O'));
  }

  let moves = 0;

  const newMove = () => {
    moves += 1;
  }

  getMoves = () => {
    return moves;
  }

  const playerMove = (e) => {
    if (currentPlayer === dummyPlayer1.mark) {
      dummyPlayer1.makeMove(e);
      dummyPlayer1.isWinner() ? alert('X is the winner') : console.log('X has played');
    } else if (currentPlayer === dummyPlayer2.mark) {
      dummyPlayer2.makeMove(e);
      dummyPlayer2.isWinner() ? alert('O is the winner') : console.log('O has played');
    }
  }

  return {
    start,
    playerMove,
    current: getCurrent,
    setCurrent,
    newMove,
    moves: getMoves,
  }
  
})();

window.onload = () => { Game.start() };
document.querySelector('#gameboard').addEventListener('click', Game.playerMove);
