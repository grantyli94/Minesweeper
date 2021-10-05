import _ from "lodash";
import { Point } from "./interfaces";

export function generateBoard(height: number, width: number): string[][] {
  console.log("generateBoard");
  const gameBoard = [];

  for (let y = 0; y < height; y++) {
    const row = [];
  
    for (let x = 0; x < width; x++) {
      row.push("E");
    }
    
    gameBoard.push(row);
  }

  return gameBoard;
}

export function generateMines(height: number, width: number, num_mines: number): Point[] {
  console.log("generateMines");
  const gameMines: Point[] = [];
  const minesSet = new Set();

  for (let i = 0; i < num_mines; i++) {
    let y = _.random(0, height - 1);
    let x = _.random(0, width - 1);
  
    while (minesSet.has(`${y}-${x}`)) {
      y = _.random(0, height - 1);
      x = _.random(0, width - 1);
    }
    
    minesSet.add(`${y}-${x}`);
    gameMines.push([y, x]);
  }

  return gameMines;
}