import { Squear } from "./Squear";
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Tie" : "Winner:";
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Squear>{winner}</Squear>}</header>

        <footer>
          <button onClick={resetGame}>Reset</button>
        </footer>
      </div>
    </section>
  );
}
