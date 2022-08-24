import { UPDATE_LESSON } from "../../graphql/mutations/lesson/UPDATE_LESSON"
import { UpdateLesson, UpdateLessonVariables } from "../../graphql/mutations/lesson/__generated__/UpdateLesson"
import { ContentFragment, GET_LESSON } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache, { currentContentItemVar } from "../../graphql/cache"
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
// import { ContentContext } from "../../context/contentContext";
import { useDebouncedCallback } from "use-debounce";
import BlockEditor from "../ContentEditor/BlockEditor";
import { ContentTitle } from "../ContentEditor/ContentTitle";
import useGetLib from "../../hooks/lessons/useGetLesson";
import { Block } from "../ContentEditor/Block";
import useGetResource from "../../hooks/resources/useGetResource";
import usePageTitle from "../../hooks/usePageTitle";
import DocumentItem from "../ContentEditor/blocks/DocumentBlock/DocumentItem";
import VideoItem from "../resources/display/VideoItem";
import ImageItem from "../resources/display/ImageItem";
import AudioPlayer from "../common/audio/AudioPlayer";
import LinkPreview from "../common/LinkPreview";
import ButtonLink from "../ButtonLink";
import Button from "../Button";
import { useRouter } from "next/router";
const ResourceView = ({id}) => {

  const {
    libraryItem: resource,
    loading,
    error,
  } = useGetResource(id)

  const router = useRouter()

  const currentContentItem = useReactiveVar(currentContentItemVar) 

  usePageTitle({ title: `Library: ${resource?.title}` })

  useEffect(() => {
    currentContentItemVar({
      ...currentContentItem,
      id
    })
  },[id])
  
  const createDescriptionMarkup = useCallback(() => {
    return {__html: resource.content?.description};
  },[resource])
  
  let resourceComponent = useMemo(() => {
    switch(resource?.contentType) {
      case 'document':
        return <DocumentItem pdfPreview={true} file={resource.mediaItem} />
      case 'video':
        return <VideoItem url={resource.content?.url} />
        case 'image':
        return <ImageItem image={resource.mediaItem}  />
        case 'audio':
        return <AudioPlayer url={resource.mediaItem.location} />
        case 'link':
        return <LinkPreview url={resource.content?.url} />
      default:
        return <></>
      }
  },[resource])


  console.log('resource?.type')
  console.log(resource?.contentType)
  return (
    <div className="w-full flex flex-col">
      { resource && (
        <div className="w-full max-w-screen-lg self-center flex flex-col">
          <h1 className="mt-3 mb-8">
            { resource.title }
          </h1>

          <div className="mt-3 mb-8" dangerouslySetInnerHTML={createDescriptionMarkup()} />
          
          { resourceComponent }
          <Button className="mt-3 mb-8 self-center" onClick={() => router.push('/resources')}>Back to Resource Library</Button>
        </div>
      )}
    </div>
  )
}

export default ResourceView