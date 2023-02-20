import { Cell, flexRender } from "@tanstack/react-table"
import { CSSProperties } from "react"
import { useTableContext } from "./tableContext"
interface TableCellProps {
  cell: Cell<any,any>
  style: CSSProperties
  index: number
}

const TableCell = ({cell, index, style}:TableCellProps) => {
  
  const dataCellOffset = useTableContext(s => (
    Number(s.isReorderable) + Number(!!s.bulkActions.length)
  ))
  
  const defaultStyles: CSSProperties = {
    padding: '1rem 1.5rem',
    textAlign: (index > dataCellOffset) ? 'center' : 'left',
  }

  return (
    <td key={cell.id}
      className={`px-6 py-4 border-b border-gray-200 text-sm text-gray-900 group-last:border-0`}
      style={{
        ...defaultStyles,
        ...cell.column.columnDef.style,
        ...style,
      }}
    >
      {flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )}
    </td>
  )
}
export default TableCell