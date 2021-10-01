import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import AddItemToCourseModal from "../admin/courses/AddItemToCourseModal";

const NewItemButton = ({container: containerId}) => {

  const { handleModal } = useContext(ModalContext);
  
  const handleAddItemButton = () => {
    handleModal({
      title: `Add new item`,
      content: <AddItemToCourseModal sectionId={containerId} />
    })
  }

  return (
    <div className="
      text-center align-center p-2
      border-2 border-dashed border-grey hover:border-grey-dark 
      text-grey hover:text-grey-dark
      hover:cursor-pointer
      w-full flex-none flex flex-col justify-center
    ">
      <div
      className="flex space-x-3 justify-center"
      onClick={handleAddItemButton}
      >
        {/* <Icon icon="plus-alt" /> */}
        <span>New Item</span>
      </div>
    </div>
  )
}

export default NewItemButton