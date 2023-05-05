import { useRouter } from '../../utils/router'
import ModuleEditor from "./ModuleEditor"
import SelectNewCourseItem from "./SelectNewCourseItem"
import { useEffect } from "react"
import useGetUserCourse from "../../hooks/users/useGetUserCourse"
import { SettingsPane } from "../common/ContentEditor/SettingsPane"

const CourseEditor = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node
  
  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !contentId) {
      const firstItemInCourse = course?.sections.find(
        (section) => section.children?.filter(module => module._deleted !== true).length
      )?.children.find(module => module._deleted !== true)
      
      if(firstItemInCourse) {
        router.push({query: {
          ...router.query,
          cid: firstItemInCourse.id
        }})
      }
    }
  },[id, contentId])

  return (
    <div className="h-full">
      <div className="fixed overflow-y-auto overflow-x-hidden h-[calc(100vh-108px)] lg:ml-[260px] mr-[300px] left-0 lg:left-16 right-0">
        { contentId ? (
          <ModuleEditor />
        ) :
          <div className='mx-auto my-0 space-y-4 h-full self-center flex flex-col justify-center items-center w-full max-w-sm'>
            <SelectNewCourseItem sectionId={course.sections[0]?.id} placeholder="Create your first lesson" />
          </div>
        }
      </div>
      <SettingsPane />
    </div>
  )
}
export default CourseEditor