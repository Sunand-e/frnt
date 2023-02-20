import { useState } from "react"
import useAddTagsToContent from "../../../hooks/contentItems/useAddTagsToContent"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectCategorised from "../../common/inputs/ContentSelectCategorised"

const AddTagToContent = ({tag, content, typeName='item'}) => {
  
  const {addTagsToContent} = useAddTagsToContent()

  const contentNodes = content?.edges.map(edge => edge.node)

  const availableContent = contentNodes?.filter(node => 
    !node.tags.edges.find(({node}) => node.id === tag.id)
  ) || []
  
  const tags = availableContent.reduce((tagArr,content,index, array) => {
    return [
        ...tagArr,
        ...content.tags.edges.filter(({node}) => !tagArr.some(t => t.id === node.id))
    ]
  }, [])
  
  let uniqueContent = []
  const categorisedContentData = tags.map(tag => ({
    label: tag.label,
    options: availableContent.filter(content => {
      if(
        uniqueContent.some(c => c.id === content.id)
        || !content.tags.edges.some(({node}) => node.id === tag.id)
      ) {
        return false
      }
      uniqueContent.push(content)
      return true
    }).map(content => ({
      label: content.title,
      value: content.id,
    })),
  }))
  
  const availableContentData = [
    ...categorisedContentData,
    {
      label: 'Uncategorised',
      options: availableContent.filter(content => {
        return !uniqueContent.some(c => c.id === content.id) && !content.tags.edges.length
      }).map(content => ({
        label: content.title,
        value: content.id,
      }))  
    }
  ]
  
  const {roles} = useGetRoles()

  const [selectedContentIds, setSelectedContentIds] = useState([])

  const handleChange = (items, actionMeta) => {
    setSelectedContentIds(items.map(item => item.value))
  }

  const handleEnrol = (e) => {
    addTagsToContent({
      tagIds: [tag.id],
      contentItemIds: selectedContentIds,
    }, () => {
      closeModal()
    })
  }
  
  return (
    <>
      {
        availableContent?.length ? (
          <div>
            <ContentSelectCategorised data={availableContentData} onChange={handleChange} typeName={typeName} />
            {/* <CourseMultiLevelSelect data={availableContentData} onChange={handleChange} /> */}
            { !!selectedContentIds.length && (
              <Button onClick={handleEnrol}><>
                Add {selectedContentIds.length} {typeName}s to '{tag.label}'
                </>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            No {typeName}s available
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  )
}

export default AddTagToContent