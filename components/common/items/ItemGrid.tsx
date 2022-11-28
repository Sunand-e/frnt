import { motion } from "framer-motion";
import { useState } from "react";
import Item from "./Item";
import ItemSmall from "./ItemSmall";

interface ItemGridProps {
  className?: string
  items: Array<any>
  options: any
  gridClasses: string
}

export default function ItemGrid({className, items, options, gridClasses = ''}: ItemGridProps) {
  
  const [display, setDisplay] = useState(options?.display ?? 'grid');
  const defaultGridClasses = 'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5';
  const gridClassName = (gridClasses === '') ? defaultGridClasses : gridClasses;
  const flexOrGridClasses = (display === 'grid') ? gridClassName : 'flex flex-col gap-6';
  const ItemComponent = (display === 'grid') ? Item : ItemSmall

  return (
    <div className={`${flexOrGridClasses} ${!!className ? className : ''}`}>
      { items.map((item, index) => {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ItemComponent key={index} item={item} options={options?.itemOptions} />
          </motion.div>
        )
      })}
    </div>
  )
}
