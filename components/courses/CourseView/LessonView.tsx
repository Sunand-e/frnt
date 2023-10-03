import { Block } from "../../common/ContentEditor/Block"
import { useRouter } from "../../../utils/router"
import usePageTitle from "../../../hooks/usePageTitle"
import { useBlockStore } from "../../common/ContentEditor/useBlockStore"
import useGetUserCourse from "../../../hooks/users/useGetUserCourse"
import {ArrowSmRight} from '@styled-icons/heroicons-solid/ArrowSmRight'
import Button from "../../common/Button"
import useMarkComplete from "../../../hooks/courses/useMarkComplete"
import { useCallback, useEffect, useLayoutEffect, useRef } from "react"
import usePreviousAndNextIds from "./usePreviousAndNextIds"
import PrevNextButtons from "./PrevNextButtons"
import { useEditorViewStore } from "../../common/ContentEditor/useEditorViewStore"
import { getScrollParent } from "../../../utils/getScrollParent"

const LessonView = () => {

  const blocks = useBlockStore(state => state.blocks)
  const canvasRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { id, cid: lessonId } = router.query
  const { lessons } = useGetUserCourse(id)
  
  const lesson = lessons?.edges.find(edge => (
    edge.node.id === lessonId
  ))

  usePageTitle({
    title: lesson ? (lesson.node.title || 'Untitled lesson') : ''
  })

  useEffect(() => {
    useEditorViewStore.setState({
      activeSidebarPanel: 'blocks'
    })
    canvasRef.current?.scrollIntoView()
  }, [id])

  return (
    <>
      <div className="w-full flex flex-col" ref={canvasRef}>
        {blocks && blocks.map(block => (
          <Block block={block} key={block.id} />
          ))}
      </div>
      <div className={`flex flex-col items-center pt-8 pb-14`}>
        <PrevNextButtons
          showPrevious={false}
        />
      </div>
    </>
  )
}

export default LessonView