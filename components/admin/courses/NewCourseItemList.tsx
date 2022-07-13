import { useEffect } from "react";
import { currentContentItemVar } from "../../../graphql/cache";
import useCreateLesson from "../../../hooks/lessons/useCreateLesson";
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson";
import { lessonTypes } from "./lessonTypes";
import NewCourseItem from "./NewCourseItem";

const NewCourseItemList = ({
  sectionId, 
  onSelect = () => null
}) => {
  
  const { createLesson, lesson } = useCreateLesson(sectionId)
  const { updateLesson } = useUpdateLesson()

  const handleItemClick = (lessonType) => {
    createLesson({
      content: lessonTypes[lessonType].content, 
      contentType: lessonType
    })
    onSelect()
  }
    
  useEffect(() => {
    if(lesson) {
      currentContentItemVar({
        title: lesson.title,
        type: 'lesson',
        id: lesson.id,
        updateFunction: updateLesson(lesson.id)
      })
    }
  },[lesson])

  const items = Object.keys(lessonTypes).map(key => {
    return <NewCourseItem key={key} onClick={() => handleItemClick(key)} label={lessonTypes[key].label} IconComponent={lessonTypes[key].icon} />
  })

  return (
    <div>
      <p className="-mx-2 -mt-2 mb-1 p-3 bg-main/10 text-main-secondary font-semibold">Choose a lesson type...</p>
      {items}
    </div>
  )
}

export default NewCourseItemList
