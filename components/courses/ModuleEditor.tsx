import { useEffect, useMemo } from "react";
import BlockEditor from "../common/ContentEditor/BlockEditor";
import useUpdateLesson from "../../hooks/lessons/useUpdateLesson";
import { useBlockStore } from "../common/ContentEditor/useBlockStore";
import { useRouter } from "../../utils/router";
import { useLessonContentFragment } from "../../hooks/lessons/useLessonContentFragment";
import usePageTitle from "../../hooks/usePageTitle";
import ScormView from "./scorm/ScormView";
import QuizEditor from "../quiz/QuizEditor";

const LessonEditor = () => {

  const router = useRouter()
  const { cid: contentId } = router.query
  const { updateLesson } = useUpdateLesson()

  const setBlocks = useBlockStore(state => state.setBlocks)
  
  const { complete, data: lesson } = useLessonContentFragment(contentId)

  usePageTitle({ 
    title: ``, 
    editable:  lesson?.title || 'Untitled Lesson', 
    onEdit: title => {
      updateLesson(contentId)({title})
    }
  })

  useEffect(() => {
    lesson?.content && setBlocks(lesson.content.blocks || [])
  },[lesson])

  const component = useMemo(() => (
    lesson.itemType === 'quiz' ? (
      <QuizEditor id={contentId} />
    ) : lesson.contentType === 'scorm_assessment' ? (
      <ScormView isEditing={true} />
    ) : (
      <BlockEditor />
  )),[lesson.contentType,lesson.itemType])

  return component
}

export default LessonEditor