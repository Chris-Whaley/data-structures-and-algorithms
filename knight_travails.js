class Square {
  constructor(currentSquare = null, nextSquare = null) {
    this.currentSquare = currentSquare;
    this.nextSquare = nextSquare;
  }
}

class ChessBoard {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.board = this.createBoard();
    this.availableMoves = [
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
    ];
  }

  createBoard() {
    let row = new Array(8);
    let board = new Array(8).fill(row);

    // y-axis is board index, x-axis is the row array's index (ex: board[0][7] = y=0 and x=7; bottom row, right column; bottom-right corner square)
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board[i][j] = j;
      }
    }
    return board;
  }

  findPath(
    start = this.start,
    end = this.end,
    possibleMoves = this.availableMoves
  ) {
    let currentSquare = new Square(start);
    let queue = [];

    queue = this.queueMoves(currentSquare, possibleMoves);

    queue.forEach((element) => {
      //   if (element[0] == end[0] && element[1] == end[1]) {
      //     return element;
      //   }
      //   currentSquare.nextSquare = element;
    });

    queue.forEach((element) => {
      this.findPath(element, end, possibleMoves);
    });
  }

  queueMoves(currentSquare, possibleMoves) {
    let nextSquares = [];
    possibleMoves.forEach((element) => {
      const nextY = currentSquare[0] + element[0];
      const nextX = currentSquare[1] + element[1];
      nextSquares.push([nextY, nextX]);
    });

    return nextSquares;
  }
}

const chessboard = new ChessBoard([0, 0], [3, 3]);
chessboard.findPath();
