import { useCallback, useEffect, useState } from "react";
import {Tick} from '@styled-icons/typicons/Tick'
import {ArrowSmRight} from '@styled-icons/heroicons-solid/ArrowSmRight'
import {ArrowSmLeft} from '@styled-icons/heroicons-solid/ArrowSmLeft'
import {ExitToApp} from '@styled-icons/material/ExitToApp'
import useGetCourse from "../../hooks/courses/useGetCourse";
import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";
import { useRouter } from "../../utils/router";
import Button from "../Button";
import { useReactiveVar } from "@apollo/client";
import { currentContentItemVar } from "../../graphql/cache";
import useGetUserContent from "../../hooks/users/useGetUserContent";

const PrevNextButtons = () => {

  const router = useRouter()
  const { id: courseId } = router.query
  const { id } = useReactiveVar(currentContentItemVar)
  const { user } = useGetUserContent(id)
  const course = user?.courses.edges[0]?.node
  
  const { updateUserContentStatus } = useUpdateUserContentStatus()


  const [prevNextIds, setPrevNextIds] = useState([]);

  useEffect(() => {
    const orderedLessonIds = course?.sections.reduce((arr, section) => {
      return [...arr, ...section.children.map(lesson => lesson.id)]
    }, []);

    if(orderedLessonIds) {
      let prevId = orderedLessonIds[orderedLessonIds.indexOf(id) - 1]
      let nextId = orderedLessonIds[orderedLessonIds.indexOf(id) + 1]
      setPrevNextIds([prevId,nextId])
    }
  }, [id, course])


  const goToLesson = id => {
    router.push({
      pathname: `/course`,
      query: {
        ...router.query,
        cid: id
      }
    })
  }

  const markComplete = useCallback(() => {
    updateUserContentStatus({
      contentItemId: id,
      score: 100,
      status: 'completed'
    })
    !!prevNextIds[1] && goToLesson(prevNextIds[1])
  }, [prevNextIds])
  
  

  return (
    // <div className="mt-3 mb-8 w-full flex max-w-screen-lg self-center space-x-2">
    <>
    { prevNextIds[0] && (
      <Button onClick={() => goToLesson(prevNextIds[0])}>
        <span className='flex items-center space-x-2'>
          <span>Previous</span>
          <ArrowSmLeft className='h-8'/>
        </span>
      </Button>
    )}
    { prevNextIds[1] && (
      <Button onClick={() => goToLesson(prevNextIds[1])}>
        <span className='flex items-center space-x-2'>
          <span>Next</span>
          <ArrowSmRight className='h-8'/>
        </span>
      </Button>
    )}
    <Button onClick={markComplete}>
      <span className='flex items-center space-x-2'>
        <span>Mark Complete</span>
        <Tick className='h-8'/>
      </span>
    </Button>
  </>
  )
}

export default PrevNextButtons