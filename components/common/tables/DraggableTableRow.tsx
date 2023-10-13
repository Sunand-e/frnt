import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import TableCell from "./TableCell";
import { useTableContext } from "./tableContext";
import TableRowOverlay from "./TableRowOverlay";

const DraggableTableRow = ({row, onRowClick, draggingRowHeight}) => {
  
  const getReorderableItemIdFromRow = useTableContext(s => s.getReorderableItemIdFromRow)

  const id = getReorderableItemIdFromRow(row)
  
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
    node
  } = useSortable({
    id
  });

  const style = {
    // ...table?.options.meta?.getRowStyles(row)
    opacity: row.original._isOptimistic ? 0.25 : 1,
    transform: CSS.Transform.toString(transform),
    transition: transition,
    ...(isDragging && { height: draggingRowHeight } ),
  };

  return (
    <>
      { !!row.original._isOptimistic && (
        <TableRowOverlay rowElementRef={node} row={row} />
      )}
      <tr
        {...attributes}
        {...listeners}
        className={'group'}
        style={style}
        ref={setNodeRef}
        key={id} 
        onClick={(!row.original._isOptimistic && onRowClick) ? (event) => onRowClick(row.original, event) : undefined}>
        {isDragging ? (
          <td className="border-b border-gray-200" colSpan={row._getAllVisibleCells().length}>&nbsp;</td>
        ) : (
          row.getVisibleCells().map((cell, index) => {
            let cellStyle: CSSProperties = {
              // textAlign: 'center'
            }
            return ( 
              <TableCell
                cell={cell} 
                key={index} 
                style={cellStyle}
                index={index}
              />
            )
          } )
        )}
      </tr>
    </>
  );
}

export default DraggableTableRow