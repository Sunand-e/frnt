import { useContext } from "react"
import Button from "../common/Button"
import SelectCoursesTable from "./SelectCoursesTable"
import PathwayTimeline from "./PathwayTimeline"
import { usePathwayStore } from "./usePathwayStore"
import SelectResourcesTable from "./SelectResourcesTable"
import useWarningOnExit from "../../hooks/useWarningOnExit";
import RemovePathwayItemModal from "./RemovePathwayItemModal"
import { closeModal, handleModal } from "../../stores/modalStore"

const PathwayEditor = () => {
  
  const addItem = usePathwayStore(state => state.addItem)
  const isDirty = usePathwayStore(state => state.isDirty)

  useWarningOnExit(isDirty)
  
  const handleContentSelect = (content) => {
    addItem(content)
    closeModal()
  }
  
  const addCourse = () => {
    handleModal({
      title: `Add course to pathway:`,
      size: 'lg',
      content: <SelectCoursesTable onRowClick={handleContentSelect} />
    })
  }
  const addResource = () => {
    handleModal({
      title: `Add resource to pathway:`,
      size: 'lg',
      content: <SelectResourcesTable onRowClick={handleContentSelect} />
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
      <Button onClick={addCourse} className="mr-2">Add a course</Button>
      <Button onClick={addResource}>Add a resource</Button>
    </>
  )
}

export default PathwayEditor