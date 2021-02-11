import Item from "./Item";

export default function ItemGrid({items}) {
  return (
    <div className="grid gap-8 mt-8 grid-cols-3 mb-12">
      { items.map((item, index) => {
        // console.log('item')
        // console.log(item)
      return <Item key={index} item={item} />
}) }
    </div>
  )
}