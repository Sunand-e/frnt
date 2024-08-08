import { flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import TableCell from "./TableCell";
import classNames from "../../../utils/classNames";
import { useTableContext } from "./tableContext";

const TableRow = ({trRef, row, style, onRowClick, dataIndex}) => {

  const rowSizing = useTableContext(s => s.rowSizing)
  const isSelectable = useTableContext(s => s.isSelectable)

  let height = 75
  if (rowSizing === 'sm') {
    height = 50
  } else if (rowSizing === 'lg') {
    height = 100
  }

  const handleRowClick = (e) => {
    isSelectable && row.toggleSelected()
    !!onRowClick && onRowClick()
  }
  
  const className = classNames(
    'group',
    isSelectable && 'cursor-pointer hover:bg-main-lightness-95',
  )

  return (
    <tr
      ref={trRef}
      className={className}
      style={{
        ...style,
        height
      }}
      onClick={handleRowClick}
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