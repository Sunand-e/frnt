import { useRouter } from "next/router"
import { useEffect } from "react"
import useGetCourse from "../../hooks/courses/useGetCourse"
import useGetUserContent from "../../hooks/users/useGetUserContent"
import SidebarItem from "../common/course/SidebarItem"
import { SidebarSection } from "../common/course/SidebarSection"
import ProgressBar from "../common/ProgressBar"

const CourseStructureView = () => {

  const router = useRouter()
  const { id } = router.query

  const { loading, error, course } = useGetCourse(id)
  const { user } = useGetUserContent(id)
useEffect(() => {
  console.log('user')
  console.log(user)
},[user])
  const handleItemSelect = id => {
    router.push({
      pathname: `/course`,
      query: {
        ...router.query,
        cid: id
      }
    })
  }

  return (
    <div className="flex flex-col">
      { course && (
        <>
          <div className="flex flex-col justify-between p-2 px-4 h-18 bg-main bg-opacity-10 text-main-dark">
            <h2
                className="text-base h-10 font-bold flex items-center overflow-hidden leading-5"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'  
                }}
            >
              <span className="flex-1">{course?.title}</span>
            </h2>
            <ProgressBar value={20} />
          </div>
          <ul className="p-4">
            { course.sections.filter(section => section.children.length).map((section, index) => (
              <SidebarSection key={index} label={section.id}>
                { section.children.map((item, index) => (
                  <SidebarItem key={index} id={item.id} onSelect={handleItemSelect} />
                ))}
                </SidebarSection>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
export default CourseStructureView