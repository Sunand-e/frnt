import { useContext } from "react"
import { ModalContext } from "../../context/modalContext"
import Button from "../common/Button"
import SelectCoursesTable from "./SelectCoursesTable"
import PathwayTimeline from "./PathwayTimeline"
import { usePathwayStore } from "./usePathwayStore"
import SelectResourcesTable from "./SelectResourcesTable"
import useWarningOnExit from "../../hooks/useWarningOnExit";
import RemovePathwayItemModal from "./RemovePathwayItemModal"

const PathwayEditor = () => {


  const { handleModal, closeModal } = useContext(ModalContext)
  const addItem = usePathwayStore(state => state.addItem)
  const isDirty = usePathwayStore(state => state.isDirty)


  useWarningOnExit(isDirty)
  
  const handleContentSelect = (course) => {
    addItem(course)
    closeModal()
  }
  
  const addCourse = () => {
    handleModal({
      title: `Add course to pathway:`,
      size: 'lg',
      content: <SelectCoursesTable onRowSelect={handleContentSelect} />
    })
  }
  const addResource = () => {
    handleModal({
      title: `Add resource to pathway:`,
      size: 'lg',
      content: <SelectResourcesTable onRowSelect={handleContentSelect} />
    })
  }


  const handleRemoveItem = (item) => {
    handleModal({
      title: `Delete lesson`,
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