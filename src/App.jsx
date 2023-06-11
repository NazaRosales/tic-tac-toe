import "./App.css";
import confetti from "canvas-confetti";
import { useState } from "react";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { Squear } from "./components/Squear";
import { TURN } from "./constants.js";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe!</h1>
      {!winner && <button onClick={resetGame}>Reiniciar</button>}
      <section className="game">
        {board.map((cell, index) => {
          return (
            <Squear key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Squear>
          );
        })}
      </section>

      <section className="turn">
        <Squear isSelected={turn === TURN.X}>{TURN.X}</Squear>
        <Squear isSelected={turn === TURN.O}>{TURN.O}</Squear>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  );
}

export default App;
