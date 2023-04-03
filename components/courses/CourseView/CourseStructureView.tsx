import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useGetUserCourse from "../../../hooks/users/useGetUserCourse"
import SidebarItem from "../../courses/SidebarItem"
import { SidebarSection } from "../../courses/SidebarSection"

const CourseStructureView = () => {

  const router = useRouter()
  const { id, cid } = router.query
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node

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
            <SidebarSection key={index} id={section.id}>
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
