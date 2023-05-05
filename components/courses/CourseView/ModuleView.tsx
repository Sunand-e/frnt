import { useEffect } from "react";
import { Block } from "../../common/ContentEditor/Block";
import { useRouter } from "../../../utils/router";
import usePageTitle from "../../../hooks/usePageTitle";
import useUpdateUserContentStatus from "../../../hooks/users/useUpdateUserContentStatus";
import { useBlockStore } from "../../common/ContentEditor/useBlockStore";
import { markCompleteDisabledVar } from "../../../graphql/cache";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import ScormView from "../scorm/ScormView";
import QuizView from "../../quiz/QuizView";

const ModuleView = () => {
  
  const { updateUserContentStatus } = useUpdateUserContentStatus()
  const store = useBlockStore()
  const setBlocks = useBlockStore(state => state.setBlocks)
  const blocks = useBlockStore(state => state.blocks)

  const router = useRouter()
  const { id, cid: moduleId } = router.query
  const { modules } = useGetUserCourse(id)
  
  const module = modules?.edges.find(edge => (
    edge.node.id === moduleId
  ))

  usePageTitle({
    title: module ? (module.node.title || 'Untitled module') : ''
  })

  useEffect(() => {
    if(module) {

      // Enable mark completion button
      const scormBlock = module?.node.content?.blocks?.find(block => block.type === 'package')
      markCompleteDisabledVar(!!scormBlock?.properties?.moduleId)      

      setBlocks(module.node.content.blocks)
      const currentStatus = module.status
      if(currentStatus !== 'completed') {
        updateUserContentStatus({
          contentItemId: moduleId,
          status: 'in_progress'
        }, id)
      }
    }
  },[moduleId])


  return (
    <>
      { module?.node?.itemType === 'quiz' ? (
        <QuizView />
      ) : module?.node?.contentType === 'scorm_assessment' ? (
        <ScormView />
      ) : (
        <div className="w-full flex flex-col">
          {blocks && 
            blocks.map((block, index) => (
              <Block block={block} key={index+'view'} />
            ))
          }
          {/* <PrevNextButtons /> */}
        </div>
      )}
    </>
  )
}

export default ModuleView