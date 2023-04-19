import Select from "react-select";
import useCreateLesson from "../../hooks/lessons/useCreateLesson";
import useUpdateLesson from "../../hooks/lessons/useUpdateLesson";
import IconOption from "../common/inputs/react-select/IconOption";
import { moduleTypes } from "./moduleTypes";

const moduleTypesArray = Object.keys(moduleTypes).map(key => {
  return {
    ...moduleTypes[key],
    value: key
  }
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 8,
  }),
}

const SelectNewCourseItem = ({
  sectionId, 
  placeholder="Choose a module type...",
  onSelect = () => null
}) => {
  
  const { createLesson, lesson } = useCreateLesson(sectionId)
  const { updateLesson } = useUpdateLesson()

  const handleNewLessonButton = ({ content, value }) => {
    createLesson({content, contentType: value})
    onSelect()
  }

  return (
    <Select
      placeholder={<span className="text-main-secondary">{placeholder}</span>}
      options={moduleTypesArray}
      styles={customStyles}
      components={{ Option: IconOption }}
      onChange={handleNewLessonButton}
      value={null}
      className={`w-full`}
      isSearchable={false} 
      closeMenuOnSelect={true}
    />
  )
}

export default SelectNewCourseItem
