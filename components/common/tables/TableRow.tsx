import { flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import TableCell from "./TableCell";
import classNames from "../../../utils/classNames";

const TableRow = ({trRef, row, style, onRowClick, dataIndex}) => {

  return (
    <tr
      ref={trRef}
      className={classNames('group h-[75px]')}
      style={style}
      onClick={onRowClick ? (event) => onRowClick(row.original, event) : undefined}
      data-index={dataIndex}
    >
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