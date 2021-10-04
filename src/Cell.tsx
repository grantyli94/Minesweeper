import React, { MouseEvent, MouseEventHandler, useState } from "react";
/**
 * val mappings:
 *    E - not mine - unrevealed
 *    M - mine - unrevealed
 *    B - not mine - revealed
 * 
 */

interface Props {
  val: string;
  y: number;
  x: number;
  reveal: (point: number[]) => void;
}

interface Mapper {
  [E: string]: string;
}

const classMapper: Mapper = {
  E: "hidden",
  M: "hidden",
  B: "B",
  X: "X",
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
  const [isRevealed, setIsRevealed] = useState(false);

  const tdClass: string = classMapper[val];

  function handleClick(evt: MouseEvent): void {
    setIsRevealed(true);
    reveal([y, x]);
  }

  return (
    <td className={`Cell ${tdClass}`} onClick={handleClick}>
      {val}
    </td>
  );
}

export default Cell;