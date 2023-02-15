import { flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import TableCell from "./TableCell";

const TableRow = ({row, style, onRowClick}) => {

  return (
    <tr
      className={'group'}
      style={style}
      onClick={onRowClick ? (event) => onRowClick(row.original, event) : undefined}>
      {
        row.getVisibleCells().map((cell, index) => {
          let cellStyle = {}
          return ( 
            <TableCell
              index={index}
              cell={cell} 
              key={index} 
              style={cellStyle}
            />
          )
        } )
      }
    </tr>
  );
}

export default TableRow