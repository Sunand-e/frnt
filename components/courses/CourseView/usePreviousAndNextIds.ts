import { useEffect, useState } from "react";
import { useRouter } from "../../../utils/router";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import { filterDeletedCourseItems } from "../CourseStructureEditor/utilities";

const usePreviousAndNextIds = () => {

  const router = useRouter()
  const { id: courseId, cid: moduleId } = router.query
  const { courses } = useGetUserCourse(courseId)
  const course = courses?.edges[0]?.node
  
  const [prevNextLast, setPrevNextLast] = useState({
    prev: null,
    next: null,
    last: null
  });

  useEffect(() => {
    const orderedIds = course && filterDeletedCourseItems(course).sections.reduce((arr, section) => {
      return [...arr, ...section.children.map(child => child.id)]
    }, []);

    if(orderedIds) {
      setPrevNextLast({
        prev: orderedIds[orderedIds.indexOf(moduleId) - 1],
        next: orderedIds[orderedIds.indexOf(moduleId) + 1],
        last: orderedIds[-1]
      })
    }
  }, [moduleId, course])

  return prevNextLast
}

export default usePreviousAndNextIds