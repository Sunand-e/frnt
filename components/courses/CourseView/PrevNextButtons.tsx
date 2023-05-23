import { useCallback, useEffect, useState } from "react";
import {Tick} from '@styled-icons/typicons/Tick'
import {ArrowSmRight} from '@styled-icons/heroicons-solid/ArrowSmRight'
import {ArrowSmLeft} from '@styled-icons/heroicons-solid/ArrowSmLeft'
import { useRouter } from "../../../utils/router";
import Button from "../../common/Button";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import useMarkComplete from "../../../hooks/courses/useMarkComplete";
import usePreviousAndNextIds from "./usePreviousAndNextIds";

const PrevNextButtons = () => {

  const router = useRouter()
  const { id: courseId, cid: moduleId } = router.query
  
  const { previous, next } = usePreviousAndNextIds()

  const goTo = id => {
    router.push({
      pathname: `/course`,
      query: {
        ...router.query,
        cid: id
      }
    })
  }

  const { markComplete, disabled } = useMarkComplete(moduleId, courseId)
  // const handleMarkComplete = useCallback(() => {
  //   markComplete()
  //   !!prevNextIds[1] && goTo(prevNextIds[1])
  // }, [markComplete, prevNextIds])

  return (
    // <div className="mt-3 mb-8 w-full flex max-w-screen-lg self-center space-x-2">
    <>
    { previous && (
      <Button onClick={() => goTo(previous)}>
        <span className='flex items-center xl:space-x-2'>
          <span className="hidden xl:block">Previous</span>
          <ArrowSmLeft className='h-8'/>
        </span>
      </Button>
    )}
    { next && (
      <Button onClick={() => goTo(next)}>
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