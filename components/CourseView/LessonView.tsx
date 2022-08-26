import { useCallback, useEffect, useState } from "react";
import useGetLesson from "../../hooks/lessons/useGetLesson";
import { Block } from "../ContentEditor/Block";
import Button from "../Button";
import { useRouter } from "../../utils/router";
import PrevNextButtons from "./PrevNextButtons";
import usePageTitle from "../../hooks/usePageTitle";

import { useAutoAnimate } from '@formkit/auto-animate/react'
import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";
const LessonView = ({id}) => {

  const { updateUserContentStatus } = useUpdateUserContentStatus()
  const router = useRouter()

  const { id: courseId } = router.query

  const {
    lesson,
    loading,
    error,
  } = useGetLesson(id)

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