const Board = (function () {
  // const gameBoard = new Array(9).fill(null);
  const board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']
  return {
    board
  }
})();

const PlayerFactory = function (name) {
  return {
    name: name
  }
};

const Game = (function () {
  const start = function (board) {
    for (let i = 0; i < board.length; i ++) {
      document.querySelector(`#cell-${i + 1}`).textContent = board[i];
    }
  }
  return {
    start
  }
})();

window.onload = () => {Game.start(Board.gameBoard)};
