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
        <div>
          { course.settings.frontPage?.enabled && <div className="p-4 pb-2"><SidebarCoursePageItem /></div> }
          <ul className="px-4">
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
