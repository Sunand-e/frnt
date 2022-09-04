import { useRouter } from '../../utils/router'
import useGetLesson from "../../hooks/lessons/useGetLesson"
import LessonView from "./LessonView"
import useBlockEditor from '../ContentEditor/useBlockEditor'
import { useEffect } from 'react'
import { useBlockStore } from '../ContentEditor/useBlockStore'
import { useReactiveVar } from '@apollo/client'
import { currentContentItemVar } from '../../graphql/cache'
import useCourse from '../../hooks/courses/useCourse'

const CourseItemView = () => {

  const setBlocks = useBlockStore(state => state.setBlocks)

  const {getContent, content} = useBlockEditor()

  const currentContentItem = useReactiveVar(currentContentItemVar) 

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { course } = useCourse(id)

  useEffect(() => {
    // If there is a course but no item provided, show the first item
    if(course && !currentContentItem.id) {
      const firstItemInCourse = course?.sections.find(
        (section) => section.children?.length
        )?.children[0]
        
        if(firstItemInCourse) {
          currentContentItemVar({
          type: 'lesson',
          ...currentContentItem,
          id: firstItemInCourse.id
        })
      }
    }
  },[id, course?.id])

  useEffect(() => {
    getContent()
  },[id])
  
  useEffect(() => {
    if(content) {
      setBlocks(content?.blocks || []);
    }
  }, [content])

  useEffect(() => {
    currentContentItemVar({
      ...currentContentItem,
      type: 'lesson',
      id: contentId
    })
    
  },[id, contentId])
  
  return (
    <>
      { content && (
        <>
        content
          <LessonView />
        </>
      )}
    </>
  )
}
export default CourseItemView