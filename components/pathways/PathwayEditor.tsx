import useWarningOnExit from "../../hooks/useWarningOnExit"
import { handleModal } from "../../stores/modalStore"
import Button from "../common/Button"
import PathwayAvailableContentTable from "./PathwayAvailableContentTable"
import PathwayTimeline from "./PathwayTimeline"
import RemovePathwayItemModal from "./RemovePathwayItemModal"
import { usePathwayStore } from "./usePathwayStore"

const PathwayEditor = () => {
  
  const isDirty = usePathwayStore(state => state.isDirty)

  useWarningOnExit(isDirty)
  
  const addContent = () => {
    handleModal({
      title: `Add content to pathway:`,
      size: 'lg',
      content: <PathwayAvailableContentTable />
    })
  }


  const handleRemoveItem = (item) => {
    handleModal({
      title: `Remove item`,
      content: <RemovePathwayItemModal item={item} />
    })
  }

  return (
    <>
      <PathwayTimeline 
        editMode={true} 
        onRemove={handleRemoveItem}
      />
      <Button onClick={addContent} className="mr-2">Add content</Button>
      {/* <Button onClick={addResource}>Add a resource</Button> */}
    </>
  )
}

export default PathwayEditor