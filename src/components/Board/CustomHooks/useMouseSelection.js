import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



export function useMouseSelection() {
    const { wordleWords } = useSelector((state) => state.wordleWords)
    const DEFAULT_VALUES = {
        correctSelections: [],
        selected:[],
        found:[],
        isMouseDown : false
    }
    
    const [correctSelections, setCorrectSelections] = useState(DEFAULT_VALUES.correctSelections)
    const [selected, setSelected] = useState(DEFAULT_VALUES.selected)
    const [found, setFound] = useState(DEFAULT_VALUES.found)
    const [isMouseDown, setIsMouseDown] = useState(DEFAULT_VALUES.isMouseDown)

    const handleLetterMouseDown = (letter, rowIndex, columnIndex) => {
        setIsMouseDown(true)
        setSelected([{ letter, rowIndex, columnIndex }])
    }

    const handleLetterMouseOver = (letter, rowIndex, columnIndex) => {
        if(isMouseDown && !selected.some(s => s.rowIndex === rowIndex && s.columnIndex === columnIndex)){
            setSelected(prevSelected => [...prevSelected, { letter, rowIndex, columnIndex }])
        }
    }

    const handleMouseUp = () => {
        setIsMouseDown(false)
        const selectedWord = selected.map(s => s.letter).join('')
        if(wordleWords.includes(selectedWord) && !found.includes(selectedWord)) {
            setFound(prevFound => [...prevFound, selectedWord])
            setCorrectSelections(prev => [...prev, ...selected])
        }
        setSelected([])
    }

    const setDefaultValues = () => {
        setCorrectSelections(DEFAULT_VALUES.correctSelections)
        setSelected(DEFAULT_VALUES.selected)
        setFound(DEFAULT_VALUES.found)
        setIsMouseDown(DEFAULT_VALUES.isMouseDown)
    }

    useEffect(() => {
     document.addEventListener('mouseup', handleMouseUp)
     return () => {
        document.removeEventListener('mouseup', handleMouseUp)
     }
    })

    return {
        correctSelections,
        selected, 
        found, 
        isMouseDown, 
        handleLetterMouseDown,
        handleLetterMouseOver,
        setDefaultValues
    }
}

