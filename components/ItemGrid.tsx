import { useState } from "react";
import Item from "./Item";
import ItemSmall from "./ItemSmall";

interface ItemGridProps {
  className?: string
  items: Array<any>
  options: any
}

export default function ItemGrid({className, items, options}: ItemGridProps) {
  
  const [display, setDisplay] = useState(options?.display ?? 'grid');
  const gridClasses = (display === 'grid') ? 'grid gap-8 grid-cols-4' : 'flex flex-col gap-6'
  const ItemComponent = (display === 'grid') ? Item : ItemSmall

  return (
    <div className={`mt-4 ${gridClasses} ${!!className ? className : ''}`}>
      { items.map((item, index) => {
        return <ItemComponent key={index} item={item} options={options?.itemOptions} />
      }) }
    </div>
  )
} 