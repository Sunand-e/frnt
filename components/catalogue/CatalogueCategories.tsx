import useGetTags from "../../hooks/tags/useGetTags"
import ItemCollection from "../common/items/ItemCollection"

export default function CatalogueCategories() {

  const { tags, loading, error } = useGetTags()

  const categories = tags?.filter(tag => tag.tagType === 'category')

  return (
    <>
      { categories?.length && (
        <>
        <h2 className="inline-block border-grey-dark ">Categories</h2>
          <ItemCollection
            items={categories || []}
            options={{
              maxItems: 120,
              itemOptions: {
                getHref: item => `/catalogue?category=${encodeURIComponent(item.label)}`
              }
            }}
          />
        </>
      )}
    </>
  )
}