import { useCallback, useEffect, useState } from "react";
import {ArrowSmRight} from '@styled-icons/heroicons-solid/ArrowSmRight'
import useGetCourse from '../../hooks/courses/useGetCourse'
import useGetLesson from "../../hooks/lessons/useGetLesson";
import { Block } from "../ContentEditor/Block";
import Button from "../Button";
import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";
import { useRouter } from "../../utils/router";
import PrevNextButtons from "./PrevNextButtons";
import usePageTitle from "../../hooks/usePageTitle";

import { useAutoAnimate } from '@formkit/auto-animate/react'
const LessonView = ({id}) => {

  const router = useRouter()

  const { id: courseId } = router.query

  const {
    lesson,
    loading,
    error,
  } = useGetLesson(id)
  
  const { updateUserContentStatus } = useUpdateUserContentStatus()

  useEffect(() => {
    updateUserContentStatus({
      contentItemId: id,
      status: 'in_progress'
    })
  },[id])
usePageTitle({title: lesson.title})
  return (
    <div className="w-full flex flex-col">
      {lesson?.content?.blocks && 
        lesson.content.blocks.map((block, index) => (
          <Block block={block} key={index} />
        ))
      }
      <PrevNextButtons id={id} />
    </div>
  )
}

export default LessonView