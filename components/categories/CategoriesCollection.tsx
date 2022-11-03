import useGetTags from "../../hooks/tags/useGetTags"
import ItemCollection from "../common/items/ItemCollection"

export default function CategoriesCollection() {

  const { tags, loading, error } = useGetTags()

  const categories = tags?.filter(tag => tag.tagType === 'category')

  return (
    <>
      { categories?.length ? (
        <>
          <ItemCollection
            items={categories || []}
            options={{
              maxItems: 120,
              itemOptions: {
                getHref: item => `/categories?category=${encodeURIComponent(item.label)}`
              }
            }}
          />
        </>
      ) : (
        <p>There are no categories to display.</p>
      )}
    </>
  )
}
