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
import LoadingSpinner from "../LoadingSpinner";

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
  const isLoadingMore = useTableContext(s => s.isLoadingMore);
  const showHeadersWhenLoading = useTableContext(s => s.showHeadersWhenLoading);

  const items = useMemo(() => rows?.map(getReorderableItemIdFromRow), [rows]);
  const [activeId, setActiveId] = useState();
  const tableElementRef = useRef<HTMLTableElement>(null)
  const scrollInTableContainerRef = useRef<HTMLDivElement>(null)
  const [colWidths, setColWidths] = useState<number[] | null>(null)
  const [draggingRowHeight, setDraggingRowHeight] = useState<number>()

  const selectable = isSelectable || !!bulkActions.length
  const dataCellOffset = Number(isReorderable) + Number(selectable)

  const scrollContainerRef = useTableContext(s => s.scrollContainerRef)
  const mainScrollableRef = useViewStore(state => state.mainScrollableRef)

  const scrollContainer = scrollInTable ? scrollInTableContainerRef.current : (scrollContainerRef.current || mainScrollableRef.current)

  const { verticalPadding, rowHeight } = tableSizingOptions[rowSizing] || tableSizingOptions.md;

  const [tHeadRef, { height: tHeadHeight }] = useMeasure<HTMLTableSectionElement>();

  const virtualizer = useVirtualizer({
    getScrollElement: () => scrollContainer,
    count: rows.length,
    estimateSize: () => rowHeight,
    overscan: 6
  });

  const itemsOffset = virtualizer.getVirtualItems()[0]?.start

  const [dragOriginOffset, setDragOriginOffset] = useState(0)

  const adjustOriginPoint = useCallback(({ transform }) => ({
    ...transform,
    y: transform.y - itemsOffset + dragOriginOffset
  }), [itemsOffset, dragOriginOffset]);

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

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
    const ths = Array.from(tableElementRef.current.getElementsByTagName("th"));
    setColWidths(ths.map(th => th.offsetWidth));
    setDragOriginOffset(itemsOffset)
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
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

  const tableHeight = isLoading ? tHeadHeight : virtualizer.getTotalSize() + tHeadHeight

  const visibleRows = isLoading ? 0 : items.length < maxVisibleRows ? items.length : maxVisibleRows
  const headerHeight = isLoading  ? (showHeadersWhenLoading ? tHeadHeight : 0) : tHeadHeight;
  const tableWrapperHeight = (scrollInTable ? (visibleRows * rowHeight) + headerHeight + 1 : tableHeight) + (Number(isLoading) * 75)

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-y-visible sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            ref={scrollInTableContainerRef}
            className={classNames(
              "shadow border-b border-gray-200 sm:rounded-lg bg-white",
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
              <>
                <div style={{ height: tableHeight }}>
                  <table ref={tableElementRef} className="min-w-full table-fixed border-separate border-spacing-y-0">
                    {(!isLoading || showHeadersWhenLoading) && (
                      <TableHead
                        table={table}
                        tHeadRef={tHeadRef}
                        scrollInTable={scrollInTable}
                        dataCellOffset={dataCellOffset}
                        padding={verticalPadding}
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
                {isLoadingMore && (
                  <div className=" mt-3 h-[75px]" >
                    <LoadingSpinner text="Loading More" textPosition="right" size="sm" showSpinner={false} />
                  </div>
                )}
              </>
            </MaybeDndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableStructure