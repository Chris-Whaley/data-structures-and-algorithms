class ChessBoard {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.path = [];
    this.visits = [];
    this.visits.push(this.start);
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

  queueMoves(currentSquare) {
    let nextSquares = [];
    this.availableMoves.forEach((element) => {
      const nextY = currentSquare[0] + element[0];
      const nextX = currentSquare[1] + element[1];
      const nextSq = [nextY, nextX];

      if (this.visits.some((arr) => arr[0] == nextY && arr[1] == nextX)) {
        // don't add if we've already visited
      } else if (nextY >= 0 && nextY <= 7 && nextX >= 0 && nextX <= 7) {
        nextSquares.push([nextY, nextX]);
        this.visits.push([nextY, nextX]);
      }
    });

    return nextSquares;
  }

  knightMoves(start = [this.start]) {
    let queue = start;
    this.board[this.start[0]][this.start[1]] = this.start;

    let nextSquares = [];

    while (queue.length > 0) {
      let position = queue.shift();
      this.visits.push(position);
      nextSquares = this.queueMoves(position);

      for (let index = 0; index < nextSquares.length; index++) {
        const square = nextSquares[index];

        if (square[0] == this.end[0] && square[1] == this.end[1]) {
          this.board[this.end[0]][this.end[1]] = 1;
          this.path.push(position);
          // break;
          this.backtrace();
          this.showMoves();
        } else if (this.board[square[0]][square[1]]) {
          // already landed on this square, so skip it
        } else {
          this.board[square[0]][square[1]] = position;
          queue.push(square);
        }
      }
    }

    // if we've landed on the end square at least once, backtrack the squares on our path
    // if (this.board[this.end[0]][this.end[1]] == 1) {
    //   this.backtrace();
    //   this.showMoves();
    // } else {
    //   this.knightMoves(nextSquares);
    // }
  }

  backtrace() {
    let queue = this.path;
    let path = [];

    while (queue.length > 0) {
      let position = queue.shift();
      let tempPath = [];
      tempPath.push(this.end);
      tempPath.unshift(position);

      while (position[0] != this.start[0] || position[1] != this.start[1]) {
        let predecessor = this.board[position[0]][position[1]];
        tempPath.unshift(predecessor);
        position = predecessor;
      }

      path.push(tempPath);
      // console.log(path);
    }

    this.path = path;
  }

  showMoves() {
    let paths = this.path;
    let shortestPath;
    let outputPath;

    for (let index = 0; index < paths.length; index++) {
      const path = paths[index];
      if (shortestPath == null) {
        shortestPath = path.length;
        outputPath = path;
      } else if (path.length < shortestPath) {
        outputPath = path;
      }
    }

    // print the shortest path (leave out the starting square in count)
    console.log(`You made it in ${shortestPath - 1} moves! Here's your path:`);
    for (let index = 0; index < outputPath.length; index++) {
      const square = outputPath[index];
      console.log(square);
    }
  }
}

const chessboard = new ChessBoard([0, 0], [7, 7]);
chessboard.knightMoves();
