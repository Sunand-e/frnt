import ItemCollection from "../common/items/ItemCollection";

export default function RecentlyReleased() {

  // const library = useReactiveVar(libraryVar)
  // const items = useReactiveVar(latestContentVar)
  // const items = library.slice(0,3);
  const items = []
 
  const options = { 
    heading: 'Recently Released',
    subHeading: 'Courses and workshops that were recently released',
    maxItems: 4,
    itemOptions: {
      showType: true
    }
  }

  return (
    <>
    { items?.length && (
    <ItemCollection
    // viewAll={() => setSearchParams(viewAllParams)} 
      items={items} 
      options={options}
      />
    )}
    </>
  )

}