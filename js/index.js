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

const PlayerFactory = function (name, mark) {
  const getName = () => name;

  const getMark = () => mark.toUpperCase();

  const positions = [];

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
      const id = e.target.id.split('').pop(); // This selects the very last character in the string
      Gameboard.setCell(Number(id) - 1, getMark());
      positions.push(Number(id));
      getMark() === 'X' ? Game.setCurrent('O') : Game.setCurrent('X');
      Game.newMove();
    }
  }

  const isWinner = () => {
    if (positions.length < 3) return false;
    if (positions.includes(1) && positions.includes(2) && positions.includes(3)) return true;
    if (positions.includes(4) && positions.includes(5) && positions.includes(6)) return true;
    if (positions.includes(7) && positions.includes(8) && positions.includes(9)) return true;
    if (positions.includes(1) && positions.includes(4) && positions.includes(7)) return true;
    if (positions.includes(2) && positions.includes(5) && positions.includes(8)) return true;
    if (positions.includes(3) && positions.includes(6) && positions.includes(9)) return true;
    if (positions.includes(1) && positions.includes(5) && positions.includes(9)) return true;
    if (positions.includes(3) && positions.includes(5) && positions.includes(7)) return true;
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

const Game = (function () {
  let currentPlayer;

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
document.querySelector('#gameboard').addEventListener('click', Game.playerMove)
