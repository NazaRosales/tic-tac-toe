import { useState } from 'react'
import './App.css'

const TURN = {
  X: 'x',
  O: 'o'
}

const Squear = ({children, isSelected, updateBoard, index}) =>{
  const className = `square ${isSelected? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard();
  }
  return (
    <div onClick={handleClick} className = {className}>
      {children}
    </div>
  )
} 
function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [turn, setTurn] = useState(TURN.X)


  const updateBoard = () =>{
    const newTurn = turn === TURN.X ? TURN.O : TURN.X; 
    setTurn(newTurn);
  }
  
  return (
    <main className='board'>
      <h1>Tic Tac Toe!</h1>
      <section className='game'>
        {
          board.map( (cell, index)=>{
            return(
              <Squear 
              key={index}
              index={index} 
              updateBoard={updateBoard}>
                {board[index]}
              </Squear>
            )
          })
        }
      </section>

      <section className='turn'>

        <Squear isSelected = {turn === TURN.X}>
          {TURN.X}
        </Squear>

        <Squear isSelected = {turn === TURN.O}>
          {TURN.O}
        </Squear>

      </section>
    </main>
  )
}

export default App
