import ItemCollection from "../../common/items/ItemCollection";
import { useRouter } from "../../../utils/router";
import { resourceTypes } from "../resourceTypes";
import { tippy } from "@tippyjs/react";

export default function SearchResults({ items }) {

  const router = useRouter()
  const { search, category, type } = router.query

  let filteredItems = [];

  if (search) {
    const textResultsObject = items.reduce(
      (filtered, item) => {
        if (item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return {
            ...filtered,
            title: filtered.title.concat([item])
          }
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

  if (category) {
    filteredItems = filteredItems.filter(item => {
      const isSelectedCategory = tag => {
        return (tag.tagType === 'category' || tag.tagType === 'collection') && tag.id === category
      }
      return item.tags && item.tags.edges.some(({ node }) => isSelectedCategory(node));
    });
  }

  if (type) {
    filteredItems = filteredItems.filter(item => item.contentType === type);
  }

  const resultCountString = `${filteredItems.length || 'No'} item${filteredItems.length !== 1 ? 's' : ''} found`

  const showFullTitleIfClamped = (event, title) => {
    const el = event.target
    el._tippy?.destroy()
    if (el.scrollHeight > el.clientHeight) {
      tippy(event.target, {
        content: title,
        theme: "memberhub-white",
        placement: 'top-start'
      })
    }
  }

  const options = {
    heading: resultCountString,
    itemOptions: {
      // showType: true,
      getHref: (item) => `resource?id=${item.id}`,
      getReadMoreLabel: (item) => {
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
              <span className="line-clamp-3" onMouseOver={(e) => showFullTitleIfClamped(e, item.title)}>
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
      {filteredItems.length < 1 ? (
        <h2 className="pb-6 pt-1 text-center">No items found</h2>
      ) : (
        <ItemCollection items={filteredItems} options={options}></ItemCollection>
      )}
    </>
  )
}
