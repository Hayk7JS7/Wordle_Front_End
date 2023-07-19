import React, { useEffect, useState } from 'react'
import '../../styles/Board/Boards.css'
import { useBoard } from './CustomHooks/useBoard'
import { useMouseSelection } from './CustomHooks/useMouseSelection'
import Timer from './Timer'
import { useSelector } from 'react-redux'

function Board() {
  const { wordleWords } = useSelector((state) => state.wordleWords)
  useEffect(() => {
    console.log(wordleWords);
  }, [wordleWords]);
  const [isTimerExpired, setIsTimerExpired] = useState(false)
  const board = useBoard()
    const {
      correctSelections,
      selected, 
      found, 
      setDefaultValues,
      handleLetterMouseDown,
      handleLetterMouseOver
    } = useMouseSelection()

    useEffect(() => {
      if(found.length === wordleWords.length)return
      if(isTimerExpired){
        alert('Time expired')
      }
    }, [isTimerExpired])

    useEffect(() => {
      if(found.length === wordleWords.length && !isTimerExpired) {
        alert('Successful!')
      }
    }, [found])

    const handleTimerExpired = () => {
      setIsTimerExpired(true)
      setDefaultValues()
    }

    return (
      <div className="board">
      {found.length !== wordleWords.length && <Timer onTimerExpired={handleTimerExpired}/>}
        {!isTimerExpired && wordleWords.map(word => (
          <div key={word} className={found.includes(word) ? 'found' : ''}>{word}</div>
        ))}
        {!isTimerExpired && board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((letter, columnIndex) => (
              <span
                key={columnIndex}
                className={`
                  ${selected.some(s => s.rowIndex === rowIndex && s.columnIndex === columnIndex) ? 'selected' : ''}
                  ${correctSelections.some(s => s.rowIndex === rowIndex && s.columnIndex === columnIndex) ? 'correctWord' : ''}
                `}
                onMouseDown={() => handleLetterMouseDown(letter, rowIndex, columnIndex)}
                onMouseOver={() => handleLetterMouseOver(letter, rowIndex, columnIndex)}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
    )
}

export default Board