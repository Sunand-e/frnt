import ItemGrid from "./ItemGrid";

export default function ItemCollection({items, options}) {
  
  const gridOptions = {
    ...options,
    maxItems: 3
  }

  const gridItems = items.slice(0, 3);

  return (
    <>
      <h1 className="text-4xl mt-16 text-blue-dark uppercase">{options.heading}</h1>
      <ItemGrid options={gridOptions} items={gridItems}></ItemGrid>
    </>
  )

}