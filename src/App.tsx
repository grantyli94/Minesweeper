import './App.css';
import { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import { Point } from "./interfaces";
import { settings } from "./variables";
import { generateBoard, generateMines } from "./helpers";

function App() {
  console.log("App renders");
  const [restartCount, setRestartCount] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [board, setBoard] = useState<string[][]>([]);
  const [mines, setMines] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  const HEIGHT = settings[difficulty].HEIGHT;
  const WIDTH = settings[difficulty].WIDTH;
  const NUM_MINES = settings[difficulty].NUM_MINES;

  useEffect(function startAndRestartGame() {
    if (loading) setLoading(false);
    setBoardAndMines(HEIGHT, WIDTH, NUM_MINES);
  }, [restartCount]);

  function setBoardAndMines(height: number, width: number, num_mines: number): void {
    console.log("setBoardAndMines");
    const gameBoard = generateBoard(height, width);
    const gameMines = generateMines(height, width, num_mines);

    gameMines.forEach(([y,x]: Point) => gameBoard[y][x] = "M")

    setBoard(gameBoard);
    setMines(gameMines);
  }

  function restart(): void {
    console.log("restart");
    setRestartCount(num => num + 1);
  }

  function changeDifficulty(level: string): void {
    setDifficulty(level);
    setRestartCount(num => num + 1);
  }
  
  return (
    <div className="App">
      <h1>Minesweeper!</h1>
      <p>
        <button 
          onClick={() => changeDifficulty("easy")}
          className="difficulty"
          >
          Easy
        </button> 
        <button 
          onClick={() => changeDifficulty("medium")}
          className="difficulty"
          >
          Medium
        </button> 
        <button 
          onClick={() => changeDifficulty("hard")}
          className="difficulty"
        >
          Hard
        </button>
      </p>
      {!loading && <GameBoard 
        gameBoard={board}
        mines={mines}
        restart={restart}
        restartCount={restartCount}
      />}
    </div>
  );
}

export default App;
