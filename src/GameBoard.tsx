import React, { MouseEvent, MouseEventHandler, useState } from "react";
import Cell from "./Cell";

interface Props {
  gameBoard: string[][];
  mines: number[][];
}

const directions: number[][] = [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1]];

function GameBoard({ gameBoard, mines }: Props) {
  const [board, setBoard] = useState(gameBoard);
  const [gameOver, setGameOver] = useState(false);
  const currBoard = [...board];
  const HEIGHT = board.length;
  const WIDTH = board[0].length;

  function reveal(point: number[]): void {
    const [y, x] = point;
    
    if (y >= HEIGHT || x >= WIDTH || y < 0 || x < 0 || board[y][x] === "B") {
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
        currBoard[y][x] = "B";
        
        for (const [i, j] of directions) {
          reveal([y+i, x+j]);
        }
      } else {
        currBoard[y][x] = `${numAdjacent(point)}`;
        setBoard(oldBoard => currBoard);
        return;
      }
    }

    setBoard(oldBoard => currBoard);
  }

  function numAdjacent(point: number[]): number {
    let count = 0;
    const [y, x] = point;

    for (const [i, j] of directions) {
      if (0<=y+i && y+i<HEIGHT && 0<=x+j && x+j < WIDTH && board[y+i][x+j] === "M") {
        count += 1;
      }
    }
    
    return count;
  }

  function revealMines(): void {
    for (let [y, x] of mines) {
      currBoard[y][x] = "X";
    }

    setBoard(oldBoard => currBoard);
  }

  return (
    <table className="GameBoard">
      {board.map((row, i) => 
        <tr>{row.map((cell, j) => 
          <Cell 
            key={`${i}-${j}`}
            y={i}
            x={j}
            val={cell}
            reveal={reveal}
          />)}
        </tr>)}
    </table>
  );
}

export default GameBoard;