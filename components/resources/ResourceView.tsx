import { useCallback, useEffect, useMemo } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import DocumentItem from "../common/ContentEditor/blocks/DocumentBlock/DocumentItem";
import VideoItem from "./display/VideoItem";
import ImageItem from "./display/ImageItem";
import AudioPlayer from "../common/audio/AudioPlayer";
import LinkPreview from "../common/LinkPreview";
import ButtonLink from "../common/ButtonLink";
import Button from "../common/Button";
import {Tick} from '@styled-icons/typicons/Tick'
import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";
import { useRouter } from "../../utils/router";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import LoadingSpinner from "../common/LoadingSpinner";
import { Dot } from '../common/misc/Dot';
import ResourceActionButton from "./ResourceActionButton";
import Editor from "../common/inputs/Editor";
import useGetResources from "../../hooks/resources/useGetResources";
import { GET_RESOURCES_FOR_LEARNER } from "../../graphql/queries/allQueries";

const ResourceView = ({id}) => {

  const router = useRouter()
  const { pid } = router.query;

  const { loading, error, resources } = useGetResources(GET_RESOURCES_FOR_LEARNER)

  const resourceEdge = resources?.edges.find(edge => edge.node.id === id)
  const resource = resourceEdge?.node

  usePageTitle({ title: resource?.title ? `Resource Library: ${resource.title}` : 'Resource Library' })

  let resourceComponent = useMemo(() => {
    switch(resource?.contentType) {
      case 'document': {
        return <DocumentItem pdfPreview={true} file={resource.document} removeable={true} />
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

  const showActionButton = ['document', 'audio', 'link'].includes(resource?.contentType)

  const { updateUserContentStatus } = useUpdateUserContentStatus()

  const markComplete = useCallback(() => {
    updateUserContentStatus({
      contentItemId: resource.id,
      progress: 100,
      status: 'completed'
    })
    router.push({
      pathname: `/pathway`,
      query: { pid }
    })
  }, [resource])

  return (
    <div className="w-full flex flex-col">
      { resource ? (
        <div className="w-full max-w-screen-lg self-center flex flex-col">
          <h1 className="mt-3 mb-8">
            { resource.title }
          </h1>
          <Editor
            editorClass="mt-3 mb-8"
            content={resource?.content?.description}
            editable={false}
          />
          { resourceComponent }
          <div className="mt-10 flex flex-col md:flex-row space-x-4 self-center">
            { !!resource && showActionButton && (
              <ResourceActionButton resource={resource} />
            )}
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
          { loading && <LoadingSpinner text="Loading resources" /> }
          { error && (
            <p>Unable to fetch resourses.</p>
          )}
        </>
      )}
    </div>
  )
}

export default ResourceView