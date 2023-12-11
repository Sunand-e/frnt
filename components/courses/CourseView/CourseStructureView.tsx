import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useGetUserCourse from "../../../hooks/users/useGetUserCourse"
import SidebarItem from "../../courses/SidebarItem"
import { SidebarSection } from "../../courses/SidebarSection"
import { filterDeletedCourseItems } from "../CourseStructureEditor/utilities"
import { SidebarCoursePageItem } from "../SidebarCoursePageItem"

const CourseStructureView = () => {

  const router = useRouter()
  const { id, cid } = router.query
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node

  const filteredCourse = filterDeletedCourseItems(course)

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
      { filteredCourse && (
        <div className="p-3">
          { course.settings.frontPage?.enabled && <div className="mb-3"><SidebarCoursePageItem /></div> }
          <ul>
            { filteredCourse.sections.filter(section => section.children.length).map((section, index) => (
              <SidebarSection key={index} id={section.id}>
                { section.children.map((item, index) => (
                  <SidebarItem key={index} id={item.id} onSelect={() => handleItemSelect(item.id)} />
                ))}
                </SidebarSection>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
export default CourseStructureView
