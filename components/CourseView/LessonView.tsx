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
import useGetUserCourseLessons from "../../hooks/courses/useGetUserCourseLessons";
import useGetUserContent from "../../hooks/users/useGetUserContent";
import useBlockEditor from "../ContentEditor/useBlockEditor";

const LessonView = () => {

  const { updateUserContentStatus } = useUpdateUserContentStatus()
  const blocks = useBlockStore(state => state.blocks)

  const { id } = useReactiveVar(currentContentItemVar)

  const { lesson, loading, error } = useGetLesson(id)

  const { user } = useGetUserContent()
  
  usePageTitle({
    title: lesson ? (lesson?.title || 'Untitled Lesson') : ''
  })

  useEffect(() => {
    if(user) {
      const currentStatus = user.lessons.edges.find(edge => (
        edge.node.id === id
      )).status
      if(currentStatus !== 'completed') {
        updateUserContentStatus({
          contentItemId: id,
          status: 'in_progress'
        })
      }
    }
  },[user, id])

  const setBlocks = useBlockStore(state => state.setBlocks)

  const {getContent, content} = useBlockEditor()

  useEffect(() => {
    getContent()
  },[id])
  
  useEffect(() => {
    if(content) {
      setBlocks(content?.blocks || []);
    }
  }, [content])

  return (
    <div className="w-full flex flex-col">
      {blocks && 
        blocks.map((block, index) => (
          <Block block={block} key={index} />
        ))
      }
      {/* <PrevNextButtons /> */}
    </div>
  )
}

export default LessonView