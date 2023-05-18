import { useCallback, useEffect, useState } from "react";
import {Tick} from '@styled-icons/typicons/Tick'
import {ArrowSmRight} from '@styled-icons/heroicons-solid/ArrowSmRight'
import {ArrowSmLeft} from '@styled-icons/heroicons-solid/ArrowSmLeft'
import { useRouter } from "../../../utils/router";
import Button from "../../common/Button";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import useMarkComplete from "../../../hooks/courses/useMarkComplete";

const PrevNextButtons = () => {

  const router = useRouter()
  const { id: courseId, cid: moduleId } = router.query
  const { courses, modules } = useGetUserCourse(courseId)
  const course = courses?.edges[0]?.node
  const moduleEdge = modules?.edges.find(edge => (
    edge.node.id === moduleId
  ))
  const module = moduleEdge?.node

  const { markComplete, disabled } = useMarkComplete(moduleId, courseId)

  const [prevNextIds, setPrevNextIds] = useState([]);

  useEffect(() => {
    const orderedIds = course?.sections.reduce((arr, section) => {
      return [...arr, ...section.children.map(child => child.id)]
    }, []);

    if(orderedIds) {
      let prevId = orderedIds[orderedIds.indexOf(moduleId) - 1]
      let nextId = orderedIds[orderedIds.indexOf(moduleId) + 1]
      setPrevNextIds([prevId,nextId])
    }
  }, [moduleId, course])


  const goTo = id => {
    router.push({
      pathname: `/course`,
      query: {
        ...router.query,
        cid: id
      }
    })
  }

  const handleMarkComplete = useCallback(() => {
    markComplete()
    !!prevNextIds[1] && goTo(prevNextIds[1])
  }, [markComplete, prevNextIds])

  return (
    // <div className="mt-3 mb-8 w-full flex max-w-screen-lg self-center space-x-2">
    <>
    { prevNextIds[0] && (
      <Button onClick={() => goTo(prevNextIds[0])}>
        <span className='flex items-center xl:space-x-2'>
          <span className="hidden xl:block">Previous</span>
          <ArrowSmLeft className='h-8'/>
        </span>
      </Button>
    )}
    { prevNextIds[1] && (
      <Button onClick={() => goTo(prevNextIds[1])}>
        <span className='flex items-center xl:space-x-2'>
        <span className="hidden xl:block">Next</span>
          <ArrowSmRight className='h-8'/>
        </span>
      </Button>
    )}
    {/* { (module?.itemType!== 'quiz' && moduleEdge?.status !== 'completed') && (
      <Button disabled={disabled} onClick={handleMarkComplete}>
        <span className='flex items-center xl:space-x-2'>
          <span className="hidden xl:block">Mark Complete</span>
          <Tick className='h-8'/>
        </span>
      </Button>
    )} */}
  </>
  )
}

export default PrevNextButtons