import useGetTags from "../../hooks/tags/useGetTags"
import ItemCollection from "../common/items/ItemCollection"

export default function CategoriesCollection() {

  const { tags, loading, error } = useGetTags()

  const categories = tags?.filter(
    tag => tag.tagType === 'category' && tag.contentItems.totalCount > 0
  ).sort((a,b) => b.order - a.order) || []

  return (
    <>
      { categories?.length ? (
        <>
          <ItemCollection
            items={categories || []}
            options={{
              maxItems: 120,
              itemOptions: {
                getReadMoreLabel: () => 'View category items',
                getHref: (item: any) => `/categories?category=${encodeURIComponent(item.id)}`
              }
            }}
          />
        </>
      ) : (
        !!categories && <p>There are no categories to display.</p>
      )}
    </>
  )
}
