
import { useQuery, useReactiveVar } from "@apollo/client"
import { useRouter } from '../../../utils/router'
import { GET_LESSON } from "../../../graphql/queries/allQueries"
import LessonEditor from "./LessonEditor"
import { ContentTitle } from "../../ContentEditor/ContentTitle"
import SelectNewCourseItem from "./SelectNewCourseItem"
import useCourse from "../../../hooks/courses/useCourse"
import { useCallback, useEffect, useState } from "react"
import { currentContentItemVar } from "../../../graphql/cache"
import useGetLesson from "../../../hooks/lessons/useGetLesson"
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson"

const CourseItemEditor = () => {
  const router = useRouter()

  const { id, cid: contentId } = router.query
  const { course } = useCourse(id)
  const currentContentItem = useReactiveVar(currentContentItemVar)
  
  const {
    lesson,
    updateLesson
  } = useUpdateLesson(id)
  
  useEffect(() => {
    // If there is a course but no item provided, show the first 
    if(course && !currentContentItem.id) {
      const firstItemInCourse = course?.sections.find(
        (section) => section.children?.length
        )?.children[0]
        // alert(firstItemInCourse.id)
      
      if(firstItemInCourse) {
        currentContentItemVar({
          id: firstItemInCourse.id,
          type:'lesson',
          updateFunction: updateLesson(id)
        })
      }
    }
  },[course?.id])

  
  // useEffect(() => {
  //   headerButtonsVar(
  //     <>
  //       <Button onClick={() => router.push(`/admin/courses/edit?id=${cid}`)}>Cancel</Button>
  //       <Button>Preview lesson</Button>
  //       <Button>Publish</Button>
  //     </>
  //   )
  // },[])

  return (
    <>
      { currentContentItem.id ? (
        <>
          <LessonEditor />
        </>
      ) :
        <div className='mx-auto my-0 space-y-4 h-full self-center flex flex-col justify-center items-center w-full max-w-sm'>
          <SelectNewCourseItem sectionId={course.sections[0]?.id} placeholder="Create your first lesson" />
          <pre>{JSON.stringify(currentContentItem,null,2)}</pre>
        </div>
      }
    </>
  )
}
export default CourseItemEditor