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

  const [selectedContentIds, setSelectedContentIds] = useState([])

  const handleChange = (items, actionMeta) => {
    setSelectedContentIds(items.map(item => item.value))
  }

  const handleAddTagToContent = (e) => {
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
            <ContentSelectCategorised availableContent={availableContent} onChange={handleChange} typeName={typeName} />
            {/* <CourseMultiLevelSelect data={availableContentData} onChange={handleChange} /> */}
            { !!selectedContentIds.length && (
              <Button onClick={handleAddTagToContent}><>
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