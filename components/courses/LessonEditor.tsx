import { currentContentItemVar } from "../../graphql/cache"
import { useEffect } from "react";
import BlockEditor from "../common/ContentEditor/BlockEditor";
import useUpdateLesson from "../../hooks/lessons/useUpdateLesson";
import { useBlockStore } from "../common/ContentEditor/useBlockStore";
import { useRouter } from "../../utils/router";
import { useLessonContentFragment } from "../../hooks/lessons/useLessonContentFragment";
import usePageTitle from "../../hooks/usePageTitle";
import ScormView from "./scorm/ScormView";

const LessonEditor = () => {

  const router = useRouter()
  const { cid: contentId } = router.query
  const { updateLesson } = useUpdateLesson()

  const setBlocks = useBlockStore(state => state.setBlocks)
  
  const { complete, data: lesson } = useLessonContentFragment(contentId)

  usePageTitle({ 
    title: `Lesson: `, 
    editable:  lesson?.title || 'Untitled Lesson', 
    onEdit: title => {
      updateLesson(contentId)({title})
    }
  })


  useEffect(() => {
    lesson?.content && setBlocks(lesson.content.blocks || [])
  },[lesson])

  /* REFACTOR NEEDED */
  useEffect(() => {
    if(contentId) {
      currentContentItemVar({
        title: null,
        id: contentId,
        type: 'lesson',
        updateFunction: updateLesson(contentId)
      })
    }
    return () => {
      currentContentItemVar({
        title: null,
        id: null,
        updateFunction:null,
        type:null
      })
    }
  },[contentId])

  return (
    <>
      { lesson.contentType === 'scorm_assessment' ? (
        <ScormView isEditing={true} />
      ) : (
        <BlockEditor />
      )}
    </>
  )
}

export default LessonEditor