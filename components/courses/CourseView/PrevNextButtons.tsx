import {ArrowSmRight} from '@styled-icons/heroicons-solid/ArrowSmRight'
import {ArrowSmLeft} from '@styled-icons/heroicons-solid/ArrowSmLeft'
import { useRouter } from "../../../utils/router";
import Button from "../../common/Button";
import useMarkComplete from "../../../hooks/courses/useMarkComplete";
import usePreviousAndNextIds from "./usePreviousAndNextIds";
import useGetUserCourse from '../../../hooks/users/useGetUserCourse';
import { useCallback } from 'react';
import cache from '../../../graphql/cache';

const PrevNextButtons = ({
  showPrevious=true, 
  showNext=true,
  onClickNext=null,
}) => {
  
  const router = useRouter()
  
  const { completed, id: courseId, cid: moduleId } = router.query
  
  const { courses, modules } = useGetUserCourse(courseId)
  const courseEdge = courses?.edges[0]
  const moduleEdge = modules.edges.find(edge => edge.node.id === moduleId )
  
  const { prev, next, last } = usePreviousAndNextIds()
  const goTo = id => {
    router.push({
      pathname: `/course`,
      query: {
        ...router.query,
        cid: id
      }
    })
  }

  
  const { markComplete } = useMarkComplete(moduleId)

  
  const handleClickNext = useCallback(() => {
  
    !!onClickNext && onClickNext()

    if(moduleEdge?.status !== 'completed') {
      if(moduleEdge?.node.contentType !== 'scorm_assessment') {
        markComplete({progress:100})
      }
    }
    
    if(next) {
      goTo(next)
    } else {
      cache.evict({ fieldName: "certificates" });
      
      router.push({
        pathname: `/course`,
        query: {
          ...router.query,
          cid: null,
          completed: 1
        }
      })
    } 
  }, [moduleEdge, markComplete, next])

  const allExceptLast = modules.edges.filter(edge => edge.node.id !== moduleId )
  const allExceptLastCompleted = allExceptLast.every(edge => edge.status === 'completed')

  let isCurrentCompleted = false;
  if(moduleEdge?.node.contentType === 'standard_lesson' || moduleEdge?.status === 'completed') {
    isCurrentCompleted = true;
  }

  const showNextButton = (
    showNext && moduleId && (
      next || (
        allExceptLastCompleted && isCurrentCompleted
      )
    )
  )

  const showPrevButton = showPrevious && prev

  return (
    // <div className="mt-3 mb-8 w-full flex max-w-screen-lg self-center space-x-2">
    <>
    { showPrevButton && (
      <Button onClick={() => goTo(prev)}>
        <span className='flex items-center xl:space-x-2'>
          <span className="hidden xl:block">Previous</span>
          <ArrowSmLeft className='h-8'/>
        </span>
      </Button>
    )}
    { showNextButton && (
      <Button onClick={handleClickNext}>
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