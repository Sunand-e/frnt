import ItemCollection from "../common/items/ItemCollection";

export default function SearchResults({ items, itemType = 'item' }) {
  const resultCountString = `${items.length || 'No'} ${itemType}${items.length !== 1 ? 's' : ''} found`
  const options = {
    heading: resultCountString,
  }
  return (
    <>
      {!!items?.length && <ItemCollection items={items} options={options}></ItemCollection>}
    </>
  )
}
