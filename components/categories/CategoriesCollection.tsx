import useGetTags from "../../hooks/tags/useGetTags"
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser"
import ItemCollection from "../common/items/ItemCollection"

export default function CategoriesCollection() {

  // const { tags, loading, error } = useGetCurrentUser()

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
        !!categories && <p>There are no categories to display.</p>
      )}
    </>
  )
}
