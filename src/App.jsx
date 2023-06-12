import "./App.css";
import confetti from "canvas-confetti";
import { useState } from "react";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { Squear } from "./components/Squear";
import { TURN } from "./constants.js";

function App() {
  const boardFromLocalStorage = () => {
    const storeBoard = localStorage.getItem("board");
    return storeBoard ? JSON.parse(storeBoard) : Array(9).fill(null);
  };
  const turnFromLocalStorage = () => {
    const storeTurn = localStorage.getItem("turn");
    return storeTurn || TURN.X;
  };
  const [board, setBoard] = useState(boardFromLocalStorage());
  const [turn, setTurn] = useState(turnFromLocalStorage());
  const [winner, setWinner] = useState(null);

  const boardToLocalStorage = (newBoard) => {
    localStorage.setItem("board", JSON.stringify(newBoard));
  };
  const turnToLocalStorage = (newTurn) => {
    localStorage.setItem("turn", newTurn);
  };

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

    boardToLocalStorage(newBoard);
    turnToLocalStorage(newTurn);
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
    localStorage.removeItem("board");
    localStorage.removeItem("turn");
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe!</h1>
      {!winner && <button onClick={resetGame}>Reset</button>}
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
