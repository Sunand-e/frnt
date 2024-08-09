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
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMeasure } from "@uidotdev/usehooks";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useViewStore } from "../../../hooks/useViewStore";
import classNames from "../../../utils/classNames";
import { StaticTableRow } from "./StaticTableRow";
import { tableSizingOptions } from "./Table";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useTableContext } from "./tableContext";

interface TableStructureProps {
  table: Table<any>
}
interface MaybeDndContextProps {
  children?: ReactNode
}

const MaybeDndContext = ({ children, ...rest }: MaybeDndContextProps) => {
  return useTableContext(s => s.isReorderable) ? (
    <DndContext  {...rest}>
      {children}
    </DndContext>
  ) : children
}

const TableStructure = ({ table }: TableStructureProps) => {

  const rows = table.getRowModel().rows
  const bulkActions = useTableContext(s => s.bulkActions)
  const onReorder = useTableContext(s => s.onReorder)
  const scrollInTable = useTableContext(s => s.scrollInTable)
  const maxVisibleRows = useTableContext(s => s.maxVisibleRows)
  const getReorderableItemIdFromRow = useTableContext(s => s.getReorderableItemIdFromRow)
  const isReorderable = useTableContext(s => s.isReorderable)
  const rowSizing = useTableContext(s => s.rowSizing)
  const isSelectable = useTableContext(s => s.isSelectable);
  const isLoading = useTableContext(s => s.isLoading);
  const showHeadersWhenLoading = useTableContext(s => s.showHeadersWhenLoading);

  const items = useMemo(() => rows?.map(getReorderableItemIdFromRow), [rows]);
  const [activeId, setActiveId] = useState();
  const tableElementRef = useRef<HTMLTableElement>(null)
  const scrollInTableContainerRef = useRef<HTMLDivElement>(null)
  const [colWidths, setColWidths] = useState<number[] | null>(null)
  const [draggingRowHeight, setDraggingRowHeight] = useState<number>()
  
  const selectable = isSelectable || !!bulkActions.length
  const dataCellOffset = Number(isReorderable) + Number(selectable)

  
  // useEffect(() => {
  //   if(!tableElementRef.current) return
  //   const ths =  Array.from(tableElementRef.current.getElementsByTagName("th"));
  //   setColWidths(ths.map(th => th.offsetWidth));
  // },[])
  
  const scrollContainerRef = useTableContext(s => s.scrollContainerRef)
  const mainScrollableRef = useViewStore(state => state.mainScrollableRef)

  const scrollContainer = scrollInTable ? scrollInTableContainerRef.current : (scrollContainerRef.current || mainScrollableRef.current)
  // const tHeadRef: MutableRefObject<HTMLTableSectionElement> = useRef(null)
  
  const { padding, rowHeight } = tableSizingOptions[rowSizing] || tableSizingOptions.md;

  const [tHeadRef, { height: tHeadHeight }] = useMeasure();

  const virtualizer = useVirtualizer({
    getScrollElement: () => scrollContainer,
    // getScrollElement: () => tBodyRef.current,
    count: rows.length,
    estimateSize: () => rowHeight,
    // scrollMargin: 100,
    overscan: 6
  });

  const itemsOffset = virtualizer.getVirtualItems()[0]?.start
  
  const [dragOriginOffset, setDragOriginOffset] = useState(0)
  
  const adjustOriginPoint = useCallback(({ transform }) => ({
    ...transform,
    // y: transform.y + 100
    y: transform.y - itemsOffset + dragOriginOffset
  }),[itemsOffset, dragOriginOffset]);
  
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
    const ths = Array.from(tableElementRef.current.getElementsByTagName("th"));
    setColWidths(ths.map(th => th.offsetWidth));
    setDragOriginOffset(itemsOffset)
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    
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

  const tableHeight = virtualizer.getTotalSize() + tHeadHeight

  const visibleRows = items.length < maxVisibleRows ? items.length : maxVisibleRows
  
  const tableWrapperHeight = (scrollInTable ? (visibleRows * (rowHeight)) + tHeadHeight + 1 : tableHeight) + (Number(isLoading) * 75)

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-y-visible sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
          ref={scrollInTableContainerRef}
            className={classNames(
              "shadow border-b border-gray-200 sm:rounded-lg bg-white",
              // scrollInTable && `overflow-hidden lg:overflow-auto scrollbar:!w-1.5 
              scrollInTable && `overflow-auto scrollbar:!w-1.5 
              scrollbar:!h-1.5 scrollbar:bg-transparent 
              scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded 
              scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded 
              dark:scrollbar-track:!bg-slate-500/[0.16] 
              dark:scrollbar-thumb:!bg-slate-500/50 
              supports-scrollbars:pr-2
            `)}
            style={{ height: tableWrapperHeight }}
          >
          <MaybeDndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragCancel={handleDragCancel}
              collisionDetection={closestCenter}
              // modifiers={[restrictToVerticalAxis]}
              modifiers={[restrictToVerticalAxis, adjustOriginPoint]}
            >
            <div style={{ height: tableHeight }}>
              <table ref={tableElementRef} className="min-w-full table-fixed border-separate border-spacing-y-0">
                { (!isLoading || showHeadersWhenLoading) && (
                  <TableHead
                    table={table}
                    tHeadRef={tHeadRef}
                    scrollInTable={scrollInTable}
                    dataCellOffset={dataCellOffset}
                    padding={padding}
                    colWidths={colWidths}
                  />
                )}
                <TableBody table={table} virtualizer={virtualizer} draggingRowHeight={draggingRowHeight} />
              </table>
              {createPortal(
                <DragOverlay
                  shouldScrollIntoView={false}
                >
                  {activeId && (
                    <div>
                    <table 
                      style={{ 
                        width: "100%",
                        transform: `translateY(${itemsOffset}px)`
                      }}
                    >
                      <tbody>
                        <StaticTableRow row={selectedRow} colWidths={colWidths} setDraggingRowHeight={setDraggingRowHeight} />
                      </tbody>
                    </table>
                    </div>
                  )}
                </DragOverlay>,
                document.getElementById("__next")
              )}
            </div>
            </MaybeDndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableStructure