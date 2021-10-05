import { MouseEvent, useState, useEffect } from "react";
import { Point } from "./interfaces";
import { classMapper } from "./variables";

interface Props {
  val: string;
  y: number;
  x: number;
  reveal?: (point: Point) => void;
  restartCount: number;
}

function Cell({ val, reveal, y, x, restartCount }: Props) {
  const [isFlagged, setIsFlagged] = useState(false);

  const tdClass: string = classMapper[val];
  const flag: string = isFlagged ? "F" : "";

  useEffect(function clearFlag() {
    setIsFlagged(false);
  }, [restartCount]);

  function handleLeftClick(evt: MouseEvent): void {
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
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {val}
    </td>
  );
}

export default Cell;