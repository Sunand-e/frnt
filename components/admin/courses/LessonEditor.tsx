import { UPDATE_LESSON } from "../../../graphql/mutations/lesson/UPDATE_LESSON"
import { UpdateLesson, UpdateLessonVariables } from "../../../graphql/mutations/lesson/__generated__/UpdateLesson"
import { ContentFragment, GET_LESSON } from "../../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache, { currentContentItemVar } from "../../../graphql/cache"
import { useContext, useEffect, useRef, useState } from "react";
// import { ContentContext } from "../../../context/contentContext";
import { useDebouncedCallback } from "use-debounce";
import BlockEditor from "../../ContentEditor/BlockEditor";
import EasyEdit, {Types} from 'react-easy-edit';
import { ContentTitle } from "../../ContentEditor/ContentTitle";
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson";
import { useRouter } from "next/router";
const LessonEditor = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar)
  const { id } = currentContentItem

  const router = useRouter()
  
  const {
    lesson,
    updateLesson
  } = useUpdateLesson(id)  

  /* REFACTOR NEEDED */
  useEffect(() => {
    if(router.query.cid) {
      currentContentItemVar({
        title: null,
        id: router.query.cid,
        type: 'lesson',
        updateFunction: updateLesson(router.query.cid)
      })
    }
    return () => {
      currentContentItemVar({
        title: null,
        id: null,
        updateFunction:null,
        type:null
      })
    }
  },[router.query.cid])

  return (
    <>
      { lesson && (
      <>
        <ContentTitle />
        <BlockEditor />
       
      </>
      ) }
    </>
  )
}

export default LessonEditor