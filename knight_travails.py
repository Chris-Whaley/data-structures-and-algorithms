class Chessboard:
    def __init__(self, start, end):
        self.start = start
        self.end = end
        self.path = []
        self.visits = set()
        self.visits.add(tuple(self.start))
        self.board = self.createBoard()
        self.board[self.start[0]][self.start[1]] = self.start
        self.availableMoves = [
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2],
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
        ]

    def createBoard(self):
        board = [0] * 8

        for row in range(0, 8):
            board[row] = [0] * 8

        return board

        # board = np.array([0] * NUMBER_OF_SQUARES).reshape(ROWS, ROWS)

        # return board

    def queueMoves(self, currentSquare):
        nextSquares = []

        for move in self.availableMoves:
            nextY = currentSquare[0] + move[0]
            nextX = currentSquare[1] + move[1]

            if [nextY, nextX] in self.visits:
                pass
            elif nextY >= 0 and nextY <= 7 and nextX >= 0 and nextX <= 7:
                nextSquares.append([nextY, nextX])
                self.visits.add([nextY, nextX])

    def knightMoves(self):
        queue = self.start


test = Chessboard([0, 0], [3, 3])
