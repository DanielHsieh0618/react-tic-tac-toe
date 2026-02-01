import { useState } from "react";
import Board from "./components/Board";

function App() {
  // const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsCurrent, setXIsCurrent] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // don't use single squares never again, directly use history's current
  const currentSquares = history[history.length - 1];

  function handlePlay(newSquares: Array<string | null>) {
    setHistory([...history, newSquares]);
    setXIsCurrent(!xIsCurrent);
  }

  function jumpTo(nextMove: number) {
    console.log(nextMove);
    setHistory(history.slice(0, nextMove));
    // 1: O, 2:X
    setXIsCurrent(nextMove % 2 === 0);
  }

  const moves = history.map((_squares, idx) => {
    const move = idx + 1;
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li>
        <button key={move} onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });
  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} xIsCurrent={xIsCurrent} onPlay={handlePlay}></Board>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default App;
