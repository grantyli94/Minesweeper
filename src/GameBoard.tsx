import { useState, useEffect } from "react";
import Cell from "./Cell";
import { Point } from "./interfaces";
import { directions } from "./variables";

interface Props {
  gameBoard: string[][];
  mines: Point[];
  restart: () => void;
  restartCount: number;
}

function GameBoard({ gameBoard, mines, restart, restartCount }: Props) {
  console.log("GameBoard renders");
  const [board, setBoard] = useState(gameBoard);
  const [gameOver, setGameOver] = useState(false);
  
  const currBoard = [...board];
  const HEIGHT = board.length;
  const WIDTH = board[0].length;

  /** Resets board when gameBoard prop changes */
  useEffect(function resetBoard() {
    setBoard(gameBoard);
    setGameOver(false);
  }, [gameBoard]);

  useEffect(function checkWin() {
    if (board.every(row => row.every(cell => cell !== "E"))) {
      alert("YOU WON!");
      setGameOver(true);
    }
  }, [board]);

  /**
   * Recursively reveals cells until arriving at a cell with adjacent mines
   * If a mine is clicked on, game will end
   */
  function reveal(point: Point): void {
    const [y, x] = point;
    
    if (y >= HEIGHT || x >= WIDTH || y < 0 || x < 0 || board[y][x] === "0") {
      return;
    }

    if (board[y][x] === "M") {
      currBoard[y][x] = "X";
      revealMines();
      alert("GAME OVER");
      setGameOver(true);
      return;
    }

    if (currBoard[y][x] === "E") {
      if (numAdjacent(point) < 1) {
        currBoard[y][x] = "0";
        
        for (const [i, j] of directions) {
          reveal([y+i, x+j]);
        }
      } else {
        currBoard[y][x] = `${numAdjacent(point)}`;
        setBoard(currBoard);
        return;
      }
    }

    setBoard(currBoard);
  }

  /** Counts the number of mines adjacent to the cell */
  function numAdjacent(point: Point): number {
    let count = 0;
    const [y, x] = point;

    for (const [i, j] of directions) {
      if ((0 <= y + i && y + i < HEIGHT) && 
          (0 <= x + j && x + j < WIDTH) && 
          board[y+i][x+j] === "M") {
        count += 1;
      }
    }
    
    return count;
  }

  function revealMines(): void {
    for (let [y, x] of mines) {
      currBoard[y][x] = "X";
    }

    setBoard(currBoard);
  }

  function restartGame(): void {
    console.log("restartGame");
    restart();
    setGameOver(false);
  }

  return (
    <div>
      <table className="GameBoard">
        {board.map((row, i) => 
          <tr>{row.map((cell, j) => 
            <Cell 
              key={`${i}-${j}`}
              y={i}
              x={j}
              val={cell}
              reveal={!gameOver ? reveal : undefined}
              restartCount={restartCount}
            />)}
          </tr>)}
      </table>
      <br/>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}

export default GameBoard;