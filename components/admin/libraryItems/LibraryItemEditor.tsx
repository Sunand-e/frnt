
import { useReactiveVar } from "@apollo/client"
import { currentContentItemVar } from "../../../graphql/cache"
import { useEffect } from "react";
import BlockEditor from "../../ContentEditor/BlockEditor";
import { ContentTitle } from "../../ContentEditor/ContentTitle";
import useLibraryItem from "../../../hooks/libraryItems/useLibraryItem";
import { useRouter } from "next/router";

const LibraryItemEditor = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar)
  const { id } = currentContentItem

  const router = useRouter()
  
  // const { id } = router.query

  const {
    libraryItem,
    updateLibraryItem
  } = useLibraryItem(id)

  /* REFACTOR NEEDED */
  useEffect(() => {
    const { id } = router.query;
    if(id) {
      currentContentItemVar({
        id,
        type: 'libraryItem',
        updateFunction: updateLibraryItem(id)
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
      { libraryItem && (
        <>
        <ContentTitle />
        <BlockEditor />
      </>
      ) }
    </>
  )
}

export default LibraryItemEditor