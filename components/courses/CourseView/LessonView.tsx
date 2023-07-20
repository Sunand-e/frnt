import { Block } from "../../common/ContentEditor/Block"
import { useRouter } from "../../../utils/router"
import usePageTitle from "../../../hooks/usePageTitle"
import { useBlockStore } from "../../common/ContentEditor/useBlockStore"
import useGetUserCourse from "../../../hooks/users/useGetUserCourse"
import {ArrowSmRight} from '@styled-icons/heroicons-solid/ArrowSmRight'
import Button from "../../common/Button"
import useMarkComplete from "../../../hooks/courses/useMarkComplete"
import { useCallback } from "react"
import usePreviousAndNextIds from "./usePreviousAndNextIds"
import PrevNextButtons from "./PrevNextButtons"

const LessonView = () => {

  const blocks = useBlockStore(state => state.blocks)

  const router = useRouter()
  const { id, cid: lessonId } = router.query
  const { lessons } = useGetUserCourse(id)
  
  const lesson = lessons?.edges.find(edge => (
    edge.node.id === lessonId
  ))

  usePageTitle({
    title: lesson ? (lesson.node.title || 'Untitled lesson') : ''
  })

  return (
    <>
      <div className="w-full flex flex-col">
        {blocks && blocks.map(block => (
          <Block block={block} key={block.id} />
          ))}
      </div>
      <div className={`flex flex-col items-center`}>
        <PrevNextButtons
          showPrevious={false}
        />
      </div>
    </>
  )
}

export default LessonView