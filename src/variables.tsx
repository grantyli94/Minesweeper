import { Point, Settings, Mapper } from "./interfaces";

export const settings: Settings = {
  easy: { HEIGHT: 9, WIDTH: 9, NUM_MINES: 10},
  medium: { HEIGHT: 16, WIDTH: 16, NUM_MINES: 40},
  hard: { HEIGHT: 16, WIDTH: 30, NUM_MINES: 99},
}

export const directions: Point[] = [
  [-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1]
];

export const classMapper: Mapper = {
  E: "hidden",
  M: "hidden",
  B: "B",
  X: "X",
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight"
};