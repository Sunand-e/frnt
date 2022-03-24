import Link from "next/link"
import { useRouter } from "next/router"
import SidebarItem from "../common/course/SidebarItem"
import { SidebarSection } from "../common/course/SidebarSection"

const CourseStructureView = ({course}) => {
  const router = useRouter()
  
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
    <>
      { course && (
        <ul className="p-4">
          { course.sections.filter(section => section.children.length).map((section, index) => (
            <SidebarSection key={index} label={section.id}>
              { section.children.map((item, index) => (
                <SidebarItem key={index} id={item.id} onSelect={handleItemSelect} />
              ))}
              </SidebarSection>
          ))}
        </ul>
      )}
    </>
  )
}
export default CourseStructureView