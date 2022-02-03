import { UPDATE_LESSON } from "../../graphql/mutations/lesson/UPDATE_LESSON"
import { UpdateLesson, UpdateLessonVariables } from "../../graphql/mutations/lesson/__generated__/UpdateLesson"
import { ContentFragment, GET_LESSON } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache, { currentContentItemVar } from "../../graphql/cache"
import { useContext, useEffect, useRef, useState } from "react";
// import { ContentContext } from "../../context/contentContext";
import { useDebouncedCallback } from "use-debounce";
import BlockEditor from "../ContentEditor/BlockEditor";
import { ContentTitle } from "../ContentEditor/ContentTitle";
import useGetLesson from "../../hooks/lessons/useGetLesson";
import { Block } from "../ContentEditor/Block";
const LessonView = ({id}) => {

  const {
    lesson,
    loading,
    error,
  } = useGetLesson(id)
  
  currentContentItemVar({
    ...lesson,
  })
  return (
    <>
      <h1 className="mt-3 mb-8 w-full max-w-screen-lg">
        { lesson.title }
      </h1>
        {lesson?.content?.blocks && 
          lesson.content.blocks.map(block => (
            <Block block={block} />
          ))
        }
      <pre>
      {JSON.stringify(lesson.content.blocks,null,2)}
      </pre>
    </>
  )
}

export default LessonView