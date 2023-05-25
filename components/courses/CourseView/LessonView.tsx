import { Block } from "../../common/ContentEditor/Block";
import { useRouter } from "../../../utils/router";
import usePageTitle from "../../../hooks/usePageTitle";
import { useBlockStore } from "../../common/ContentEditor/useBlockStore";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import {Tick} from '@styled-icons/typicons/Tick'
import Button from "../../common/Button";
import useMarkComplete from "../../../hooks/courses/useMarkComplete";
import { useCallback } from "react";
import usePreviousAndNextIds from "./usePreviousAndNextIds";

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

  const goTo = id => {
    router.push({
      pathname: `/course`,
      query: {
        ...router.query,
        cid: id
      }
    })
  }

  const { next } = usePreviousAndNextIds()

  const { markComplete } = useMarkComplete(lessonId)
  const handleMarkComplete = useCallback(() => {
    markComplete({progress:100})
    !!next && goTo(next)
  }, [markComplete, next])

  return (
    <>
      <div className="w-full flex flex-col">
        {blocks && blocks.map(block => (
          <Block block={block} key={block.id} />
          ))}
      </div>
      <div className={`flex flex-col items-center`}>
        <Button onClick={handleMarkComplete}>
          <span className='flex items-center xl:space-x-2'>
            <span className="hidden xl:block">Mark Complete</span>
            <Tick className='h-8'/>
          </span>
        </Button>
      </div>
    </>
  )
}

export default LessonView