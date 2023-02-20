import { useState } from "react"
import TagSelect from "../../tags/inputs/TagSelect"

const CategoryFilter = ({tableData, categoryId, setCategoryId}) => {

  if(categoryId) {
    tableData = tableData?.filter(item => {
      return item?.tags?.edges.some(({node}) => node.id === categoryId)
    })
  }
  
  return (
    <TagSelect selected={categoryId} tagType={`category`} onSelect={tag => setCategoryId(tag.id)} />
  )
}
