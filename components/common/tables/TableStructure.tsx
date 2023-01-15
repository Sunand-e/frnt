import { flexRender, Row, Table } from "@tanstack/react-table";
import {CaretUp} from "@styled-icons/fa-solid/CaretUp"
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import DraggableTableRow from "./DraggableTableRow";
import { ReactNode, useMemo, useState } from "react";
import { StaticTableRow } from "./StaticTableRow";

interface TableStructureProps {
  table: Table<any>
  draggableRows?: boolean
  selectable?: boolean
  onRowClick?: () => void
  setData?: (data) => void
}
interface MaybeDndContextProps {
  draggableRows?: boolean
  children?: ReactNode
}

const MaybeDndContext = ({draggableRows, children, ...rest}: MaybeDndContextProps) => {
  return (
    <DndContext {...rest}>
      { children }
    </DndContext>
  )
}

const TableStructure = ({table, selectable, draggableRows, onRowClick, setData}: TableStructureProps) => {

  const rows = table.getRowModel().rows

  const items = useMemo(() => rows?.map(({ original }) => original.id), [rows]);
  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData((data) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
  function handleDragCancel() {
    setActiveId(null);
  }


  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    const row = rows.find(({ original }) => original.id === activeId);
    return row;
  }, [activeId, rows]);


  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-y-visible sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-y-visible border-b border-gray-200 sm:rounded-lg">
            <MaybeDndContext
              draggableRows={true}
              sensors={sensors}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragCancel={handleDragCancel}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
            >
            <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => (
                        <th key={header.id} colSpan={header.colSpan}
                          className={`px-6 py-3 text-left h-11 text-xs font-medium max-w-max text-gray-500 uppercase tracking-wider`}
                          style={{
                            textAlign: (index > (selectable ? 1 : 0)) ? 'center' : 'left',
                            ...(header.column.columnDef?.id === 'select' ? { 
                              paddingRight: 0,
                              width: '16px'
                            } : {}),
                          }}
                        > {header.isPlaceholder ? null : (
                            <div className="inline-block">
                              <div
                                {...{
                                  className: `${header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : ''} flex space-x-2 max-w-max items-center justify-center`,
                                  onClick: header.column.getToggleSortingHandler(),
                                }}
                              >
                                <div>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </div>
                                {header.column.getIsSorted() && (
                                  <div className="w-4 h-4 flex items-center">
                                    {{
                                      asc: <CaretUp className="w-full" />,
                                      desc: <CaretUp className="rotate-180" />,
                                    }[header.column.getIsSorted()] ?? null}
                                  </div>
                                )}
                                {/* {header.column.getCanFilter() ? (
                                  <div>
                                    <ColumnFilter column={header.column} table={table} />
                                  </div>
                                ) : null} */}
                                
                              </div>
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    { rows.map((row) => (
                      <DraggableTableRow row={row} key={row.original.id} onRowClick={onRowClick} selectable={selectable} />
                    ))}
                  </SortableContext>
                </tbody>
              </table>
              <DragOverlay>
                {activeId && (
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <StaticTableRow row={selectedRow} />
                    </tbody>
                  </table>
                )}
              </DragOverlay>
              </MaybeDndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableStructure