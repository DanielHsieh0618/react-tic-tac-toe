import Square from "./Square";

interface Props {
  squares: Array<string | null>;
  xIsCurrent: boolean;
  onPlay: (newSquares: Array<string | null>) => void;
}

function Board(props: Props) {
  const { squares, xIsCurrent, onPlay } = props;

  function handleClick(index: number) {
    if (squares[index] !== null || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    if (xIsCurrent) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }

    onPlay(newSquares);
  }

  let status = "";
  // why status would be updated when xIsNext changing???
  status = "Current player: " + (xIsCurrent ? "X" : "O");
  if (calculateWinner(squares)) {
    status = "Winner: " + calculateWinner(squares);
  }

  return (
    <>
      <p>{status}</p>
      <div className="board-row">
        <Square value={squares[0]} onClickSquare={() => handleClick(0)}></Square>
        <Square value={squares[1]} onClickSquare={() => handleClick(1)}></Square>
        <Square value={squares[2]} onClickSquare={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClickSquare={() => handleClick(3)}></Square>
        <Square value={squares[4]} onClickSquare={() => handleClick(4)}></Square>
        <Square value={squares[5]} onClickSquare={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClickSquare={() => handleClick(6)}></Square>
        <Square value={squares[7]} onClickSquare={() => handleClick(7)}></Square>
        <Square value={squares[8]} onClickSquare={() => handleClick(8)}></Square>
      </div>
    </>
  );
}

export default Board;

/**
 *  @param
 *
 * */
function calculateWinner(squares: Array<string | null>) {
  const winingConditions = [
    // lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winingConditions.length; i++) {
    const condition = winingConditions[i];
    // where a, b, and c as the winner condition's position 1, position 2, and position 3
    const [a, b, c] = condition;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
