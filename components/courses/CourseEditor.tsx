
import { useReactiveVar } from "@apollo/client"
import { useRouter } from '../../utils/router'
import LessonEditor from "./LessonEditor"
import SelectNewCourseItem from "./SelectNewCourseItem"
import useCourse from "../../hooks/courses/useCourse"
import { useEffect } from "react"
import { currentContentItemVar } from "../../graphql/cache"
import useUpdateLesson from "../../hooks/lessons/useUpdateLesson"
import useGetUserCourse from "../../hooks/users/useGetUserCourse"
import { SettingsPanel } from "../common/ContentEditor/SettingsPanel"

const CourseEditor = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node

  const currentContentItem = useReactiveVar(currentContentItemVar)
  
  const { updateLesson } = useUpdateLesson(contentId)
  
  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !contentId) {
      const firstItemInCourse = course?.sections.find(
        (section) => section.children?.length
      )?.children[0]
      
      if(firstItemInCourse) {
        currentContentItemVar({
          id: firstItemInCourse.id,
          type:'lesson',
          title: firstItemInCourse.title,
          updateFunction: updateLesson(firstItemInCourse.id)
        })
      }
    } else {
      currentContentItemVar({
        id: contentId,
        type:'lesson',
        title: '',
        updateFunction: updateLesson(contentId)
      })
    }
  },[id, contentId])

  
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
    <div className="h-full">
      <div className="px-16  fixed overflow-y-auto overflow-x-hidden h-[calc(100vh-120px)] mx-[300px] left-0 right-0">
        { currentContentItem.id ? (
          <LessonEditor />
        ) :
          <div className='mx-auto my-0 space-y-4 h-full self-center flex flex-col justify-center items-center w-full max-w-sm'>
            <SelectNewCourseItem sectionId={course.sections[0]?.id} placeholder="Create your first lesson" />
          </div>
        }
      </div>
      <SettingsPanel />
    </div>
  )
}
export default CourseEditor