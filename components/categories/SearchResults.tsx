import ItemGrid from "../common/items/ItemGrid";
import ItemCollection from "../common/items/ItemCollection";
import { useRouter } from "../../utils/router";
import { ParsedUrlQuery } from 'querystring';

interface SearchFilters extends ParsedUrlQuery {
  search: string;
  category: string;
}
export default function SearchResults({items, itemType='item'}) {
  
  const router = useRouter()
  const { search, category } = router.query

  let filteredItems = [];
  
  if(search) {
    filteredItems = items.filter(item => (
      item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    ))
  } else {
    filteredItems = items;
  }
  
  if(category) {

    const isSelectedCategory = tag => {
      return tag.tagType === 'category' && tag.label === category
    }

    filteredItems = filteredItems?.filter(item => {
      return item.tags && item.tags.edges.some(({node}) => isSelectedCategory(node));   
    })?.sort((a,b) => {
      let orderA = a.tags.edges.find(({node}) => isSelectedCategory(node)).order
      let orderB = b.tags.edges.find(({node}) => isSelectedCategory(node)).order
      return orderB - orderA
    }) || []
  }
  
  const resultCountString = `${filteredItems.length || 'No'} ${itemType}${filteredItems.length !== 1 ? 's' : ''} found`
  const options = {
    heading: resultCountString,
  }
  return (
    <>
    { !!filteredItems?.length && <ItemCollection items={filteredItems} options={options}></ItemCollection> }
    </>
  )
}
