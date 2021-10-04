import React, { MouseEvent, useState } from "react";

type Point = [y: number, x: number];

interface Props {
  val: string;
  y: number;
  x: number;
  reveal?: (point: Point) => void;
}

interface Mapper {
  [key: string]: string;
}

const classMapper: Mapper = {
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

function Cell({ val, reveal, y, x }: Props) {
  const [isFlagged, setIsFlagged] = useState(false);

  const tdClass: string = classMapper[val];
  const flag: string = isFlagged ? "F" : "";

  function handleClick(evt: MouseEvent): void {
    if (reveal) {
      setIsFlagged(false);
      reveal([y, x]);
    }
  }

  function handleRightClick(evt: MouseEvent): void {
    evt.preventDefault();
    if (reveal && Number.isNaN(Number(val))) {
      setIsFlagged(state => !state);
    }
  }

  return (
    <td 
      className={`Cell ${tdClass} ${flag}`} 
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {val}
    </td>
  );
}

export default Cell;