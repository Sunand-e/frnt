import ItemGrid from "./ItemGrid"
import Button from "../../Button"
import { MouseEventHandler } from "react";

interface ItemCollectionProps {
  className?: string
  viewAll?: MouseEventHandler<HTMLButtonElement>
  items: Array<any>
  options: any
}

export default function ItemCollection({items, options, viewAll}: ItemCollectionProps) {
  
  const gridOptions = {
    ...options,
  }

  // const subHeading = options.subHeading || 'Subheading'

  const gridItems = gridOptions.maxItems ? items.slice(0, gridOptions.maxItems) : items;

  return (
    <div className="mb-8">
      <div className="collectionHeader flex justify-between">
        
        <div className="collectionHeaderLeft">
          { options?.heading && 
            <h3 className="text-xl text-main-secondary text-semibold">
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
      <ItemGrid options={gridOptions} items={gridItems}></ItemGrid>
    </div>
  )
}
