import { useState } from "react"
import useGetTags from "../../hooks/tags/useGetTags"
import useGetUser from "../../hooks/users/useGetUser"
import Tabs from "../common/containers/Tabs"
import ItemCollection from "../common/items/ItemCollection"

export default function CategoriesGrid() {

  const { tags, loading, error } = useGetTags()

  const categories = tags?.filter(tag => tag.tagType === 'category')

  return (
    <>
      { categories?.length && (
        <>
          <ItemCollection
            items={categories || []}
            options={{
              maxItems: 120,
            }}
          />
        </>
      )}
    </>
  )
}