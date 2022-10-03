import { gql, useFragment_experimental, useReactiveVar } from "@apollo/client"
import { currentContentItemVar } from "../../../graphql/cache"
import { useEffect } from "react";
import BlockEditor from "../../ContentEditor/BlockEditor";
import { ContentTitle } from "../../ContentEditor/ContentTitle";
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson";
import { useRouter } from "next/router";
import useGetLesson from "../../../hooks/lessons/useGetLesson";
import { useBlockStore } from "../../ContentEditor/useBlockStore";

const LessonContentFragment = gql`
  fragment LessonContentFragment on ContentItem {
    content
  }
`
const LessonEditor = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar)
  const { id } = currentContentItem

  const router = useRouter()
  
  const { updateLesson } = useUpdateLesson(id)

  const setBlocks = useBlockStore(state => state.setBlocks)

  const { complete, data } = useFragment_experimental({
    fragment: LessonContentFragment,
    from: {
      __typename: "ContentItem",
      id: id,
    },
  });

  useEffect(() => {
    data?.content && setBlocks(data.content.blocks || [])
  },[data])

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
      <ContentTitle />
      <BlockEditor />
    </>
  )
}

export default LessonEditor