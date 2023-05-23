import { useEffect, useState } from "react";
import { useRouter } from "../../../utils/router";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import { filterDeletedCourseItems } from "../CourseStructureEditor/utilities";

const usePreviousAndNextIds = () => {

  const router = useRouter()
  const { id: courseId, cid: moduleId } = router.query
  const { courses } = useGetUserCourse(courseId)
  const course = courses?.edges[0]?.node
  
  const [prevNextIds, setPrevNextIds] = useState([]);

  useEffect(() => {
    const orderedIds = course && filterDeletedCourseItems(course).sections.reduce((arr, section) => {
      return [...arr, ...section.children.map(child => child.id)]
    }, []);

    if(orderedIds) {
      let prevId = orderedIds[orderedIds.indexOf(moduleId) - 1]
      let nextId = orderedIds[orderedIds.indexOf(moduleId) + 1]
      setPrevNextIds([prevId,nextId])
    }
  }, [moduleId, course])

  return {
    previous: prevNextIds[0],
    next: prevNextIds[1]
  }
}

export default usePreviousAndNextIds