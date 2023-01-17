import React, { useEffect, useRef } from "react";
import { DragHandle } from "./DragHandle";
import styled from "styled-components";
import { flexRender } from "@tanstack/react-table";

export const StaticTableRow = ({ row, colWidths, selectable, setDraggingRowHeight }) => {
  
  const rowElementRef = useRef<HTMLTableRowElement>(null)

  useEffect(() => {
    rowElementRef.current && setDraggingRowHeight(rowElementRef.current.offsetHeight)
  },[row])

  return (
    <tr ref={rowElementRef} className="bg-white border-t shadow border-gray-200">
      {row.getVisibleCells().map((cell, i) => (
        <td
          style={{
            width: colWidths[i]
          }}
          className={`${i > (selectable ? 1 : 0) ? 'text-center' : ''} px-6 py-4 text-sm text-gray-900`}
        >
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </td>
      ))}
    </tr>
  );
};
