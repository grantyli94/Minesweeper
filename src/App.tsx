import './App.css';
import GameBoard from "./GameBoard";
import _ from "lodash";

type Point = [y: number, x: number];

const gameBoard: string[][] = [];
const HEIGHT: number = 9;
const WIDTH: number = 9;
const NUM_MINES: number = 10;
const mines: Point[] = [];
const minesSet = new Set();

function generateBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    const row = [];
  
    for (let x = 0; x < WIDTH; x++) {
      row.push("E");
    }
    
    gameBoard.push(row);
  }
}

function generateMines() {
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

generateBoard();
generateMines();

function App() {
  function restart() {
    generateBoard();
    generateMines();
  }

  return (
    <div className="App">
      <h1>Minesweeper!</h1>
      <GameBoard 
        gameBoard={gameBoard}
        mines={mines}
      />
      <button onClick={restart}>Restart</button>
    </div>
  );
}

export default App;
