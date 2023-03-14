import { useEffect, useState } from "react"
import useGetUserCourse from "../../../hooks/users/useGetUserCourse"
import { useRouter } from "../../../utils/router"

const itemIdsBySectionId = (mainArray) => {
  const obj = {}
  for (const section of mainArray) {
    const sectionItemIds = section.children?.map(child => child.id)
    obj[section.id] = sectionItemIds;
  }
  return obj
}

const filterDeletedCourseItems = (course) => course && ({
  ...course,
  sections: course?.sections.filter(section => !section._deleted).map(section => {
    return ({
      ...section,
      children: section.children.filter(child => !child._deleted)
    })
  }) || []
})

const CourseStructureCached = () => {

  const router = useRouter()
  const { id } = router.query

  const { courseEdge } = useGetUserCourse(id)
  const course = courseEdge?.node

  const [items, setItems] = useState({})

  
  useEffect(() => {
    const updatedCacheItems = itemIdsBySectionId(
      filterDeletedCourseItems(course)?.sections || []
    )
    setItems(updatedCacheItems)
  
  },[course])

  return (
    <div>
      <h3>Cached items state</h3>
    <pre className="m-5">
    { JSON.stringify(items,null,2) }
    </pre>
    </div>
  )
}

export default CourseStructureCached