import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Register from './components/Register';
import { useSelector } from 'react-redux';

function App() {
  const [loading, setLoading] = useState(false)
  const [showBoard, setShowBoard] = useState(false)
  const { status, wordleWords } = useSelector((state) => state.wordleWords)
  useEffect(() => {
    console.log(status)
    if(status === 'loading' && wordleWords.length === 0){
      setLoading(true)
    } else if(status === 'succeeded' && wordleWords.length > 0){
      setLoading(false)
      setShowBoard(true)
    } else {
      setLoading(false)
      setShowBoard(false)
    }
  }, [status, wordleWords])
  return (
    <div className="App">
      {/* {loading && <p>Loading...</p>} */}
      {!loading && showBoard && <Board />}
      {!loading && !showBoard && <Register />}
    </div>
  );
}

export default App;
