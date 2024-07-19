import { Cell, flexRender } from "@tanstack/react-table"
import { CSSProperties, memo, useEffect } from "react"
import { useTableContext } from "./tableContext"
interface TableCellProps {
  cell: Cell<any,any>
  width: number
  index: number
}

const TableCell = memo(({cell, index, width=null}:TableCellProps) => {

  const isReorderable = useTableContext(s => s.isReorderable)
  const rowSizing = useTableContext(s => s.rowSizing)
  const isSelectable = useTableContext(s => s.isSelectable)
  const bulkActions = useTableContext(s => s.bulkActions)

  const selectable = isSelectable || !!bulkActions.length
  const dataCellOffset = Number(isReorderable) + Number(selectable)

  let padding = '1rem 1.5rem'
  if (rowSizing === 'sm') {
    padding = '0.5rem 1rem'
  } else if (rowSizing === 'lg') {
    padding = '1.5rem 2rem'
  }
  
  const defaultStyles: CSSProperties = {
    padding,
    textAlign: (cell.column.id === 'select' || index > dataCellOffset) ? 'center' : 'left',
    maxHeight: 75
  }

  return (
    <td key={cell.id}
      className={`px-6 py-4 border-b border-gray-200 text-sm text-gray-900 group-last:border-0`}
      style={{
        ...defaultStyles,
        ...cell.column.columnDef.style,
        ...(width && { width }),
      }}
    >
      {flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )}
    </td>
  )
})
export default TableCell