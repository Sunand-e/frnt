import { useFragment_experimental } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { QuizFragment } from "../../graphql/queries/allQueries";
import { useLessonContentFragment } from "../../hooks/lessons/useLessonContentFragment";
import { useRouter } from "../../utils/router";
import BlockEditor from "../common/ContentEditor/BlockEditor";
import { useBlockStore } from "../common/ContentEditor/useBlockStore";
import { useEditorViewStore } from "../common/ContentEditor/useEditorViewStore";
import QuizEditor from "../quiz/QuizEditor";
import { resetQuizStore, useQuizStore } from "../quiz/useQuizStore";
import ScormModuleEditor from "./scorm/ScormModuleEditor";

const ModuleEditor = () => {

  const router = useRouter()
  const { cid: contentId } = router.query

  const setBlocks = useBlockStore(state => state.setBlocks)

  const { complete, data: module } = useLessonContentFragment(contentId)

  const moduleTypeName = module ? module.itemType === 'quiz' ? 'quiz' : module.contentType : null

  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: contentId, __typename: "ContentItem", },
  });

  useEffect(() => {
    if(module.itemType === 'quiz') {
      quiz?.questions && useQuizStore.setState({
        questions: quiz?.questions || []
      })
    } else {
      module?.content && setBlocks(module.content.blocks || [])
    }
    
    // let activeSidebarPanel = null
    // switch(moduleTypeName) {
    //   case 'standard_lesson':
    //     activeSidebarPanel = 'blocks'
    //     break;
    //   case 'quiz':
    //     activeSidebarPanel = 'questions'
    //     break;
    // }
    // useEditorViewStore.setState({activeSidebarPanel})
    
  },[module, quiz, contentId])

  useEffect(() => {
    return () => {
      resetQuizStore()
    }
  },[])

  const component = useMemo(() => (
    module.itemType === 'quiz' ? (
      <QuizEditor key={contentId} />
    ) : module.contentType === 'scorm_assessment' ? (
      <ScormModuleEditor />
    ) : (
      <BlockEditor />
  )),[module])

  return component
}

export default ModuleEditor