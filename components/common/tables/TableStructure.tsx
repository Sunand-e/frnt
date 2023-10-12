import { flexRender, Row, Table } from "@tanstack/react-table";
import {CaretUp} from "@styled-icons/fa-solid/CaretUp"
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
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
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { StaticTableRow } from "./StaticTableRow";
import { gql, useMutation } from "@apollo/client";
import { useTableContext } from "./tableContext";
import TableRow from "./TableRow";

interface TableStructureProps {
  table: Table<any>
}
interface MaybeDndContextProps {
  children?: ReactNode
}



const MaybeDndContext = ({children, ...rest}: MaybeDndContextProps) => {
  return useTableContext(s => s.isReorderable) ? (
    <DndContext  {...rest}>
      { children }
    </DndContext>
  ) : children
}

const TableStructure = ({table}: TableStructureProps) => {

  const rows = table.getRowModel().rows
  const bulkActions = useTableContext(s => s.bulkActions)
  const onRowClick = useTableContext(s => s.onRowClick)
  const onReorder = useTableContext(s => s.onReorder)
  const getReorderableItemIdFromRow = useTableContext(s => s.getReorderableItemIdFromRow)
  const isReorderable = useTableContext(s => s.isReorderable)
  const isReorderableActive = useTableContext(s => s.isReorderableActive)
  const isSelectable = !!bulkActions.length;

  const items = useMemo(() => rows?.map(getReorderableItemIdFromRow), [rows]);
  const [activeId, setActiveId] = useState();
  const tableElementRef = useRef<HTMLTableElement>(null)
  const [colWidths, setColWidths] = useState<number[] | null>(null)
  const [draggingRowHeight, setDraggingRowHeight] = useState<number>()
  const dataCellOffset = Number(isReorderable) + Number(isSelectable)
  // useEffect(() => {
  //   if(!tableElementRef.current) return
  //   const ths =  Array.from(tableElementRef.current.getElementsByTagName("th"));
  //   setColWidths(ths.map(th => th.offsetWidth));
  // },[])

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
    const ths =  Array.from(tableElementRef.current.getElementsByTagName("th"));
    setColWidths(ths.map(th => th.offsetWidth));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log('active, over')
    console.log(active, over)
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      // setData((data) => {
      //   return arrayMove(data, oldIndex, newIndex);
      // });
      onReorder && onReorder(active, over, newIndex, oldIndex)
      setColWidths(null)
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
    const row = rows.find(row => (
      getReorderableItemIdFromRow(row) === activeId
    ))
    return row;
  }, [activeId, rows]);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-y-visible sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-y-visible border-b border-gray-200 sm:rounded-lg">
            <MaybeDndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragCancel={handleDragCancel}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
            >
              <table ref={tableElementRef} className="min-w-full bg-white table-fixed border-separate">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => {
                        return (
                        <th key={header.id} colSpan={header.colSpan}
                        className={`px-6 py-3 text-left h-11 text-xs font-medium max-w-max text-gray-500 uppercase tracking-wider border-b border-gray-200`}
                        style={{
                          textAlign: (index > dataCellOffset) ? 'center' : 'left',
                          // width: header.getSize() !== 150 ? header.getSize() : 20,
                          ...(colWidths && {width: colWidths[index]}),
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
                      )})}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white relative">
                  {
                    isReorderableActive ? (
                      <SortableContext items={items} strategy={verticalListSortingStrategy}>
                      { rows.map((row) => (
                        <DraggableTableRow row={row} key={row.original.id} onRowClick={onRowClick} draggingRowHeight={draggingRowHeight} />
                      ))}
                    </SortableContext>
                    ) : rows.map((row) => (
                      <TableRow row={row} key={row.original.id} onRowClick={onRowClick} />
                    ))
                  }
                </tbody>
              </table>
              <DragOverlay>
                {activeId && (
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <StaticTableRow row={selectedRow} colWidths={colWidths} setDraggingRowHeight={setDraggingRowHeight} />
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