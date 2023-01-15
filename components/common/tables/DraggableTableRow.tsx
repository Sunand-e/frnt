import { flexRender, Row } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";

const DraggableTableRow = ({row, onRowClick, selectable}) => {
  console.log('row')
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: row.original.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };
  return (
    <tr ref={setNodeRef} key={row.original.id} onClick={onRowClick ? (event) => onRowClick(row.original, event) : undefined}>
      {isDragging ? (
        <td colSpan={row._getAllVisibleCells().length}>&nbsp;</td>
      ) : (
        row.getVisibleCells().map((cell, index) => (
          <td key={cell.id}
          className={`${index > (selectable ? 1 : 0) ? 'text-center' : ''} px-6 py-4 text-sm text-gray-900`}
          style={{
            ...style,
            ...(cell.column.columnDef?.id === 'select' ? { 
              paddingRight: 0,
              width: '16px'
            } : {}),
          }}
        >
          { index === 0 && <DragHandle {...attributes} {...listeners} /> }
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </td>
        ))
      )}
    </tr>
  );
}

export default DraggableTableRow