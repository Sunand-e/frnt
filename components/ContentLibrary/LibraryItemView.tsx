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
import useGetLib from "../../hooks/lessons/useGetLesson";
import { Block } from "../ContentEditor/Block";
import useGetResource from "../../hooks/resources/useGetResource";
import usePageTitle from "../../hooks/usePageTitle";
const LibraryItemView = ({id}) => {

  const {
    libraryItem,
    loading,
    error,
  } = useGetResource(id)

  const currentContentItem = useReactiveVar(currentContentItemVar) 

  usePageTitle({ title: `Library: ${libraryItem?.title}` })

    useEffect(() => {
      currentContentItemVar({
        ...currentContentItem,
        id
      })
    },[id])
    
  return (
    <div className="w-full flex flex-col">
      { libraryItem && (
        <>
          <h1 className="mt-3 mb-8 w-full max-w-screen-lg self-center">
            { libraryItem.title }
          </h1>
          {libraryItem?.content?.blocks && 
            libraryItem.content.blocks.map(block => (
              <Block block={block} />
            ))
          }
        </>
      )}
    </div>
  )
}

export default LibraryItemView