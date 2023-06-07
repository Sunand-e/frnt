import { Fragment, useEffect } from "react";
import { useRouter } from "../../../utils/router";
import usePageTitle from "../../../hooks/usePageTitle";
import useUpdateUserContentStatus from "../../../hooks/users/useUpdateUserContentStatus";
import { useBlockStore } from "../../common/ContentEditor/useBlockStore";
import { markCompleteDisabledVar } from "../../../graphql/cache";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import ScormView from "../scorm/ScormView";
import QuizView from "../../quiz/QuizView";
import LessonView from "./LessonView";
import { moduleTypes } from "../moduleTypes";

const ModuleView = () => {
  
  const { updateUserContentStatus } = useUpdateUserContentStatus()
  const setBlocks = useBlockStore(state => state.setBlocks)

  const router = useRouter()
  const { id, cid: moduleId } = router.query
  const { modules } = useGetUserCourse(id)
  
  const module = modules?.edges.find(edge => (
    edge.node.id === moduleId
  ))

  const moduleTypeName = module?.node.itemType === 'quiz' ? 'quiz' : module?.node.contentType

  const moduleType = moduleTypes[moduleTypeName]

  usePageTitle({
    title: module ? (module.node.title || `Untitled ${moduleType.label}`) : ''
  })

  useEffect(() => {
    if(module) {
      setBlocks(module.node.content.blocks)
      const currentStatus = module.status
      if(currentStatus !== 'completed') {
        updateUserContentStatus({
          contentItemId: moduleId,
          status: 'in_progress'
        })
      }
    }
  },[moduleId])


  return (
    <Fragment key={module?.node?.id}>
      { module?.node?.itemType === 'quiz' ? (
        <QuizView />
      ) : module?.node?.contentType === 'scorm_assessment' ? (
        <ScormView />
        ) : (
        <LessonView />
      )}
    </Fragment>
  )
}

export default ModuleView