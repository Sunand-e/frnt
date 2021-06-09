import ItemCollection from "./ItemCollection";

export default function ContinueWatching() {
  
  const items = []

  const options = { 
    heading: 'Continue Watching',
    subHeading: 'Pick up where you left off',
    maxItems: 3,
    itemOptions: {
      showType: true
    }
  }

  return (
    <ItemCollection
    // viewAll={() => setSearchParams(viewAllParams)} 
      items={items} 
      options={options}
  />
  )

}