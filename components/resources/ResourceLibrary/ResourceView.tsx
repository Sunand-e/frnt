import { useReactiveVar } from "@apollo/client"
import { currentContentItemVar } from "../../../graphql/cache"
import { useCallback, useEffect, useMemo } from "react";
import useGetResource from "../../../hooks/resources/useGetResource";
import usePageTitle from "../../../hooks/usePageTitle";
import DocumentItem from "../../common/ContentEditor/blocks/DocumentBlock/DocumentItem";
import VideoItem from "../display/VideoItem";
import ImageItem from "../display/ImageItem";
import AudioPlayer from "../../common/audio/AudioPlayer";
import LinkPreview from "../../common/LinkPreview";
import ButtonLink from "../../common/ButtonLink";
import Button from "../../common/Button";
import { useRouter } from "next/router";
import { Download } from '@styled-icons/boxicons-regular/Download'
import { ExternalLinkOutline } from '@styled-icons/evaicons-outline/ExternalLinkOutline'

const ResourceView = ({id}) => {

  const {
    libraryItem: resource,
    loading,
    error,
  } = useGetResource(id)

  const router = useRouter()
  const { pid } = router.query;
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
  
  let resourceActionButton = useMemo(() => {
    switch(resource?.contentType) {
      case 'document':
        case 'audio':
        return (
          <Button className="mb-8" onClick={() => router.push('/resources')}>
            <span className="flex space-x-4">
              <Download  width="20" />
              <span>
                Download {resource?.contentType} file
              </span>
            </span>
          </Button>
        )
      case 'link':
        return (
          <ButtonLink target="_blank" className="mb-8" href={resource.content?.url}>
            <span className="flex space-x-4">
              <ExternalLinkOutline  width="20" />
              <span>
                Visit link
              </span>
            </span>
          </ButtonLink>
        )
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
          <div className="mt-10 flex flex-col md:flex-row space-x-4 self-center">
            { resourceActionButton }
            { pid ? (
              <ButtonLink href={{
                pathname: `/pathway`,
                query: {
                  ...router.query,
                  pid
                }
              }}>Back to pathway</ButtonLink>
            ) : (
              <Button className="mb-8" onClick={() => router.push('/resources')}>
                Back to Resource Library
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceView