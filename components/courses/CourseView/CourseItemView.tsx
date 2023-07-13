import { useRouter } from '../../../utils/router'
import { useEffect } from 'react'
import useGetUserCourse from '../../../hooks/users/useGetUserCourse'
import LoadingSpinner from '../../common/LoadingSpinner'
import { Dot } from '../../common/misc/Dot';
import ModuleView from './ModuleView'

const CourseItemView = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node

  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !contentId) {
      const firstItemInCourse = course.sections?.find(
        (section) => section.children?.length
      )?.children[0]
      
      if(firstItemInCourse) {
        router.push({query: {
          ...router.query,
          cid: firstItemInCourse.id
        }})
      }
    }
  },[id, course?.id])

  return (
    course ? (
      <ModuleView />
    ) : (
      <LoadingSpinner text={(
        <>
          Loading course module
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} />
    )
  )
}
export default CourseItemView