import ItemGrid from "./ItemGrid"
import Button from "../Button"
import { MouseEventHandler } from "react";

interface ItemCollectionProps {
  className?: string
  viewAll?: MouseEventHandler<HTMLButtonElement>
  items: Array<any>
  options: any
  gridClasses?: string
  noItemsText?: string
}

export default function ItemCollection({items, options, viewAll, gridClasses, noItemsText}: ItemCollectionProps) {
  
  const gridOptions = {
    ...options,
  }

  // const subHeading = options.subHeading || 'Subheading'

  const gridItems = gridOptions.maxItems ? items.slice(0, gridOptions.maxItems) : items;
  // alert(JSON.stringify())
  return (
    <div className="mb-8 bg-white shadow rounded-md p-6">
      <div className="collectionHeader flex justify-between">
        
        <div className="collectionHeaderLeft">
          { options?.heading && 
            <h3 className="text-lg text-main-secondary text-semibold mb-2">
              {options.heading}
            </h3>
          }
        </div>
        { viewAll && 
          <div className="collectionHeaderRight">
            <Button onClick={viewAll}>View all</Button>
          </div>
        }
      </div>
      {(gridItems.length < 1) ? <h2 className="pb-6 pt-1 text-center">{noItemsText}</h2> : <ItemGrid options={gridOptions} items={gridItems} gridClasses={gridClasses}></ItemGrid>}
    </div>
  )
}
