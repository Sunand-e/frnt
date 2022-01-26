import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { PlusCircle } from '@styled-icons/heroicons-solid/PlusCircle'
import AddItemToCourseModal from "../admin/courses/AddItemToCourseModal";

import LineWithIcon from '../LineWithIcon'

const NewItemButton = ({container: containerId}) => {

  const { handleModal } = useContext(ModalContext);
  
  const handleClick = () => {
    handleModal({
      title: `Add new item`,
      content: <AddItemToCourseModal sectionId={containerId} />
    })
  }

  return (
    <div
    className={`h-12 text-main opacity-0 max-w-screen-lg items-center group-hover:opacity-100 w-full ${true && 'opacity-100'}`}
    onClick={handleClick}
    >
      <div className={`
    flex items-center py-2 h-10 justify-center
  `}>
    <PlusCircle className={`px-4 w-14`} />
  </div>
  </div>
    // <NewThingButton thing="Item" onClick={handleClick} />

  )
}

export default NewItemButton