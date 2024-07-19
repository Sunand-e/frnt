import { flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import TableCell from "./TableCell";
import classNames from "../../../utils/classNames";
import { useTableContext } from "./tableContext";

const TableRow = ({trRef, row, style, onRowClick, dataIndex}) => {

  const rowSizing = useTableContext(s => s.rowSizing)

  let height = 75
  if (rowSizing === 'sm') {
    height = 50
  } else if (rowSizing === 'lg') {
    height = 100
  }
  
  return (
    <tr
      ref={trRef}
      className={classNames('group')}
      style={{
        ...style,
        height
      }}
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