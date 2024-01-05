import React, { useEffect, useRef } from "react";
import TableCell from "./TableCell";

export const StaticTableRow = ({ row, colWidths, setDraggingRowHeight }) => {
  
  const rowElementRef = useRef<HTMLTableRowElement>(null)

  useEffect(() => {
    rowElementRef.current && setDraggingRowHeight(rowElementRef.current.offsetHeight)
  },[row])
  
  return (
    <tr ref={rowElementRef} className="bg-white border-t shadow border-gray-200">
      {row.getVisibleCells().map((cell, i) => (
        <TableCell
          cell={cell}
          key={i}
          index={i}
          { ...(colWidths && {width: colWidths[i]}) }
        />
      ))}
    </tr>
  );
};
