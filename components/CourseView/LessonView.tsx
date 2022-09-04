import { useCallback, useEffect, useState } from "react";
import useGetLesson from "../../hooks/lessons/useGetLesson";
import { Block } from "../ContentEditor/Block";
import Button from "../Button";
import { useRouter } from "../../utils/router";
import PrevNextButtons from "./PrevNextButtons";
import usePageTitle from "../../hooks/usePageTitle";

import { useAutoAnimate } from '@formkit/auto-animate/react'
import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";
import { useBlockStore } from "../ContentEditor/useBlockStore";
import { currentContentItemVar } from "../../graphql/cache";
import { useReactiveVar } from "@apollo/client";

const LessonView = () => {

  const { updateUserContentStatus } = useUpdateUserContentStatus()
  const blocks = useBlockStore(state => state.blocks)

  const { id } = useReactiveVar(currentContentItemVar)

  const { lesson, loading, error } = useGetLesson(id)
  
  usePageTitle({title: lesson?.title})

  useEffect(() => {
    updateUserContentStatus({
      contentItemId: id,
      status: 'in_progress'
    })
  },[id])

  return (
    <div className="w-full flex flex-col">
      {blocks && 
        blocks.map((block, index) => (
          <Block block={block} key={index} />
        ))
      }
      <PrevNextButtons id={id} />
    </div>
  )
}

export default LessonView