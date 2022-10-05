import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useGetUserContent from "../../hooks/users/useGetUserContent"
import SidebarItem from "../common/course/SidebarItem"
import { SidebarSection } from "../common/course/SidebarSection"
import ProgressBar from "../common/ProgressBar"

const CourseStructureView = () => {

  const router = useRouter()
  const { id, cid } = router.query
  const { user } = useGetUserContent(id)
  const course = user?.courses.edges[0].node

  const [ progress, setProgress ] = useState()


  useEffect(() => {
    if(user) {
      let userContent = user.courses.edges.find(userContentEdge => userContentEdge.node.id === id)
      console.log('userContentuserContentuserContentuserContentuserContent')
      console.log(userContent)
      userContent && setProgress(userContent.score)
    }
  },[user, id])

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
          <div className="flex flex-col justify-between p-2 px-4 h-18 bg-main bg-opacity-10 text-main-secondary">
            
            <div className="flex items-center max-w-xs h-10">
              { course.tags?.[0] && (
              <div className="h-8 w-8 shrink-0">
                <img className="rounded-full" src={course.tags[0].image?.location ?? '/images/placeholder-image.png'} alt="" />
              </div>
              ) }
              <div className="ml-3 flex items-center h-10">
                <h3 
                  className="text-base font-bold font-medium text-main-secondary overflow-hidden leading-5"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'  
                  }}
                >
                  {course?.title}
                </h3>
              </div>
            </div>

            { progress !== null && progress !== undefined && (
              <ProgressBar value={progress} className={`-mb-0.5`} />
            )}
          </div>
          <ul className="p-4">
            { course.sections.filter(section => section.lessons.length).map((section, index) => (
              <SidebarSection key={index} id={section.id}>
                { section.lessons.map((item, index) => (
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
