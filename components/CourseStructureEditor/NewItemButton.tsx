import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import AddItemToCourseModal from "../admin/courses/AddItemToCourseModal";
import NewThingButton from "./NewThingButton";

const NewItemButton = ({container: containerId}) => {

  const { handleModal } = useContext(ModalContext);
  
  const handleClick = () => {
    handleModal({
      title: `Add new item`,
      content: <AddItemToCourseModal sectionId={containerId} />
    })
  }

  return (
    <NewThingButton thing="Item" onClick={handleClick} />
  )
}

export default NewItemButton