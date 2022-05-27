const Board = (function () {
  const setCell = (id, mark) => {
    board[id] = mark;
  }
  const getBoard = () => board;
  // const gameBoard = new Array(9).fill(null);
  const board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']
  return {
    board: getBoard(),
    setCell,
  }
})();

const PlayerFactory = function (name, mark) {
  const getName = () => name;

  const getMark = () => mark.toUpperCase();

  const makeMove = (e) => {
    if (!e.target.firstChild) {
      e.target.appendChild(document.createTextNode(`getMark()`));
      const id = e.target.id.split('').pop(); // This selects the very last character in the string
      Board.setCell(id, getMark());
    }
  }

  return {
    name: getName(),
    mark: getMark(),
    makeMove,
  }
};

const Game = (function () {
  const start = function (board) {
    for (let i = 0; i < board.length; i++) {
      document.querySelector(`#cell-${i + 1}`).textContent = board[i];
    }
  }
  return {
    start
  }
})();

window.onload = () => { Game.start(Board.board) };
