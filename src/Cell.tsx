import React, { MouseEvent, MouseEventHandler, useState } from "react";
/**
 * val mappings:
 *    E - not mine - unrevealed
 *    M - mine - unrevealed
 *    B - not mine - revealed
 * 
 */

interface Props {
  val: String;
  reveal: (point: number[]) => void;
  y: number;
  x: number;
}


function Cell({ val, reveal, y, x }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);

  function handleClick(evt: MouseEvent): void {
    setIsRevealed(true);
    reveal([y, x]);
  }

  return (
    <td className={`Cell ${val !== "E" && val !== "M" ? "" : "hidden"}`} onClick={handleClick}>
      {val}
    </td>
  );
}

export default Cell;