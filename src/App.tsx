import './App.css';
import { useState } from "react";
import GameBoard from "./GameBoard";
import _ from "lodash";
import { Point, Settings } from "./interfaces";

const settings: Settings = {
  easy: { HEIGHT: 9, WIDTH: 9, NUM_MINES: 10},
  medium: { HEIGHT: 16, WIDTH: 16, NUM_MINES: 40},
  hard: { HEIGHT: 16, WIDTH: 30, NUM_MINES: 99},
}

function App() {
  console.log("App renders");
  const [restartToggle, setRestartToggle] = useState(0); // forces a re-render
  const [difficulty, setDifficulty] = useState("easy");

  const HEIGHT = settings[difficulty].HEIGHT;
  const WIDTH = settings[difficulty].WIDTH;
  const NUM_MINES = settings[difficulty].NUM_MINES;

  let gameBoard: string[][] = [];
  let mines: Point[] = [];
  const minesSet = new Set();

  function generateBoard(): void {
    console.log("generateBoard");
    gameBoard = [];
  
    for (let y = 0; y < HEIGHT; y++) {
      const row = [];
    
      for (let x = 0; x < WIDTH; x++) {
        row.push("E");
      }
      
      gameBoard.push(row);
    }
  }
  
  function generateMines(): void {
    console.log("generateMines");
    mines = [];
    minesSet.clear();
  
    for (let i = 0; i < NUM_MINES; i++) {
      let y = _.random(0, HEIGHT - 1);
      let x = _.random(0, WIDTH - 1);
    
      while (minesSet.has(`${y}-${x}`)) {
        y = _.random(0, HEIGHT - 1);
        x = _.random(0, WIDTH - 1);
      }
      
      minesSet.add(`${y}-${x}`);
      mines.push([y, x]);
    }
  
    for (let [y, x] of mines) {
      gameBoard[y][x] = "M";
    }
  }

  function restart(): void {
    console.log("restart");
    setRestartToggle(num => num + 1);
    generateBoard();
    generateMines();
  }

  function changeDifficulty(level: string): void {
    setRestartToggle(num => num + 1);
    setDifficulty(level);
  }
  
  generateBoard();
  generateMines();
  
  return (
    <div className="App">
      <h1>Minesweeper!</h1>
      <span onClick={() => changeDifficulty("easy")}>Easy </span> <span onClick={() => changeDifficulty("medium")}>Medium </span> <span onClick={() => changeDifficulty("hard")}>Hard </span>
      <GameBoard 
        gameBoard={gameBoard}
        mines={mines}
        restart={restart}
        restartToggle={restartToggle}
      />
    </div>
  );
}

export default App;
