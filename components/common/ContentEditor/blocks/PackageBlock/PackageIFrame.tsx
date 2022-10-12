import React, {
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

declare global {
  interface Window {
    API:any;
    Scorm12API:any;
  }
}

const USER_ID_FOR_SCORM = gql`
query GetUserDataForScorm {
  user {
    fullName
    id
  }
}
`
export const IFrameWithRef = ({ iframeRef, ...props }) => {
  return <PackageIFrame {...props} ref={iframeRef} />;
}

export const PackageIFrame = React.forwardRef(({
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

  const { loading, data, error } = useQuery(
    GET_LATEST_SCO_ATTEMPT,
    {
      variables: {
        scormModuleId: block.properties.moduleId,
        courseId
      }
    }
  );
  
  const apiRef = useRef(null)

  const saveData = useCallback((data) => {
    // alert('WHENDOESTHISFIRE?')
    // alert(attempt)
    console.log('attempt')
    console.log(attempt)
    console.log('attempt%data')
    console.log(data)
    upsertScoAttempt({
      variables: {
        attempt,
        contentItemId: courseId,
        scormModuleId: block.properties.moduleId,
        data,
      }
    }).then(res => {
    })
  },[attempt])

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

    if(!window.API && data) {
      const API = apiRef.current = window.API = new window.Scorm12API(settings);

      API.on('LMSSetValue.cmi.*', function(CMIElement, value) {
        API.storeData(true);

        const scormData = API.renderCommitCMI(true)

        if(CMIElement === 'cmi.core.exit' && value==='suspend') {
          // document.querySelector('#debug_panel').innerHTML = '<pre>SCORM package sent exit status</pre>'
          // alert('EXIT!!!')
          // apiRef.current = window.API =null
          // setReload(true)
        } else {
          document.querySelector('#debug_panel').innerHTML = '<pre>'+JSON.stringify(scormData,null,2)+'</pre>'
        }

        !isEditing && saveData(scormData)
  
      });

      API.loadFromJSON(data?.latestScoAttempt?.data, '')
  
      window.addEventListener('beforeunload', unloadHandler)
      window.addEventListener('unload', unloadHandler)

      setLoaded(true)
    }
  },[attempt, saveData, data])


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
    if(data) {
      // alert(`Attempté: ${attempt}. Setting attempté to ${data?.latestScoAttempt?.attempt ?? 1}`)
      setAttempt(data?.latestScoAttempt?.attempt ?? 1)    
      data.latestScoAttempt?.data && apiRef.current.loadFromJSON(data.latestScoAttempt?.data?.cmi)
      // alert(data.latestScoAttempt?.data ? 'existing dataset' : 'fresh dataset')
    }
  },[data])

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
