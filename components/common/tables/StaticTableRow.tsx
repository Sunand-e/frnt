import React from "react";
import { DragHandle } from "./DragHandle";
import styled from "styled-components";
import { flexRender } from "@tanstack/react-table";

export const StaticTableRow = ({ row }) => {
  return (
    <tr>
      {row.getVisibleCells().map((cell, i) => {
        if (i === 0) {
          return (
            <td>
              <DragHandle isDragging />
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </td>
          );
        }
        return (
          <td>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </td>
        );
      })}
    </tr>
  );
};
