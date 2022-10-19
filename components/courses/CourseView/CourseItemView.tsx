import { useRouter } from '../../../utils/router'
import LessonView from "./LessonView"
import useBlockEditor from '../../common/ContentEditor/useBlockEditor'
import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { currentContentItemVar } from '../../../graphql/cache'
import useGetUserContent from '../../../hooks/users/useGetUserContent'
import LoadingSpinner from '../../common/LoadingSpinner'
import { Dot } from '../../common/misc/Dot';

const CourseItemView = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar) 

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { courses } = useGetUserContent(id)
  const course = courses?.edges[0]?.node

  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !contentId) {
      const firstItemInCourse = course.sections?.find(
        (section) => section.lessons?.length
      )?.lessons[0]
      
      if(firstItemInCourse) {
        router.push({query: {
          ...router.query,
          cid: firstItemInCourse.id
        }})
      }
    }
  },[id, course?.id])

  useEffect(() => {
    currentContentItemVar({
      ...currentContentItem,
      type: 'lesson',
      id: contentId
    })
  },[id, contentId])
  
  return (
    course ? (
      <LessonView />
    ) : (
      <LoadingSpinner text={(
        <>
          Loading your course
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} />
    )
  )
}
export default CourseItemView