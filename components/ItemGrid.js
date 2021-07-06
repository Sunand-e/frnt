import { useState } from "react";
import Item from "./Item";
import ItemSmall from "./ItemSmall";

export default function ItemGrid({className, items, options}) {
  
  const [display, setDisplay] = useState(options?.display ?? 'grid');
  const gridClasses = (display === 'grid') ? 'grid gap-8 grid-cols-4' : 'flex flex-col gap-6'
  const ItemComponent = (display === 'grid') ? Item : ItemSmall

  return (
    <div className={`mt-4 ${gridClasses} ${!!className ? className : ''}`}>
    {/* <div className={`grid gap-8 mt-8 grid-cols-1 ${className}`}> */}
      { items.map((item, index) => {
        // console.log('item')
        // console.log(item)
      return <ItemComponent key={index} item={item} options={options?.itemOptions} />
}) }
    </div>
  )
} 