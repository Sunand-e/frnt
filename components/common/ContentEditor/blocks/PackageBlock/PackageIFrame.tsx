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
import { markCompleteDisabledVar } from '../../../../../graphql/cache';

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

  const { id:courseId } = router.query

  const [upsertScoAttempt, upsertScoAttemptResponse] = useMutation(
    UPSERT_SCO_ATTEMPT
  );

  const { loading, data: attemptQueryData, error } = useQuery(
    GET_LATEST_SCO_ATTEMPT,
    {
      variables: {
        scormModuleId: block.properties.moduleId,
        courseId
      }
    }
  );
  
  const apiRef = useRef(null)

  const saveData = useCallback((scormData) => {
    if(!scormData?.cmi) return;
    if(['completed', 'passed'].includes(scormData.cmi.core.lesson_status)) {
      markCompleteDisabledVar(false)
    }
    upsertScoAttempt({
      variables: {
        attempt,
        contentItemId: courseId,
        scormModuleId: block.properties.moduleId,
        data: scormData,
      }
    }).then(res => {
      console.log('res')
      console.log(res)
    })
  },[attempt, attemptQueryData])

  const unloadHandler = () => {
    // console.log('%c SCORMunloadHandler', 'background: #222; color: #bada55');
    // if (!unloaded && !API.isTerminated()) {
    //   API.LMSSetValue('cmi.core.exit', 'suspend'); //Set exit to whatever is needed
    //   API.LMSCommit(''); //save all data that has already been set
    //   API.LMSTerminate(''); //close the SCORM API connection properly
    //   setUnloaded(true);
    // }
  }


  const initialiseAPI = useCallback(() => {
    ScormAgain;
    const settings = {
      // lmsCommitUrl: '/d'
    }

    if(!window.API && attemptQueryData) {
      const API = apiRef.current = window.API = new window.Scorm12API(settings);

      API.on('LMSSetValue.cmi.*', function(CMIElement, value) {
        API.storeData(true);

        const scormData = API.renderCommitCMI(true)

        if(CMIElement === 'cmi.core.exit' && value==='suspend') {
        } else {
          document.querySelector('#debug_panel').innerHTML = '<pre>'+JSON.stringify(scormData,null,2)+'</pre>'
        }

        !isEditing && saveData(scormData)
  
      });

      API.loadFromJSON(attemptQueryData?.latestScoAttempt?.data, '')
  
      window.addEventListener('beforeunload', unloadHandler)
      window.addEventListener('unload', unloadHandler)

      setLoaded(true)
    }
  },[attempt, saveData, attemptQueryData])


  useEffect(() => {
    initialiseAPI()
    return () => {
      window.API = apiRef.current = null
      unloadHandler()
      window.removeEventListener('beforeunload', unloadHandler)
      window.removeEventListener('unload', unloadHandler)
    }
  },[initialiseAPI])

  
  useEffect(() => {
    if(attemptQueryData) {
      setAttempt(attemptQueryData?.latestScoAttempt?.attempt ?? 1)
      attemptQueryData.latestScoAttempt?.data && apiRef.current.loadFromJSON(attemptQueryData.latestScoAttempt?.data?.cmi)
    }
  },[attemptQueryData])

  return (
    <>
      {/* <iframe width="100%" height="100%" src={properties.url}></iframe> */}
    {/* <iframe src="/scorm/rise-quiz/scormdriver/indexAPI.html?moduleId=abcdef-123456&contentItemId=1234-5678"></iframe> */}
    {/* <Button onClick={reload}>Start new attempt</Button> */}
    { loaded ? (
      <iframe key={`${block.id}--${attempt}`} ref={ref} src={block.properties?.url}></iframe>
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
