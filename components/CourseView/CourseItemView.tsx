import { useRouter } from '../../utils/router'
import useGetLesson from "../../hooks/lessons/useGetLesson"
import LessonView from "./LessonView"
import useBlockEditor from '../ContentEditor/useBlockEditor'
import { useEffect } from 'react'
import { useBlockStore } from '../ContentEditor/useBlockStore'
import { useReactiveVar } from '@apollo/client'
import { currentContentItemVar } from '../../graphql/cache'
import useCourse from '../../hooks/courses/useCourse'
import ProgressDebug from './ProgressDebug'
import useGetUserContent from '../../hooks/users/useGetUserContent'

const CourseItemView = () => {

  const {content} = useBlockEditor()

  const currentContentItem = useReactiveVar(currentContentItemVar) 

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { course } = useCourse(id)

  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !contentId) {
      const firstItemInCourse = course?.sections.find(
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

  useEffect(() => {
    currentContentItemVar({
      ...currentContentItem,
      type: 'lesson',
      id: contentId
    })
  },[id, contentId])
  
  return (
    <LessonView />
  )
}
export default CourseItemView