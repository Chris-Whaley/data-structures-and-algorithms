class ChessBoard {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.queue = [];
    this.queue.push(start);
    this.visited = new Map();
    this.path = [];
    this.path.push(this.start);
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
    // let row = new Array(8).fill(0);
    // let board = new Array(8).fill(row);
    let board = new Array(8);

    // y-axis is board index, x-axis is the row array's index (ex: board[0][7] = y=0 and x=7; bottom row, right column; bottom-right corner square)
    for (let i = 0; i < board.length; i++) {
      let row = new Array(8).fill(0);
      for (let j = 0; j < board.length; j++) {
        board[i] = row;
      }
    }
    return board;
  }

  findPath(position = this.start, queue = this.queue) {
    let predecessor = position;
    let nextSquares = this.queueMoves(predecessor);

    // record squares that we've landed on
    // this.visited.set(predecessor[0], predecessor[1]);

    // record square prior to the end location
    if (predecessor[0] == this.end[0] && predecessor[1] == this.end[1]) {
      this.path.push(predecessor);
      return predecessor;
    }

    // if current square isn't the end, then pull the next possible squares we can move to
    for (let index = 0; index < queue.length; index++) {
      // nextSquares = this.queueMoves(queue[index]);
      nextSquares = this.queueMoves(predecessor);
    }

    // are any of the next squares the end?
    for (let index = 0; index < nextSquares.length; index++) {
      let y = nextSquares[index][0];
      let x = nextSquares[index][1];
      if (y == this.end[0] && x == this.end[1]) {
        return nextSquares[index];
      } else if (this.board[y][x] != 0) {
      } else {
        this.board[y][x] = nextSquares[index];
      }
    }

    // iterate through each of these next possible squares
    for (let index = 0; index < nextSquares.length; index++) {
      let square = nextSquares[index];
      let arrived = this.findPath(square, nextSquares);

      if (arrived[0] == this.end[0] && arrived[1] == this.end[1]) {
        this.path.push(square);
        this.path.push(this.end);
        console.log(this.path);
        return square;
      }
    }
  }

  queueMoves(currentSquare) {
    let nextSquares = [];
    this.availableMoves.forEach((element) => {
      const nextY = currentSquare[0] + element[0];
      const nextX = currentSquare[1] + element[1];

      if (nextY >= 0 && nextY <= 7 && nextX >= 0 && nextX <= 7) {
        nextSquares.push([nextY, nextX]);
      }
    });

    return nextSquares;
  }
}

const chessboard = new ChessBoard([0, 0], [4, 5]);
chessboard.findPath();
