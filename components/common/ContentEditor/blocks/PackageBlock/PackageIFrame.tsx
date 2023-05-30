import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ScormAgain from 'scorm-again'
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { UPSERT_SCO_ATTEMPT, GET_LATEST_SCO_ATTEMPT } from '../../../../../graphql/queries/scoAttempts';
import { useRouter } from '../../../../../utils/router';
import LoadingSpinner from '../../../LoadingSpinner';
import useUpdateUserContentStatus from '../../../../../hooks/users/useUpdateUserContentStatus';
import { useFullscreen } from 'rooks';
import Button from '../../../Button';
import { Fullscreen } from '@styled-icons/boxicons-regular/Fullscreen'
import useGetUserCourse from '../../../../../hooks/users/useGetUserCourse';
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

  const { lessons } = useGetUserCourse(courseId)
  
  const module = lessons?.edges.find(edge => (
    edge.node.id === moduleId
  ))


  const [upsertScoAttempt, upsertScoAttemptResponse] = useMutation(
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
        markComplete({})
      }
    }
    // }

    const riseProgress = ref.current?.contentWindow.getRiseProgress?.()
    riseProgress?.p && setProgress(riseProgress.p)

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

  const unloadHandler = () => {
    // console.log('%c SCORMunloadHandler', 'background: #222; color: #bada55');
    // if (!unloaded && !API.isTerminated()) {
    //   API.LMSSetValue('cmi.core.exit', 'suspend'); //Set exit to whatever is needed
    //   API.LMSCommit(''); //save all data that has already been set
    //   API.LMSTerminate(''); //close the SCORM API connection properly
    //   setUnloaded(true);
    // }
  }

  // Initialise API
  useEffect(() => {
    ScormAgain;
    
    const settings = {
      // lmsCommitUrl: '/d'
    }
    if(!window.API && attemptQueryData) {
    // if(attemptQueryData) {

      const API = apiRef.current = window.API = new window.Scorm12API(settings);

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
      // window.API && window.API.clear('LMSSetValue.cmi.*')
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
    isFullscreenEnabled,
    isFullscreenAvailable,
    toggleFullscreen
  } = useFullscreen({target: ref})

  return (
    <>
      { loaded ? (
        <div className='relative w-full h-full'>
          <iframe className="w-full h-full" key={`${block.id}--${attempt}`} ref={ref} src={block.properties?.url}></iframe>
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
    // <iframe width="100%" height="100%" src="/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html"></iframe>
  )
})

export default React.memo(IFrameWithRef)
