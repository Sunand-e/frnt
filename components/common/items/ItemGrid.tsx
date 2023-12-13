import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Item from "./Item";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual"
import { useViewStore } from "../../../hooks/useViewStore";
import { useMeasure } from "@uidotdev/usehooks";

interface ItemGridProps {
  className?: string
  items: Array<any>
  options: any
}

const ITEM_SIZE = 250;

export default function ItemGrid({className, items, options}: ItemGridProps) {

  const [gridRef, { width, height }] = useMeasure();

  const mainScrollableRef = useViewStore(state => state.mainScrollableRef)

  const itemsPerRow = Math.max(1, Math.floor(width / ITEM_SIZE));
  const rowCount = Math.ceil(items.length / itemsPerRow);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => mainScrollableRef.current,
    estimateSize: () => 300,
    // scrollMargin: 100,
    overscan: 1
  });

  return (
    
    <div className="max-w-full" ref={gridRef}>
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative"
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const index = virtualRow.index;

          const rowItems = [];
          const fromIndex = index * itemsPerRow;
          const toIndex = Math.min(fromIndex + itemsPerRow, items.length);

          for (let i = fromIndex; i < toIndex; i++) {
            rowItems.push(
              <motion.div
                key={items[i].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-[350px] w-full inline-flex mb-6"
                style={{width: `${100/itemsPerRow}%`}}
              >
                <Item item={items[i]} options={options?.itemOptions} />
              </motion.div>
            );
          }

          return (
            <div
              className="flex"
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              {rowItems}
            </div>
          );
        })}
      </div>
    </div>
  );
};
