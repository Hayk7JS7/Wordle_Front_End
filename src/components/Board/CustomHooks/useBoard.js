import { useState } from "react";
import { BOARD_SIZE, LETTERS } from "../../../utils/BoardUtils";
import { fillWithWords } from "../FillBoards/fillWithWords";
import { fillWithRandomLetters } from "../FillBoards/fillWithRandomLetters";
import { useSelector } from "react-redux";



function generateEmptyBoard() {
    return Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => ''))
}

export function useBoard() {
    const { wordleWords } = useSelector((state) => state.wordleWords)
    const [board, setBoard] = useState(() => {
        const board = generateEmptyBoard()
        fillWithWords(board, wordleWords, BOARD_SIZE)
        fillWithRandomLetters(board, BOARD_SIZE, LETTERS)
        return board
    })
    
    return board
}

