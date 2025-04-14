class ChessBoard {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.queue = [];
    // this.queue.push(start);
    this.visited = new Map();
    this.path = [];
    // this.path.push(this.start);
    this.board = this.createBoard();
    // this.board[this.end[0]][this.end[1]] = 1;
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
      this.path.push([predecessor]);
      return predecessor;
    }

    // if current square isn't the end, then pull the next possible squares we can move to
    // for (let index = 0; index < queue.length; index++) {
    //   // nextSquares = this.queueMoves(queue[index]);
    //   nextSquares = this.queueMoves(predecessor);
    // }

    // are any of the next squares the end? if not, mark that board square with the predecessor
    for (let index = 0; index < nextSquares.length; index++) {
      let y = nextSquares[index][0];
      let x = nextSquares[index][1];
      if (y == this.end[0] && x == this.end[1]) {
        return nextSquares[index];
      } else if (this.board[y][x] == 0) {
        this.board[y][x] = nextSquares[index];
      } else {
        // do nothing, we've landed on this square before
      }
    }

    if (successfulPredecessors.length == 0) {
      for (let index = 0; index < nextSquares.length; index++) {
        let square = this.findPath(nextSquares[index]);
        console.log(square);
      }
    } else {
      return predecessor;
    }

    // none of the next squarees in queue have landed on end point, so we'll continue next queue
    // for (let index = 0; index < nextSquares.length; index++) {
    //   let square = this.findPath(nextSquares[index]);
    //   console.log(square);
    //   // if (square) {
    //   //   this.path = [...this.path, [square]];
    //   // }
    // }

    // iterate through each of these next possible squares
    // for (let index = 0; index < nextSquares.length; index++) {
    //   let square = nextSquares[index];
    //   let arrived = this.findPath(square, nextSquares);
    //   //TODO fix recording the last predecessor, but not all before it
    //   if (arrived[0] == this.end[0] && arrived[1] == this.end[1]) {
    //     this.path.push(square);
    //     this.path.push(this.end);
    //     console.log(this.path);
    //     return square;
    //   }
    // }
  }

  nextSquaresCheck(nextSquares) {
    let successfulPredecessors = [];
    let queue = [];

    if (nextSquares.length == 1) {
      queue = [nextSquares];
    } else {
      queue = nextSquares;
    }
    // are any of the next squares the end? if not, mark that board square with the predecessor
    for (let index = 0; index < queue.length; index++) {
      let y = queue[index][0];
      let x = queue[index][1];
      if (y == this.end[0] && x == this.end[1]) {
        successfulPredecessors.push([queue[index]]);
      } else if (this.board[y][x] == 0) {
        this.board[y][x] = queue[index];
      } else {
        // do nothing, we've landed on this square before
      }
    }

    return successfulPredecessors;
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

  knightPath(start = [this.start]) {
    let queue = start;
    this.board[this.start[0]][this.start[1]] = 1;

    let nextSquares = [];

    while (queue.length > 0) {
      let position = queue.shift();
      nextSquares = this.queueMoves(position);

      for (let index = 0; index < nextSquares.length; index++) {
        const square = nextSquares[index];

        if (square[0] == this.end[0] && square[1] == this.end[1]) {
          this.board[this.end[0]][this.end[1]] = 1;
          this.path.push(position);
        } else if (this.board[square[0]][square[1]]) {
          // already landed on this square, so skip it
        } else {
          // queue[queue.length] = square;
          this.board[square[0]][square[1]] = position;
        }
      }
    }

    // if we've landed on the end square at least once, backtract the squares on our path
    if (this.board[this.end[0]][this.end[1]] == 1) {
      this.backtrace();
    } else {
      this.knightPath(nextSquares);
    }
  }

  backtrace() {
    let queue = this.path;
    let path = [];

    while (queue.length > 0) {
      let position = queue.shift();
      let tempPath = [];
      tempPath.push(this.end);
      tempPath.unshift(position);

      while (position[0] != this.start[0] && position[1] != this.start[1]) {
        let predecessor = this.board[position[0]][position[1]];
        tempPath.unshift(predecessor);
        position = predecessor;
      }

      path.push(tempPath);
    }
  }
}

const chessboard = new ChessBoard([0, 0], [3, 3]);
// chessboard.findPath();
chessboard.knightPath();
