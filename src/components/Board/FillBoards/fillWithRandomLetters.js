export function fillWithRandomLetters(board, BOARD_SIZE, LETTERS) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (board[y][x] === '') {
          board[y][x] = LETTERS[Math.floor(Math.random() * LETTERS.length)]
        }
      }
    }
  }