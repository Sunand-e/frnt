import Select, { components } from "react-select";
import { PlusCircle } from '@styled-icons/heroicons-solid/PlusCircle'
import useModal from "../../../hooks/useModal";
import { useContext } from "react";
import { ModalContext } from "../../../context/modalContext";
import AddLessonModal from "./AddLessonModal";
import useCreateLesson from "../../../hooks/lessons/useCreateLesson";
import { lessonTypes } from "./lessonTypes";

const { Option } = components;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 8,
  }),
}

const IconOption = props => (
  <Option {...props} className={`flex bg-main h-10 py-1 space-x-2 text-main-dark`}>
  {/* <Option {...props}> */}
      <props.data.icon className="h-full text-main-dark"/>
    <span className="text-main-dark">
      {props.data.label}
    </span>
  </Option>
);

const SelectNewCourseItem = ({
  sectionId, 
  placeholder="Choose an item type..."
}) => {

  // const { handleModal } = useContext(ModalContext)
  const { createLesson } = useCreateLesson(sectionId)

  const handleNewLessonButton = (data) => {
    const { content, contentType } = data
    createLesson({content, contentType})
    // handleModal({
    //   title: `Lesson name:`,
    //   content: <AddLessonModal sectionId={sectionId} />
    // })
  }

  
  return (
    <Select
      placeholder={<span className="text-main-dark">{placeholder}</span>}
      options={lessonTypes}
      styles={customStyles}
      components={{ Option: IconOption }}
      onChange={handleNewLessonButton}
      className={`w-full`}
      isSearchable={false} 
    />
  )
}

export default SelectNewCourseItem