import ItemGrid from "../common/items/ItemGrid";
import ItemCollection from "../common/items/ItemCollection";
import { useRouter } from "../../utils/router";
import { ParsedUrlQuery } from 'querystring';

interface SearchFilters extends ParsedUrlQuery {
  search: string;
  category: string;
}
export default function SearchResults({items}) {
  
  const router = useRouter()
  const { search, category } = router.query

  let filteredItems = [];
  
  if(search) {
    const textResultsObject = items.reduce(
      (filtered,item) => {
        if(item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return {
            ...filtered,
            title: filtered.title.concat([item])
          }
          // } else if(item.excerpt.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            //   return {
              //     ...filtered,
              //     excerpt: filtered.excerpt.concat([item])
              //   }
              // } else if(item.content.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                //   return {
                  //     ...filtered,
        //     content: filtered.content.concat([item])
        //   }
        } else {
          return filtered
        }
      },
      {
        title: [],
        excerpt: [],
        content: []
      }
    )

    filteredItems = textResultsObject.title.concat(textResultsObject.excerpt, textResultsObject.content)
  } else {
    filteredItems = items;
  }

  if(category) {
    filteredItems = filteredItems.filter(item => {
      const isSelectedCategory = tag => {
        return tag.tagType === 'category' && tag.label === category
      }
      return item.tags && item.tags.some(isSelectedCategory);   
    });
  }
  const resultCountString = `${filteredItems.length || 'No'} course${filteredItems.length !== 1 ? 's' : ''} found`
  const options = {
    heading: resultCountString
  }
  return (
    <>
    <ItemCollection items={filteredItems} options={options}></ItemCollection>
    </>
  )
}
