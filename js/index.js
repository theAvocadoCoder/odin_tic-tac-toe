const GameBoard = (function () {
  const gameBoard = new Array(9).fill(null);
  return {
    gameBoard
  }
})();

const PlayerFactory = function (name) {
  return {
    name: name
  }
};

const GameFlow = (function () {})();