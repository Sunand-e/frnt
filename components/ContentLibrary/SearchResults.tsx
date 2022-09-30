import ItemGrid from "../common/items/ItemGrid";
import ItemCollection from "../common/items/ItemCollection";
import { useRouter } from "../../utils/router";
import { ParsedUrlQuery } from 'querystring';
import { resourceTypes } from "../resources/resourceTypes";

interface SearchFilters extends ParsedUrlQuery {
  search: string;
  category: string;
}
export default function SearchResults({items}) {
  
  const router = useRouter()
  const { search, category, type } = router.query

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

  if(type) {
    filteredItems = filteredItems.filter(item => item.contentType === type);
  }

  const resultCountString = `${filteredItems.length || 'No'} item${filteredItems.length !== 1 ? 's' : ''} found`

  const options = {
    heading: resultCountString,
    itemOptions: {
      // showType: true,
      getHref: (item) => `resource?id=${item.id}`,
      getReadMoreLabel: (item) => {
        console.log('item')
        console.log(item)
        return resourceTypes[item?.contentType]?.readMoreLabel ?? 'Read More'
      },
      getItemTitle: item => {
        const IconComponent = resourceTypes[item.contentType]?.icon
        return (
          <>
          <span className="flex items-start space-x-3">
            <span className="flex flex-shrink-0 items-center justify-center bg-main text-white min-w-8 w-8 h-8 rounded-full overflow-hidden">
              <IconComponent className=" w-5" />
            </span>
            <span>
              {item.title}
            </span>
          </span>
          </>
        )
      }
    }
  }
  return (
    <>
      <ItemCollection items={filteredItems} options={options}></ItemCollection>
    </>
  )
}
