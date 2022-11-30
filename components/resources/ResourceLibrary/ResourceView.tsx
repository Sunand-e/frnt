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
import { Download } from '@styled-icons/boxicons-regular/Download'
import {Tick} from '@styled-icons/typicons/Tick'
import { ExternalLinkOutline } from '@styled-icons/evaicons-outline/ExternalLinkOutline'
import useUpdateUserContentStatus from "../../../hooks/users/useUpdateUserContentStatus";
import { useRouter } from "../../../utils/router";
import useGetUserPathway from "../../../hooks/users/useGetUserPathway";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Dot } from '../../common/misc/Dot';

const ResourceView = ({id}) => {

  // const {
  //   resource: resource,
  //   loading,
  //   error,
  // } = useGetResource(id)

  const router = useRouter()
  const { pid } = router.query;

  const { loading, error, resources } = useGetCurrentUser()

  const resourceEdge = resources?.edges.find(edge => edge.node.id === id)
  const resource = resourceEdge?.node

  const currentContentItem = useReactiveVar(currentContentItemVar)
  usePageTitle({ title: resource?.title ? `Resource Library: ${resource.title}` : 'Resource Library' })

  useEffect(() => {
    currentContentItemVar({
      ...currentContentItem,
      id
    })
  },[id])
  
  const createDescriptionMarkup = useCallback(() => {
    return {__html: resource?.content?.description};
  },[resource])
  
  let resourceComponent = useMemo(() => {
    switch(resource?.contentType) {
      case 'document': {
        return <DocumentItem pdfPreview={true} file={resource.document} />
      }
      case 'video':
        return <VideoItem url={resource.content?.url} />
      case 'image':
        return <ImageItem image={resource.image}  />
      case 'audio':
        return <AudioPlayer url={resource.audio.location} />
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
              <Download className="h-8 p-1" />
              <span>
                Download {resource?.contentType} file
              </span>
            </span>
          </Button>
        )
      case 'link':
        return (
          <ButtonLink target="_blank" className="mb-8" href={resource?.content?.url}>
            <span className="flex space-x-2 items-center">
              <ExternalLinkOutline className="h-8 p-1" />
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

  
  const { updateUserContentStatus } = useUpdateUserContentStatus()

  const markComplete = useCallback(() => {
    updateUserContentStatus({
      contentItemId: id,
      score: 100,
      status: 'completed'
    }, resource.id)
    router.push({
      pathname: `/pathway`,
      query: { pid }
    })
  }, [resource])
  
  
  console.log('resource?.type')
  console.log(resource?.contentType)
  return (
    <div className="w-full flex flex-col">
      { resource ? (
        <div className="w-full max-w-screen-lg self-center flex flex-col">
          <h1 className="mt-3 mb-8">
            { resource.title }
          </h1>

          <div className="mt-3 mb-8" dangerouslySetInnerHTML={createDescriptionMarkup()} />
          
          { resourceComponent }
          <div className="mt-10 flex flex-col md:flex-row space-x-4 self-center">
            { resourceActionButton }
            { pid ? (
              <>
                <ButtonLink href={{
                  pathname: `/pathway`,
                  query: {
                    pid
                  }
                }}>
                  <span className='flex items-center space-x-2'>
                    <span>Back to pathway</span>
                    <ArrowBack className="h-8 p-1" />
                  </span>
                </ButtonLink>
                { (resource?.status !== 'completed') && (
                  <Button onClick={markComplete}>
                    <span className='flex items-center space-x-2'>
                      <span>Mark Complete</span>
                      <Tick className="h-8" />
                    </span>
                  </Button>
                )}
              </>
            ) : (
              <Button className="mb-8" onClick={() => router.push('/resources')}>
                <span className='flex items-center space-x-2'>
                  <span>Back to Resource Library</span>
                  <ArrowBack className='h-7'/>
                </span>
                
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          { loading && <LoadingSpinner text={(
            <>
              Loading resources
              <Dot>.</Dot>
              <Dot>.</Dot>
              <Dot>.</Dot>
            </>
          )} /> }
          { error && (
            <p>Unable to fetch resourses.</p>
          )}
        </>
      )}
    </div>
  )
}

export default ResourceView