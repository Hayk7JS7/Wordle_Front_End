export function fillWithWords(board, WORDS, BOARD_SIZE) {
    for (let word of WORDS) {
      let placed = false;
      while (!placed) {
        let dir = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        let startX = Math.floor(Math.random() * BOARD_SIZE);
        let startY = Math.floor(Math.random() * BOARD_SIZE);
        if (dir === 'horizontal' && startX + word.length <= BOARD_SIZE) {
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (board[startY][startX + i] !== '') {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              board[startY][startX + i] = word[i];
            }
            placed = true;
          }
        } else if (dir === 'vertical' && startY + word.length <= BOARD_SIZE) {
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (board[startY + i][startX] !== '') {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              board[startY + i][startX] = word[i];
            }
            placed = true;
          }
        }
      }
    }
  }
