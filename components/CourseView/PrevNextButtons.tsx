import { useCallback, useEffect, useState } from "react";
import {ArrowSmRight} from '@styled-icons/heroicons-solid/ArrowSmRight'
import {ArrowSmLeft} from '@styled-icons/heroicons-solid/ArrowSmLeft'
import {ExitToApp} from '@styled-icons/material/ExitToApp'
import useGetCourse from "../../hooks/courses/useGetCourse";
import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";
import { useRouter } from "../../utils/router";
import Button from "../Button";

const PrevNextButtons = ({id}) => {

  const router = useRouter()
  const { id: courseId } = router.query

  const { updateUserContentStatus } = useUpdateUserContentStatus()

  /* Getting and setting the prev/next button lesson ids */
  const { loading, error, course } = useGetCourse(courseId)

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

  const nextLesson = useCallback(() => {
    updateUserContentStatus({
      contentItemId: id,
      score: 100,
      status: 'completed'
    })
    goToLesson(prevNextIds[1])
  }, [prevNextIds])
  

  return (
    <div className="mt-3 mb-8 w-full flex max-w-screen-lg self-center space-x-2">
    {/* { prevNextIds[0] && (
      <Button onClick={() => goToLesson(prevNextIds[0])}>
        <span className='flex items-center space-x-2'>
          <ArrowSmLeft className='h-8'/>
          <span>Previous lesson</span>
        </span>
      </Button>
    )} */}
    { prevNextIds[1] ? (
      <Button onClick={nextLesson}>
        <span className='flex items-center space-x-2'>
          <span>Next lesson</span>
          <ArrowSmRight className='h-8'/>
        </span>
      </Button>
    ) : (
      <Button onClick={() => {
        router.push({
          pathname: `/courses`,
        })
      }}>
        <span className='flex items-center space-x-2'>
          <span>Finish and exit</span>
          <ExitToApp className='h-8'/>
        </span>
      </Button>
    ) }
  </div>
  )
}

export default PrevNextButtons