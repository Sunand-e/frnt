
import { useReactiveVar } from "@apollo/client"
import { useRouter } from '../../../utils/router'
import LessonEditor from "./LessonEditor"
import SelectNewCourseItem from "./SelectNewCourseItem"
import useCourse from "../../../hooks/courses/useCourse"
import { useEffect } from "react"
import { currentContentItemVar } from "../../../graphql/cache"
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson"

const CourseEditor = () => {
  const router = useRouter()

  const { id, cid: contentId } = router.query
  const { course } = useCourse(id)
  const currentContentItem = useReactiveVar(currentContentItemVar)
  
  const {
    lesson,
    updateLesson
  } = useUpdateLesson(contentId)
  
  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !currentContentItem.id) {
      const firstItemInCourse = course?.sections.find(
        (section) => section.children?.length
        )?.children[0]
      
      if(firstItemInCourse) {
        currentContentItemVar({
          id: firstItemInCourse.id,
          type:'lesson',
          updateFunction: updateLesson(firstItemInCourse.id)
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
        </div>
      }
    </>
  )
}
export default CourseEditor