import { useEffect } from "react";
import { Block } from "../../common/ContentEditor/Block";
import { useRouter } from "../../../utils/router";
import usePageTitle from "../../../hooks/usePageTitle";
import useUpdateUserContentStatus from "../../../hooks/users/useUpdateUserContentStatus";
import { useBlockStore } from "../../common/ContentEditor/useBlockStore";
import { currentContentItemVar, markCompleteDisabledVar } from "../../../graphql/cache";
import { useReactiveVar } from "@apollo/client";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import useBlockEditor from "../../common/ContentEditor/useBlockEditor";

const LessonView = () => {
  
  const { updateUserContentStatus } = useUpdateUserContentStatus()
  const setBlocks = useBlockStore(state => state.setBlocks)
  const blocks = useBlockStore(state => state.blocks)

  const { id: lessonId } = useReactiveVar(currentContentItemVar)

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { lessons } = useGetUserCourse(id)
  
  const lesson = lessons?.edges.find(edge => (
    edge.node.id === lessonId
  ))

  usePageTitle({
    title: lesson ? (lesson.node.title || 'Untitled Lesson') : ''
  })

  useEffect(() => {
    if(lesson) {

      // Enable mark completion button
      const scormBlock = lesson?.node.content?.blocks?.find(block => block.type === 'package')
      markCompleteDisabledVar(!!scormBlock?.properties?.moduleId)      

      setBlocks(lesson.node.content.blocks)
      const currentStatus = lesson.status
      if(currentStatus !== 'completed') {
        updateUserContentStatus({
          contentItemId: lessonId,
          status: 'in_progress'
        }, id)
      }
    }
  },[lessonId])


  return (
    <div className="w-full flex flex-col">
      {blocks && 
        blocks.map((block, index) => (
          <Block block={block} key={index} />
        ))
      }
      {/* <PrevNextButtons /> */}
    </div>
  )
}

export default LessonView