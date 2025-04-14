import { Table } from "@tanstack/react-table";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import DraggableTableRow from "./DraggableTableRow";
import { MutableRefObject, useMemo, useRef } from "react";
import { useTableContext } from "./tableContext";
import TableRow from "./TableRow";
import { Virtualizer } from "@tanstack/react-virtual";
import LoadingSpinner from "../LoadingSpinner";

interface TableBodyProps {
  table: Table<any>
  virtualizer: Virtualizer<HTMLDivElement, Element>
  draggingRowHeight: number
}

const TableBody = ({ table, virtualizer, draggingRowHeight }: TableBodyProps) => {

  const rows = table.getRowModel().rows
  const onRowClick = useTableContext(s => s.onRowClick)
  const getReorderableItemIdFromRow = useTableContext(s => s.getReorderableItemIdFromRow)
  const isReorderableActive = useTableContext(s => s.isReorderableActive)
  const isLoading = useTableContext(s => s.isLoading)
  const loadingText = useTableContext(s => s.loadingText)
  const items = useMemo(() => rows?.map(getReorderableItemIdFromRow), [rows]);

  const tBodyRef: MutableRefObject<HTMLTableSectionElement> = useRef(null)
  return (
    <tbody ref={tBodyRef} className="relative">
      {isLoading && (
        <tr className="group h-[75px] text-gray-900">
          <td colSpan={table.getHeaderGroups()[0].headers.length} className="p-4 text-center">
            <LoadingSpinner text={loadingText} textPosition='right' size='sm' showSpinner={false} />
          </td>
        </tr>
      )}
      {
        !isLoading && (isReorderableActive ? (
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index]
              return (
                <DraggableTableRow
                  row={row}
                  index={index}
                  onRowClick={onRowClick}
                  draggingRowHeight={draggingRowHeight}
                  virtualizer={virtualizer}
                  virtualRow={virtualRow}
                  key={virtualRow.key}
                  pkey={virtualRow.key}
                  translateY={virtualRow.start - index * virtualRow.size}
                />
              )
            })}
          </SortableContext>
        ) : (
          virtualizer.getVirtualItems().map((virtualRow, index) => {
            const row = rows[virtualRow.index]
            return (
              <TableRow
                dataIndex={virtualRow.index}
                trRef={virtualizer.measureElement}
                key={virtualRow.key}
                style={{
                  transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                  position: 'relative',
                  zIndex: 9999 - index,
                }}
                row={row}
                onRowClick={onRowClick}
              />
            )
          })
        ))
      }
    </tbody>
  );
}

export default TableBody