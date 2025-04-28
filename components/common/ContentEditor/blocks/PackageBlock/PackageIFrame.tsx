import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import ScormAgain from 'scorm-again'
import { useMutation, useQuery } from '@apollo/client';
import { UPSERT_SCO_ATTEMPT, GET_LATEST_SCO_ATTEMPT } from '../../../../../graphql/queries/scoAttempts';
import { useRouter } from '../../../../../utils/router';
import LoadingSpinner from '../../../LoadingSpinner';
import useUpdateUserContentStatus from '../../../../../hooks/users/useUpdateUserContentStatus';
import { useFullscreen } from 'rooks';
import Button from '../../../Button';
import { Fullscreen } from '@styled-icons/boxicons-regular/Fullscreen'
import useMarkComplete from '../../../../../hooks/courses/useMarkComplete';

declare global {
  interface Window {
    API:any;
    Scorm12API:any;
  }
}

interface IFrameWithRefProps {
  iframeRef?: MutableRefObject<HTMLIFrameElement>
}
export const IFrameWithRef = ({ iframeRef, ...props }:IFrameWithRefProps) => {
  return <PackageIFrame {...props} ref={iframeRef} />;
}

export const PackageIFrame = React.forwardRef<HTMLIFrameElement>(({
  block,
  isEditing=false,
  setAttempt = () => null,
  attempt
}, ref) => {

  const [loaded, setLoaded] = useState(false)
  
  const router = useRouter()
  const { id: courseId, cid: moduleId } = router.query

  const [upsertScoAttempt] = useMutation(
    UPSERT_SCO_ATTEMPT
  );
  const { updateUserContentStatus } = useUpdateUserContentStatus()

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if(progress) {
      updateUserContentStatus({
        contentItemId: moduleId,
        progress: progress
      })
    }
  },[progress])

  const { loading, data: attemptQueryData, error } = useQuery(
    GET_LATEST_SCO_ATTEMPT,
    {
      variables: {
        scormPackageId: block.properties.moduleId,
        courseId
      }
    }
  );
  
  const apiRef = useRef(null)
  const statusRef = useRef(null)

  const { markComplete } = useMarkComplete(moduleId)

  const saveData = (scormData) => {
    if(!scormData?.cmi) {
      return;
    }

    if(statusRef.current !== 'completed') {
      if(['completed', 'passed'].includes(scormData.cmi.core.lesson_status)) {
        statusRef.current = 'completed'
        markComplete({progress: 100})
      }
    }

    // Check if the course is authored in Rise
    const contentWindow = ref.current?.contentWindow
    let riseProgress = contentWindow.getRiseProgress?.();
    
    if(!riseProgress && contentWindow) {
      const contentFrameWindowProgressFn = contentWindow.document.getElementById('content-frame')?.contentWindow?.Runtime?.getProgress

      riseProgress = contentFrameWindowProgressFn ? contentFrameWindowProgressFn() : null
    }
    riseProgress?.p && setProgress(riseProgress.p)

    // Check if the course is authored in Storyline
    if (typeof ref.current?.contentWindow.GetPlayer === "function") {
      const storylinePlayer = ref.current?.contentWindow.GetPlayer()
      if(storylinePlayer !== null) {
        const storylineProgress = storylinePlayer.getVar('Progresscourse')
        !!storylineProgress && setProgress(storylineProgress)
      }
    }

    upsertScoAttempt({
      variables: {
        attempt,
        contentItemId: courseId,
        scormPackageId: block.properties.moduleId,
        data: scormData,
      },
      update(cache, response, request ) {
        cache.updateQuery({ 
          query: GET_LATEST_SCO_ATTEMPT,
          variables: {
            scormPackageId: block.properties.moduleId,
            courseId
          }
         }, (data) => {
          if(!data?.latestScoAttempt) {
            return ({
              latestScoAttempt: response.data.upsertScoAttempt
            })
          }
        });
      }
    }).then(res => {
    })
  }

  // Initialise API
  useEffect(() => {
    ScormAgain;

    if(!window.API && attemptQueryData) {
      const API = apiRef.current = window.API = new window.Scorm12API({});

      API.clear('LMSSetValue.cmi.*')
      API.on('LMSSetValue.cmi.*', (CMIElement, value) => {
        API.storeData(true);
        const scormData = API.renderCommitCMI(true)
        !isEditing && saveData(scormData)
      });

      API.loadFromJSON(attemptQueryData?.latestScoAttempt?.data, '')
      setLoaded(true)
    }

    return () => {
      window.API = apiRef.current = null
    }

  },[attempt, saveData, attemptQueryData])

  
  useEffect(() => {
    if(attemptQueryData) {
      setAttempt(attemptQueryData?.latestScoAttempt?.attempt ?? 1)
      attemptQueryData.latestScoAttempt?.data && apiRef.current.loadFromJSON(attemptQueryData.latestScoAttempt?.data?.cmi)
    }
  },[attemptQueryData])
  
  const {
    isFullscreenAvailable,
    toggleFullscreen
  } = useFullscreen({target: ref})

  return (
    <>
      { loaded ? (
        <div className='relative w-full h-full'>
          <iframe
            className="w-full h-full"
            key={`${block.id}--${attempt}`}
            ref={ref}
            src={block.properties?.url}
          ></iframe>
          <div className='absolute top-3 right-7'>
            { isFullscreenAvailable && (
              <Button onClick={toggleFullscreen}>
                <span className='flex items-center xl:space-x-2'>
                  <Fullscreen className='h-6'/>
                  <span className="hidden xl:block">Full Screen</span>
                </span>
              </Button>
            )}
          </div>
        </div>
        ) : (
        <div className='flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}
    </>
  )
})

export default React.memo(IFrameWithRef)
