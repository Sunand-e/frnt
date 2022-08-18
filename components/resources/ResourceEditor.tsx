
import { useReactiveVar } from "@apollo/client"
import { currentContentItemVar } from "../../../graphql/cache"
import { useEffect } from "react";
import BlockEditor from "../../ContentEditor/BlockEditor";
import { ContentTitle } from "../../ContentEditor/ContentTitle";
import useResource from "../../../hooks/resources/useResource";
import { useRouter } from "next/router";

const ResourceEditor = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar)
  const { id } = currentContentItem

  const router = useRouter()
  
  // const { id } = router.query

  const {
    resource,
    updateResource
  } = useResource(id)

  /* REFACTOR NEEDED */
  useEffect(() => {
    const { id } = router.query;
    if(id) {
      currentContentItemVar({
        id,
        type: 'libraryItem',
        updateFunction: updateResource(id)
      })  
    }
    return () => {
      currentContentItemVar({
        id: null,
        updateFunction:null,
        type:null
      })
    }
  },[router.query.id])


  return (
    <>
      { resource && (
        <>
        <ContentTitle />
        <BlockEditor />
      </>
      ) }
    </>
  )
}

export default ResourceEditor