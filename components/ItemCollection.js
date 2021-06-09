import ItemGrid from "./ItemGrid"
import Button from "./Button"
export default function ItemCollection({items, options, viewAll}) {
  
  const gridOptions = {
    ...options,

  }

  const subHeading = options.subHeading || 'Subheading'

  const gridItems = gridOptions.maxItems ? items.slice(0, gridOptions.maxItems) : items;

  return (
    <div className="mb-16 bg-main-semitransparent p-8 pb-0 shadow-lg">
      <div className="collectionHeader flex justify-between">
        <div className="collectionHeaderLeft">
          <h3 className="text-3xl text-blue-dark uppercase text-semibold">{options.heading}</h3>
          <h4 className="text-1xl text-blue uppercase font-semibold">{subHeading}</h4>
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