import { useEffect } from "react";
import { Block } from "../ContentEditor/Block";
import { useRouter } from "../../utils/router";
import usePageTitle from "../../hooks/usePageTitle";

import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";
import { useBlockStore } from "../ContentEditor/useBlockStore";
import { currentContentItemVar } from "../../graphql/cache";
import { useReactiveVar } from "@apollo/client";
import useGetUserContent from "../../hooks/users/useGetUserContent";
import useBlockEditor from "../ContentEditor/useBlockEditor";

const LessonView = () => {
  
  const { updateUserContentStatus } = useUpdateUserContentStatus()
  const setBlocks = useBlockStore(state => state.setBlocks)
  const blocks = useBlockStore(state => state.blocks)

  const { id: lessonId } = useReactiveVar(currentContentItemVar)

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { user } = useGetUserContent(id)
  
  const lesson = user?.lessons?.edges.find(edge => (
    edge.node.id === lessonId
  ))

  usePageTitle({
    title: lesson ? (lesson.node.title || 'Untitled Lesson') : ''
  })

  useEffect(() => {
    if(lesson) {
      setBlocks(lesson.content.blocks)
      const currentStatus = lesson.status
      if(currentStatus !== 'completed') {
        updateUserContentStatus({
          contentItemId: id,
          status: 'in_progress'
        })
      }
    }
  },[lesson, id])


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