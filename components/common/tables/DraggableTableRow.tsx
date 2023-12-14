import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useViewStore } from "../../../hooks/useViewStore";
import TableCell from "./TableCell";
import { useTableContext } from "./tableContext";
import TableRowOverlay from "./TableRowOverlay";

const DraggableTableRow = ({row, onRowClick, pkey, index, draggingRowHeight, virtualRow, translateY=0, virtualizer}) => {
  
  const mainScrollableRef = useViewStore(s => s.mainScrollableRef)
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
  
  const totalTranslateY = translateY + (transform?.y || 0)

  const prevTranslateYRef = useRef<number>();

  const prevTranslateY = prevTranslateYRef.current;

  const [isScrolling, setIsScrolling] = useState(false);

  mainScrollableRef
  useEffect(() => {
    
    let timer = null;
    
    const handleScroll = function() {
      if(!isScrolling) {
        setIsScrolling(true)
      }
      if(timer !== null) {
          clearTimeout(timer);        
      }
      timer = setTimeout(function() {
        setIsScrolling(false)
      }, 150);
  }

    mainScrollableRef.current.addEventListener('scroll', handleScroll, false);
    // Add event listener for the scroll event
    // mainScrollableRef.current.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      mainScrollableRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  const style = {
    opacity: row.original._isOptimistic ? 0.25 : 1,
    transform: `translateY(${totalTranslateY}px)`,
    height: 73,
    zIndex: 9999 - index,
    ...(isDragging && { height: draggingRowHeight } ),
    ...(!isScrolling && { transition } ),
    
  };

  return (
    <>
      { !!row.original._isOptimistic && (
        <TableRowOverlay rowElementRef={node} row={row} />
      )}
      <tr
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        className={'group relative'}
        style={style}
        key={id} 
        onClick={(!row.original._isOptimistic && onRowClick) ? (event) => onRowClick(row.original, event) : undefined}
      >
        {/* {pkey} */}
        {isDragging ? (
          <td className="border-b border-gray-200" colSpan={row._getAllVisibleCells().length}>&nbsp;</td>
        ) : (
          row.getVisibleCells().map((cell, index) => {
            return ( 
              <TableCell
                cell={cell} 
                key={index}
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