import { useRouter } from '../../utils/router'
import useGetLesson from "../../hooks/lessons/useGetLesson"
import LessonView from "./LessonView"
import useBlockEditor from '../ContentEditor/useBlockEditor'
import { useEffect } from 'react'
import { useBlockStore } from '../ContentEditor/useBlockStore'

const CourseItemView = () => {

  const setBlocks = useBlockStore(state => state.setBlocks)

  const {getContent, content} = useBlockEditor()

  useEffect(() => {
    getContent()
  },[])
  
  useEffect(() => {
    if(content) {
      setBlocks(content?.blocks || []);
    }
  }, [content])

  // useEffect(() => {
  //   headerButtonsVar(
  //     <>
  //       <Button onClick={() => router.push(`/admin/courses/edit?id=${cid}`)}>Cancel</Button>
  //       <Button>Preview lesson</Button>
  //       <Button>Publish</Button>
  //     </>
  //   )
  // },[])

  return (
    <>
      { content && (
        <>
          <LessonView />
        </>
      )}
    </>
  )
}
export default CourseItemView