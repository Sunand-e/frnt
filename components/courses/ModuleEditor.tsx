import { useEffect, useMemo } from "react";
import BlockEditor from "../common/ContentEditor/BlockEditor";
import useUpdateLesson from "../../hooks/lessons/useUpdateLesson";
import { useBlockStore } from "../common/ContentEditor/useBlockStore";
import { useRouter } from "../../utils/router";
import { useLessonContentFragment } from "../../hooks/lessons/useLessonContentFragment";
import usePageTitle from "../../hooks/usePageTitle";
import ScormView from "./scorm/ScormView";
import QuizEditor from "../quiz/QuizEditor";
import useWarningOnExit from "../../hooks/useWarningOnExit";
import { useQuizStore } from "../quiz/useQuizStore";
import { useFragment_experimental } from "@apollo/client";
import { QuizFragment } from "../../graphql/queries/allQueries";

const ModuleEditor = () => {

  const router = useRouter()
  const { cid: contentId } = router.query
  const { updateLesson } = useUpdateLesson()

  const setBlocks = useBlockStore(state => state.setBlocks)
  
  const isDirty = useBlockStore(state => state.isDirty)

  useWarningOnExit(isDirty)
  
  const { complete, data: module } = useLessonContentFragment(contentId)

  usePageTitle({ 
    title: ``, 
    editable:  module?.title || 'Untitled module', 
    onEdit: title => {
      updateLesson(contentId)({title})
    }
  })

  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: contentId, __typename: "ContentItem", },
  });

  useEffect(() => {
    console.log('somethingchanged')
    if(module.itemType === 'quiz') {
      quiz?.questions && useQuizStore.setState({
        questions: quiz?.questions || []
      })
    } else {
      module?.content && setBlocks(module.content.blocks || [])
    }
  },[module, quiz, contentId])

  const component = useMemo(() => (
    module.itemType === 'quiz' ? (
      <QuizEditor id={contentId} />
    ) : module.contentType === 'scorm_assessment' ? (
      <ScormView isEditing={true} />
    ) : (
      <BlockEditor />
  )),[module.contentType,module.itemType])

  return component
}

export default ModuleEditor