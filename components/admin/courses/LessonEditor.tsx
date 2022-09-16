import { useReactiveVar } from "@apollo/client"
import { currentContentItemVar } from "../../../graphql/cache"
import { useEffect } from "react";
import BlockEditor from "../../ContentEditor/BlockEditor";
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