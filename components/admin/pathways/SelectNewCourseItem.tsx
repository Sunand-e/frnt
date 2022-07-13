import { useEffect } from "react";
import Select from "react-select";
import { currentContentItemVar } from "../../../graphql/cache";
import useCreateLesson from "../../../hooks/lessons/useCreateLesson";
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson";
import IconOption from "../../common/inputs/react-select/IconOption";
import { lessonTypes } from "./lessonTypes";

const lessonTypesArray = Object.keys(lessonTypes).map(key => {
  return {
    ...lessonTypes[key],
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
  placeholder="Choose a lesson type...",
  onSelect = () => null
}) => {
  
  const { createLesson, lesson } = useCreateLesson(sectionId)
  const { updateLesson } = useUpdateLesson()

  const handleNewLessonButton = ({ content, value }) => {
    createLesson({content, contentType: value})
    onSelect()
  }
    
  useEffect(() => {
    if(lesson) {
      currentContentItemVar({
        type: 'lesson',
        id: lesson.id,
        updateFunction: updateLesson(lesson.id)
      })
    }
  },[lesson])

  return (
    <Select
      placeholder={<span className="text-main-secondary">{placeholder}</span>}
      options={lessonTypesArray}
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
