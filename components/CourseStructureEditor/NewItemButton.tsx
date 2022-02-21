import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { PlusCircle } from '@styled-icons/heroicons-solid/PlusCircle'
import AddItemToCourseForm from "../admin/courses/AddItemToCourseForm";
import Tippy from '@tippyjs/react';
import LineWithIcon from '../LineWithIcon'
import Select, { components } from "react-select";
import SelectNewCourseItem from "../admin/courses/SelectNewCourseItem";

const NewItemButton = ({container: containerId}) => {

  const { handleModal } = useContext(ModalContext);
  
  const handleClick = () => {
    handleModal({
      title: `Add new item`,
      content: <AddItemToCourseForm sectionId={containerId} />
    })
  }

  return (
    <Tippy
      interactive={true}
      className={`text-white px-4 py-2 z-50`}
      theme={'memberhub-block-menu light'}
      arrow={true}
      placement={'bottom'}
      content={<SelectNewCourseItem sectionId={containerId} />}
    >
      <div
        className={`text-main opacity-0 max-w-screen-lg items-center group-hover:opacity-100 w-full ${true && 'opacity-100'}`}
        onClick={handleClick}
      >
        <div className={`
          flex items-center py-2 h-10 justify-center
        `}>
          <PlusCircle className={`px-4 w-14`} />
        </div>
      </div>
    </Tippy>
      // <NewThingButton thing="Item" onClick={handleClick} />

  )
}

export default NewItemButton