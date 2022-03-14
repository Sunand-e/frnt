import { setValues } from "framer-motion/types/render/utils/setters";
import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { currentContentItemVar } from "../../../graphql/cache";
import useCreateLesson from "../../../hooks/lessons/useCreateLesson";
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson";
import { lessonTypes } from "./lessonTypes";

const lessonTypesArray = Object.keys(lessonTypes).map(key => {
  return {
    ...lessonTypes[key],
    value: key
  }
});

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
  placeholder="Choose a lesson type...",
  onSelect = () => null
}) => {
  
  const { createLesson, data } = useCreateLesson(sectionId)
  const { updateLesson } = useUpdateLesson()

  const handleNewLessonButton = ({ content, value }) => {
    createLesson({content, contentType: value})
    onSelect()
  }
    
  useEffect(() => {
    if(data) {
      currentContentItemVar({
        type: 'lesson',
        id: data.lesson.id,
        updateFunction: updateLesson(data?.lesson.id)
      })
    }
  },[data])

  return (
    <Select
      placeholder={<span className="text-main-dark">{placeholder}</span>}
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