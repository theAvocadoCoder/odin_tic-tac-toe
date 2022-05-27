const Gameboard = (function () {
  // initialize the board array with 9 null values
  const board = new Array(9).fill(null);
  // const board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']

  // set the cell in the array to the current player's mark
  const setCell = (id, mark) => {
    board[id] = mark;
  }

  const getBoard = () => board;

  return {
    board: getBoard(),
    setCell,
  }
})();

const PlayerFactory = function (name, mark, isCurrent) {
  const getName = () => name;

  const getMark = () => mark.toUpperCase();

  const positions = [2, 3, 4, 5, 6];

  const reset = () => {
    // assign the length to a variable becasue it will change in the loop
    const length = positions.length;
    for (let i = 0; i < length; i++) {
      // splice only first element because everything is getting spliced
      positions.splice(0, 1);
    }
  }

  const makeMove = (e) => {
    if (e.target.firstChild === null && Game.current() === getMark()) {
      e.target.appendChild(document.createTextNode(`${getMark()}`));
      console.log('a move was just played')
      const id = e.target.id.split('').pop(); // This selects the very last character in the string
      Gameboard.setCell(Number(id) - 1, getMark());
      positions.push(id);
      getMark() === 'X' ? Game.setCurrent('O') : Game.setCurrent('X');
      Game.newMove();
    }
  }

  return {
    name: getName(),
    mark: getMark(),
    makeMove,
    reset,
    positions,
  }
};

const dummyPlayer1 = PlayerFactory('Dummy1', 'X', false);
const dummyPlayer2 = PlayerFactory('Dummy2', 'O', false);

const Game = (function () {
  let currentPlayer;

  const checkIfWin = () => {}

  const getCurrent = () => {
    return currentPlayer;
  }

  const setCurrent = (mark) => {
    currentPlayer = mark;
  }

  const start = () => {
    currentPlayer = 'X';
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
    } else if (currentPlayer === dummyPlayer2.mark) {
      dummyPlayer2.makeMove(e);
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
document.querySelector('#gameboard').addEventListener('click', Game.playerMove)
