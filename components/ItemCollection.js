import ItemGrid from "./ItemGrid"
import Button from "./Button"
export default function ItemCollection({items, options, viewAll}) {
  
  const gridOptions = {
    ...options,

  }

  // const subHeading = options.subHeading || 'Subheading'

  const gridItems = gridOptions.maxItems ? items.slice(0, gridOptions.maxItems) : items;

  return (
    <div className="mb-8">
      <div className="collectionHeader flex justify-between">
        <div className="collectionHeaderLeft">
          <h3 className="text-xl text-blue-dark text-semibold">{options.heading}</h3>
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